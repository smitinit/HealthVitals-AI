import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { KindeProvider } from "@kinde-oss/kinde-auth-react";
import RootLayout from "./RootLayout";
import About from "./components-org/NavComps/About";
import Blogs from "./components-org/NavComps/Blog";
import Content from "./components-org/NavComps/Content";
import Home from "./components-org/DefaultBars/Home";
import Caltrack from "./components-org/Content/Caltrack";
import CardioAlert from "./components-org/Content/CardioAlert";
import MentalWellness from "./components-org/Content/MentalWellness";
import ParkinsonsPredict from "./components-org/Content/ParkinsonsPredict";
import SymptoScan from "./components-org/Content/SymptoScan";
import SugerSense from "./components-org/Content/SugerSense";
import LoginPage from "./components-org/Auth/LoginPage";
import ProtectedLayout from "./ProtectedLayout";

import Doctors from "./components-org/NavComps/Doctorspage";
import SwitchConnectionContextProvider from "./context/dataContext";
import Admin from "./components-org/NavComps/Admin";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/blogs",
          element: <Blogs />,
        },
        {
          path: "/login",
          element: <LoginPage />,
        },

        {
          path: "/",
          element: <ProtectedLayout />,
          children: [
            {
              path: "/contents",
              element: <Content />,
              // children: [
              //   {
              //     path: "/contents/sidebar",
              //     element: <Sidebar />,
              children: [
                {
                  path: "/contents/sidebar/caltrack",
                  element: <Caltrack />,
                },
                {
                  path: "/contents/sidebar/cardio",
                  element: <CardioAlert />,
                },
                {
                  path: "/contents/sidebar/mentalwell",
                  element: <MentalWellness />,
                },
                {
                  path: "/contents/sidebar/parkinsons",
                  element: <ParkinsonsPredict />,
                },
                {
                  path: "/contents/sidebar/suger",
                  element: <SugerSense />,
                },
                {
                  path: "/contents/sidebar/symptoms",
                  element: <SymptoScan />,
                },
                //   ],
                // },
              ],
            },
            {
              path: "/doctors",
              element: <Doctors />,
            },
            {
              path: "/admin",
              element: <Admin />,
            },
          ],
        },
      ],
    },
  ]);
  return (
    <>
      <KindeProvider
        clientId="128755399bb0419ca06db15380ba5e97"
        domain="https://healthvitalswithai.kinde.com"
        redirectUri="http://localhost:5173"
        logoutUri="http://localhost:5173"
      >
        <SwitchConnectionContextProvider>
          <RouterProvider router={router} />
        </SwitchConnectionContextProvider>
      </KindeProvider>
    </>
  );
};

export default App;
