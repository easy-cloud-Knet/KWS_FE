import { Button } from "@mui/material";
import { useEffect, useState } from "react";

import Form from "../../../components/auth/Form";
import AuthTextFieldV2 from "../../../components/auth/textField/AuthTextFieldV2";
import CheckMessage from "../../../components/auth/textField/bottomMessages/CheckMessage";
import ErrorMessage from "../../../components/auth/textField/bottomMessages/ErrorMessage";
import AuthBtn from "../../../components/button/AuthBtn";

import { UserInfo } from "../../../types/auth";

import { EMAIL_REGEX } from "../../../constants/regex";

import "./SignUp1.css";

interface SignUp1Props {
  onNext: () => void;
  userInfo: UserInfo;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>;
}

const SignUp1: React.FC<SignUp1Props> = ({ onNext, userInfo, setUserInfo }) => {
  const [email, setEmail] = useState(userInfo.email);
  const [emailChecker, setEmailChecker] = useState({
    show: false,
    format: false,
    duplicated: false,
  });
  const [emailSendPressed, setEmailSendPressed] = useState(false);
  const [emailSended, setEmailSended] = useState(false);

  const [emailCode, setEmailCode] = useState(userInfo.emailCode);
  const [emailCodeChecker, setEmailCodeChecker] = useState({
    show: false,
    match: false,
  });
  const [emailCodeChecked, setEmailCodeChecked] = useState(false);

  useEffect(() => {
    setEmailChecker((prevIdChecker) => ({
      ...prevIdChecker,
      show: email.length > 0,
      format: EMAIL_REGEX.test(email),
      duplicated: false,
    }));
  }, [email]);

  const checkEmailDuplicated = async (email: string) => {
    console.log(email);
    if (!emailChecker.format) {
      return;
    }

    // initialize
    setHasIdDuplicateChecked(false);

    // try {
    //   const response = await axios.post(`${SERVER_URL}auth/checkUserId`, {
    //     userId: id,
    //     check: true,
    //   });
    //   if (response.data === true) {
    //     setIdDuplicated(false);
    //   }
    // } catch (error) {
    //   setIdDuplicated(true);
    // } finally {
    setHasIdDuplicateChecked(true);
    // }
    setIdDuplicated(false);
  };

  useEffect(() => {
    setEmailCodeChecked(false);
    setEmailCodeChecker({ show: false, match: false });
  }, [emailCode]);

  const checkEmailCode = async () => {
    setEmailCodeChecker({ show: true, match: true });
    setEmailCodeChecked(true);
  };

  const onClickNext = async () => {
    if (!emailCodeChecked) {
      checkEmailCode();
    }

    if (emailChecker.format && !emailChecker.duplicated && emailCodeChecker.match) {
      setUserInfo({ ...userInfo, email: email });
      onNext();
    }
  };

  return (
    <Form onSubmit={onClickNext} className="signup-1 f-dir-column f-center">
      <div className="field">
        <div className="email-field a-items-end">
          <div className="email">
            <AuthTextFieldV2
              label="아이디(이메일)"
              value={email}
              placeholder="kws@kw.ac.kr"
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <Button
            variant="outlined"
            disabled={!(emailChecker.show && emailChecker.format)}
            onClick={() => {
              setEmailSendPressed(true);
              checkEmailDuplicated(email);
              setTimeout(() => {
                setEmailSended(true);
              }, 2000);
            }}
            style={{ width: "93px", height: "61px", borderRadius: 12 }}
          >
            <p className="p-16-400">인증</p>
          </Button>
        </div>

        <div style={{ height: "8px" }}></div>

        {/* 이메일 관련 메시지 */}
        {!emailSendPressed ? (
          emailChecker.show && !emailChecker.format ? (
            <ErrorMessage>이메일 형식과 맞지 않습니다.</ErrorMessage>
          ) : (
            <p className="p-16-400">&nbsp;</p>
          )
        ) : emailSended ? (
          <CheckMessage>이메일이 전송되었습니다.</CheckMessage>
        ) : emailChecker.duplicated ? (
          <ErrorMessage>중복된 이메일입니다.</ErrorMessage>
        ) : (
          <CheckMessage>이메일 전송중...</CheckMessage>
        )}

        <div style={{ height: "3.0556vh" }}></div>

        <AuthTextFieldV2
          label="인증번호"
          value={emailCode}
          placeholder="인증번호"
          onBlur={() => {
            if (!emailCodeChecked) {
              checkEmailCode();
            }
          }}
          onChange={(event) => setEmailCode(event.target.value)}
          checkMessageCondition={emailCodeChecker.show && emailCodeChecker.match}
          checkMessageContent="인증이 완료되었습니다."
          errorMessageCondition={emailCodeChecker.show && !emailCodeChecker.match}
          errorMessageContent="인증번호가 일치하지 않습니다."
        />

        <div className="button-wrap j-content-end">
          <AuthBtn
            variant="contained"
            onClick={onClickNext}
            disabled={!email && emailChecker.format && emailChecker.duplicated && !emailCode}
          >
            다음
          </AuthBtn>
        </div>
        {/* 엔터키 입력을 위한 보이지 않는 버튼 */}
        <button type="submit" style={{ display: "none" }}></button>
      </div>
    </Form>
  );
};

export default SignUp1;
