import React, { useState } from "react";

import remove from "@/assets/image/input/remove.svg";
import ImageBtn from "@/components/button/ImageBtn";

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
const AuthTextFieldV2 = ({
  label,
  style,
  onBlur,
  onClick,
  rightElement,
  checkMessageCondition = false,
  checkMessageContent,
  errorMessageCondition = false,
  errorMessageContent,
  ...props
}: AuthTextFieldV2Props) => {
  const [showDeleteBtn, setShowDeleteBtn] = useState(false);

  let className = "";
  if (props.className) {
    className += props.className;
    delete props.className;
  }
  if (rightElement) {
    className += " __right__";
  }
  if (checkMessageCondition) {
    className += " __valid__";
  } else if (errorMessageCondition) {
    className += " __invalid__";
  }

  return (
    <div className="auth-text-field flex flex-col">
      {typeof label === "string" && (
        <label className="typo-pr-r-16" htmlFor={label}>
          {label}
        </label>
      )}
      <div
        className="__input-wrap__"
        style={label ? { marginTop: "12px", ...style } : { ...style }}
      >
        <input
          className={className}
          onBlur={(event: React.FocusEvent<HTMLInputElement>) => {
            setShowDeleteBtn(false);
            if (onBlur) {
              onBlur(event);
            }
          }}
          onClick={(event: React.MouseEvent<HTMLInputElement>) => {
            setShowDeleteBtn(true);
            if (onClick) {
              onClick(event);
            }
          }}
          {...props}
        />
        {rightElement ? (
          <div className="__right-element__">{rightElement}</div>
        ) : (
          showDeleteBtn &&
          props.value && (
            <div onMouseDown={(event: React.MouseEvent<HTMLDivElement>) => event.preventDefault()}>
              {/* 클릭해도 input의 onBlur가 작동하지 않도록*/}
              <ImageBtn
                className="__right-element__"
                src={remove}
                alt="X"
                onClick={() => {
                  if (props.onChange) {
                    props.onChange({
                      target: { value: "" },
                    } as React.ChangeEvent<HTMLInputElement>);
                  }
                }}
              />
            </div>
          )
        )}
      </div>

      {checkMessageContent || errorMessageContent ? (
        checkMessageCondition ? (
          <div className="mt-[8px]">
            <CheckMessage>{checkMessageContent}</CheckMessage>
          </div>
        ) : errorMessageCondition ? (
          <div className="mt-[4px]">
            <ErrorMessage>{errorMessageContent}</ErrorMessage>
          </div>
        ) : (
          <p className="h-[28px]">&nbsp;</p>
        )
      ) : null}
    </div>
  );
};

export default AuthTextFieldV2;
