import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthTextFieldV2 from "../../../components/auth/textField/AuthTextFieldV2";
import BottomBtn from "../../../components/button/BottomBtn";
import { NAME_REGEX } from "../../../constants/regex";
import axiosClient from "../../../services/api";
import { UserInfo } from "../../../types/auth";

interface SignUp3Props {
  userInfo: UserInfo;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>;
}

/**
 * @param {function} onClickRegisterAllowButton - 회원가입 완료 버튼 클릭 시 호출되는 함수
 */
const SignUp3 = ({ userInfo, setUserInfo }: SignUp3Props) => {
  const [name, setName] = useState(userInfo.name);
  const [nameChecker, setNameChecker] = useState({
    show: false,
    format: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setNameChecker((prevNameChecker) => ({
      ...prevNameChecker,
      format: NAME_REGEX.test(name),
    }));
  }, [name]);

  // 회원가입 완료 버튼 클릭 시
  const onClickRegisterAllowButton = async () => {
    setIsLoading(true);
    try {
      await axiosClient.post("/users/register", {
        email: userInfo.email,
        password: userInfo.pw,
        username: name || userInfo.name,
      });

      navigate("/signup/success");
    } catch (error) {
      if (error instanceof AxiosError) {
        alert(error.response?.data?.detail || "회원가입 실패");
      } else {
        alert("회원가입 실패");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    // TODO: 로딩 추가
    return <div>회원가입 중...</div>;
  }

  return (
    <div>
      <AuthTextFieldV2
        label="닉네임"
        value={name}
        placeholder="한글/영문/숫자 포함 가능, 2~12자"
        onBlur={() => {
          setNameChecker({ ...nameChecker, show: true });
        }}
        onChange={(event) => {
          setName(event.target.value);
        }}
        checkMessageCondition={nameChecker.format}
        checkMessageContent="사용 가능한 닉네임입니다."
        errorMessageCondition={nameChecker.show && !nameChecker.format}
        errorMessageContent="한글/영문/숫자 포함 가능, 2~12자"
      />

      <div className="button-wrap flex justify-between">
        <BottomBtn
          variant="contained"
          disabled={!nameChecker.format}
          onClick={() => {
            setUserInfo({ ...userInfo, name: name });

            onClickRegisterAllowButton();
          }}
        >
          회원가입 완료
        </BottomBtn>
      </div>
    </div>
  );
};

export default SignUp3;
