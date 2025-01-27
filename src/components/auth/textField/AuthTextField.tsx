import ErrorIcon from "@mui/icons-material/Error";
import { TextField, TextFieldProps } from "@mui/material";
import React from "react";

import add2Whitespaces from "../../../utils/add2Whitespaces";

/**
 * 커스텀 TextField component (MUI TextField 기반)
 * MUI TextField props 참고하여 그대로 사용
 */

const AuthTextField: React.FC<TextFieldProps> = ({ label, error, helperText, ...props }) => {
  return (
    <>
      <TextField
        label={typeof label === "string" ? add2Whitespaces(label) : label}
        error={error}
        helperText={
          <>
            {error ? (
              <ErrorIcon
                color="error"
                sx={{
                  width: "16px",
                  height: "16px",
                  transform: "translate(-6px, 3px)",
                }}
              />
            ) : (
              // 이미지 크기 공백 추가
              <ErrorIcon
                htmlColor="#ffffff"
                sx={{
                  width: "16px",
                  height: "16px",
                }}
              />
            )}
            {helperText}
          </>
        }
        sx={{ width: 300 }}
        autoComplete="off"
        {...props}
      />
    </>
  );
};

export default AuthTextField;
