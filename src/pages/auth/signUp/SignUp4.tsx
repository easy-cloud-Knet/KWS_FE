import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

import Selector from "../../../components/auth/Selector";

const SignUp4 = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Selector index={4} />

      <h2 className="h3-medium t-align-center">회원가입 완료</h2>

      <div style={{ height: "20px" }} />

      <Button variant="contained" sx={{ width: 300 }} onClick={() => navigate("/signin")}>
        로그인
      </Button>
    </div>
  );
};

export default SignUp4;
