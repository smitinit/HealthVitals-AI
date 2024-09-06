import React from "react";
import { doctorsPageData } from "../../Data/doctorsPageData";
import defaultImage from "../../assets/Images/defaultnoimages.webp";
const Doctors = () => {
  const AllDoctors = doctorsPageData;
  return (
    <div className="w-full h-[calc(100vh-120px)] overflow-y-scroll">
      {AllDoctors.map((doctor, i) => (
        <div className="flex flex-col items-center w-full  mt-6" key={i}>
          <div className="lg:w-[80%] w-[95%]  bg-slate-50 flex flex-col lg:flex-row items-center p-6 shadow-lg rounded-lg">
            <img
              src={defaultImage}
              alt=""
              className="h-[10rem] border w-[10rem] bg-slate-500 rounded-md"
            />
            <div className="lg:w-[40%] w-full mx-9 flex flex-col gap-6 items-center lg:items-start">
              <span className="flex flex-col gap-2  items-center lg:items-start">
                <strong className="text-3xl">{doctor.name}</strong>
                <p>{doctor.specialization}</p>
              </span>
              <span>
                <p>Language known:</p>
                <p>{doctor.language}</p>
              </span>
              <span>
                <p className="text-green-700">
                  {doctor.patients} patients consulted
                </p>
              </span>
            </div>
            <div className="lg:w-[20%] w-full flex flex-col justify-around gap-2 ">
              <span className="flex flex-row lg:flex-col gap-2 w-full items-center justify-center">
                <small>Consultation Fee</small>
                <span className="text-3xl flex flex-row lg:flex-col lg:gap-0 gap-3 ">
                  {doctor.fees}{" "}
                  <span className="text-red-500 text-sm flex justify-end">
                    <del>₹ 1000</del>
                  </span>
                </span>
              </span>
              <span className="flex flex-col w-full gap-3 items-center ">
                <button className="w-fit lg:w-full rounded-full bg-red-400 p-4 lg:p-1">
                  View Profile
                </button>
                <button className="w-fit lg:w-full rounded-full bg-green-400 p-4 lg:p-1">
                  Book an Appointment
                </button>
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Doctors;
