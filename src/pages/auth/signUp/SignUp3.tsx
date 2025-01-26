import { Button } from "@mui/material";
import { useEffect, useState } from "react";

import Selector from "../../../components/auth/Selector";
import AuthSideBtnTextField from "../../../components/auth/textField/AuthSideBtnTextField";
import AuthTimerSideBtnTextField from "../../../components/auth/textField/AuthTimerSideBtnTextField";

import { UserInfo } from "../../../types/auth";

import { EMAIL_REGEX } from "../../../constants/regex";

interface SignUp3Props {
  onPrevious: () => void;
  userInfo: UserInfo;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>;
  onClickRegisterAllowButton: (email: string, emailCode: string) => void;
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
  const [email, setEmail] = useState(userInfo.email);
  const [emailChecker, setEmailChecker] = useState({
    show: false,
    format: false,
  });
  const [emailDuplicated, setEmailDuplicated] = useState(false);

  const [emailSended, setEmailSended] = useState(false);

  const [emailCode, setEmailCode] = useState(userInfo.emailCode);
  const [emailCodeChecker, setEmailCodeChecker] = useState({
    show: false,
    match: false,
  });

  const [timerReset, setTimerReset] = useState(false);

  useEffect(() => {
    setEmailChecker({ ...emailChecker, format: EMAIL_REGEX.test(email) });
    setEmailDuplicated(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);

  const onClickEmailSend = async () => {
    // initialize
    setEmailSended(false);
    setEmailDuplicated(false);
    setEmailCodeChecker({ show: false, match: false });

    setEmailSended(true);
    // 타이머 리셋
    setTimerReset(true);
    setTimeout(() => setTimerReset(false), 100); // 타이머 리셋 상태를 빠르게 해제

    // // 이메일 발송 API 호출
    // try {
    //   await axios.post(`${SERVER_URL}auth/mailSend`, {
    //     email: email,
    //   });

    setEmailSended(true);
    // } catch (error) {
    //   if (error.response.data.error === "이메일 중복") {
    //     setEmailDuplicated(true);
    //   } else {
    //     alert("이메일 전송에 실패했습니다.");
    //   }
    //   setEmailSended(false);
    // }
  };

  const onClickConfirmButton = async () => {
    // initialize
    setEmailCodeChecker({ show: false, match: false });

    // try {
    //   await axios.post(`${SERVER_URL}auth/mailauthCheck`, {
    //     email: email,
    //     authNum: emailCode,
    //   });
    setEmailCodeChecker({ show: true, match: true });
    // } catch (error) {
    //   setEmailCodeChecker({ show: true, match: false });
    // }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (emailChecker.format && !emailDuplicated && emailCodeChecker.match) {
        if (event.key === "Enter") {
          event.preventDefault();
          setUserInfo({ ...userInfo, email: email, emailCode: emailCode });
          onClickRegisterAllowButton(email, emailCode);
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    userInfo,
    setUserInfo,
    onClickRegisterAllowButton,
    email,
    emailCode,
    emailChecker,
    emailDuplicated,
    emailCodeChecker,
  ]);

  return (
    <div className="signup-default">
      <Selector index={3} />

      <AuthSideBtnTextField
        className="set-bottom-margin"
        label="이메일"
        value={email}
        placeholder="이메일"
        onBlur={() => {
          setEmailChecker({ ...emailChecker, show: true });
        }}
        onChange={(event) => setEmail(event.target.value)}
        error={emailChecker.show && (!emailChecker.format || emailDuplicated)}
        helperText={
          emailChecker.show
            ? !emailChecker.format
              ? "이메일 형식과 맞지 않습니다."
              : emailDuplicated
              ? "중복된 아이디입니다."
              : emailSended && emailCode.length === 0
              ? "메일이 전송되었습니다."
              : "\u00A0"
            : "\u00A0"
        }
        sideBtnText="인증"
        sideBtnOnClick={onClickEmailSend}
        sideBtnDisabled={!emailChecker.format}
      />

      <AuthTimerSideBtnTextField
        label="인증번호"
        value={emailCode}
        placeholder="인증번호"
        onChange={(event) => {
          setEmailCodeChecker({ show: false, match: false });
          setEmailCode(event.target.value);
        }}
        sideBtnText="확인"
        sideBtnOnClick={onClickConfirmButton}
        sideBtnDisabled={!emailSended}
        timerStart={emailSended} // 이메일 발송 여부로 타이머 시작 제어
        timerStop={emailCodeChecker.match || emailDuplicated} // 인증번호 일치 여부 또는 이메일 중복 여부로 타이머 정지 제어
        timerReset={timerReset}
        setTimerValue={(value) => {
          if (value === 0) setEmailSended(false); // 타이머가 0이 되면 이메일 발송 상태 해제
        }}
        error={emailCodeChecker.show && !emailCodeChecker.match}
        helperText={
          emailCodeChecker.show
            ? emailCodeChecker.match
              ? "인증이 완료되었습니다."
              : "인증번호가 일치하지 않습니다."
            : "\u00A0"
        }
      />

      <div className="button-wrap j-content-between">
        <Button variant="outlined" onClick={onPrevious} style={{ borderRadius: 20 }}>
          이전
        </Button>
        <Button
          variant="contained"
          disabled={!(emailChecker.format && !emailDuplicated && emailCodeChecker.match)}
          onClick={() => {
            setUserInfo({ ...userInfo, email: email, emailCode: emailCode });
            // 비동기 처리 이슈, parameter로 전달
            onClickRegisterAllowButton(email, emailCode);
          }}
          style={{ borderRadius: 20 }}
        >
          가입
        </Button>
      </div>
    </div>
  );
};

export default SignUp3;
