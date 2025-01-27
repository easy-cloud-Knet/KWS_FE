import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import add2Whitespaces from "../../utils/add2Whitespaces";

import "./AuthDefault.css";
import "./SignIn.css";

const SignIn: React.FC = () => {
  const [id, setId] = useState<string>("");
  const [pw, setPw] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const navigate = useNavigate();

  return (
    <div className="signin auth-default f-dir-column a-items-center">
      <Stack spacing={2} sx={{ width: 300 }}>
        <h2 className="h2-medium t-center">로그인</h2>

        <FormControl sx={{ m: 1, width: 300 }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-id">아이디</InputLabel>
          <OutlinedInput
            id="outlined-adornment-id"
            type="text"
            onChange={(event) => setId(event.target.value)}
            label={add2Whitespaces("아이디")}
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: 300 }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">비밀번호</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            onChange={(event) => setPw(event.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={showPassword ? "hide the password" : "display the password"}
                  onClick={() => setShowPassword((show) => !show)}
                  onMouseDown={(event) => event.preventDefault()}
                  onMouseUp={(event) => event.preventDefault()}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label={add2Whitespaces("비밀번호")}
          />
        </FormControl>

        <Button variant="contained" disabled={!(id.length > 0 && pw.length > 0)}>
          로그인
        </Button>

        <div className="button-wrap j-content-center">
          <button className="text-button p-small-regular">아이디 / 비밀번호 찾기</button>
          <hr></hr>
          <button className="text-button p-small-regular" onClick={() => navigate("/signup")}>
            회원가입
          </button>
        </div>
      </Stack>
    </div>
  );
};

export default SignIn;
