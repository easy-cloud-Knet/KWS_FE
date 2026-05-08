interface NavBarBellItemProps {
  from: string;
  content: string;
  vmId: string; // 추가
  onAccept: (vmId: string) => void;
  onReject: (vmId: string) => void;
}

const NavBarBellItem = ({
  from,
  content,
  vmId,
  onAccept,
  onReject,
}: NavBarBellItemProps) => {
  return (
    <div className="flex justify-between py-[32px]">
      <div className="flex flex-col gap-[8px]">
        <p className="typo-pr-r-14 text-text1">from. {from}</p>
        <p className="typo-pr-m-16">{content}</p>
      </div>
      <div className="flex gap-[8px]">
        <button
          onClick={() => onAccept(vmId)}
          className="w-[88px] h-[48px] bg-main-blue rounded-[12px] typo-pr-r-18 text-white cursor-pointer"
        >
          수락
        </button>
        <button
          onClick={() => onReject(vmId)}
          className="w-[88px] h-[48px] bg-main-blue rounded-[12px] typo-pr-r-18 text-white cursor-pointer"
        >
          거절
        </button>
      </div>
    </div>
  );
};

export default NavBarBellItem;
