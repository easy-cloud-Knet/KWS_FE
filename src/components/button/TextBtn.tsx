import { twMerge } from "tailwind-merge";

import "./TextBtn.css";

interface TextBtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children?: React.ReactNode;
}

const TextBtn = ({ children, className, ...props }: TextBtnProps) => {
  return (
    <button className={twMerge("__text-btn__", className)} {...props}>
      {children}
    </button>
  );
};

export default TextBtn;
