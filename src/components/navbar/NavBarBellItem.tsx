interface NavBarBellItemProps {
  from: string;
  content: string;
}

const NavBarBellItem = ({ from, content }: NavBarBellItemProps) => {
  return (
    <div className="flex justify-between py-[32px]">
      <div className="flex flex-col gap-[8px]">
        <p className="typo-pr-r-14 text-text1">from. {from}</p>
        <p className="typo-pr-m-16">{content}</p>
      </div>
      <div className="flex gap-[8px]">
        <button className="w-[88px] h-[48px] bg-main-blue rounded-[12px] typo-pr-r-18 text-white cursor-pointer">
          수락
        </button>
        <button className="w-[88px] h-[48px] bg-[#585E65] rounded-[12px] typo-pr-r-18 text-white cursor-pointer">
          거절
        </button>
      </div>
    </div>
  );
};

export default NavBarBellItem;
