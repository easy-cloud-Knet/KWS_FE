import { useState } from "react";

import AuthPwTextFieldV2 from "@/components/auth/textField/AuthPwTextFieldV2";
import BottomBtn from "@/components/button/BottomBtn";

const ResetPw = () => {
  const [pw, setPw] = useState("");
  const [pwChecker, setPwChecker] = useState({
    show: false,
    format: false,
  });
  const [pwCheck, setPwCheck] = useState("");
  const [pwCheckChecker, setPwCheckChecker] = useState({
    show: false,
    equal: false,
  });

  const onClickResetPassword = () => {
    // api 연결
  };

  return (
    <main className="flex flex-col items-center size-full pt-[169px]">
      <h1 className="text-pr-sb-36 text-center text-(--BlueBlack)">
        비밀번호 재설정
      </h1>

      <form
        onSubmit={onClickResetPassword}
        className="flex flex-col gap-[40px] w-[452px] mt-[73px]"
      >
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

        <div className="button-wrap j-content-between">
          <BottomBtn
            variant="contained"
            onClick={onClickResetPassword}
            disabled={
              !(pw && pwChecker.format && pwCheck && pwCheckChecker.equal)
            }
          >
            완료
          </BottomBtn>

          {/* 엔터키 입력을 위한 보이지 않는 버튼 */}
          <button type="submit" style={{ display: "none" }}></button>
        </div>
      </form>
    </main>
  );
};

export default ResetPw;
