import { Button } from "@mui/material";
import { useEffect, useState } from "react";

import Form from "../../../components/auth/Form";
import Selector from "../../../components/auth/Selector";
import AuthPwTextField from "../../../components/auth/textField/AuthPwTextField";

import { UserInfo } from "../../../types/auth";

import {
  PW_ALPHABET_REGEX,
  PW_LENGTH_REGEX,
  PW_NUMBER_REGEX,
  PW_SPECIAL_REGEX,
} from "../../../constants/regex";

interface SignUp2Props {
  onPrevious: () => void;
  onNext: () => void;
  userInfo: UserInfo;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>;
}

const SignUp2: React.FC<SignUp2Props> = ({ onPrevious, onNext, userInfo, setUserInfo }) => {
  const [pw, setPw] = useState(userInfo.pw);
  const [pwChecker, setPwChecker] = useState({
    show: false,
    alphabet: false,
    number: false,
    special: false,
    length: false,
  });

  const [pwCheck, setPwCheck] = useState(userInfo.pwCheck);
  const [pwCheckChecker, setPwCheckChecker] = useState({
    show: false,
    equal: false,
  });

  useEffect(() => {
    setPwChecker((prevPwChecker) => ({
      ...prevPwChecker,
      alphabet: PW_ALPHABET_REGEX.test(pw),
      number: PW_NUMBER_REGEX.test(pw),
      special: PW_SPECIAL_REGEX.test(pw),
      length: PW_LENGTH_REGEX.test(pw),
    }));
  }, [pw]);

  useEffect(() => {
    const checker = {
      show: pwCheck.length > 0,
      equal: pw === pwCheck,
    };

    setPwCheckChecker(checker);
  }, [pw, pwCheck]);

  const onClickNext = async () => {
    if (
      pwChecker.alphabet &&
      pwChecker.number &&
      pwChecker.special &&
      pwChecker.length &&
      pwCheckChecker.equal
    ) {
      setUserInfo({ ...userInfo, pw: pw, pwCheck: pwCheck });
      onNext();
    }
  };

  return (
    <Form className="signup2" onSubmit={onClickNext}>
      <Selector index={2} />

      <AuthPwTextField
        className="set-bottom-margin"
        label="비밀번호"
        value={pw}
        placeholder="대소문자, 숫자, 특수문자 5~11자"
        onBlur={() => {
          setPwChecker({ ...pwChecker, show: true });
        }}
        onChange={(event) => {
          setPw(event.target.value);
        }}
        error={
          pwChecker.show &&
          (!pwChecker.alphabet || !pwChecker.number || !pwChecker.special || !pwChecker.length)
        }
        helperText={
          pwChecker.show &&
          (!pwChecker.alphabet || !pwChecker.number || !pwChecker.special || !pwChecker.length)
            ? "대소문자, 숫자, 특수문자(@$!%*#?&) 5~11자"
            : ""
        }
      />

      <AuthPwTextField
        label="비밀번호 확인&nbsp;"
        value={pwCheck}
        placeholder="비밀번호 확인"
        onBlur={() => {
          return;
        }}
        onChange={(event) => {
          setPwCheck(event.target.value);
          if (pw.length > 0) {
            setPwCheckChecker({ ...pwCheckChecker, show: true });
          }
        }}
        error={pwCheckChecker.show && !pwCheckChecker.equal}
        helperText={
          pwCheckChecker.show && !pwCheckChecker.equal ? "비밀번호가 일치하지 않습니다." : ""
        }
      />
      <div className="button-wrap j-content-between">
        <Button variant="outlined" onClick={onPrevious} style={{ borderRadius: 20 }}>
          이전
        </Button>

        <Button
          variant="contained"
          onClick={onClickNext}
          style={{ borderRadius: 20 }}
          disabled={
            !(
              pwChecker.alphabet &&
              pwChecker.number &&
              pwChecker.special &&
              pwChecker.length &&
              pwCheckChecker.equal
            )
          }
        >
          다음
        </Button>

        {/* 엔터키 입력을 위한 보이지 않는 버튼 */}
        <button type="submit" style={{ display: "none" }}></button>
      </div>
    </Form>
  );
};

export default SignUp2;
