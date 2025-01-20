import { Outlet } from "react-router-dom";

import "./DefaultLayout.css";

const DefaultLayout: React.FC = () => {
  return (
    <div className="__default-layout__">
      <Outlet />
    </div>
  );
};

export default DefaultLayout;
