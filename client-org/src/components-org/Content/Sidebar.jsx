import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <>
      <div className="flex flex-col min-h-[10%] sm:h-[30% ] lg:h-full bg-slate-300  p-5 gap-5 overflow-y-auto w-full lg:w-[20%]  ">
        <NavLink to="/contents/sidebar/caltrack">Caltrack 360</NavLink>
        <NavLink to="/contents/sidebar/cardio">CardioAlert</NavLink>
        <NavLink to="/contents/sidebar/mentalwell">
          Mental Wellness Gauge
        </NavLink>
        <NavLink to="/contents/sidebar/parkinsons">Parkinsons Predict</NavLink>
        <NavLink to="/contents/sidebar/suger">SugerSense</NavLink>
        <NavLink to="/contents/sidebar/symptoms">SymptoScan</NavLink>
      </div>
    </>
  );
};

export default Sidebar;
