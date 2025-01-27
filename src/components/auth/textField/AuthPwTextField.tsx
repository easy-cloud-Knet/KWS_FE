import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, TextFieldProps } from "@mui/material";
import { useState } from "react";

import AuthTextField from "./AuthTextField";

/**
 * 커스텀 password TextField component (MUI TextField 기반)
 * MUI TextField props 참고하여 그대로 사용
 *
 */
const AuthPwTextField: React.FC<TextFieldProps> = ({ ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <AuthTextField
      type={showPassword ? "text" : "password"}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                onMouseDown={(event) => event.preventDefault()}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
      {...props}
    />
  );
};

export default AuthPwTextField;
