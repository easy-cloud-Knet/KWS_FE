import { Button, ButtonProps } from "@mui/material";

const AuthBtn: React.FC<ButtonProps> = ({ children, variant, ...props }) => {
  return (
    <Button
      variant={variant}
      sx={{
        width: "135px",
        height: "61px",
        borderRadius: "12px",
        ...(variant === "contained" && {
          backgroundColor: "#007bff",
          color: "#fff",
        }),
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default AuthBtn;
