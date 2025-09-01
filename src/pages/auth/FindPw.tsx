import { Button } from "@mui/material";
import { FormEvent, MouseEvent, useEffect, useState } from "react";

import AuthTextFieldV2 from "@/components/auth/textField/AuthTextFieldV2";
import BottomBtn from "@/components/button/BottomBtn";
import { EMAIL_REGEX } from "@/constants/regex";

const FindPw = () => {
  const [email, setEmail] = useState("");
  const [emailChecker, setEmailChecker] = useState({
    show: false,
    format: false,
  });
  const [emailSended, setEmailSended] = useState(false);
  const [emailCode, setEmailCode] = useState("");

  useEffect(() => {
    setEmailChecker((prevEmailChecker) => ({
      ...prevEmailChecker,
      format: EMAIL_REGEX.test(email),
    }));
  }, [email]);

  const onClickEmailSend = async (
    event: FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();

    if (!email || !emailChecker.format) {
      return;
    }
    // TODO: api 연결
    setEmailSended(true);
  };

  const onClickCheckEmailCode = async (
    event: FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();

    // TODO: api 연결
  };

  return (
    <main className="flex flex-col items-center size-full pt-[169px]">
      <h1 className="text-pr-sb-36 text-center text-(--BlueBlack)">
        비밀번호 찾기
      </h1>

      <form
        onSubmit={!emailSended ? onClickEmailSend : onClickCheckEmailCode}
        className="flex flex-col gap-[40px] w-[452px] mt-[73px]"
      >
        {/* 더미용 submit 버튼 */}
        <button className="hidden" type="submit"></button>

        <AuthTextFieldV2
          label="아이디(이메일)"
          value={email}
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
          errorMessageContent="@kw.ac.kr 이메일 형식과 맞지 않습니다."
        />

        {!emailSended && (
          <BottomBtn
            variant="contained"
            disabled={!emailChecker.format}
            onClick={onClickEmailSend}
            type="submit"
            sx={{
              marginTop: "16px",
            }}
          >
            인증코드 발송
          </BottomBtn>
        )}
        {emailSended && (
          <>
            <div className="flex justify-between items-end gap-[8px] h-fit">
              <AuthTextFieldV2
                label="인증번호"
                value={emailCode}
                placeholder="인증번호"
                onChange={(event) => setEmailCode(event.target.value)}
              />
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
            <BottomBtn
              variant="contained"
              type="submit"
              disabled={!emailCode}
              onClick={onClickCheckEmailCode}
              sx={{
                marginTop: "16px",
              }}
            >
              인증
            </BottomBtn>
          </>
        )}
      </form>
    </main>
  );
};

export default FindPw;
