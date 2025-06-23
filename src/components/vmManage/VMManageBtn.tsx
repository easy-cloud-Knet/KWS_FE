import clsx from "clsx";
import React from "react";

import "./VMManageBtn.css";

interface VMManageBtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  src: string;
  className?: string;
}

const VMManageBtn: React.FC<VMManageBtnProps> = ({ children, src, className, ...props }) => {
  return (
    <button className={clsx("vm-manage-btn default-button cursor-pointer disabled:cursor-default", className)} {...props}>
      <img src={src} alt="" />
      {children}
    </button>
  );
};

export default VMManageBtn;
