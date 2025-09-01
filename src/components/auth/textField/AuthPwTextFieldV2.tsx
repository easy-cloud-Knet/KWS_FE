import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useState } from "react";

import AuthTextFieldV2 from "./AuthTextFieldV2.tsx";
import { AuthTextFieldV2Props } from "./types/textField";

const AuthPwTextFieldV2: React.FC<AuthTextFieldV2Props> = ({ ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <AuthTextFieldV2
      type={showPassword ? "text" : "password"}
      rightElement={
        <IconButton
          onClick={() => setShowPassword(!showPassword)}
          onMouseDown={(event) => event.preventDefault()}
          edge="end"
          sx={{ marginRight: "0px" }}
        >
          {showPassword ? <Visibility /> : <VisibilityOff />}
        </IconButton>
      }
      {...props}
    />
  );
};

export default AuthPwTextFieldV2;
