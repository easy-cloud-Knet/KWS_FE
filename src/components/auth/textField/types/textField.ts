import { TextFieldProps } from "@mui/material";

export type AuthSideBtnTextFieldProps = TextFieldProps & {
  sideBtnText: string;
  sideBtnOnClick: () => void;
  sideBtnDisabled: boolean;
};
