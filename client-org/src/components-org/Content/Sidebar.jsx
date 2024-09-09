import React from "react";
import { NavLink } from "react-router-dom";
import { Dropdown } from "flowbite-react";
const Sidebar = () => {
  return (
    <>
      <div className="lg:flex hidden  flex-col min-h-[10%] sm:h-[30% ] lg:h-full bg-slate-300  p-5 gap-5 overflow-y-auto w-full lg:w-[20%]  ">
        <NavLink to="/contents/sidebar/caltrack">Caltrack 360</NavLink>
        <NavLink to="/contents/sidebar/cardio">CardioAlert</NavLink>
        <NavLink to="/contents/sidebar/mentalwell">
          Mental Wellness Gauge
        </NavLink>
        <NavLink to="/contents/sidebar/parkinsons">Parkinsons Predict</NavLink>
        <NavLink to="/contents/sidebar/suger">SugerSense</NavLink>
        <NavLink to="/contents/sidebar/symptoms">SymptoScan</NavLink>
      </div>
      <div className="lg:hidden flex justify-center mt-4 bg-[rgb(21,94,117)]">
        <Dropdown label="All Models" className="w-[60%] focus:ring-0">
          <Dropdown.Header>
            <span className="block text-sm">Start using our models</span>
          </Dropdown.Header>
          <NavLink to="/contents/sidebar/caltrack">
            <Dropdown.Item>Caltrack 360</Dropdown.Item>
          </NavLink>
          <NavLink to="/contents/sidebar/cardio">
            <Dropdown.Item>CardioAlert</Dropdown.Item>
          </NavLink>
          <NavLink to="/contents/sidebar/mentalwell">
            <Dropdown.Item>Mental Wellness Gauge</Dropdown.Item>
          </NavLink>
          <NavLink to="/contents/sidebar/parkinsons">
            <Dropdown.Item>Parkinsons Predict</Dropdown.Item>
          </NavLink>
          <NavLink to="/contents/sidebar/suger">
            <Dropdown.Item>SugerSense</Dropdown.Item>
          </NavLink>
          <NavLink to="/contents/sidebar/symptoms">
            <Dropdown.Item>SymptoScan</Dropdown.Item>
          </NavLink>
        </Dropdown>
      </div>
    </>
  );
};

export default Sidebar;
