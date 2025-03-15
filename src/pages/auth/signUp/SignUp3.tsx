import { useEffect, useState } from "react";

import AuthTextFieldV2 from "../../../components/auth/textField/AuthTextFieldV2";
import AuthBtn from "../../../components/button/AuthBtn";

import { UserInfo } from "../../../types/auth";

import { NAME_REGEX } from "../../../constants/regex";

interface SignUp3Props {
  onPrevious: () => void;
  userInfo: UserInfo;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>;
  onClickRegisterAllowButton: () => void;
}

/**
 * @param {function} onClickRegisterAllowButton - 회원가입 완료 버튼 클릭 시 호출되는 함수
 */
const SignUp3: React.FC<SignUp3Props> = ({
  onPrevious,
  userInfo,
  setUserInfo,
  onClickRegisterAllowButton,
}) => {
  const [name, setName] = useState(userInfo.name);
  const [nameChecker, setNameChecker] = useState({
    show: false,
    format: false,
  });

  useEffect(() => {
    setNameChecker((prevNameChecker) => ({
      ...prevNameChecker,
      show: name.length > 0,
      format: NAME_REGEX.test(name),
    }));
  }, [name]);

  return (
    <div>
      <AuthTextFieldV2
        label="닉네임"
        value={name}
        placeholder="닉네임을 입력해 주세요."
        onChange={(event) => {
          setName(event.target.value);
        }}
        checkMessageCondition={nameChecker.show && nameChecker.format}
        checkMessageContent="사용 가능한 닉네임입니다."
        errorMessageCondition={nameChecker.show && !nameChecker.format}
        errorMessageContent="(한글, 영어, 숫자 포함 3자~10자)"
      />

      <div className="button-wrap j-content-between">
        <AuthBtn variant="outlined" onClick={onPrevious}>
          이전
        </AuthBtn>
        <AuthBtn
          variant="contained"
          disabled={!nameChecker.format}
          onClick={() => {
            setUserInfo({ ...userInfo, name: name });

            onClickRegisterAllowButton();
          }}
        >
          완료
        </AuthBtn>
      </div>
    </div>
  );
};

export default SignUp3;
