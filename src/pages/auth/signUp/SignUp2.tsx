import { useEffect, useState } from "react";

import Form from "../../../components/auth/Form";
import AuthPwTextFieldV2 from "../../../components/auth/textField/AuthPwTextFieldV2";
import BottomBtn from "../../../components/button/BottomBtn";
import { PW_REGEX } from "../../../constants/regex";
import { UserInfo } from "../../../types/auth";

import "./SignUp2.css";

interface SignUp2Props {
  onNext: () => void;
  userInfo: UserInfo;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>;
}

const SignUp2: React.FC<SignUp2Props> = ({ onNext, userInfo, setUserInfo }) => {
  const [pw, setPw] = useState(userInfo.pw);
  const [pwChecker, setPwChecker] = useState({
    show: false,
    format: false,
  });

  const [pwCheck, setPwCheck] = useState(userInfo.pwCheck);
  const [pwCheckChecker, setPwCheckChecker] = useState({
    show: false,
    equal: false,
  });

  useEffect(() => {
    setPwChecker((prevPwChecker) => ({
      ...prevPwChecker,
      format: PW_REGEX.test(pw),
    }));
  }, [pw]);

  useEffect(() => {
    setPwCheckChecker((prevPwCheckChecker) => ({
      ...prevPwCheckChecker,
      equal: pw === pwCheck,
    }));
  }, [pw, pwCheck]);

  const onClickNext = async () => {
    if (pwChecker.format && pwCheckChecker.equal) {
      setUserInfo({ ...userInfo, pw: pw, pwCheck: pwCheck });
      onNext();
    }
  };

  return (
    <Form className="signup2" onSubmit={onClickNext}>
      <div className="input-wrap f-dir-column">
        <AuthPwTextFieldV2
          label="비밀번호"
          value={pw}
          placeholder="영문, 숫자, 특수문자 포함 8자~100자"
          onBlur={() => {
            setPwChecker({ ...pwChecker, show: true });
          }}
          onChange={(event) => {
            setPw(event.target.value);
          }}
          checkMessageCondition={pwChecker.format}
          checkMessageContent="사용 가능한 비밀번호입니다."
          errorMessageCondition={pwChecker.show && !pwChecker.format}
          errorMessageContent="영문, 숫자, 특수문자 포함 8자~100자"
        />
        <AuthPwTextFieldV2
          label="비밀번호 확인"
          value={pwCheck}
          placeholder="비밀번호를 한번 더 입력해 주세요."
          onBlur={() => {
            setPwCheckChecker({ ...pwCheckChecker, show: true });
          }}
          onChange={(event) => {
            setPwCheck(event.target.value);
          }}
          checkMessageCondition={pwCheckChecker.show && pwCheckChecker.equal}
          checkMessageContent="비밀번호가 일치합니다."
          errorMessageCondition={pwCheckChecker.show && !pwCheckChecker.equal}
          errorMessageContent="비밀번호가 일치하지 않습니다."
        />
      </div>

      <div className="button-wrap j-content-between">
        <BottomBtn
          variant="contained"
          onClick={onClickNext}
          disabled={!(pw && pwChecker.format && pwCheck && pwCheckChecker.equal)}
        >
          다음
        </BottomBtn>

        {/* 엔터키 입력을 위한 보이지 않는 버튼 */}
        <button type="submit" style={{ display: "none" }}></button>
      </div>
    </Form>
  );
};

export default SignUp2;
