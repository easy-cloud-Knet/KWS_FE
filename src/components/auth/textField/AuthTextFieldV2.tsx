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
  rightElement,
  ...props
}) => {
  return (
    <div className="auth-text-field f-dir-column">
      {typeof label === "string" && <label htmlFor={label}>{label}</label>}
      <div className="input-wrap">
        <input className={rightElement ? "right" : ""} {...props} />
        {rightElement && <div className="right-element">{rightElement}</div>}
      </div>
    </div>
  );
};

export default AuthTextFieldV2;
