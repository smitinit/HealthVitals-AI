import React, { useState } from "react";
import { SwitchMug } from "../../context/dataContext";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";

function MentalSuggestions() {
  const { getPermission, isLoading } = useKindeAuth();
  let isAdmin = null;
  if (!isLoading) {
    isAdmin = getPermission("admin-watch").isGranted;
  }
  const [formData, setFormData] = useState({
    Age: "",
    MaritalStatus: "",
    EducationLevel: "",
    NumberOfChildren: "",
    SmokingStatus: "",
    PhysicalActivityLevel: "",
    EmploymentStatus: "",
    Income: "",
    AlcoholConsumption: "",
    DietaryHabits: "",
    SleepPatterns: "",
    ChronicMedicalConditions: "",
    HistoryOfMentalIllness: "",
    HistoryOfSubstanceAbuse: "",
    FamilyHistoryOfDepression: "",
    SocialWeakness: "",
  });
  const { mentalSwt } = SwitchMug();

  const [suggestions, setSuggestions] = useState([]);
  const [stressLevel, setStressLevel] = useState("");
  const [psychiatristMessage, setPsychiatristMessage] = useState("");
  const [err, setErr] = useState("");
  const [isLoadingg, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setErr("");

    try {
      const response = await fetch(
        "http://localhost:5000/predictMentalHealth",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setSuggestions(data.suggestions);
        console.log(data.suggestions);
        setStressLevel(data.stress_level);
        setPsychiatristMessage(data.psychiatrist_message);
      } else {
        setErr("Error fetching data. Please try again.");
      }
    } catch (error) {
      setErr("An error occurred while fetching data.");
    }

    setIsLoading(false);
  };

  const handleLoad = () => {
    setFormData({
      Age: "30",
      Income: "50000",
      NumberOfChildren: "2",
      MaritalStatus: "Married",
      EducationLevel: "Bachelor's Degree",
      SmokingStatus: "Non-smoker",
      PhysicalActivityLevel: "Moderate",
      EmploymentStatus: "Employed",
      AlcoholConsumption: "Moderate",
      DietaryHabits: "Moderate",
      SleepPatterns: "Fair",
      ChronicMedicalConditions: "No",
      HistoryOfMentalIllness: "No",
      HistoryOfSubstanceAbuse: "No",
      FamilyHistoryOfDepression: "No",
      SocialWeakness: "No",
    });
  };

  const handleClear = () => {
    setFormData({
      Age: "",
      Income: "",
      NumberOfChildren: "",
      MaritalStatus: "",
      EducationLevel: "",
      SmokingStatus: "",
      PhysicalActivityLevel: "",
      EmploymentStatus: "",
      AlcoholConsumption: "",
      DietaryHabits: "",
      SleepPatterns: "",
      ChronicMedicalConditions: "",
      HistoryOfMentalIllness: "",
      HistoryOfSubstanceAbuse: "",
      FamilyHistoryOfDepression: "",
      SocialWeakness: "",
    });
    setSuggestions([]);
    setStressLevel("");
    setPsychiatristMessage("");
  };

  return (
    <div className=" mx-auto w-full flex-col flex">
      <div className="flex flex-col  ">
        <div className="flex flex-col ">
          <span className="text-3xl font-bold lg:mb-4 mb-2 underline text-slate-700">
            Mental Health Suggestions
          </span>
          {isAdmin && (
            <div className="flex gap-2 w-fit items-center">
              <button
                onClick={() => {
                  handleLoad();
                }}
                className="bg-black text-white p-2 hover:bg-slate-200 rounded"
              >
                positive
              </button>
              <button
                onClick={() => handleClear()}
                className="bg-black text-white p-2 hover:bg-slate-200 rounded"
              >
                Clear
              </button>
            </div>
          )}
        </div>
        <div className="lg:mt-0 mt-4 text-slate-600">
          We're here to help you navigate your mental well-being by offering
          personalized advice based on your inputs. Whether you're seeking
          coping strategies, relaxation techniques, or ways to improve your
          overall mental health, we're here to provide support and guidance
          tailored to your needs.
          <br />
          "Take a moment to fill the below listed fields, and let's work
          together towards a healthier, happier you."
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 lg:mt0 mt-4 border-t-[1px] "
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:mt-0 mt-3">
          {Object.keys(formData).map((key) => (
            <div key={key} className="flex flex-col">
              <label
                htmlFor={key}
                className="mb-2 text-sm font-medium text-gray-900"
              >
                {key.replace(/([A-Z])/g, " $1")}:
              </label>
              {[
                "MaritalStatus",
                "EducationLevel",
                "SmokingStatus",
                "PhysicalActivityLevel",
                "EmploymentStatus",
                "AlcoholConsumption",
                "DietaryHabits",
                "SleepPatterns",
                "ChronicMedicalConditions",
                "HistoryOfMentalIllness",
                "HistoryOfSubstanceAbuse",
                "FamilyHistoryOfDepression",
                "SocialWeakness",
              ].includes(key) ? (
                <select
                  id={key}
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:ring-0"
                >
                  {/* Options based on the key */}
                  {key === "MaritalStatus" && (
                    <>
                      <option value="">Select</option>
                      <option value="Married">Married</option>
                      <option value="Single">Single</option>
                      <option value="Widow">Widow</option>
                      <option value="Divorced">Divorced</option>
                    </>
                  )}
                  {key === "EducationLevel" && (
                    <>
                      <option value="High School">High School</option>
                      <option value="Associate Degree">Associate Degree</option>
                      <option value="Bachelor's Degree">
                        Bachelor's Degree
                      </option>
                      <option value="Master's Degree">Master's Degree</option>
                      <option value="PhD">PhD</option>
                    </>
                  )}
                  {key === "SmokingStatus" && (
                    <>
                      <option value="">Select</option>
                      <option value="Non-smoker">Non-smoker</option>
                      <option value="Former">Former</option>
                      <option value="Current">Current</option>
                    </>
                  )}
                  {key === "PhysicalActivityLevel" && (
                    <>
                      <option value="">Select</option>
                      <option value="Active">Active</option>
                      <option value="Moderate">Moderate</option>
                      <option value="Sedentary">Sedentary</option>
                    </>
                  )}
                  {key === "EmploymentStatus" && (
                    <>
                      <option value="">Select</option>
                      <option value="Employed">Employed</option>
                      <option value="Unemployed">Unemployed</option>
                    </>
                  )}
                  {key === "AlcoholConsumption" && (
                    <>
                      <option value="">Select</option>
                      <option value="Low">Low</option>
                      <option value="Moderate">Moderate</option>
                      <option value="High">High</option>
                    </>
                  )}
                  {key === "DietaryHabits" && (
                    <>
                      <option value="">Select</option>
                      <option value="Healthy">Healthy</option>
                      <option value="Moderate">Moderate</option>
                      <option value="Unhealthy">Unhealthy</option>
                    </>
                  )}
                  {key === "SleepPatterns" && (
                    <>
                      <option value="">Select</option>
                      <option value="Good">Good</option>
                      <option value="Fair">Fair</option>
                      <option value="Poor">Poor</option>
                    </>
                  )}
                  {key === "ChronicMedicalConditions" && (
                    <>
                      <option value="">Select</option>
                      <option value="No">No</option>
                      <option value="Yes">Yes</option>
                    </>
                  )}
                  {key === "HistoryOfMentalIllness" && (
                    <>
                      <option value="">Select</option>
                      <option value="No">No</option>
                      <option value="Yes">Yes</option>
                    </>
                  )}
                  {key === "HistoryOfSubstanceAbuse" && (
                    <>
                      <option value="">Select</option>
                      <option value="No">No</option>
                      <option value="Yes">Yes</option>
                    </>
                  )}
                  {key === "FamilyHistoryOfDepression" && (
                    <>
                      <option value="">Select</option>
                      <option value="No">No</option>
                      <option value="Yes">Yes</option>
                    </>
                  )}
                  {key === "SocialWeakness" && (
                    <>
                      <option value="">Select</option>
                      <option value="No">No</option>
                      <option value="Yes">Yes</option>
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
        {mentalSwt && !isLoadingg && (
          <button
            type="submit"
            className="bg-black text-white p-2 hover:bg-slate-200 rounded w-fit"
          >
            {suggestions.length > 0 ? "Predict Again" : "Predict"}
          </button>
        )}
        {suggestions.length > 0 && (
          <div className=" border-[1px] shadow-2xl rounded-lg">
            <div className="w-full flex flex-col items-center gap-5 mt-5 ">
              {suggestions.length > 0 && (
                <div className="w-full p-5  border-slate-300">
                  <label className="block mb-2  font-medium text-gray-900 text-xl underline">
                    Suggestions:
                  </label>
                  <ul className="list-disc p-3">
                    {suggestions.map((suggestion, index) =>
                      index === 0 ? (
                        <span className="font-semibold">
                          <li key={index}>
                            {suggestion}
                            <br />
                          </li>
                        </span>
                      ) : (
                        <li key={index}>
                          {suggestion}
                          <br />
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}
            </div>
            {suggestions.length > 0 && (
              <div className="p-5">
                <label className="block mb-2 text-xl font-medium text-gray-900">
                  Stress Level:{" "}
                  <span className="font-extrabold text-lg">{stressLevel}</span>
                </label>
                <label className="block mb-2 text-xl font-medium text-gray-900">
                  Psychiatrist Message:{" "}
                  <span className="font-normal text-lg">
                    {psychiatristMessage}
                  </span>
                </label>

                <small>
                  For further help, you may consult your nearby Psychiatrist.
                </small>
              </div>
            )}
          </div>
        )}
      </form>
      <div className="">
        {!mentalSwt && (
          <p className="text-red-500 text-xl my-[1.5rem]  flex justify-center">
            Maintainence Mode
          </p>
        )}
      </div>
      {err && <p className="text-red-500 ">{err}</p>}
    </div>
  );
}

export default MentalSuggestions;
