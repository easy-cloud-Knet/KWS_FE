import React, { useContext } from "react";

import VMCreateContext from "@/contexts/VMCreateContext";
import { OsList } from "@/types/vm";

interface VersionDropdownItemProps {
  children: React.ReactNode;
  item: OsList;
  versionObj: { [key: string]: string };
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

const VersionDropdownItem: React.FC<VersionDropdownItemProps> = ({
  children,
  item,
  versionObj,
  setToggle,
  ...props
}) => {
  const { setOsVersion, setOsVersionImgName, setOs } =
    useContext(VMCreateContext)!;

  return (
    <button
      className="w-full h-[48px] p-14-400 bg-white hover:text-(--Main_Blue) hover:bg-[#ECF2FF] cursor-pointer z-10"
      onClick={() => {
        const label = Object.keys(versionObj)[0];
        setOsVersion(label);
        setOsVersionImgName(versionObj[label]);
        setOs(item.name);
        setToggle(false);
      }}
      {...props}
    >
      {children}
    </button>
  );
};

export default VersionDropdownItem;
