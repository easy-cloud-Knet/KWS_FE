import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AuthProvider } from "@/contexts/AuthContext.tsx";
import DefaultLayout from "@/layouts/DefaultLayout";
import DefaultLayoutV2 from "@/layouts/DefaultLayoutV2.tsx";
import FindPw from "@/pages/auth/FindPw";
import ResetPw from "@/pages/auth/ResetPw";
import ResetPwSuccess from "@/pages/auth/ResetPwSuccess";
import SignIn from "@/pages/auth/SignIn";
import SignUpDefault from "@/pages/auth/signUp/SignUpDefault";
import SignUpSuccess from "@/pages/auth/signUp/SignUpSuccess.tsx";
import Invitation from "@/pages/Invitation.tsx";
import Landing from "@/pages/Landing";
import VMCreate from "@/pages/VMCreate";
import VMManage from "@/pages/VMManage";

import "@/styles/colors.css";
import "@/styles/text.css";
import "@/styles/utilities.css";
import "@fontsource/pretendard/400.css"; // Regular (400)
import "@fontsource/pretendard/600.css"; // Semi-bold (600)

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<DefaultLayout />}>
              <Route index element={<VMManage />} />
              <Route path="create" element={<VMCreate />} />

              <Route path="signin" element={<SignIn />} />
              <Route path="signup" element={<SignUpDefault />} />
              <Route path="signup/success" element={<SignUpSuccess />} />
              <Route path="findpw" element={<FindPw />} />
              <Route path="resetpw" element={<ResetPw />} />
              <Route path="resetpw/success" element={<ResetPwSuccess />} />

              <Route path="/invitation" element={<Invitation />} />
            </Route>
            <Route path="/landing" element={<DefaultLayoutV2 />}>
              <Route index element={<Landing />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
