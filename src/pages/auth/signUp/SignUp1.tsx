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

  useEffect(() => {
    setEmailChecker((prevIdChecker) => ({
      ...prevIdChecker,
      format: EMAIL_REGEX.test(email),
    }));
  }, [email]);

  const onClickEmailSend = () => {
    alert("입력하신 이메일로 인증번호를 발송하였습니다.");
    // 이메일 발송 API 호출
    sendEmail();
  };

  const sendEmail = async () => {
    try {
      await axiosClient.post(
        "/users/send-email",
        { email: email },
        { params: { purpose: "register" } }
      );
      setEmailSended(true);
    } catch (error) {
      const err = error as AxiosError<ServerError>;

      // 에러 응답이 detail 배열 형태인 경우 처리
      if (
        err.response?.data?.detail &&
        Array.isArray(err.response.data.detail)
      ) {
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

  const checkEmailCode = () => {
    if (!emailCode) {
      return;
    }

    const verifyCode = async () => {
      try {
        await axiosClient.post(
          "/users/verify-code",
          { email: email },
          { params: { code: emailCode } }
        );

        // alert("이메일이 인증되었습니다.");
      } catch {
        alert("인증번호가 일치하지 않습니다.");
      }
    };

    verifyCode();

    setUserInfo({ ...userInfo, email: email, emailCode: emailCode });
    onNext();
  };

  return (
    <Form
      onSubmit={!emailSended ? onClickEmailSend : checkEmailCode}
      className="signup-1 f-dir-column f-center"
    >
      {/* 더미용 submit 버튼 */}
      <button type="submit"></button>

      <div className="field">
        <>
          <AuthTextFieldV2
            label="아이디(이메일)"
            value={email}
            placeholder="kws@kw.ac.kr"
            disabled={emailSended}
            onBlur={() =>
              setEmailChecker((prevEmailChecker) => ({
                ...prevEmailChecker,
                show: true,
              }))
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
              type="submit"
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
              <BottomBtn
                variant="contained"
                type="submit"
                disabled={!emailCode}
              >
                인증
              </BottomBtn>
            </div>
          </>
        )}
      </div>
    </Form>
  );
};

export default SignUp1;
