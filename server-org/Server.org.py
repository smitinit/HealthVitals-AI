from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from dotenv import load_dotenv
import os
import pickle
import numpy as np
import google.generativeai as genai
from PIL import Image
import io
import random
import pandas as pd

load_dotenv()
app = Flask(__name__)
CORS(app)  

# ==================================== MongoDB Setup ====================================

client = MongoClient('mongodb+srv://patelsmit090305:smit090305@healthvitals-ai-clustor.7dlb7.mongodb.net/?retryWrites=true&w=majority&appName=HealthVitals-AI-CLUSTOR')
client = MongoClient(os.getenv("MONGO_DB_URL"))
db = client['adminPanel']  #
collection = db['switchStates']  

# Initialize default states
default_states = {
    "calorySwt": False,
    "mealSwt": False,
    "heartSwt": False,
    "diabetesSwt": False,
    "parkinsonsSwt": False
}

if collection.count_documents({}) == 0:
    collection.insert_one(default_states)

@app.route('/getSwitchStates', methods=['GET'])
def get_switch_states():
    
    states = collection.find_one({}, {'_id': 0})  
    return jsonify(states)

@app.route('/updateSwitchState', methods=['POST'])
def update_switch_state():
 
    data = request.json
    collection.update_one({}, {'$set': {data['switch']: data['value']}})
    return jsonify(success=True)

# ==================================== Heart Disease Prediction Setup ====================================

heart_model = pickle.load(open('./csv.pkl/pklOnly/model.pkl', 'rb'))
@app.route('/predictHeart', methods=['POST'])
def predict_heart():
    try:
        data = request.json
        features = [data['Sex'], data['Age'], data['cp'], data['trestbps'], data['Cholesterol'], data['fbs'], data['Restecg'], data['Thalach'], data['exang'], data['oldpeak'], data['Slope'], data['ca'], data['thal']]

        final_features = [np.array(features)]
        prediction = heart_model.predict(final_features)
        output = int(prediction[0])
        return jsonify({'target': output})
    
    except KeyError as ke:
        return jsonify({'error': f'Missing data field: {str(ke)}'}), 400
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ==================================== Diabetes Prediction Setup ====================================

diabetes_model = pickle.load(open('./csv.pkl/pklOnly/model2.pkl', 'rb'))
@app.route('/predictDiabetes', methods=['POST'])
def predict_diabetes():
    try:

        data = request.json
        features = [data['Pregnancies'], data['Glucose'], data['BloodPressure'], data['SkinThickness'], 
                    data['Insulin'], data['BMI'], data['DiabetesPedigreeFunction'], data['Age']]
 
        final_features = [np.array(features)]
        prediction = diabetes_model.predict(final_features)  
        output = int(prediction[0])
        return jsonify({'Outcome': output})
    
    except KeyError as ke:
        return jsonify({'error': f'Missing data field: {str(ke)}'}), 400
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ==================================== Calorie Counter Setup ====================================

def get_gemini_response_nutrition(input_prompt, image, user_input):
    model = genai.GenerativeModel('gemini-1.5-flash')
    response = model.generate_content([input_prompt, image[0], user_input])

    text = response.text.strip()
    points = text.split("\n")
    points = [point.replace("*", "").strip() for point in points if point.strip()]

    # Format the output without numbering for titles and with numbered sub-points
    numbered_points = []
    current_title = None
    for point in points:
        if point.startswith("1."):
            current_title = point[3:]
            numbered_points.append(current_title)
        else:        
            numbered_points.append(f"- {point}")
    return numbered_points

def input_image_setup(image_file):
    bytes_data = image_file.read()
    mime_type = Image.open(io.BytesIO(bytes_data)).format.lower()
    if mime_type == "jpeg":
        mime_type = "image/jpeg"
    else:
        mime_type = f"image/{mime_type}"
    
    image_parts = [
        {
            "mime_type": mime_type,
            "data": bytes_data
        }
    ]
    return image_parts

