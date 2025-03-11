import { useState } from "react";
import { useNavigate } from "react-router-dom";

import SignUp1 from "./SignUp1";
import SignUp2 from "./SignUp2";
import SignUp3 from "./SignUp3";
import SignUp4 from "./SignUpSuccess";
import Selector from "../../../components/auth/Selector";

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
  const onPrevious = () => {
    setStep(step - 1);
  };
  // 다음 단계
  const onNext = () => {
    setStep(step + 1);
  };

  // 회원가입 완료 버튼 클릭 시
  const onClickRegisterAllowButton = async () => {
    setIsLoading(true);
    //   try {
    //     await axios.post(`${SERVER_URL}auth/signup`, {
    //       userId: userInfo.id,
    //       password: userInfo.pw,
    //       confirmPassword: userInfo.pwCheck,
    //       nickname: userInfo.name,
    //       email: userInfo.email || email,
    //       authNum: userInfo.emailCode || emailCode,
    //     });
    //     navigate("/signup/success");
    //   } catch (error) {
    //     alert(error.response.data.error);
    //     console.log(userInfo);
    //   } finally {
    navigate("/signup/success");
    setIsLoading(false);
    //   }
  };

  if (isLoading) {
    // TODO: 로딩 중일 때 보여줄 화면
    return <div>로딩중...</div>;
  }

  return (
    <div className="signup-default f-center">
      <div className="signup-container">
        <Selector index={step} />
        <h2 className="title p-36-400 t-align-center">회원가입</h2>
        {step === 1 && <SignUp1 onNext={onNext} userInfo={userInfo} setUserInfo={setUserInfo} />}
        {step === 2 && (
          <SignUp2
            onPrevious={onPrevious}
            onNext={onNext}
            userInfo={userInfo}
            setUserInfo={setUserInfo}
          />
        )}
        {step === 3 && (
          <SignUp3
            onPrevious={onPrevious}
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
