import { useEffect, useState } from "react";

import AuthTextFieldV2 from "../../../components/auth/textField/AuthTextFieldV2";
import BottomBtn from "../../../components/button/BottomBtn";

import { UserInfo } from "../../../types/auth";

import { NAME_REGEX } from "../../../constants/regex";

interface SignUp3Props {
  userInfo: UserInfo;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>;
  onClickRegisterAllowButton: () => void;
}

/**
 * @param {function} onClickRegisterAllowButton - 회원가입 완료 버튼 클릭 시 호출되는 함수
 */
const SignUp3: React.FC<SignUp3Props> = ({ userInfo, setUserInfo, onClickRegisterAllowButton }) => {
  const [name, setName] = useState(userInfo.name);
  const [nameChecker, setNameChecker] = useState({
    show: false,
    format: false,
  });

  useEffect(() => {
    setNameChecker((prevNameChecker) => ({
      ...prevNameChecker,
      format: NAME_REGEX.test(name),
    }));
  }, [name]);

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

      <div className="button-wrap j-content-between">
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
