import React, { useState } from "react";

import VersionDropdown from "./version_dropdown/VersionDropdown";

import { OsList } from "../../types/vm";

interface VMCreateOsImageProps {
  item: OsList;
  setOs: React.Dispatch<React.SetStateAction<string>>;
  osVersion: string;
  setOsVersion: React.Dispatch<React.SetStateAction<string>>;
}

const VMCreateOsImage: React.FC<VMCreateOsImageProps> = ({
  item,
  setOs,
  osVersion,
  setOsVersion,
}) => {
  const [toggle, setToggle] = useState<boolean>(false);

  return (
    <div
      key={item.name}
      className="border-[1px] border-[#E6E7EB] rounded-[10px] w-[160px] h-[151px] flex-col a-items-center z-10"
      onClick={() => {
        setOs(item.name);
      }}
    >
      <img src={item.img} alt={item.name} className="w-[48px] h-[48px] mt-[20px]" />
      <p className="p-16-500" style={{ marginTop: "8px", marginBottom: "16px" }}>
        {item.name}
      </p>
      <hr className="border-[#E6E7EB] w-full" />

      <VersionDropdown
        version={item.version}
        osVersion={osVersion}
        setOsVersion={setOsVersion}
        toggle={toggle}
        setToggle={setToggle}
      />
    </div>
  );
};

export default VMCreateOsImage;
