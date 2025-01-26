import { TextFieldProps } from "@mui/material";

export interface AuthTextFieldProps {
  label: string;
  value: string;
  placeholder: string;
  error: boolean;
  helperText: string;

  onBlur?: () => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  id?: string;
  type?: string;
  slotProps?: TextFieldProps["slotProps"];
}

export interface AuthSideBtnTextFieldProps extends AuthTextFieldProps {
  sideBtnText: string;
  sideBtnOnClick: () => void;
  sideBtnDisabled: boolean;
}
