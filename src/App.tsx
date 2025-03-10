import { BrowserRouter, Route, Routes } from "react-router-dom";

import DefaultLayout from "./layouts/DefaultLayout";

import VMCreate from "./pages/VMCreate";
import VMManage from "./pages/VMManage";
import SignUpDefault from "./pages/auth/signUp/SignUpDefault";
import SignIn from "./pages/auth/SignIn";

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

            <Route path="signin" element={<SignIn />} />
            <Route path="signup" element={<SignUpDefault />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
