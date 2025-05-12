import React, { useEffect, useRef } from "react";

import VersionDropdownItem from "./VersionDropdownItem";

import useOutsideClick from "../../../hooks/useOutsideClick";

import { OsList } from "../../../types/vm";

import ic_arrow_down from "../../../assets/image/vmCreate/ic_arrow_down.svg";

interface VersionDropdownProps {
  item: OsList;
  osVersion: string;
  setOsVersion: React.Dispatch<React.SetStateAction<string>>;
  setOs: React.Dispatch<React.SetStateAction<string>>;
  toggle: boolean;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

const VersionDropdown: React.FC<VersionDropdownProps> = ({
  item,
  osVersion,
  setOsVersion,
  setOs,
  toggle,
  setToggle,
}) => {
  const currentRef = useRef<HTMLDivElement>(null);
  const { isOutside } = useOutsideClick({ ref: currentRef });

  useEffect(() => {
    if (isOutside) {
      setToggle(false);
    }
  }, [isOutside, setToggle]);

  return (
    <div className="f-center w-full h-full relative" ref={currentRef}>
      <button
        className="absolute bg-transparent cursor-pointer z-10 w-full h-full"
        onClick={() => {
          setToggle(!toggle);
        }}
      ></button>
      <p className="p-14-400 c-text1">{osVersion || "버전 선택"}</p>
      <img className={`${toggle && "rotate-180"}`} src={ic_arrow_down} alt="" />
      {toggle && (
        <div className="absolute top-[40px] left-0 bg-white w-[252px] h-[240px] border-[1px] border-[#E6E7EB] rounded-[10px] overflow-y-scroll">
          {item.version.map((version, index) => (
            <VersionDropdownItem
              key={index}
              item={item}
              setOsVersion={setOsVersion}
              setOs={setOs}
              setToggle={setToggle}
            >
              {version}
            </VersionDropdownItem>
          ))}
        </div>
      )}
    </div>
  );
};

export default VersionDropdown;
