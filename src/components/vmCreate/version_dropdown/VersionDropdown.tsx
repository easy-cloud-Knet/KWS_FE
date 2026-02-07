import React, { useEffect, useRef } from "react";

import ic_arrow_down from "@/assets/image/vmCreate/ic_arrow_down.svg";
import useOutsideClick from "@/hooks/useOutsideClick";
import { OsList } from "@/types/vm";

import VersionDropdownItem from "./VersionDropdownItem";

interface VersionDropdownProps {
  item: OsList;
  osVersion: string;
  toggle: boolean;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

const VersionDropdown = ({
  item,
  osVersion,
  toggle,
  setToggle,
}: VersionDropdownProps) => {
  const currentRef = useRef<HTMLDivElement>(null);
  const { isOutside } = useOutsideClick({ ref: currentRef });

  useEffect(() => {
    if (isOutside) {
      setToggle(false);
    }
  }, [isOutside, setToggle]);

  return (
    <div
      className="flex items-center justify-center w-full h-full relative"
      ref={currentRef}
    >
      <button
        className="absolute w-full h-full bg-transparent cursor-pointer z-10"
        onClick={() => {
          setToggle(!toggle);
        }}
      ></button>
      <p className="typo-pr-r-14 text-text1">{osVersion || "버전 선택"}</p>
      <img className={`${toggle && "rotate-180"}`} src={ic_arrow_down} alt="" />
      {toggle && (
        <div className="absolute top-full left-0 mt-2 bg-white w-[252px] h-[240px] border-[1px] border-line rounded-[10px] overflow-y-scroll z-[100]">
          {item.version.map((versionObj, index) => {
            return (
              <VersionDropdownItem
                key={index}
                item={item}
                versionObj={versionObj}
                setToggle={setToggle}
              >
                {Object.keys(versionObj)[0]}
              </VersionDropdownItem>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default VersionDropdown;
