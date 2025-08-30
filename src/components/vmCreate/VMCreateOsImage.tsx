import clsx from "clsx";
import React, { useContext, useState } from "react";


import VMCreateContext from "../../contexts/VMCreateContext";
import { OsList } from "../../types/vm";

import VersionDropdown from "./version_dropdown/VersionDropdown";

interface VMCreateOsImageProps {
  item: OsList;
}

const VMCreateOsImage: React.FC<VMCreateOsImageProps> = ({ item }) => {
  const [toggle, setToggle] = useState<boolean>(false);

  const { os, setOs, osVersion, setOsVersion } = useContext(VMCreateContext)!;
  const isSelected = os === item.name;

  return (
    <div
      key={item.name}
      className={clsx(
        "border-[1px]  rounded-[10px] w-[160px] h-[151px] flex-col a-items-center z-10",
        isSelected ? "border-(--Main_Blue)" : "border-[#E6E7EB]"
      )}
    >
      <img src={item.img} alt={item.name} className="w-[48px] h-[48px] mt-[20px]" />
      <p className="p-16-500" style={{ marginTop: "8px", marginBottom: "16px" }}>
        {item.name}
      </p>
      <hr className="border-[#E6E7EB] w-full" />

      <VersionDropdown
        item={item}
        osVersion={isSelected ? osVersion : ""}
        setOsVersion={setOsVersion}
        setOs={setOs}
        toggle={toggle}
        setToggle={setToggle}
      />
    </div>
  );
};

export default VMCreateOsImage;
