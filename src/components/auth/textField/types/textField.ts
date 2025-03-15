import { TextFieldProps } from "@mui/material";

export type AuthSideBtnTextFieldProps = TextFieldProps & {
  sideBtnText: string;
  sideBtnOnClick: () => void;
  sideBtnDisabled: boolean;
};

export interface AuthTextFieldV2Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string | React.ReactNode;
  error?: boolean;
  helperText?: string | React.ReactNode;
  rightElement?: React.ReactNode;
  checkMessageCondition?: boolean;
  checkMessageContent?: string;
  errorMessageCondition?: boolean;
  errorMessageContent?: string;
}
