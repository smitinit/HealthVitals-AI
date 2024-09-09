import React from "react";

const Footer = () => {
  return (
    <div className="w-full flex lg:flex-row flex-col items-center z-50 border-t-[2px] border-gray-300  h-fit bg-white p-1 lg:p-0 -mt-4 lg:gap-0 gap-1">
      <div className="ml-4 w-full flex justify-center">
        <span className="text-sm text-gray-600 lg:border-none border-b-[1px] font-medium">
          ©2024{" "}
          <a href="/">
            <em className="hover:underline">HealthVitals™.</em> All Rights
            Reserved.
          </a>
        </span>
      </div>
      <div className="w-full flex flex-row lg:justify-end justify-around  lg:gap-4 lg:p-4 bg-white">
        <div>About</div>
        <div>Privacy Policy </div>
        <div>Licensing</div>
        <div>Contact</div>
      </div>
    </div>
  );
};

export default Footer;
