import { Button, InputAdornment } from "@mui/material";
import AuthTextField from "./AuthTextField";
import { AuthSideBtnTextFieldProps } from "./types/textField";

/**
 * 커스텀 side btn TextField component (MUI TextField 기반)
 * MUI TextField props 참고하여 그대로 사용
 * @param {string} props.sideBtnText - text
 * @param {() => void} props.sideBtnOnClick - onClick
 * @param {boolean} props.sideBtnDisabled - disabled
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
const AuthSideBtnTextField: React.FC<AuthSideBtnTextFieldProps> = ({
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
  className,
  id,
}) => {
  return (
    <AuthTextField
      label={label}
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

export default AuthSideBtnTextField;
