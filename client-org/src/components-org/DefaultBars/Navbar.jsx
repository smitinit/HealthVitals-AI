import React from "react";
import { NavLink } from "react-router-dom";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import logo from "../../assets/Images/logo.png";
import { Dropdown } from "flowbite-react";

const Navbar = () => {
  const { login, logout, isAuthenticated, isLoading, getPermission, user } =
    useKindeAuth();
  let isAdmin = null;
  if (!isLoading) {
    isAdmin = getPermission("admin-watch").isGranted;
  }
  return (
    <div className="w-full flex lg:flex-row sticky top-0 z-50 border-b-[2px] min-h-fit  bg-white  border-gray-300 m-0 lg:p-4 p-1 items-center">
      <a href="/" className="flex items-center gap-2 w-full">
        <img src={logo} alt="logo" className="w-10 " />{" "}
        <p className="text-3xl">HealthVitals-AI</p>
      </a>
      <div className="w-full items- center lg:flex hidden lg:flex-row flex-col gap-0 lg:gap-4 lg:justify-end  justify-center items-center">
        <div>
          <NavLink to="/blogs">Blogs</NavLink>
        </div>
        {isAdmin && (
          <div>
            <NavLink to="/admin">Admin</NavLink>
          </div>
        )}

        <div>
          <Dropdown
            label={isAuthenticated ? user?.given_name : "Menu"}
            size={"sm"}
          >
            <Dropdown.Header>
              {isAuthenticated ? user?.email : " Login to get started"}
            </Dropdown.Header>

            <Dropdown.Divider />

            {!isLoading && isAuthenticated ? (
              <button onClick={() => logout()} className="w-full">
                <Dropdown.Item>Logout</Dropdown.Item>
              </button>
            ) : (
              <button onClick={() => login()} className="w-full">
                <Dropdown.Item>Login</Dropdown.Item>
              </button>
            )}
          </Dropdown>
        </div>
      </div>
      <div className="block lg:hidden">
        <Dropdown
          label={isAuthenticated ? user?.given_name : "Menu"}
          dismissOnClick={true}
        >
          {isAuthenticated ? (
            <Dropdown.Header>
              <span className="block text-sm">
                {user?.given_name + " " + user?.family_name}
              </span>
              <span className="block truncate text-sm font-medium">
                {user?.email}
              </span>
            </Dropdown.Header>
          ) : (
            <Dropdown.Header>
              <span className="block text-sm">Login to get started</span>
            </Dropdown.Header>
          )}
          <NavLink to="/">
            <Dropdown.Item>Home</Dropdown.Item>
          </NavLink>
          <NavLink to="/blogs">
            <Dropdown.Item>Blogs</Dropdown.Item>
          </NavLink>
          {isAuthenticated && (
            <NavLink to="/doctors">
              <Dropdown.Item>Doctors</Dropdown.Item>
            </NavLink>
          )}
          {isAdmin && (
            <NavLink to="/admin">
              <Dropdown.Item>Admin</Dropdown.Item>
            </NavLink>
          )}
          <Dropdown.Divider />
          {!isLoading && isAuthenticated ? (
            <button onClick={() => logout()} className="w-full">
              <Dropdown.Item>Logout</Dropdown.Item>
            </button>
          ) : (
            <button onClick={() => login()} className="w-full">
              <Dropdown.Item>Login</Dropdown.Item>
            </button>
          )}
        </Dropdown>
      </div>
    </div>
  );
};

export default Navbar;
