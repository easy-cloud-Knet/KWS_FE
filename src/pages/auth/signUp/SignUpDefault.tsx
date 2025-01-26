import { useState } from "react";

import SignUp1 from "./SignUp1";
import SignUp2 from "./SignUp2";
import SignUp3 from "./SignUp3";
import SignUp4 from "./SignUp4";

import { UserInfo } from "../../../types/auth";

import "../AuthDefault.css";
import "./SignUpDefault.css";

const SignUpDefault = () => {
  const [step, setStep] = useState(1);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    id: "",
    pw: "",
    pwCheck: "",
    email: "",
    emailCode: "",
  });

  // loading state
  const [isLoading, setIsLoading] = useState(false);

  // 이전 단계
  const onPrevious = () => {
    setStep(step - 1);
  };
  // 다음 단계
  const onNext = () => {
    setStep(step + 1);
  };

  // 회원가입 완료 버튼 클릭 시
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onClickRegisterAllowButton = async (email: string, emailCode: string) => {
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
    onNext();
    setIsLoading(false);
    //   }
  };

  if (isLoading) {
    // TODO: 로딩 중일 때 보여줄 화면
    return <div>로딩중...</div>;
  }

  return (
    <div className="signup-default auth-default j-content-center">
      <div className="signup-container">
        <h2 className="h2-medium t-align-center" id="title">
          회원가입
        </h2>
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