input_prompt_nutrition = """
You are an expert nutritionist where you need to see the food items from the image
and calculate the approximate total calories of all food items in the image at last. Also start with providing the details of every food item with calorie intake in the following format (add)(also ignore item which is repeated in image and provide info for a single item) :

 (detailed item name) - no of calories (write you are providing approx details) 

 It contains - provice nutrition of Item in single line 
 
At last also provide if the food is healthy or not. (start from new line and and provide reason why it is healthy or not)
"""

@app.route("/api/nutritions", methods=["POST"]) 
def get_nutrition_data():
    try:
        user_input = request.form.get("user_input")
        image_file = request.files["image_file"]
        
        if image_file:
            image_data = input_image_setup(image_file)
            response = get_gemini_response_nutrition(input_prompt_nutrition, image_data, user_input)
            return jsonify({"status": "success", "response": response})
        else:
            return jsonify({"status": "error", "message": "No image file uploaded"}), 400
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


# ==================================== Sympto Scan Setup ====================================
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))
model = genai.GenerativeModel("gemini-pro")
chat = model.start_chat()

def get_gemini_response(question):
    response = chat.send_message(question)
    # return response.choices[0].message["content"].split('\n')
    return response

@app.route('/recommend', methods=['POST'])
def recommend():
    try:
        data = request.json
        features = [
            data.get('age'),
            data.get('gender'),
            data.get('height'),
            data.get('weight'),
            data.get('previous_disease'),
            data.get('diet'),
            data.get('allergies'),
            data.get('symptoms'),
            data.get('adiction'),
            data.get('Calory_range'),
        ]

        user_input = (f"I want you to recommend Indian meals as 5 breakfasts, 5 lunches, 5 dinners, Exercise Plan,(dont give title indian meal recommendations) "
                      f"the possible diseases that I might suffer from, some preventive measures for those diseases, (dont give it with '*' symbol but give '\n', only for this line) "
                      f"Medicines Recommendations if any, and important suggestions according to 5 do's and 5 don'ts based (dont give it with '*' symbol, only for this line and keep all same as before )"
                      f"on the following criteria: the age is {features[0]}, the gender is {features[1]}, "
                      f"the height is {features[2]}, the weight is {features[3]}, the previous disease is {features[4]}, "
                      f"the diet is {features[5]}, the allergies are {features[6]}, the symptoms are {features[7]}, "
                      f"the addiction is {features[8]}, the Calory_range is {features[9]}.")

        response = get_gemini_response(user_input)
        recommendations = [candidate.content.parts[0].text for candidate in response.candidates]
        return jsonify({'recommendations': recommendations})
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500


# =========================================================
parkinsons_model = pickle.load(open('./csv.pkl/pklOnly/parkinsons_model.pkl', 'rb'))

@app.route('/predictParkinson', methods=['POST'])
def predict_parkinsons():
    try:
      
        data = request.json
        features = [
            data['MDVP:Fo(Hz)'], data['MDVP:Fhi(Hz)'], data['MDVP:Flo(Hz)'], 
            data['MDVP:Jitter(%)'], data['MDVP:Jitter(Abs)'], data['MDVP:RAP'], 
            data['MDVP:PPQ'], data['Jitter:DDP'], data['MDVP:Shimmer(dB)'], 
            data['Shimmer:APQ5'], data['NHR'], data['HNR'], data['RPDE'], 
            data['DFA']
        ]

        final_features = [np.array(features)]
        prediction = parkinsons_model.predict(final_features)
        output = int(prediction[0])
        return jsonify({'status': output})
    
    except KeyError as ke:
        return jsonify({'error': f'Missing data field: {str(ke)}'}), 400
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# --------------------------------------------------------

with open('./csv.pkl/pklOnly/model4.pkl', 'rb') as f:
    model = pickle.load(f)

with open('./csv.pkl/pklOnly/feature_columns1.pkl', 'rb') as f:
    feature_columns = pickle.load(f)

df = pd.read_csv('./csv.pkl/csvOnly/depression_suggestionss.csv')

