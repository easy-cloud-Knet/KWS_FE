import React from "react";

import CheckMessage from "./bottomMessages/CheckMessage";
import ErrorMessage from "./bottomMessages/ErrorMessage";

import { AuthTextFieldV2Props } from "./types/textField";

import "./AuthTextFieldV2.css";
/**
 * 커스텀 TextField component (MUI TextField 기반)
 * MUI TextField props 참고하여 그대로 사용
 *
 * @param props
 * @param {React.ReactNode} props.rightElement - 오른쪽에 element 추가할 경우
 * @param {boolean} props.checkMessageCondition - checkMessage 표시 여부
 * @param {string} props.checkMessageContent - checkMessage 내용
 * @param {boolean} props.errorMessageCondition - errorMessage 표시 여부
 * @param {string} props.errorMessageContent - errorMessage 내용
 */
const AuthTextFieldV2: React.FC<AuthTextFieldV2Props> = ({
  label,
  style,
  rightElement,
  checkMessageCondition = false,
  checkMessageContent,
  errorMessageCondition = false,
  errorMessageContent,
  ...props
}) => {
  return (
    <div className="auth-text-field f-dir-column">
      {typeof label === "string" && (
        <label className="p-16-400" htmlFor={label}>
          {label}
        </label>
      )}
      <div
        className="__input-wrap__"
        style={label ? { marginTop: "12px", ...style } : { ...style }}
      >
        <input className={rightElement ? "__right__" : ""} {...props} />
        {rightElement && <div className="__right-element__">{rightElement}</div>}
      </div>

      {(checkMessageContent || errorMessageContent) && <div style={{ height: "8px" }}></div>}

      {checkMessageContent || errorMessageContent ? (
        checkMessageCondition ? (
          <CheckMessage>{checkMessageContent}</CheckMessage>
        ) : errorMessageCondition ? (
          <ErrorMessage>{errorMessageContent}</ErrorMessage>
        ) : (
          <p className="p-16-400">&nbsp;</p>
        )
      ) : null}
    </div>
  );
};

export default AuthTextFieldV2;
