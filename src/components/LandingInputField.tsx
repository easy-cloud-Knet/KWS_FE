import { InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

const LandingInputField = ({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      className={twMerge(
        "p-[20px] w-full h-[36px] rounded-[6px] bg-[#FFFFFF] text-blue-black typo-pr-r-16 focus:outline-none focus:border-[1px] focus:border-main-blue",
        className,
      )}
      placeholder="알림 받을 이메일을 작성해 주세요."
      {...props}
    ></input>
  );
};

export default LandingInputField;
