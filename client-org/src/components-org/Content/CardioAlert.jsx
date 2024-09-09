import React, { useState } from "react";
import { SwitchMug } from "../../context/dataContext";
import AlertDialogSlide from "../Dialogg";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";

function Heart_atk() {
  const { getPermission, isLoading } = useKindeAuth();
  let isAdmin = null;
  if (!isLoading) {
    isAdmin = getPermission("admin-watch").isGranted;
  }
  const [formData, setFormData] = useState({
    Sex: null,
    Age: null,
    cp: null,
    trestbps: null,
    Cholesterol: null,
    fbs: null,
    Restecg: null,
    Thalach: null,
    exang: null,
    oldpeak: null,
    Slope: null,
    ca: null,
    thal: null,
  });
  const DataLimits = {
    Age: [29, 77],
    cp: [0, 4],
    fbs: [0, 1],
    Restecg: [0, 2],
    exang: [0, 1],
    Slope: [0, 2],
    ca: [0, 4],
    thal: [0, 3],
    trestbps: [94, 200],
    Cholesterol: [126, 564],
    Thalach: [71, 202],
    oldpeak: [0, 6.2],
  };

  const fullForms = {
    Sex: "Usage: Indicates the gender of the patient, typically coded as 0 for female and 1 for male. Men generally have a higher risk of heart disease at a younger age compared to women. Range: 0 (female) or 1 (male).",

    Age: "Usage: Represents the age of the patient in years, a crucial factor as heart disease risk generally increases with age. Range: Usually between 29 to 77 years",

    cp: `Full Form: Chest Pain. Type Usage: Categorical variable indicating the type of chest pain, which can be an indicator of heart problems. Different types of chest pain are associated with varying levels of risk for heart disease and stroke. Range: 0 to 3 (0: typical angina, 1: atypical angina, 2: non-anginal pain, 3: asymptomatic).`,

    fbs: "Full Form: Fasting Blood Sugar Usage: Indicates if the fasting blood sugar level is greater than 120 mg/dl. It is coded as 1 (true) or 0 (false). Elevated fasting blood sugar can be indicative of diabetes, which is a risk factor for heart disease. Range: 0 or 1.",

    Restecg:
      "Full Form: Resting Electrocardiographic ResultsUsage: Categorical variable indicating results of the resting electrocardiogram. Abnormal ECG results can signal heart disease. Range: 0 to 2 (0: normal, 1: having ST-T wave abnormality, 2: showing probable or definite left ventricular hypertrophy).",

    exang:
      "Full Form: Exercise Induced AnginaUsage: Indicates whether the patient experiences angina during exercise, coded as 1 (yes) or 0 (no). Presence of exercise-induced angina is a strong indicator of heart disease. Range: 0 or 1.",

    Slope:
      "Full Form: Slope of the Peak Exercise ST SegmentUsage: Categorical variable representing the slope of the peak exercise ST segment, which can provide insight into heart health. Range: 0 to 2 (0: upsloping, 1: flat, 2: downsloping).",

    ca: "Full Form: Number of Major Vessels Colored by Fluoroscopy Usage: Indicates the number of major vessels (0-3) that are colored by fluoroscopy. Higher values can indicate a greater risk of heart disease. Range: 0 to 3.",

    thal: "Full Form: Thalassemia Usage: Categorical variable indicating a blood disorder type. Thalassemia levels can impact heart health. Range: 1 to 3 (1: normal, 2: fixed defect, 3: reversible defect).",

    trestbps:
      "Full Form: Resting Blood PressureUsage: Indicates the resting blood pressure of the patient in mm Hg, an important measure of heart health. Range: Typically between 94 and 200 mm Hg.",

    Cholesterol:
      "Full Form: Serum Cholesterol Usage: Represents the cholesterol level in mg/dl. High cholesterol levels are a risk factor for heart disease. Range: Usually between 126 and 564 mg/dl.",

    Thalach:
      "Full Form: Maximum Heart Rate Achieved Usage: Indicates the maximum heart rate achieved during a stress test. Lower maximum heart rates can indicate a higher risk of heart problems.Range: Typically between 71 and 202 beats per minute.",

    oldpeak:
      "Full Form: ST Depression Induced by Exercise Relative to RestUsage: Represents ST segment depression in ECG measured after exercise. Higher values can indicate worse heart disease prognosis. Range: Typically ranges from 0 to 6.2.",
  };
  const { heartSwt } = SwitchMug();
  const [target, setTarget] = useState(null);
  const [isLoadingg, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/predictHeart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        setTarget(result.target);
        setLoading(false);
      }
    } catch (err) {
      setErr(err);
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto  w-full flex-col flex">
      <div className="flex flex-col justify-between lg:gap-5 ">
        <div>
          <p className="text-3xl font-bold text-slate-700 underline">
            Cardio Alert
          </p>
          {isAdmin && (
            <div className="flex gap-1 lg:gap-3 h-fit w-fit items-center ">
              <button
                type="button"
                onClick={() =>
                  setFormData({
                    Sex: "1",
                    Age: "63",
                    cp: "3",
                    trestbps: "145",
                    Cholesterol: "233",
                    fbs: "1",
                    Restecg: "0",
                    Thalach: "150",
                    exang: "0",
                    oldpeak: "2.3",
                    Slope: "0",
                    ca: "0",
                    thal: "1",
                  })
                }
                className="mt-5 bg-zinc-900 text-white sm:text-sm px-3 py-2 rounded hover:bg-slate-500 h-fit"
              >
                positive
              </button>
              <button
                type="button"
                onClick={() =>
                  setFormData({
                    Sex: "1",
                    Age: "67",
                    cp: "0",
                    trestbps: "120",
                    Cholesterol: "229",
                    fbs: "0",
                    Restecg: "0",
                    Thalach: "129",
                    exang: "1",
                    oldpeak: "2.6",
                    Slope: "1",
                    ca: "2",
                    thal: "3",
                  })
                }
                className="mt-5 bg-zinc-900 text-white px-3 py-2 rounded hover:bg-slate-500 h-fit"
              >
                negative
              </button>
              <button
                type="button"
                onClick={() => {
                  setFormData({
                    Sex: "",
                    Age: "",
                    cp: "",
                    trestbps: "",
                    Cholesterol: "",
                    fbs: "",
                    Restecg: "",
                    Thalach: "",
                    exang: "",
                    oldpeak: "",
                    Slope: "",
                    ca: "",
                    thal: "",
                  });
                  setTarget(null);
                }}
                className="mt-5 bg-zinc-900 text-white px-3 py-2 rounded hover:bg-slate-500 h-fit"
              >
                {target ? "Reset" : "Clear"}
              </button>
            </div>
          )}
        </div>

        <p className="text-slate-600 mt-3">
          <strong>CardioAlert:</strong> Your personal heart health assistant.
          Simply enter your details, and CardioAlert will analyze the
          information to provide you with tailored insights and recommendations.
          Stay informed and take control of your cardiovascular well-being with
          ease.
        </p>
        <p className="text-slate-600 mt-3 font-medium ">
          <span className="font-bold underline">
            Reports Needed for input fields:{" "}
          </span>
          Electrocardiogram (ECG) or Stress Test Report , Blood Test , Coronary
          Angiography and Imaging, Basic Health Screening Components.
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4  w-full mt-5 border-t-[1px]"
      >
        <span className="text-slate-600 text-sm">
          Click on the field names for detailed info:
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.keys(formData).map((key) => (
            <div key={key} className="flex flex-col">
              <label
                htmlFor={key}
                className="mb-2 text-sm font-medium text-gray-900"
              >
                <AlertDialogSlide
                  info={fullForms[key]}
                  buttonText={key.replace(/([A-Z])/g, " $1")}
                />
                {/* {key.replace(/([A-Z])/g, " $1")}: */}
              </label>
              {[
                "Sex",
                "cp",
                "fbs",
                "Restecg",
                "exang",
                "Slope",
                "ca",
                "thal",
              ].includes(key) ? (
                <select
                  id={key}
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:ring-0"
                  required
                >
                  {key === "Sex" && (
                    <>
                      <option value="">Select</option>
                      <option value="1">Male</option>
                      <option value="0">Female</option>
                    </>
                  )}
                  {key === "cp" && (
                    <>
                      <option value="">Select</option>
                      <option value="1">Atypical Angina</option>
                      <option value="0">Typical Angina</option>
                      <option value="2">Non-Anginal Pain</option>
                      <option value="3">Asymptomatic </option>
                    </>
                  )}
                  {key === "fbs" && (
                    <>
                      <option value="">Select</option>
                      <option value="1">Yes</option>
                      <option value="0">No</option>
                    </>
                  )}
                  {key === "Restecg" && (
                    <>
                      <option value="">Select</option>
                      <option value="1">Having SST wave</option>
                      <option value="0">Normal</option>
                    </>
                  )}
                  {key === "exang" && (
                    <>
                      <option value="">Select</option>
                      <option value="1">Yes</option>
                      <option value="0">No</option>
                    </>
                  )}
                  {key === "Slope" && (
                    <>
                      <option value="">Select</option>
                      <option value="1">Flat</option>
                      <option value="0">Up Sloping</option>
                      <option value="2">Down Sloping</option>
                    </>
                  )}
                  {key === "ca" && (
                    <>
                      <option value="">Select</option>
                      <option value="0">0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                    </>
                  )}
                  {key === "thal" && (
                    <>
                      <option value="">Select</option>
                      <option value="1">Normal</option>
                      <option value="2">Fixed Defect</option>
                      <option value="3">Reversible Defect</option>
                    </>
                  )}
                </select>
              ) : (
                <input
                  type="number"
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
        {/* {err && <div className="text-red-600">{err}</div>} */}
        {heartSwt && (
          <button
            type="submit"
            className="bg-black text-white p-2 hover:bg-slate-200 rounded w-fit"
          >
            {!target === null ? "Predict Again" : "Predict"}
          </button>
        )}
        {/* {!heartSwt && <p className="text-red-500 text-lg">Maintainence Mode</p>} */}

        <div className="mt-7">
          {isLoadingg && target === null && !err ? (
            <p>loading</p>
          ) : (
            <>
              {target !== null && !err && (
                <p className="text-slate-700 text-xl">
                  The prediction result is:{" "}
                  <strong>{target === 0 ? "Negative" : "Positive"}</strong>
                </p>
              )}
              {target !== null && !err && target === 1 && (
                <p className="text-red-600 mt-3">
                  There is a chance that you might suffer from a Heart Attack.
                </p>
              )}
              {target !== null && !err && target === 0 && (
                <p className="text-green-600 mt-3">
                  You might not suffer from a Heart Attack.
                </p>
              )}
            </>
          )}
        </div>
      </form>
      <div className="">
        {!heartSwt && (
          <p className="text-red-500 text-xl mb-[1.5rem]  flex justify-center">
            Maintainence Mode
          </p>
        )}
      </div>
      {err && <p className="text-red-500 ">{err}</p>}
    </div>
  );
}

export default Heart_atk;
