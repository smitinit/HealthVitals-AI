import React, { useState } from "react";
import { SwitchMug } from "../../context/dataContext";

function Diabetes() {
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
          setResult("You are diabetic.");
        } else if (prediction === 0) {
          setResult("You are not diabetic.");
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
      <div className=" flex flex-col gap-10 p-5">
        <div className=" flex justify-between">
          <span className="text-3xl">
            <strong>Diabetes Prediction</strong>
          </span>
          <div className="flex gap-5">
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
              Load for positive
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
              Load for negative
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
          <div className="output-message">
            <p>{result}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Diabetes;