def determine_stress_level(data):
    stress_level = 'Low'

    # Very High Stress Level
    if (int(data.get('Age', 0)) > 80 or
        data.get('Smoking Status') == 'Current' or
        data.get('Physical Activity Level') == 'Sedentary' or
        data.get('Alcohol Consumption') == 'High' or
        data.get('Dietary Habits') == 'Unhealthy' or
        data.get('Sleep Patterns') == 'Poor' or
        data.get('History of Mental Illness') == 'Yes' or
        data.get('History of Substance Abuse') == 'Yes' or
        data.get('Family History of Depression') == 'Yes' or
        data.get('Chronic Medical Conditions') == 'Yes' or
        data.get('Social Weakness') == 'Yes'):
        stress_level = 'Very High'
    
    # High Stress Level
    elif (int(data.get('Age', 0)) > 60 or
          data.get('Marital Status') in ['Divorced', 'Widow'] or
          data.get('Education Level') in ['High School', "Associate Degree"] or
          int(data.get('Number of Children', 0)) >= 3 or
          data.get('Employment Status') == 'Unemployed' or
          float(data.get('Income', 0)) < 20000 or
          data.get('Dietary Habits') == 'Moderate' or
          data.get('Social Weakness') == 'Yes'):
        stress_level = 'High'
    
    # Medium Stress Level
    elif (int(data.get('Age', 0)) > 40 or
          data.get('Smoking Status') == 'Former' or
          data.get('Physical Activity Level') == 'Moderate' or
          data.get('Alcohol Consumption') == 'Moderate' or
          data.get('Sleep Patterns') == 'Fair' or
          data.get('Education Level') in ["Bachelor's Degree", "Master's Degree"] or
          int(data.get('Number of Children', 0)) == 2 or
          float(data.get('Income', 0)) < 80000):
        stress_level = 'Medium'
    
    # Low Stress Level
    elif (int(data.get('Age', 0)) > 20 or
          data.get('Marital Status') == 'Married' or
          data.get('Education Level') == 'PhD' or
          int(data.get('Number of Children', 0)) <= 1 or
          data.get('Employment Status') == 'Employed' or
          float(data.get('Income', 0)) > 80000 or
          data.get('Dietary Habits') == 'Healthy' or
          data.get('Sleep Patterns') == 'Good' or
          data.get('Chronic Medical Conditions') == 'No' or
          data.get('Social Weakness') == 'No'):
        stress_level = 'Low'

    return stress_level

#====================================================================================

