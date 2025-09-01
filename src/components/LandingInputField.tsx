import { InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

const LandingInputField = ({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      className={twMerge(
        "p-[20px] w-full h-[36px] rounded-[6px] bg-[#F2F8FF] text-(--BlueBlack) text-pr-r-16 focus:outline-none focus:border-[1px] focus:border-(--Main_Blue)",
        className
      )}
      {...props}
    ></input>
  );
};

export default LandingInputField;
