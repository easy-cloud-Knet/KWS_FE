import React from "react";

import { AuthTextFieldV2Props } from "./types/textField";

import "./AuthTextFieldV2.css";
/**
 * 커스텀 TextField component (MUI TextField 기반)
 * MUI TextField props 참고하여 그대로 사용
 */

const AuthTextFieldV2: React.FC<AuthTextFieldV2Props> = ({
  label,
  //   error,
  //   helperText,
  style,
  rightElement,
  ...props
}) => {
  return (
    <div className="auth-text-field f-dir-column">
      {typeof label === "string" && <label htmlFor={label}>{label}</label>}
      <div
        className="__input-wrap__"
        style={label ? { marginTop: "12px", ...style } : { ...style }}
      >
        <input className={rightElement ? "__right__" : ""} {...props} />
        {rightElement && <div className="__right-element__">{rightElement}</div>}
      </div>
    </div>
  );
};

export default AuthTextFieldV2;
