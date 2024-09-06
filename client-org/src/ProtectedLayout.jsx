import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { Outlet } from "react-router-dom";
import LoginPage from "./components-org/Auth/LoginPage";
export default function ProtectedLayout() {
  const { isLoading, isAuthenticated, login, register } = useKindeAuth();

  if (isLoading) {
    return <div className="flex w-full justify-center">loading...</div>;
  }

  if (!isLoading && !isAuthenticated) {
    return <LoginPage />;
  }

  if (!isLoading && isAuthenticated) {
    return <Outlet />;
  }
}
