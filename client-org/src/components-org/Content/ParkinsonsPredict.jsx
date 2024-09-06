import React, { useState } from "react";
import { SwitchMug } from "../../context/dataContext";
import AlertDialogSlide from "../Dialogg";
function ParkinsonsPredict() {
  const { parkinsonsSwt } = SwitchMug();
  const [formData, setFormData] = useState({
    "MDVP:Fo(Hz)": "",
    "MDVP:Fhi(Hz)": "",
    "MDVP:Flo(Hz)": "",
    "MDVP:Jitter(%)": "",
    "MDVP:Jitter(Abs)": "",
    "MDVP:RAP": "",
    "MDVP:PPQ": "",
    "Jitter:DDP": "",
    "MDVP:Shimmer(dB)": "",
    "Shimmer:APQ5": "",
    NHR: "",
    HNR: "",
    RPDE: "",
    DFA: "",
  });

  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setStatus("");
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/predictParkinson", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setLoading(true);
        const result = await response.json();

        const prediction = result.status;
        setStatus(prediction);
        setTimeout(() => {
          setLoading(false);
        }, 2000);

        if (prediction === 1) {
          setMessage(
            "You are unhealthy as you are affected by Parkinson's Disease."
          );
        } else {
          setMessage(
            "You are healthy and not affected by Parkinson's Disease."
          );
        }
      } else {
        console.error("Prediction failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fullForms = {
    "MDVP:Fo(Hz)": "Fundamental Frequency",
    "MDVP:Fhi(Hz)": "Highest Fundamental Frequency",
    "MDVP:Flo(Hz)": "Lowest Fundamental Frequency",
    "MDVP:Jitter(%)": "Jitter",
    "MDVP:Jitter(Abs)": "Jitter Absolute",
    "MDVP:RAP": "RAP",
    "MDVP:PPQ": "PPQ",
    "Jitter:DDP": "Jitter:DDP",
    "MDVP:Shimmer(dB)": "Shimmer:DB",
    "Shimmer:APQ5": "Shimmer:APQ5",
    NHR: "NHR",
    HNR: "HNR",
    RPDE: "RPDE",
    DFA: "DFA",
  };

  const descriptions = {
    "MDVP:Fo(Hz)":
      "Measures the average pitch of the voice, also known as the base frequency of vocal fold vibrations.Range: Commonly between 75 Hz and 200 Hz in humans, depending on gender and age.",
    "MDVP:Fhi(Hz)":
      "The highest frequency of the voice during the recording session.Range: Typically between 100 Hz and 300 Hz, depending on individual voice range.",
    "MDVP:Flo(Hz)":
      "The lowest fundamental frequency during the vocal recording.Range: Commonly between 50 Hz and 150 Hz.",
    "MDVP:Jitter(%)":
      "Represents the variation in frequency from one vocal cycle to the next. High jitter indicates irregular voice frequency.Range: Typically below 1% for healthy voices.",
    "MDVP:Jitter(Abs)":
      "Measures the absolute mean difference between consecutive periods of the vocal frequency.Range: Often below 0.001 seconds in healthy individuals.",
    "MDVP:RAP":
      "Measures the rate of amplitude change between consecutive periods of the vocal frequency.Range: Typically below 0.01 seconds in healthy individuals.",
    "MDVP:PPQ":
      "Measures the variation in amplitude from one vocal cycle to the next. High PPQ indicates irregular voice amplitude.Range: Typically below 0.02 seconds in healthy individuals.",
    "Jitter:DDP":
      "Measures the variation in amplitude from one vocal cycle to the next. High DDP indicates irregular voice amplitude.Range: Typically below 0.02 seconds in healthy individuals.",
    "MDVP:Shimmer(dB)":
      "Measures the percentage of vocal fold vibration present in the vocal frequency. Range: Typically below 0.5 seconds in healthy individuals.",
    "Shimmer:APQ5":
      "Measures the percentage of vocal fold vibration present in the vocal frequency. Range: Typically below 0.5 seconds in healthy individuals.",
    NHR: "Measures the ratio of the number of harmonics present in the vocal frequency to the total number of harmonics. Range: Typically below 0.5 seconds in healthy individuals.",
    HNR: "Measures the ratio of the number of harmonics present in the vocal frequency to the total number of harmonics. Range: Typically below 0.5 seconds in healthy individuals.",
    RPDE: "Measures the rate of amplitude change between consecutive periods of the vocal frequency. Range: Typically below 0.01 seconds in healthy individuals.",
    DFA: "Measures the self-similarity in vocal signals, capturing the long-term correlation. Range: 0.5 to 1.5, with values near 1 indicating fractal-like behavior invocalpatterns.",
  };

  return (
    <div div className="flex flex-col gap-10 w-full">
      <div className=" flex flex-col gap-10 p-5 w-full">
        <div className=" flex justify-between">
          <span className="text-3xl">
            <strong>Parkinson's Disease Prediction</strong>
          </span>
          <div className="flex gap-5">
            <button
              onClick={() =>
                setFormData({
                  "MDVP:Fo(Hz)": "119.992",
                  "MDVP:Fhi(Hz)": "157.302",
                  "MDVP:Flo(Hz)": "74.997",
                  "MDVP:Jitter(%)": "0.00784",
                  "MDVP:Jitter(Abs)": "0.00007",
                  "MDVP:RAP": "0.00370",
                  "MDVP:PPQ": "0.00554",
                  "Jitter:DDP": "0.01109",
                  "MDVP:Shimmer(dB)": "0.426",
                  "Shimmer:APQ5": "0.03130",
                  NHR: "0.02211",
                  HNR: "21.033",
                  RPDE: "0.414783",
                  DFA: "0.815285",
                })
              }
              className="bg-black text-white p-2 hover:bg-slate-200 rounded"
            >
              Load for positive
            </button>
            <button
              onClick={() =>
                setFormData({
                  "MDVP:Fo(Hz)": "197.076",
                  "MDVP:Fhi(Hz)": "206.896",
                  "MDVP:Flo(Hz)": "192.055",
                  "MDVP:Jitter(%)": "0.00289",
                  "MDVP:Jitter(Abs)": "0.00001",
                  "MDVP:RAP": "0.00166",
                  "MDVP:PPQ": "0.00168",
                  "Jitter:DDP": "0.00498",
                  "MDVP:Shimmer(dB)": "0.097",
                  "Shimmer:APQ5": "0.0068",
                  NHR: "0.00339",
                  HNR: "26.775",
                  RPDE: "0.422229",
                  DFA: "0.741367",
                })
              }
              className="bg-black text-white p-2 hover:bg-slate-200 rounded"
            >
              Load for negative
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
                  <AlertDialogSlide
                    buttonText={key}
                    info={fullForms[key]}
                    content={descriptions[key]}
                  />
                  {/* {key.replace(/([A-Z])/g, " $1")}: */}
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
          {parkinsonsSwt && (
            <div className="flex gap-3 w-full items-center">
              {!loading && (
                <button
                  type="submit"
                  className="bg-black text-white p-2 hover:bg-slate-200 rounded"
                >
                  {message ? "Predict Again" : "Predict"}
                </button>
              )}
            </div>
          )}
        </form>
        {!parkinsonsSwt && (
          <p className="text-red-500 text-lg">Maintainence Mode</p>
        )}

        {loading ? (
          <div className="">Loading..</div>
        ) : (
          message && (
            <div className="font-semibold">
              <p>{message}</p>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default ParkinsonsPredict;
