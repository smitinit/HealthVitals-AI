import React from "react";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import img_1 from "../../assets/Images/slider.jpg";
const LoginPage = () => {
  const { login, register } = useKindeAuth();
  return (
    <div className="w-full h-[calc(100vh-112px)] relative">
      <img
        src={img_1}
        alt="image"
        className="w-[100%] bg-transparent shadow-2xl h-[100%] top-0  -z-10 object-fill opacity-85 absolute"
      />
      <div className="flex flex-col w-[50%] justify-center h-full ml-[5%] gap-10">
        <p className="flex text-5xl text-slate-700 font-thin line">
          Keep better. Live better.
        </p>

        <p className="text-xl w-[80%] text-slate-600 font-light">
          Your Personalized Healthcare Companion. Login to access your health
          insights, personalized plans, and expert guidance.
        </p>
        <span className="text-2xl flex flex-row items-center gap-3">
          <button
            onClick={() => login()}
            className="bg-blue-500 text-white  rounded-full px-11 py-2 hover:opacity-55"
          >
            Login
          </button>

          <button
            onClick={() => register()}
            className=" bg-gray-400 text-white  rounded-full px-11 py-2 hover:opacity-55"
          >
            Register
          </button>
        </span>
      </div>
    </div>
  );
};

export default LoginPage;
