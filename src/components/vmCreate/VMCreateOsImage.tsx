import { useContext, useState } from "react";
import { twJoin } from "tailwind-merge";

import VMCreateContext from "@/contexts/VMCreateContext";
import { OsList } from "@/types/vm";

import VersionDropdown from "./version_dropdown/VersionDropdown";

interface VMCreateOsImageProps {
  item: OsList;
}

const VMCreateOsImage = ({ item }: VMCreateOsImageProps) => {
  const [toggle, setToggle] = useState<boolean>(false);

  const { os, osVersion } = useContext(VMCreateContext)!;
  const isSelected = os === item.name;

  return (
    <div
      key={item.name}
      className={twJoin(
        "relative border-[1px] rounded-[10px] w-[160px] h-[151px] flex flex-col items-center",
        isSelected ? "border-main-blue" : "border-line",
      )}
    >
      <img src={item.img} alt={item.name} className="h-[48px] mt-[20px]" />
      <p className="mt-[8px] mb-[16px] typo-pr-m-16">{item.name}</p>
      <hr className="w-full border-line" />
      <div className="absolute z-[9999] top-full left-0">
        <VersionDropdown
          item={item}
          osVersion={isSelected ? osVersion : ""}
          toggle={toggle}
          setToggle={setToggle}
        />
      </div>
    </div>
  );
};

export default VMCreateOsImage;
