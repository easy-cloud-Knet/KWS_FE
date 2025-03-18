import React from "react";

import "./VMManageBtn.css";

interface VMManageBtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  src: string;
  className?: string;
}

const VMManageBtn: React.FC<VMManageBtnProps> = ({ children, src, className, ...props }) => {
  return (
    <button className={"vm-manage-btn default-button " + className} {...props}>
      <img src={src} alt="" />
      {children}
    </button>
  );
};

export default VMManageBtn;
