import { Button, ButtonProps } from "@mui/material";

const MuiBtn: React.FC<ButtonProps> = ({ children, variant, sx, ...props }) => {
  return (
    <Button
      variant={variant}
      sx={{
        height: "54px",
        borderRadius: "12px",
        ...(variant === "contained" && {
          backgroundColor: "#007bff",
          color: "#fff",
        }),
        ...sx,
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default MuiBtn;
