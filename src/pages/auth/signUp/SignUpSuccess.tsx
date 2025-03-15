import { useNavigate } from "react-router-dom";

import BottomBtn from "../../../components/button/BottomBtn";

import "./../AuthDefault.css";
import "./SignUpDefault.css";
import "./SignUpSuccess.css";

const SignUpSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="signup-success signup-default f-center">
      <div className="signup-container">
        <h2 className="p-48-400 t-align-center">회원가입 완료</h2>

        <p className="p-20-400 t-align-center c-grey">KWS에 오신 것을 환영합니다!</p>

        <div className="bottom-btn-wrap f-dir-column">
          <BottomBtn variant="outlined" onClick={() => navigate("/")}>
            메인 화면으로
          </BottomBtn>
          <BottomBtn variant="contained" onClick={() => navigate("/signin")}>
            로그인
          </BottomBtn>
        </div>
      </div>
    </div>
  );
};

export default SignUpSuccess;
