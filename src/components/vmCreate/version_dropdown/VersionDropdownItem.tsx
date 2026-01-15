import React, { useContext } from "react";

import VMCreateContext from "@/contexts/VMCreateContext";
import { OsList } from "@/types/vm";

interface VersionDropdownItemProps {
  children: React.ReactNode;
  item: OsList;
  versionObj: { [key: string]: string };
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

const VersionDropdownItem = ({
  children,
  item,
  versionObj,
  setToggle,
  ...props
}: VersionDropdownItemProps) => {
  const { setOsVersion, setOsVersionImgName, setOs } = useContext(VMCreateContext)!;

  return (
    <button
      className="w-full h-[48px] typo-pr-r-14 bg-white hover:text-main-blue hover:bg-bar-blue cursor-pointer z-10"
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
