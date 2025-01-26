import { Button, InputAdornment } from "@mui/material";
import { useEffect, useState } from "react";

import AuthTextField from "./AuthTextField";

import { AuthSideBtnTextFieldProps } from "./types/textField";

import "./AuthTimerSideBtnTextField.css";

interface AuthTimerSideBtnTextFieldProps extends AuthSideBtnTextFieldProps {
  timerStart: boolean;
  timerStop: boolean;
  timerReset: boolean;
  setTimerValue: (value: number) => void;
}

/**
 * 커스텀 side btn + timer TextField component (MUI TextField 기반)
 * MUI TextField props 참고하여 그대로 사용
 *
 *
 *
 * @param {string} props.sideBtnText - text
 * @param {() => void} props.sideBtnOnClick - onClick
 * @param {boolean} props.sideBtnDisabled - disabled
 *
 * @param {boolean} props.timerStart - 타이머 시작 제어
 * @param {boolean} props.timerStop - 타이머 정지 제어
 * @param {boolean} props.timerReset - 타이머 리셋 제어
 * @param {(value: number) => void} props.setTimerValue - 타이머 값 설정
 *
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
const AuthTimerSideBtnTextField: React.FC<AuthTimerSideBtnTextFieldProps> = ({
  label,
  value,
  placeholder,
  onBlur,
  onChange,
  error,
  helperText,
  sideBtnText = "",
  sideBtnOnClick,
  sideBtnDisabled = false,
  timerStart,
  timerStop,
  timerReset,
  setTimerValue,
  className,
  id,
}) => {
  const [timerId, setTimerId] = useState<NodeJS.Timeout | number>(0);
  const [timeLeft, setTimeLeft] = useState(300); // 300초 = 5분
  const [timerVisible, setTimerVisible] = useState(false);

  useEffect(() => {
    if (timerStart && !timerStop && timeLeft > 0) {
      setTimerVisible(true);
      const id = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      setTimerId(id);

      return () => clearInterval(id);
    }

    if (timeLeft === 0 || timerStop) {
      clearInterval(timerId);
      setTimerVisible(false);
      setTimeLeft(300); // 초기화
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timerStart, timerStop, timeLeft]);

  useEffect(() => {
    if (timerReset) {
      clearInterval(timerId);
      setTimeLeft(300); // 타이머를 300초로 초기화
      setTimerVisible(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timerReset]);

  useEffect(() => {
    if (setTimerValue && timeLeft >= 0) {
      setTimerValue(timeLeft);
    }
  }, [timeLeft, setTimerValue]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? `0${minutes}` : minutes}:${
      remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds
    }`;
  };

  return (
    <AuthTextField
      label={label}
      value={value}
      placeholder={placeholder}
      onBlur={onBlur}
      onChange={onChange}
      error={error}
      helperText={helperText}
      className={"__timer-text-field " + className}
      id={id}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              {timerStart ? (
                <p className={"timer p-medium-medium c-blue" + (timerVisible ? "" : " c-white")}>
                  {timerVisible ? formatTime(timeLeft) : "\u00A0"}
                </p>
              ) : (
                <p className="timer p-medium-medium c-white">&nbsp;</p>
              )}
              <Button variant="contained" onClick={sideBtnOnClick} disabled={sideBtnDisabled}>
                {sideBtnText}
              </Button>
            </InputAdornment>
          ),
        },
      }}
    />
  );
};

export default AuthTimerSideBtnTextField;
