interface HwDropdownItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  setToggle?: React.Dispatch<React.SetStateAction<boolean>>;
}

const HwDropdownItem: React.FC<HwDropdownItemProps> = ({ children, ...props }) => {
  return (
    <button
      className="p-16-400 pl-[20px] w-full h-[48px] bg-white rounded-[10px] text-left hover:text-(--Main_Blue) hover:bg-[#ECF2FF] cursor-pointer z-20"
      {...props}
    >
      {children}
    </button>
  );
};

export default HwDropdownItem;
