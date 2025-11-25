interface NavBarBellItemProps {
  from: string;
  content: string;
}

const NavBarBellItem = ({ from, content }: NavBarBellItemProps) => {
  return (
    <div className="flex justify-between py-[32px]">
      <div className="flex flex-col gap-[8px]">
        <p className="text-[14px] text-[#8695B6]">from. {from}</p>
        <p className="text-[16px] font-medium">{content}</p>
      </div>
      <div className="flex gap-[8px]">
        <button className="w-[88px] h-[48px] bg-[#007BFF] rounded-[12px] text-[18px] text-white cursor-pointer">
          수락
        </button>
        <button className="w-[88px] h-[48px] bg-[#585E65] rounded-[12px] text-[18px] text-white cursor-pointer">
          거절
        </button>
      </div>
    </div>
  );
};

export default NavBarBellItem;
