import { Button, ButtonProps } from "@mui/material";

import "./BottomBtn.css";

const BottomBtn: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <Button className="__bottom-btn__" sx={{ background: "#007bff" }} {...props}>
      {children}
    </Button>
  );
};

export default BottomBtn;
