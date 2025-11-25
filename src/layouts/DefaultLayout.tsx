import { useContext } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";

import NavBar from "@/components/navbar/NavBar";
import AuthContext from "@/contexts/AuthContext.tsx";

import "./DefaultLayout.css";

const DefaultLayout: React.FC = () => {
  const auth = useContext(AuthContext);
  const location = useLocation();

  if (!auth?.isAuthenticated) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return (
    <>
      <NavBar />
      <div className="__default-layout__">
        <Outlet />
      </div>
    </>
  );
};

export default DefaultLayout;
