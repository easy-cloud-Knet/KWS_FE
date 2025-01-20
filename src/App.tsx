import { BrowserRouter, Route, Routes } from "react-router-dom";

import DefaultLayout from "./layouts/DefaultLayout";

import VMCreate from "./pages/VMCreate";
import VMManage from "./pages/VMManage";

import "./App.css";
import "./styles/colors.css";
import "./styles/text.css";
import "./styles/utilities.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DefaultLayout />}>
            <Route index element={<VMManage />} />
            <Route path="create" element={<VMCreate />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
