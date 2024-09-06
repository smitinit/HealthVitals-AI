import numpy as np
import pandas as pd
import pickle
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier

# Load the heart disease dataset
heart_dataset = pd.read_csv('./csvOnly/heart_disease_data.csv')

# Split features and target for heart disease
X_heart = heart_dataset.drop('target', axis=1)
y_heart = heart_dataset['target']

# Split the heart disease data into training and test sets
X_heart_train, X_heart_test, y_heart_train, y_heart_test = train_test_split(X_heart, y_heart, test_size=0.2, random_state=42)

# Train the heart disease model
heart_model = RandomForestClassifier()
heart_model.fit(X_heart_train, y_heart_train)

# Save the heart disease model====================================
pickle.dump(heart_model, open('./pklOnly/model.pkl', 'wb'))


# Load the diabetes dataset
diabetes_dataset = pd.read_csv('./csvOnly/diabetes.csv')

# Split features and target for diabetes
X_diabetes = diabetes_dataset.drop('Outcome', axis=1)
y_diabetes = diabetes_dataset['Outcome']

# Split the diabetes data into training and test sets
X_diabetes_train, X_diabetes_test, y_diabetes_train, y_diabetes_test = train_test_split(X_diabetes, y_diabetes, test_size=0.2, random_state=42)

# Train the diabetes model
diabetes_model = RandomForestClassifier()
diabetes_model.fit(X_diabetes_train, y_diabetes_train)

# Save the diabetes model
pickle.dump(diabetes_model, open('./pklOnly/model3.pkl', 'wb'))

# ==========================================
parkinsons_dataset = pd.read_csv('./csvOnly/parkinsons_data.csv')

# Split features and target for Parkinson's disease
X_parkinsons = parkinsons_dataset.drop('status', axis=1)
y_parkinsons = parkinsons_dataset['status']

# Split the Parkinson's data into training and test sets
X_parkinsons_train, X_parkinsons_test, y_parkinsons_train, y_parkinsons_test = train_test_split(X_parkinsons, y_parkinsons, test_size=0.2, random_state=42)

# Train the Parkinson's disease model
parkinsons_model = RandomForestClassifier()
parkinsons_model.fit(X_parkinsons_train, y_parkinsons_train)

# Save the Parkinson's disease model
pickle.dump(parkinsons_model, open('./pklOnly/parkinsons_model.pkl', 'wb'))

# Load dataset
df = pd.read_csv('./csvOnly/depression_suggestionss.csv')

# Assuming 'Suggestions' is the target column
X = df.drop('Suggestions', axis=1)
y = df['Suggestions']

# Convert categorical features to numeric using one-hot encoding if necessary
X = pd.get_dummies(X)

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train model
model = RandomForestClassifier(random_state=42)
model.fit(X_train, y_train)
X_train_prediction = model.predict(X_train)
# training_data_accuracy = accuracy_score(X_train_prediction, y_train)
# print(training_data_accuracy)

# X_test_prediction = model.predict(X_test)
# test_data_accuracy = accuracy_score(X_test_prediction, y_test)
# print(test_data_accuracy)

# Save the model and feature columns
with open('./pklOnly/model4.pkl', 'wb') as f:
    pickle.dump(model, f)

with open('./pklOnly/feature_columns1.pkl', 'wb') as f:
    pickle.dump(X.columns.tolist(), f)