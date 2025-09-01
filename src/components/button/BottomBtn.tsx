import { Button, ButtonProps } from "@mui/material";

import "./BottomBtn.css";

const BottomBtn: React.FC<ButtonProps> = ({ children, variant, ...props }) => {
  return (
    <Button
      className="__bottom-btn__"
      variant={variant}
      sx={
        variant === "contained"
          ? { background: "#007bff", borderRadius: "10px" }
          : { borderRadius: "10px" }
      }
      {...props}
    >
      <p className="p-18-400">{children}</p>
    </Button>
  );
};

export default BottomBtn;
