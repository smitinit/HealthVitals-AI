import React from "react";
import { SwitchMug } from "../../context/dataContext";

const Admin = () => {
  const {
    calorySwt,
    setCalorySwt,
    mealSwt,
    setMealSwt,
    heartSwt,
    setHeartSwt,
    diabetesSwt,
    setDiabetesSwt,
    parkinsonsSwt,
    setParkinsonsSwt,
    mentalSwt,
    setMentalSwt,
  } = SwitchMug();

  const handleToggle = (switchName, currentState, setState) => {
    const newValue = !currentState;
    setState(newValue);

    fetch("http://localhost:5000/updateSwitchState", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ switch: switchName, value: newValue }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.success) {
          console.error("Failed to update switch state on server");
        }
      })
      .catch((error) => console.error("Error updating switch state:", error));
  };

  return (
    <div className="flex flex-row gap-6 p-5 m-2 border-[1px] w-fit text-xl">
      <div className="flex flex-col gap-4 h-full border-r-[1px] p-2">
        <label className="inline-flex items-center cursor-pointer gap-3">
          <span className="ms-3 text-xl font-medium text-gray-900 w-[10rem]">
            Caltrack 360
          </span>
          <input
            type="checkbox"
            checked={calorySwt}
            onChange={() => handleToggle("calorySwt", calorySwt, setCalorySwt)}
            className="sr-only peer"
          />
          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none  rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-blue-600"></div>
        </label>
        <label className="inline-flex items-center cursor-pointer gap-3">
          <span className="ms-3 text-xl font-medium text-gray-900 w-[10rem]">
            SymptoScan
          </span>
          <input
            type="checkbox"
            checked={mealSwt}
            onChange={() => handleToggle("mealSwt", mealSwt, setMealSwt)}
            className="sr-only peer"
          />
          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none  rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-blue-600"></div>
        </label>
        <label className="inline-flex items-center cursor-pointer gap-3">
          <span className="ms-3 text-xl font-medium text-gray-900 w-[10rem]">
            CardioAlert
          </span>
          <input
            type="checkbox"
            checked={heartSwt}
            onChange={() => handleToggle("heartSwt", heartSwt, setHeartSwt)}
            className="sr-only peer"
          />
          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none  rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-blue-600"></div>
        </label>
        <label className="inline-flex items-center cursor-pointer gap-3">
          <span className="ms-3 text-xl font-medium text-gray-900 w-[10rem]">
            Sugersense
          </span>
          <input
            type="checkbox"
            checked={diabetesSwt}
            onChange={() =>
              handleToggle("diabetesSwt", diabetesSwt, setDiabetesSwt)
            }
            className="sr-only peer"
          />
          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none  rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-blue-600"></div>
        </label>
        <label className="inline-flex items-center cursor-pointer gap-3">
          <span className="ms-3 text-xl font-medium text-gray-900 w-[10rem]">
            Parkinson Predict
          </span>
          <input
            type="checkbox"
            checked={parkinsonsSwt}
            onChange={() =>
              handleToggle("parkinsonsSwt", parkinsonsSwt, setParkinsonsSwt)
            }
            className="sr-only peer"
          />
          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none  rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-blue-600"></div>
        </label>
        <label className="inline-flex items-center cursor-pointer gap-3">
          <span className="ms-3 text-xl font-medium text-gray-900 w-[10rem]">
            Mental Health
          </span>
          <input
            type="checkbox"
            checked={mentalSwt}
            onChange={() => handleToggle("mentalSwt", mentalSwt, setMentalSwt)}
            className="sr-only peer"
          />
          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none  rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-blue-600"></div>
        </label>
      </div>

      <div className=" flex-col gap-4 p-2 hidden lg:flex">
        <p>Connection to Caltrack 360 is {calorySwt ? "On" : "Off"}</p>
        <p>Connection to SymptoScan is {mealSwt ? "On" : "Off"}</p>
        <p>Connection to CardioAlert is {heartSwt ? "On" : "Off"}</p>
        <p>Connection to Sugersense is {diabetesSwt ? "On" : "Off"}</p>
        <p>Connection to Parkinson Predict is {parkinsonsSwt ? "On" : "Off"}</p>
        <p>Connection to Mental Health is {mentalSwt ? "On" : "Off"}</p>
      </div>
    </div>
  );
};

export default Admin;
