import React from "react";
import { twMerge } from "tailwind-merge";

import "./VMManageBtn.css";

interface VMManageBtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  src: string;
  className?: string;
}

const VMManageBtn = ({
  disabled,
  children,
  src,
  className,
  ...props
}: VMManageBtnProps) => {
  return (
    <button
      {...props}
      disabled={disabled}
      className={twMerge(
        "vm-manage-btn default-button cursor-pointer disabled:cursor-default disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
    >
      <img src={src} alt="" />
      {children}
    </button>
  );
};

export default VMManageBtn;
