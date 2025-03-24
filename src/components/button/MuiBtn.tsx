import { Button, ButtonProps } from "@mui/material";

const MuiBtn: React.FC<ButtonProps> = ({ children, variant, sx, ...props }) => {
  return (
    <Button
      variant={variant}
      sx={{
        height: "48px",
        borderRadius: "12px",
        boxShadow: "none",
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
