import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment } from "@mui/material";
import { useState } from "react";

import AuthTextField from "./AuthTextField";

import { AuthTextFieldProps } from "./types/textField";

/**
 * 커스텀 password TextField component (MUI TextField 기반)
 * MUI TextField props 참고하여 그대로 사용
 * @param {AuthTextFieldProps} props
 * @param {string} props.label - label
 * @param {string} props.value - value
 * @param {string} props.placeholder - placeholder
 * @param {() => void} [props.onBlur] - onBlur
 * @param {(e: React.ChangeEvent<HTMLInputElement>) => void} [props.onChange] - onChange
 * @param {boolean} props.error - error
 * @param {string} props.helperText - helperText
 * @param {string} [props.className] - className?
 * @param {string} [props.id] - id?
 * @returns {JSX.Element}
 */
const AuthPwTextField: React.FC<AuthTextFieldProps> = ({
  label,
  value,
  placeholder,
  onBlur,
  onChange,
  error,
  helperText,
  className,
  id,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <AuthTextField
      label={label}
      type={showPassword ? "text" : "password"}
      value={value}
      placeholder={placeholder}
      onBlur={onBlur}
      onChange={onChange}
      error={error}
      helperText={helperText}
      className={className}
      id={id}
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
    />
  );
};

export default AuthPwTextField;
