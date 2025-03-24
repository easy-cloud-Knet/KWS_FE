import { useState } from "react";
import { useNavigate } from "react-router-dom";

import SignUp1 from "./SignUp1";
import SignUp2 from "./SignUp2";
import SignUp3 from "./SignUp3";
import SignUp4 from "./SignUpSuccess";
import Selector from "../../../components/auth/Selector";

import axiosClient from "../../../services/api";

import { UserInfo } from "../../../types/auth";

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

  // loading state
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // 이전 단계
  // const onPrevious = () => {
  //   setStep(step - 1);
  // };
  // 다음 단계
  const onNext = () => {
    setStep(step + 1);
  };

  // 회원가입 완료 버튼 클릭 시
  const onClickRegisterAllowButton = async () => {
    setIsLoading(true);
    try {
      await axiosClient.post("/users/register", {
        email: userInfo.email,
        password: userInfo.pw,
        username: userInfo.name,
      });
      console.log(userInfo);
      navigate("/signup/success");
    } catch (error) {
      const err = error as { response?: { data: { detail?: Array<{ msg: string }> } } };
      alert(err.response?.data.detail || "회원가입 실패");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    // TODO: 로딩 중일 때 보여줄 화면
    return <div>로딩중...</div>;
  }

  return (
    <div className="signup-default j-content-center">
      <div className="signup-container">
        <Selector index={step} />
        <h2 className="title p-36-400 t-align-center">회원가입</h2>
        {step === 1 && <SignUp1 onNext={onNext} userInfo={userInfo} setUserInfo={setUserInfo} />}
        {step === 2 && <SignUp2 onNext={onNext} userInfo={userInfo} setUserInfo={setUserInfo} />}
        {step === 3 && (
          <SignUp3
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            onClickRegisterAllowButton={onClickRegisterAllowButton}
          />
        )}
        {step === 4 && <SignUp4 />}
      </div>
    </div>
  );
};

export default SignUpDefault;
