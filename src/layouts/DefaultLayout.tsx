import { Outlet } from "react-router-dom";

import NavBar from "../components/NavBar";

import "./DefaultLayout.css";

const DefaultLayout: React.FC = () => {
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
