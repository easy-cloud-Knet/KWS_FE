import { useEffect, useRef, useState } from "react";
import { twJoin } from "tailwind-merge";

import ic_arrow_down from "@/assets/image/vmCreate/ic_arrow_down.svg";
import useOutsideClick from "@/hooks/useOutsideClick";

import HwDropdownItem from "./HwDropdownItem";

interface HwDropdownProps {
  hardwareList: string[];
  hw: string;
  setHw: React.Dispatch<React.SetStateAction<string>>;
  disabled?: boolean;
}

const HwDropdown = ({ hardwareList, hw, setHw, disabled = false }: HwDropdownProps) => {
  const [toggle, setToggle] = useState<boolean>(false);

  const currentRef = useRef<HTMLDivElement>(null);
  const { isOutside } = useOutsideClick({ ref: currentRef });

  useEffect(() => {
    if (isOutside) {
      setToggle(false);
    }
  }, [isOutside]);

  return (
    <div className="relative" ref={currentRef}>
      <button
        className={twJoin(
          "pl-[20px] w-full h-[48px] rounded-[10px] border-[1px] border-line text-left",
          disabled ? "bg-grey2 cursor-default" : "cursor-pointer"
        )}
        onClick={() => !disabled && setToggle(!toggle)}
        disabled={disabled}
      >
        {hw || <p className="text-grey1">OS를 선택하세요</p>}
        <img
          className={twJoin("absolute right-[16px] top-[14px]", toggle && "rotate-180")}
          src={ic_arrow_down}
          alt="arrow"
        />
      </button>
      {toggle && !disabled && (
        <div className="absolute w-full h-content bg-white rounded-[10px]">
          {hardwareList.map((item, index) => (
            <HwDropdownItem
              key={index}
              setToggle={setToggle}
              onClick={() => {
                setHw(item);
                setToggle(false);
              }}
            >
              {item}
            </HwDropdownItem>
          ))}
        </div>
      )}
    </div>
  );
};

export default HwDropdown;
