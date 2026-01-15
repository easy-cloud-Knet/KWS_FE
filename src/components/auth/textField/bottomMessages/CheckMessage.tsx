import { PropsWithChildren } from "react";

import valid from "@/assets/image/input/valid.svg";

const CheckMessage = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex items-center gap-[5px] pl-[3px] mb-[4px]">
      <img src={valid} alt="" />
      <p className="typo-pr-r-12 text-sub-green1">{children}</p>
    </div>
  );
};

export default CheckMessage;
