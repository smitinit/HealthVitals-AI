import React, { useState } from "react";
import { SwitchMug } from "../../context/dataContext";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";

function Diabetes() {
  const { getPermission, isLoading } = useKindeAuth();
  let isAdmin = null;
  if (!isLoading) {
    isAdmin = getPermission("admin-watch").isGranted;
  }
  const { diabetesSwt } = SwitchMug();
  const [formData, setFormData] = useState({
    Pregnancies: "",
    Glucose: "",
    BloodPressure: "",
    SkinThickness: "",
    Insulin: "",
    BMI: "",
    DiabetesPedigreeFunction: "",
    Age: "",
  });

  const [result, setResult] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setResult("");
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const allFieldsFilled = Object.values(formData).every(
      (value) => value !== ""
    );
    if (!allFieldsFilled) {
      setMessage("Please fill in all fields before submitting.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/predictDiabetes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setLoading(true);
        const result = await response.json();
        const prediction = result.Outcome;
        setTimeout(() => {
          setLoading(false);
        }, 2000);

        if (prediction === 1) {
          setResult("You may have chances of being diabetic.");
        } else if (prediction === 0) {
          setResult("You may not have diabetis.");
        } else {
          setResult("Error in prediction.");
        }
      } else {
        console.error("Prediction failed:", response.statusText);
        setMessage("Error with the prediction request.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="w-full">
      <div className=" flex flex-col gap-10 ">
        <div className=" flex justify-between flex-col gap-3">
          <span className="text-3xl text-slate-700 underline">
            <strong>Diabetes Prediction</strong>
          </span>
          <span className="text-slate-600">
            Our diabetes prediction model allows you to input key health metrics
            such as age, BMI, blood pressure, glucose levels, and more. Based on
            this information, our advanced machine learning model will analyze
            your data and provide a prediction regarding your likelihood of
            developing diabetes. This tool is designed to give you insights to
            better understand your health risks and take proactive measures.
            Please note that the results are for informational purposes and
            should not replace professional medical advice.
          </span>
          <p className="text-slate-600 mt-3 font-medium ">
            <span className="font-bold underline">
              Reports Needed for input fields:
            </span>{" "}
            Blood Test , Vital Signs and Basic Health Screening , Body
            composition and Insulin Resistance Test , Generic and Risk
            Assessment Tools.
          </p>
          {isAdmin && (
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setFormData({
                    Pregnancies: "3",
                    Glucose: "123",
                    BloodPressure: "321",
                    SkinThickness: "123",
                    Insulin: "23",
                    BMI: "213",
                    DiabetesPedigreeFunction: "23",
                    Age: "12",
                  });
                  setResult("");
                  setMessage("");
                }}
                className="bg-black text-white p-2 hover:bg-slate-200 rounded"
              >
                positive
              </button>
              <button
                onClick={() => {
                  setFormData({
                    Pregnancies: "1",
                    Glucose: "85",
                    BloodPressure: "66",
                    SkinThickness: "29",
                    Insulin: "0",
                    BMI: "26.6",
                    DiabetesPedigreeFunction: "0.351",
                    Age: "31",
                  });
                  setResult("");
                  setMessage("");
                }}
                className="bg-black text-white p-2 hover:bg-slate-200 rounded"
              >
                negative
              </button>
              <button
                onClick={() => {
                  setFormData({
                    Pregnancies: "",
                    Glucose: "",
                    BloodPressure: "",
                    SkinThickness: "",
                    Insulin: "",
                    BMI: "",
                    DiabetesPedigreeFunction: "",
                    Age: "",
                  });
                  setResult("");
                  setMessage("");
                }}
                className="bg-black text-white p-2 hover:bg-slate-200 rounded"
              >
                Clear
              </button>
            </div>
          )}
        </div>
      </div>

      <div className=" mx-auto p-4 w-full">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.keys(formData).map((key) => (
              <div key={key} className="flex flex-col">
                <label
                  htmlFor={key}
                  className="mb-2 text-sm font-medium text-gray-900"
                >
                  {key.replace(/([A-Z])/g, " $1")}:
                </label>
                <input
                  type="number"
                  id={key}
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:ring-0"
                  required
                />
              </div>
            ))}
          </div>
          {diabetesSwt && (
            <div className="flex gap-3 w-full items-center">
              {!loading && (
                <button
                  type="submit"
                  className="bg-black text-white p-2 hover:bg-slate-200 rounded"
                >
                  {result ? "Predict Again" : "Predict"}
                </button>
              )}
            </div>
          )}
        </form>
        {!diabetesSwt && (
          <p className="text-red-500 text-lg">Maintainence Mode</p>
        )}
        {loading ? (
          <div className="">Loading..</div>
        ) : (
          message && (
            <>
              <div className="font-semibold text-red-500">
                <p>{message}</p>
              </div>
            </>
          )
        )}
        {!loading && result && (
          <div className="text-center mt-4 lg:mt-8 border-t-[1px] pt-5 ">
            <span className="text-xl rounded-lg  font-bold text-slate-700 shadow-lg border-[1px] p-2 ">
              {result}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Diabetes;
