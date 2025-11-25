import { Outlet } from "react-router-dom";

import NavBar from "../components/navbar/NavBar";

const DefaultLayoutV2 = () => {
  return (
    <main className="w-screen min-h-screen mx-auto">
      <NavBar />
      <Outlet />
    </main>
  );
};

export default DefaultLayoutV2;
