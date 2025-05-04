interface VersionDropdownItemProps {
  children: React.ReactNode;
  setOsVersion: React.Dispatch<React.SetStateAction<string>>;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

const VersionDropdownItem: React.FC<VersionDropdownItemProps> = ({
  children,
  setOsVersion,
  setToggle,
  ...props
}) => {
  return (
    <button
      className="w-full h-[48px] p-14-400 bg-white hover:text-(--Main_Blue) hover:bg-[#ECF2FF] cursor-pointer z-10"
      onClick={() => {
        setOsVersion(children as string);
        setToggle(false);
      }}
      {...props}
    >
      {children}
    </button>
  );
};

export default VersionDropdownItem;
