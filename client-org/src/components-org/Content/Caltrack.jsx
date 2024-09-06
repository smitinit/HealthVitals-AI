import React, { useState } from "react";
// import Loading from "../Utils/Loading";

import { SwitchMug } from "../../context/dataContext";

function Caltrack() {
  const [userInput, setUserInput] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { calorySwt } = SwitchMug();
  let storedCredit = parseInt(localStorage.getItem("credit")) === 0 ? 0 : 3;
  const [credit, setCredit] = useState(storedCredit);

  const [openQuickMeasures, setOpenQuickMeasures] = useState(false);
  const [BMR, setBMR] = useState({
    age: 0,
    height: 0,
    weight: 0,
    gender: "",
    BMRVal: 0,
  });
  function handleChange(e) {
    setBMR({
      ...BMR,
      [e.target.name]: e.target.value,
    });
  }

  function calculateBMR(e) {
    e.preventDefault();

    if (BMR.gender === "male") {
      setBMR({
        ...BMR,
        BMRVal:
          88.362 + 13.397 * BMR.weight + 4.799 * BMR.height - 5.677 * BMR.age,
      });
    } else if (BMR.gender === "female") {
      setBMR({
        ...BMR,
        BMRVal:
          447.593 + 9.247 * BMR.weight + 3.098 * BMR.height - 4.33 * BMR.age,
      });
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreviewUrl(URL.createObjectURL(file));
      setResponse("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCredit((prev) => {
      if (prev === 0) {
        return 0;
      }
      return prev - 1;
    });
    if (credit === 0) {
      return alert(
        "Sorry, you have reached your credit limit. Please try again later."
      );
    }
    localStorage.setItem("credit", credit - 1);
    const formData = new FormData();
    formData.append("user_input", userInput);
    formData.append("image_file", imageFile);

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/nutritions", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setLoading(false);

      if (data.status === "success") {
        setResponse(data.response);
      } else {
        setResponse(data.message);
        console.log(response);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex w-full flex-col  gap-7">
      <div className="flex flex-col lg:flex-row border-b border-b-slate-400 ">
        <div className="lg:w-[45rem] w-full p-4 mb-3 text-xl text-gray-950 ">
          To use our<strong> Calorie Analysis & Counter</strong>, simply upload
          a clear image of your meal. Our advanced image recognition technology
          will analyze the food items and provide an estimated calorie count.
          <br /> <br />
          <span className="text-gray-500 text-lg underline">
            For best results, ensure the image is well-lit and focuses on the
            food. And approximation of 100gm per item, is used by model.
            <br />
            <div>
              Lets Quickly check your minimun Calory requirement:{" "}
              <button
                onClick={() => setOpenQuickMeasures(!openQuickMeasures)}
                className="px-4 py-1 rounded-lg hover:bg-red-100 text-black bg-red-300  h-fit w-fit"
              >
                Click here
              </button>
            </div>
          </span>
          <span>Your Credits Left: {credit}</span>
          {/* <AlertDialogSlide /> */}
        </div>
        {openQuickMeasures && (
          <div className="flex flex-col  h-[25rem] w-[25rem] lg:top-1/3 lg:right-1/3 top-1/2 bg-slate-400 z-10 absolute  p-2 justify-between rounded-xl shadow-2xl">
            <div className="flex flex-col gap-3">
              <div className="flex justify-between">
                <p className="text-slate-100">
                  Please Enter the following details:
                </p>
                <span
                  onClick={() => {
                    setBMR({
                      age: 0,
                      height: 0,
                      weight: 0,
                      gender: "",
                      BMRVal: 0,
                    });
                  }}
                  className="cursor-pointer"
                >
                  clear
                </span>
              </div>
              <form onSubmit={calculateBMR} className="flex flex-col">
                <select
                  required
                  name="gender"
                  value={BMR.gender}
                  onChange={handleChange}
                  className="rounded-md mt-[0.10rem]"
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                <input
                  name="age"
                  type="number"
                  placeholder="Age"
                  value={BMR.age === 0 ? "" : BMR.age}
                  onChange={handleChange}
                  className="rounded-md mt-[0.10rem]"
                  required
                />
                <input
                  name="height"
                  type="number"
                  value={BMR.height === 0 ? "" : BMR.height}
                  placeholder="Height(cm)"
                  onChange={handleChange}
                  className="rounded-md mt-[0.10rem]"
                  required
                />
                <input
                  name="weight"
                  type="number"
                  value={BMR.weight === 0 ? "" : BMR.weight}
                  placeholder="Weight(kg)"
                  onChange={handleChange}
                  required
                  className="rounded-md mt-[0.10rem]"
                />
                <button
                  type="submit"
                  className="flex flex-start mt-2 bg-slate-200 items-center justify-center px-3 py-2 rounded hover:bg-slate-500"
                >
                  Calculate
                </button>
              </form>
            </div>
            <div>
              <span>
                Amount of Calories required in a day is :{" "}
                <strong className="text-slate-50">
                  {BMR.BMRVal === 0 ? "" : parseInt(BMR.BMRVal)}
                </strong>
              </span>
            </div>
            <span className="flex justify-end">
              <button
                className=" mt-2 bg-slate-200 w-fit px-3 py-2 rounded hover:bg-slate-500"
                onClick={() => {
                  setOpenQuickMeasures(false);
                  setBMR({});
                }}
              >
                {BMR.BMRVal ? "continue " : "Close"}
              </button>
            </span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex w-full flex-col">
          <div className="flex flex-col gap-4 w-full justify-center items-center">
            <div className="flex gap-6 items-center justify-center lg:w-[25rem] w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-[17rem] border-[1px] border-gray-400  rounded-lg cursor-pointer bg-gray-100 hover:bg-gray-200 "
              >
                <div className="flex flex-col items-center justify-center w-full">
                  {imagePreviewUrl ? (
                    <div>
                      <h3 className="text-slate-700 p-2">Image Preview:</h3>
                      <img
                        src={imagePreviewUrl}
                        alt="Selected"
                        className=" h-[12rem] w-[14rem]  rounded-lg shadow-xl"
                      />
                      <p className="p-1 ">
                        <small className="text-slate-400">
                          Click anywhere to upload a new image
                        </small>
                      </p>
                    </div>
                  ) : (
                    <>
                      <svg
                        className="w-8 h-8 mb-4 text-gray-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 ">
                        <span className="font-semibold">Click to upload</span>{" "}
                      </p>
                      <p className="text-xs text-gray-500 ">
                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                      </p>
                    </>
                  )}
                  <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    onChange={handleImageChange}
                    accept="image/*"
                  />
                </div>
              </label>
            </div>
            {calorySwt && imagePreviewUrl && !response && (
              <button
                type="submit"
                className="text-white  end-2.5 bottom-2.5 hover:bg-gray-700 bg-gray-800 focus:outline-none  font-medium rounded-lg text-sm px-4 py-2 "
              >
                Get Analysis
              </button>
            )}

            {!calorySwt && (
              <p className="text-red-500 text-lg">Maintainence Mode</p>
            )}
          </div>
          <br />
        </form>
      </div>

      <div>
        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

        {loading && !error ? (
          // <Loading child="Generating..." />
          <div className="flex w-full justify-center">loading...</div>
        ) : (
          response && (
            <div className="bg-gray-200 text-black  w-full rounded-md p-4">
              <div className="flex flex-row w-full justify-between">
                <h1 className="text-2xl pb-4">
                  <strong>Calory Analysis:</strong>
                </h1>

                <button
                  onClick={handleSubmit}
                  className=" hover:text-red-500 text-slate-950 p-1 rounded-xl"
                >
                  <h1 className="text-sm">Regenerate..</h1>
                </button>
              </div>
              {response.length > 0 && (
                <ul>
                  {response.map((point, index) => (
                    <>
                      {index == response.length - 1 ? (
                        <li key={index}>
                          <strong>{point}</strong>
                        </li>
                      ) : (
                        <li key={index}>{point}</li>
                      )}
                      {index % 2 !== 0 && <br />}
                    </>
                  ))}
                </ul>
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default Caltrack;
