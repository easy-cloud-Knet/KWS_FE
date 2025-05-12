import clsx from "clsx";
import React, { useState } from "react";

import VersionDropdown from "./version_dropdown/VersionDropdown";

import { OsList } from "../../types/vm";

interface VMCreateOsImageProps {
  item: OsList;
  setOs: React.Dispatch<React.SetStateAction<string>>;
  osVersion: string;
  setOsVersion: React.Dispatch<React.SetStateAction<string>>;
  selectedOs: string;
}

const VMCreateOsImage: React.FC<VMCreateOsImageProps> = ({
  item,
  setOs,
  osVersion,
  setOsVersion,
  selectedOs,
}) => {
  const [toggle, setToggle] = useState<boolean>(false);
  const isSelected = selectedOs === item.name;

  return (
    <div
      key={item.name}
      className={clsx(
        "border-[1px]  rounded-[10px] w-[160px] h-[151px] flex-col a-items-center z-10",
        isSelected ? "border-(--Main_Blue)" : "border-[#E6E7EB]"
      )}
      onClick={() => {
        setOs(item.name);
        // 선택된 OS가 아닐 경우, '버전 선택'을 띄워주기 위해 ""로 init
        if (!isSelected) {
          setOsVersion("");
        }
      }}
    >
      <img src={item.img} alt={item.name} className="w-[48px] h-[48px] mt-[20px]" />
      <p className="p-16-500" style={{ marginTop: "8px", marginBottom: "16px" }}>
        {item.name}
      </p>
      <hr className="border-[#E6E7EB] w-full" />

      <VersionDropdown
        setOs={setOs}
        version={item.version}
        osVersion={isSelected ? osVersion : ""}
        setOsVersion={setOsVersion}
        toggle={toggle}
        setToggle={setToggle}
      />
    </div>
  );
};

export default VMCreateOsImage;