@app.route('/predictMentalHealth', methods=['POST'])
def predict():
   
    data = request.json
    input_data = pd.DataFrame([data], columns=feature_columns)
    model_prediction = model.predict(input_data)[0]
    suggestions = [f"{model_prediction}"]
    filtered_data = df.copy()

    for feature in data:
        if feature in filtered_data.columns:
            filtered_data = filtered_data[filtered_data[feature] == data[feature]]

    unique_suggestions = filtered_data['Suggestions'].unique().tolist()
    suggestions.extend(unique_suggestions)

    if data.get('SmokingStatus') == 'Non-smoker':
        suggestions.append("Continue maintaining a smoke-free lifestyle to support mental and physical health.")
    elif data.get('SmokingStatus') == 'Former':
        suggestions.append("Consider joining a support group to strengthen your resolve to remain smoke-free.")
    elif data.get('SmokingStatus') == 'Current':
        suggestions.append("Consider reducing or quitting smoking to improve both physical and mental health, as nicotine and other chemicals in cigarettes can negatively affect mood and increase anxiety.")

    if data.get('PhysicalActivityLevel') == 'Active':
        suggestions.append("Keep up with regular physical activities to enhance your mood and overall well-being.")
    elif data.get('PhysicalActivityLevel') == 'Sedentary':
        suggestions.append("Start with light exercises like walking or yoga to gradually improve your activity level.")
    elif data.get('PhysicalActivityLevel') == 'Moderate':
        suggestions.append("Maintain your current activity level and try incorporating new exercises to keep it interesting.")

    if data.get('AlcoholConsumption') == 'Low':
        suggestions.append("Maintain moderate alcohol consumption to support your mental clarity and well-being.")
    elif data.get('AlcoholConsumption') == 'Moderate':
        suggestions.append("Be mindful of your alcohol intake and consider reducing it to see if it benefits your mood.")
    elif data.get('AlcoholConsumption') == 'High':
        suggestions.append("Consider reducing alcohol consumption, as it may negatively impact your mental health.")

    if data.get('DietaryHabits') == 'Healthy':
        suggestions.append("Your healthy diet is supporting both your body and mind. Keep it up!")
    elif data.get('DietaryHabits') == 'Moderate':
        suggestions.append("Try adding more fruits and vegetables to your diet to boost your nutritional intake.")
    elif data.get('DietaryHabits') == 'Unhealthy':
        suggestions.append("Consider making small changes towards a healthier diet, like reducing sugar and processed foods.")

    if data.get('SleepPatterns') == 'Good':
        suggestions.append("Continue maintaining good sleep hygiene to support your mental health.")
    elif data.get('SleepPatterns') == 'Fair':
        suggestions.append("Improve your sleep routine by setting regular sleep times and creating a relaxing bedtime environment.")
    elif data.get('SleepPatterns') == 'Poor':
        suggestions.append("Consider consulting a specialist to address your sleep issues, as they can significantly impact your mood.")

    if data.get('ChronicMedicalConditions') == 'Yes':
        suggestions.append("Managing chronic conditions can be challenging. Ensure you're getting the support and care you need.")
    elif data.get('ChronicMedicalConditions') == 'No':
        suggestions.append("Your current health status is positive, focus on maintaining it through preventive care.")

    # Age-based suggestions
    age = int(data.get('Age', 0))
    if age > 80:
        suggestions.append("At this age, maintaining mental and physical health is crucial. Regular check-ups are recommended.")
    elif age > 60:
        suggestions.append("As you age, consider engaging in social activities and hobbies to stay mentally active.")
    elif age > 40:
        suggestions.append("Ensure you're managing stress effectively and maintaining a balanced lifestyle.")
    elif age > 20:
        suggestions.append("Ensure building healthy habits can have long-term benefits for mental health.")

    # Marital Status-based suggestions
    marital_status = data.get('MaritalStatus')
    if marital_status == 'Single':
        suggestions.append("Consider joining social groups or activities to expand your support network.")
    elif marital_status == 'Married':
        suggestions.append("Maintaining a strong relationship with your partner can support emotional well-being.")
    elif marital_status == 'Widow':
        suggestions.append("Grieving takes time. Seek support from friends, family, or a counselor to navigate this period.")
    elif marital_status == 'Divorced':
        suggestions.append("Focus on self-care and consider counseling to manage the emotional impact of divorce.")

    # Education Level-based suggestions
    education_level = data.get('EducationLevel')
    if education_level == "High School":
        suggestions.append("Consider pursuing further education or training to open up new opportunities.")
    elif education_level == "Bachelor's Degree":
        suggestions.append("Your education is a strong foundation. Explore professional development to advance your career.")
    elif education_level == "Master's Degree":
        suggestions.append("Continue leveraging your advanced education for career growth and personal fulfillment.")
    elif education_level == "PhD":
        suggestions.append("Your extensive education provides you with unique opportunities. Engage in activities that align with your passions.")
    elif education_level == "Associate Degree":
        suggestions.append("Look for opportunities to enhance your skills and qualifications to advance in your field.")

    # Number of Children-based suggestions
    num_children = int(data.get('NumberOfChildren', 0))
    if num_children == 0:
        suggestions.append("Without children, you have flexibility to focus on personal goals and self-care.")
    elif num_children == 1:
        suggestions.append("Balancing parenting with self-care is important. Make time for yourself as well.")
    elif num_children == 2:
        suggestions.append("With two children, managing time effectively and seeking support can help reduce stress.")
    elif num_children >= 3:
        suggestions.append("Managing a larger family can be demanding. Consider strategies to balance family and personal well-being.")

    # Employment Status-based suggestions
    employment_status = data.get('EmploymentStatus')
    if employment_status == 'Employed':
        suggestions.append("Maintaining a healthy work-life balance can support mental health and overall well-being.")
    elif employment_status == 'Unemployed':
        suggestions.append("Explore opportunities for skill development or volunteer work to stay engaged and positive.")

    # Income-based suggestions
    income = float(data.get('Income', 0))
    if income > 200000:
        suggestions.append("High income provides financial stability. Focus on personal fulfillment and well-being.")
    elif income > 100000:
        suggestions.append("With a good income, consider investing in self-care and experiences that bring you joy.")
    elif income > 80000:
        suggestions.append("Maintain a budget that supports your mental and physical health goals.")
    elif income > 50000:
        suggestions.append("Ensure your income is managed effectively to reduce financial stress.")
    elif income > 30000:
        suggestions.append("Consider financial planning to optimize your resources for a balanced lifestyle.")
    elif income > 15000:
        suggestions.append("Budgeting and financial management can help reduce stress and improve well-being.")
    elif income > 5000:
        suggestions.append("Seek community resources or support programs to help manage financial stress.")

    # History of Mental Illness-based suggestions
    if data.get('HistoryOfMentalIllness') == 'Yes':
        suggestions.append("Regular mental health check-ups and therapy can support ongoing well-being.")
    elif data.get('HistoryOfMentalIllness') == 'No':
        suggestions.append("Continue practicing preventive measures to maintain mental health.")

    # History of Substance Abuse-based suggestions
    if data.get('HistoryOfSubstanceAbuse') == 'Yes':
        suggestions.append("Engage in support groups or counseling to sustain recovery and mental health.")
    elif data.get('HistoryOfSubstanceAbuse') == 'No':
        suggestions.append("Maintain healthy habits and seek support if you ever face challenges with substance use.")

    # Family History of Depression-based suggestions
    if data.get('FamilyHistoryOfDepression') == 'Yes':
        suggestions.append("Be proactive about mental health by engaging in regular self-care and seeking professional support if needed.")
    elif data.get('FamilyHistoryOfDepression') == 'No':
        suggestions.append("Continue practicing good mental health habits to support your well-being.")

    if data.get('SocialWeakness') == 'Yes':
        suggestions.append("Consider joining support groups or engaging in social skills training to enhance social confidence and interactions.")
    elif data.get('SocialWeakness') == 'No':
        suggestions.append("Maintain your social connections and continue building strong, healthy relationships.")

    # Add a random suggestion to ensure diversity
    additional_suggestions = [
        "Engage in hobbies that you enjoy to keep your mind active and positive.",
        "Consider regular check-ins with a mental health professional for ongoing support.",
        "Try relaxation techniques such as deep breathing or meditation to manage stress."
    ]
    suggestions.append(random.choice(additional_suggestions))

    # Determine the stress level
    stress_level = determine_stress_level(data)

    # Generate a psychiatrist-like message
    psychiatrist_message = ""
    if stress_level == 'Very High':
        psychiatrist_message = "Your current stress level is very high. It is crucial to seek professional help to manage your stress and improve your well-being."
    elif stress_level == 'High':
        psychiatrist_message = "You are experiencing high stress. Consider reaching out to a mental health professional for support and strategies to manage stress effectively."
    elif stress_level == 'Medium':
        psychiatrist_message = "Your stress level is moderate. Continue implementing stress management techniques and seek support if needed."
    elif stress_level == 'Low':
        psychiatrist_message = "Your stress level is low. Maintain your current lifestyle and continue practicing healthy habits."

    # Return the suggestions and stress level
    return jsonify({
        'suggestions': suggestions,
        'stress_level': stress_level,
        'psychiatrist_message': psychiatrist_message
 })

# ==================================== Run the Flask Application ====================================

if __name__ == "__main__":
    app.run(debug=True)