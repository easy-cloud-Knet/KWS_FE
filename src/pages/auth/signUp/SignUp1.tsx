import { Button } from "@mui/material";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";

import Form from "../../../components/auth/Form";
import AuthTextFieldV2 from "../../../components/auth/textField/AuthTextFieldV2";
import BottomBtn from "../../../components/button/BottomBtn";

import axiosClient from "../../../services/api";

import { UserInfo } from "../../../types/auth";
import { ServerError } from "../../../types/axios";

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
  });
  const [emailSended, setEmailSended] = useState(false);

  const [emailCode, setEmailCode] = useState(userInfo.emailCode);
  const [emailCodeChecker, setEmailCodeChecker] = useState({
    show: false,
    match: false,
  });

  useEffect(() => {
    setEmailChecker((prevIdChecker) => ({
      ...prevIdChecker,
      format: EMAIL_REGEX.test(email),
    }));
  }, [email]);

  const onClickEmailSend = async () => {
    // 이메일 발송 API 호출
    try {
      await axiosClient.post(
        "/users/send-email",
        {},
        {
          params: {
            email: email,
            purpose: "register",
          },
        }
      );
      alert("입력하신 이메일로 인증번호를 발송하였습니다.");
      setEmailSended(true);
    } catch (error) {
      const err = error as AxiosError<ServerError>;

      // 에러 응답이 detail 배열 형태인 경우 처리
      if (err.response?.data?.detail && Array.isArray(err.response.data.detail)) {
        const duplicateError = err.response.data.detail.find(
          (detail: { msg: string }) => detail.msg === "이메일 중복"
        );
        if (duplicateError) {
          alert("이미 사용 중인 이메일입니다.");
          return;
        }
      }
      alert("이메일 전송에 실패했습니다.");

      setEmailSended(false);
    }
  };

  useEffect(() => {
    setEmailCodeChecker({ show: false, match: false });
  }, [emailCode]);

  const checkEmailCode = async () => {
    if (!emailCode) {
      setEmailCodeChecker({ show: false, match: false });
      return;
    }

    try {
      await axiosClient.post(
        "/users/verify-code",
        {},
        {
          params: {
            email: email,
            code: emailCode,
          },
        }
      );

      alert("이메일이 인증되었습니다.");
      setEmailCodeChecker({ show: true, match: true });
      onClickNext();
    } catch {
      alert("인증번호가 일치하지 않습니다.");
      setEmailCodeChecker({ show: true, match: false });
    }
  };

  const onClickNext = async () => {
    if (emailChecker.format && emailCodeChecker.match) {
      setUserInfo({ ...userInfo, email: email });
      onNext();
    }
  };

  return (
    <Form onSubmit={checkEmailCode} className="signup-1 f-dir-column f-center">
      <div className="field">
        <>
          <AuthTextFieldV2
            label="아이디(이메일)"
            value={email}
            placeholder="kws@kw.ac.kr"
            disabled={emailSended}
            onBlur={() =>
              setEmailChecker((prevEmailChecker) => ({ ...prevEmailChecker, show: true }))
            }
            onChange={(event) => setEmail(event.target.value)}
            checkMessageCondition={emailChecker.show && emailChecker.format}
            checkMessageContent="사용 가능한 이메일입니다."
            errorMessageCondition={emailChecker.show && !emailChecker.format}
            errorMessageContent="이메일 형식과 맞지 않습니다."
          />
          <div style={{ height: "3.333vh" }}></div> {/* 36px */}
          {!emailSended && (
            <BottomBtn
              variant="contained"
              onClick={onClickEmailSend}
              disabled={!emailChecker.format}
            >
              인증코드 발송
            </BottomBtn>
          )}
        </>

        {emailSended && (
          <>
            <div className="email-code-wrap j-content-between a-items-end">
              <div className="email-code-field">
                <AuthTextFieldV2
                  label="인증번호"
                  value={emailCode}
                  placeholder="인증번호"
                  onChange={(event) => setEmailCode(event.target.value)}
                />
              </div>
              <Button
                variant="outlined"
                sx={{
                  width: "82px",
                  height: "48px",
                  borderRadius: "12px",
                  border: "1px solid var(--Main_Blue, #007BFF)",
                }}
                onClick={onClickEmailSend}
              >
                재전송
              </Button>
            </div>
            <div className="button-wrap j-content-end">
              <BottomBtn variant="contained" onClick={checkEmailCode} disabled={!emailCode}>
                인증
              </BottomBtn>
            </div>
            {/* 엔터키 입력을 위한 보이지 않는 버튼 */}
            <button type="submit" style={{ display: "none" }}></button>
          </>
        )}
      </div>
    </Form>
  );
};

export default SignUp1;
