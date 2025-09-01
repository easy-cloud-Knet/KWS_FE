import { Button, InputAdornment } from "@mui/material";

import AuthTextField from "./AuthTextField";
import { AuthSideBtnTextFieldProps } from "./types/textField";

/**
 * 커스텀 side btn TextField component (MUI TextField 기반)
 * MUI TextField props 참고하여 그대로 사용
 * @param {string} props.sideBtnText - text
 * @param {() => void} props.sideBtnOnClick - onClick
 * @param {boolean} props.sideBtnDisabled - disabled
 */
const AuthSideBtnTextField: React.FC<AuthSideBtnTextFieldProps> = ({
  sideBtnText = "",
  sideBtnOnClick,
  sideBtnDisabled = false,
  ...props
}) => {
  return (
    <AuthTextField
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
      {...props}
    />
  );
};

export default AuthSideBtnTextField;
