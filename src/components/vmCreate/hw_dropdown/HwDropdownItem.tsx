interface HwDropdownItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  setToggle?: React.Dispatch<React.SetStateAction<boolean>>;
}

const HwDropdownItem = ({ children, ...props }: HwDropdownItemProps) => {
  return (
    <button
      className="pl-[20px] w-full h-[48px] bg-white rounded-[10px] text-left hover:text-main-blue hover:bg-bar-blue typo-pr-r-16 cursor-pointer z-20"
      {...props}
    >
      {children}
    </button>
  );
};

export default HwDropdownItem;
