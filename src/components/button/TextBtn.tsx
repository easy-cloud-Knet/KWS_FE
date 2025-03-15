import "./TextBtn.css";

interface TextBtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className: string;
  children: string;
}

const TextBtn = ({ children, className, ...props }: TextBtnProps) => {
  return (
    <button className={`__text-btn__ ${className}`} {...props}>
      {children}
    </button>
  );
};

export default TextBtn;
