import React, { useState } from "react";
import { SwitchMug } from "../../context/dataContext";
function SymptoScan() {
  let storedCredit = parseInt(localStorage.getItem("creditt")) === 0 ? 0 : 3;
  const [credit, setCredit] = useState(storedCredit);
  const { mealSwt } = SwitchMug();
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    height: "",
    weight: "",
    previous_disease: "",
    diet: "",
    allergies: "",
    symptoms: "",
    adiction: "",
    Calory_range: "",
  });

  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setCredit((prev) => {
      if (prev === 0) {
        return 0;
      }
      return prev - 1;
    });
    if (credit === 0) {
      return alert(
        "Sorry, you have reached your credit limit. Please Upgrade to PRO version."
      );
    }
    localStorage.setItem("creditt", credit - 1);
    setError("");
    setRecommendations([]);
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("An error occurred while fetching recommendations.");
      }
      const data = await response.json();
      if (data.error) {
        setError(data.error);
      } else {
        setRecommendations(data.recommendations);
      }
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };
  const handleLoad = () => {
    setFormData({
      age: "30",
      gender: "male",
      height: "170",
      weight: "70",
      previous_disease: "Hyper Tension",
      diet: "Vegetarian",
      allergies: "Dust",
      symptoms: "Coughing",
      adiction: "Drugs",
      Calory_range: "2000",
    });
  };

  const handleClear = () => {
    setFormData({
      age: "",
      gender: "",
      height: "",
      weight: "",
      previous_disease: "",
      diet: "",
      allergies: "",
      symptoms: "",
      adiction: "",
      Calory_range: "",
    });
    setRecommendations([]);
  };

  return (
    <div className=" mx-auto w-full">
      <div className="flex flex-row w-full justify-between">
        <h1 className="text-2xl font-bold mb-4 ">SymptoScan</h1>
        <span>Your Credits Left: {credit}</span>
        <div className="flex gap-5">
          <button
            onClick={handleLoad}
            className="bg-black text-white p-2 hover:bg-slate-200 rounded"
          >
            Load
          </button>
          <button
            onClick={handleClear}
            className="bg-black text-white p-2 hover:bg-slate-200 rounded"
          >
            Clear
          </button>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.keys(formData).map((key) => (
            <div key={key} className="flex flex-col">
              <label
                htmlFor={key}
                className="mb-2 text-sm font-medium text-gray-900"
              >
                {key.replace(/([A-Z])/g, " $1")}:
              </label>
              {["gender", "diet"].includes(key) ? (
                <select
                  id={key}
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:ring-0"
                  required
                >
                  {key === "gender" && (
                    <>
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </>
                  )}
                  {key === "diet" && (
                    <>
                      <option value="Vegetarian">Vegetarian</option>
                      <option value="NonVegetarian">Non Vegetarian</option>
                    </>
                  )}
                </select>
              ) : (
                <input
                  type="text"
                  id={key}
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:ring-0"
                  required
                />
              )}
            </div>
          ))}
        </div>
        {mealSwt && (
          <button
            type="submit"
            className="bg-black text-white p-2 hover:bg-slate-200 rounded w-fit"
          >
            {recommendations.length > 0 ? "Predict Again" : "Predict"}
          </button>
        )}
        {!mealSwt && <p className="text-red-500 text-lg">Maintainence Mode</p>}
        <div className="w-full flex flex-col items-center gap-5 mt-5">
          {loading ? (
            <div className="">
              {/* <Loading child={"Predicting..."} /> */}
              Predicting...
            </div>
          ) : (
            recommendations && (
              <>
                <div className="font-semibold text-red-500">
                  <>{recommendations}</>
                </div>
              </>
            )
          )}
        </div>
      </form>
    </div>
  );
}

export default SymptoScan;
