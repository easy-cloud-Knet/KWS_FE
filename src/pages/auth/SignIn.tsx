import { Checkbox } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthTextFieldV2 from "../../components/auth/textField/AuthTextFieldV2";
import AuthPwTextFieldV2 from "../../components/auth/textField/AuthPwTextFieldV2";
import BottomBtn from "../../components/button/BottomBtn";
import TextBtn from "../../components/button/TextBtn";

import AuthContext from "../../contexts/AuthContext";

import axiosClient from "../../services/api";

import "./SignIn.css";
import { AxiosError } from "axios";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [pw, setPw] = useState<string>("");

  const [checked, setChecked] = useState(true);

  // const [isIdPwMatch, setIsIdPwMatch] = useState(false);

  const { login } = useContext(AuthContext)!;
  const navigate = useNavigate();

  useEffect(() => {
    const savedEmail = localStorage.getItem("savedEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setChecked(true);
    }
  }, []);

  const onClickCheckBox = () => {
    setChecked(!checked);
  };

  const onClickSignIn = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axiosClient.post("/users/login", {
        email: email,
        password: pw,
      });

      if (response.data.access_token && response.data.refresh_token) {
        login(
          response.data.access_token,
          response.data.refresh_token,
          response.data.user.username,
          response.data.user.email
        );
        // setIsIdPwMatch(true);
      } else {
        // setIsIdPwMatch(false);
      }

      // 로그인 버튼 클릭 시
      if (checked) {
        localStorage.setItem("savedEmail", email);
      } else {
        localStorage.removeItem("savedEmail");
      }

      navigate("/");
    } catch (error) {
      if (error instanceof AxiosError) {
        alert(error.response?.data?.detail || "로그인 실패");
      } else {
        alert("로그인 실패");
      }
    }
  };

  return (
    <form
      onSubmit={onClickSignIn}
      className="signin-wrap f-dir-column f-center"
    >
      <div className="signin f-dir-column a-items-center">
        <p className="title p-36-600 c-black t-center">KWS</p>

        <div className="input-wrap f-dir-column">
          <AuthTextFieldV2
            placeholder="E-mail"
            type="text"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <AuthPwTextFieldV2
            placeholder="Password"
            value={pw}
            onChange={(event) => setPw(event.target.value)}
          />
        </div>

        <div className="utils-wrap j-content-between a-items-center">
          <div
            className="id-save a-items-center c-pointer"
            onClick={onClickCheckBox}
          >
            <Checkbox
              checked={checked}
              onChange={onClickCheckBox}
              sx={{ padding: "0" }}
            />
            <p className="p-16-400">아이디 저장</p>
          </div>
          <TextBtn className="p-16-400 c-blue">비밀번호를 잊으셨나요?</TextBtn>
        </div>

        <BottomBtn
          variant="contained"
          disabled={!(email.length > 0 && pw.length > 0)}
          type="submit"
        >
          로그인
        </BottomBtn>

        <div className="button-wrap f-dir-column">
          <hr></hr>
          <div className="register-btn-wrap j-content-center">
            <p className="p-16-400">계정이 없으신가요?</p>
            <TextBtn
              className="p-16-400 c-blue"
              onClick={() => navigate("/signup")}
            >
              회원가입하기
            </TextBtn>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SignIn;
