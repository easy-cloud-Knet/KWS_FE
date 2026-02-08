import React from "react";
import { twMerge } from "tailwind-merge";

import "./VMManageBtn.css";

interface VMManageBtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  src: string;
  className?: string;
}

const VMManageBtn = ({
  children,
  src,
  className,
  ...props
}: VMManageBtnProps) => {
  return (
    <button
      {...props}
      disabled={props.disabled}
      className={twMerge(
        "vm-manage-btn default-button cursor-pointer disabled:cursor-default",
        className,
      )}
    >
      <img src={src} alt="" />
      {children}
    </button>
  );
};

export default VMManageBtn;
