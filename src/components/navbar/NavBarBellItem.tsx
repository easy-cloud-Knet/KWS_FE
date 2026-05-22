import { useState } from "react";
interface NavBarBellItemProps {
  from: string;
  content: string;
  vmId: string; // 추가
  onAccept: (vmId: string) => void;
  onReject: (vmId: string) => void;
  isAdminChange: boolean;
}

const NavBarBellItem = ({
  from,
  content,
  vmId,
  onAccept,
  onReject,
  isAdminChange,
}: NavBarBellItemProps) => {
  const [openModal, setOpenModal] = useState(false);
  const [code, setCode] = useState("");

  return (
    <div className="flex justify-between py-[32px]">
      <div className="flex flex-col gap-[8px]">
        <p className="typo-pr-r-14 text-text1">from. {from}</p>
        <p className="typo-pr-m-16">{content}</p>
      </div>
      <div className="flex gap-[8px]">
        <button
          onClick={() => (isAdminChange ? setOpenModal(true) : onAccept(vmId))}
          className="w-[88px] h-[48px] bg-main-blue rounded-[12px] typo-pr-r-18 text-white cursor-pointer"
        >
          수락
        </button>
        <button
          onClick={() => onReject(vmId)}
          className="w-[88px] h-[48px] bg-red rounded-[12px] typo-pr-r-18 text-white cursor-pointer"
        >
          거절
        </button>

        {openModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white rounded-[20px] p-[40px] w-[480px]">
              <p className="typo-pr-r-14 text-text1">인증번호</p>
              <input
                className="w-full border rounded-[8px] p-[12px] mt-[8px]"
                placeholder="인증번호를 입력해 주세요."
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
              <button
                className="w-full h-[48px] bg-grey2 rounded-[8px] mt-[24px]"
                onClick={() => {
                  onAccept(vmId);
                  setOpenModal(false);
                }}
              >
                인증
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBarBellItem;
