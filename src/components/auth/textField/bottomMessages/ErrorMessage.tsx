import { PropsWithChildren } from "react";

import invalid from "@/assets/image/input/invalid.svg";

const ErrorMessage = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex items-center">
      <img src={invalid} alt="" />
      <p className="typo-pr-r-12 text-red">{children}</p>
    </div>
  );
};

export default ErrorMessage;
