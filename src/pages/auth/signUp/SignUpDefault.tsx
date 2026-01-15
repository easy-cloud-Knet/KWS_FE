import { useState } from "react";

import Selector from "../../../components/auth/Selector";
import { UserInfo } from "../../../types/auth";

import SignUp1 from "./SignUp1";
import SignUp2 from "./SignUp2";
import SignUp3 from "./SignUp3";
import SignUp4 from "./SignUpSuccess";

import "../AuthDefault.css";
import "./SignUpDefault.css";

const SignUpDefault = () => {
  const [step, setStep] = useState(1);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    email: "",
    emailCode: "",
    pw: "",
    pwCheck: "",
    name: "",
  });

  // 이전 단계
  // const onPrevious = () => {
  //   setStep(step - 1);
  // };
  // 다음 단계
  const onNext = () => {
    setStep(step + 1);
  };

  return (
    <div className="signup-default flex justify-center">
      <div className="signup-container">
        <Selector index={step} />
        <h2 className="title text-[36px] text-center">회원가입</h2>
        {step === 1 && <SignUp1 onNext={onNext} userInfo={userInfo} setUserInfo={setUserInfo} />}
        {step === 2 && <SignUp2 onNext={onNext} userInfo={userInfo} setUserInfo={setUserInfo} />}
        {step === 3 && <SignUp3 userInfo={userInfo} setUserInfo={setUserInfo} />}
        {step === 4 && <SignUp4 />}
      </div>
    </div>
  );
};

export default SignUpDefault;
