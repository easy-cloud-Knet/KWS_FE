import { useState } from "react";

import toggleClosed from "@/assets/image/vmManage/vmManageUsers/toggleClosed.svg";
import toggleOpened from "@/assets/image/vmManage/vmManageUsers/toggleOpened.svg";

import "./ToggleList.css";

interface ToggleListProps {
  children?: React.ReactNode;
  title?: string;
}

const ToggleList = ({ children, title }: ToggleListProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="toggle-list">
      <div
        className="toggle-header flex justify-start items-center cursor-pointer"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        {isOpen ? <img src={toggleOpened} alt="▾" /> : <img src={toggleClosed} alt="▸" />}
        <span>{title}</span>
      </div>
      {isOpen && <div className="toggle-content flex flex-col">{children}</div>}
    </div>
  );
};

export default ToggleList;
