import { Button, ButtonProps } from "@mui/material";

import "./BottomBtn.css";

const BottomBtn = ({ children, variant, ...props }: ButtonProps) => {
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
      <p className="typo-pr-r-18">{children}</p>
    </Button>
  );
};

export default BottomBtn;
