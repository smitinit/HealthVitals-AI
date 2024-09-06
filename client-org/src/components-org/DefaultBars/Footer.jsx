import React from "react";

const Footer = () => {
  return (
    <div className="w-full flex lg:flex-row flex-col absolute  bottom-0 items-center z-50 border-t-[1px] border-gray-300  h-fit bg-white p-4 lg:p-0 ">
      <div className="ml-4 w-full ">
        <span className="text-sm text-gray-600">
          ©2024{" "}
          <a href="/">
            <em className="hover:underline">HealthVitals™.</em> All Rights
            Reserved.
          </a>
        </span>
      </div>
      <div className="w-full flex flex-row lg:justify-end justify-between  lg:gap-4   lg:mt-0 lg:p-4 bg-white">
        <div>About</div>
        <div>Privacy Policy </div>
        <div>Licensing</div>
        <div>Contact</div>
      </div>
    </div>
  );
};

export default Footer;
