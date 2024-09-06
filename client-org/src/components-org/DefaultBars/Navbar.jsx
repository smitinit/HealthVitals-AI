import React from "react";
import { NavLink } from "react-router-dom";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import logo from "../../assets/Images/logo.png";
const Navbar = () => {
  const { login, logout, isAuthenticated, isLoading, getPermission, user } =
    useKindeAuth();
  let isAdmin = null;
  if (!isLoading) {
    isAdmin = getPermission("admin-watch").isGranted;
  }
  return (
    <div className="w-full flex lg:flex-row sticky top-0 z-50 border-b-[1px] min-h-fit  bg-white  border-gray-300 m-0 lg:p-4 p-1 items-center">
      <a href="/" className="flex items-center gap-2 w-full">
        <img src={logo} alt="logo" className="w-10" /> <p>HealthVitals-AI</p>
      </a>
      <div className="w-full items-center flex lg:flex-row flex-col gap-0 lg:gap-4 lg:justify-end  justify-center">
        <div>
          <NavLink to="/blogs">Blogs</NavLink>
        </div>
        {isAdmin && (
          <div>
            <NavLink to="/admin">Admin</NavLink>
          </div>
        )}
        {isAuthenticated && (
          <div className="bg-slate-200 text-black hover:bg-slate-300 rounded-full px-5 py-1 ">
            {user.given_name}
          </div>
        )}
        <div className="flex justify-center">
          {!isLoading && isAuthenticated ? (
            <button
              onClick={() => logout()}
              className="bg-slate-400 text-white  rounded-full px-5 py-1 hover:opacity-55"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => login()}
              className="bg-blue-500 text-white  rounded-full px-5 py-1 hover:opacity-55"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
