import { useEffect, useRef, useState } from "react";

import HwDropdownItem from "./HwDropdownItem";

import useOutsideClick from "../../../hooks/useOutsideClick";

import { HardWare } from "../../../types/vm";

import ic_arrow_down from "../../../assets/image/vmCreate/ic_arrow_down.svg";

interface HwDropdownProps {
  hardwareList: HardWare[];
  hw: string;
  setHw: React.Dispatch<React.SetStateAction<HardWare>>;
}

const HwDropdown: React.FC<HwDropdownProps> = ({ hardwareList, hw, setHw }) => {
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
        className="pl-[20px] w-full h-[48px] rounded-[10px] border-[1px] border-(--Line) cursor-pointer text-left"
        onClick={() => setToggle(!toggle)}
      >
        {hw}
        <img
          className={`absolute right-[16px] top-[14px] ${toggle && "rotate-180"}`}
          src={ic_arrow_down}
          alt="arrow"
        />
      </button>
      {toggle && (
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
