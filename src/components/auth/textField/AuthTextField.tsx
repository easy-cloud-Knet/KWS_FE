import ErrorIcon from "@mui/icons-material/Error";
import { TextField } from "@mui/material";
import React from "react";

import { AuthTextFieldProps } from "./types/textField";

import add2Whitespaces from "../../../utils/add2Whitespaces";

/**
 * 커스텀 TextField component (MUI TextField 기반)
 * MUI TextField props 참고하여 그대로 사용
 * @param {AuthTextFieldProps} props
 * @param {string} props.label - label
 * @param {string} props.value - value
 * @param {string} props.placeholder - placeholder
 * @param {boolean} props.error - error
 * @param {string} props.helperText - helperText
 * @param {() => void} [props.onBlur] - onBlur
 * @param {(e: React.ChangeEvent<HTMLInputElement>) => void} [props.onChange] - onChange
 * @param {string} [props.className] - className?
 * @param {string} [props.id] - id?
 * @param {string} [props.type] - type?
 * @param {TextFieldProps["slotProps"]} [props.slotProps] - slotProps?
 * @returns {JSX.Element}
 */

const AuthTextField: React.FC<AuthTextFieldProps> = ({
  label,
  value,
  placeholder,
  onBlur,
  onChange,
  error,
  helperText,
  className,
  id,
  type,
  slotProps,
}) => {
  return (
    <>
      <TextField
        label={add2Whitespaces(label)}
        value={value}
        placeholder={placeholder}
        onBlur={onBlur}
        onChange={onChange}
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
        className={className}
        id={id}
        type={type}
        slotProps={slotProps}
      />
    </>
  );
};

export default AuthTextField;
