import { useNavigate } from "react-router-dom";

import ic_check_auth from "@/assets/image/auth/ic_check_auth.svg";
import BottomBtn from "@/components/button/BottomBtn";

const SignUpSuccess = () => {
  const navigate = useNavigate();

  return (
    <main className="flex flex-col items-center pt-[216px] w-full">
      <div className="flex flex-col items-center gap-[32px]">
        <img src={ic_check_auth} alt="" />

        <h2 className="text-pr-sb-36 text-center">회원가입 완료</h2>

        <p className="text-pr-r-21 text-center c-grey">
          도들에 오신 것을 환영합니다. <br />
          이제부터 클라우드 환경을 자유롭게 탐험해 보세요!
        </p>
      </div>

      <div className="flex flex-col items-center gap-[32px] mt-[99px] mb-[32px] w-[452px]">
        <BottomBtn variant="contained" onClick={() => navigate("/signin")}>
          로그인
        </BottomBtn>
        <button
          className="text-(--Main_Blue) text-pr-r-18 text-center underline underline-offset-8 cursor-pointer"
          onClick={() => navigate("/")}
        >
          메인 화면으로
        </button>
      </div>
    </main>
  );
};

export default SignUpSuccess;
