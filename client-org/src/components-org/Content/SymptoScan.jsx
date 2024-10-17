import { useState } from "react";
import { SwitchMug } from "../../context/dataContext";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
function SymptoScan() {
  const { getPermission, isLoading } = useKindeAuth();
  let isAdmin = null;
  if (!isLoading) {
    isAdmin = getPermission("admin-watch").isGranted;
  }

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
      console.log(data);
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
  let ctr = 0;
  return (
    <div className=" mx-auto w-full ">
      <div className="flex flex-col w-full justify-between gap-2 ">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-slate-700 underline">
            SymptoScan
          </h1>
        </div>
        <span className="text-slate-600 mt-3">
          SymptoScan is designed to analyze your health profile and symptoms. By
          inputting your age, gender, height, weight, previous diseases,
          allergies, addictions, symptoms, dietary preferences, and daily
          calorie intake range, the model can provide insights into potential
          health conditions you may be facing. This tool offers a personalized
          prediction based on the data you provide, helping you gain a better
          understanding of your current health. However, for a thorough
          evaluation, please consult a healthcare professional.
        </span>
        {isAdmin && (
          <div className="flex gap-2">
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
        )}
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 mt-4 border-t-[1px]"
      >
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
        {mealSwt && !loading && (
          <button
            type="submit"
            className="bg-black text-white p-2 hover:bg-slate-200 rounded w-fit"
          >
            {recommendations.length > 0 ? "Predict Again" : "Predict"}
          </button>
        )}
        {error && <p>Error: {error}</p>}

        <div className="w-full p-5 mt-5 text-xl">
          {loading ? (
            <div className="">Predicting...</div>
          ) : (
            recommendations && (
              <>
                <div className="font-semibold text-slate-600">
                  <>
                    {recommendations[0]
                      ?.replace(" ", "")
                      .split("\n")
                      .map((sen) => {
                        return (
                          <>
                            <p key={ctr++}>
                              {sen.includes("**") ? (
                                <strong className="text-2xl">
                                  <u>{sen.replaceAll("*", "")}</u>
                                </strong>
                              ) : (
                                <span>
                                  {sen.replaceAll("*", "")}
                                  {sen !== "" && "."}
                                </span>
                              )}
                              <br />
                            </p>
                          </>
                        );
                      })}
                    <br />
                    <br />
                  </>
                </div>
              </>
            )
          )}
        </div>
      </form>
      <div className="">
        {!mealSwt && (
          <p className="text-red-500 text-xl pb-[1rem] flex justify-center">
            Maintainence Mode
          </p>
        )}
      </div>
    </div>
  );
}

export default SymptoScan;
