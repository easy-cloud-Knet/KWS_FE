import { useState } from "react";

interface NavBarBellItemProps {
  from: string;
  content: string;
  vmId: string;
  onAccept: (vmId: string, code?: string) => void;
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

  const handleCloseModal = () => {
    setOpenModal(false);
    setCode("");
  };

  return (
    <div className="flex justify-between py-[32px]">
      <div className="flex flex-col gap-[8px]">
        <p className="typo-pr-r-14 text-text1">from. {from}</p>
        <p className="typo-pr-m-16">{content}</p>
      </div>
      <div className="flex gap-[8px]">
        <button
          onClick={() => (isAdminChange ? setOpenModal(true) : onAccept(vmId))}
          className="w-[88px] h-[48px] bg-main-blue rounded-[12px] typo-pr-r-18 text-white cursor-pointer hover:opacity-90"
        >
          수락
        </button>
        <button
          onClick={() => onReject(vmId)}
          className="w-[88px] h-[48px] bg-red rounded-[12px] typo-pr-r-18 text-white cursor-pointer hover:opacity-90"
        >
          거절
        </button>

        {openModal && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
            onClick={handleCloseModal}
          >
            <div
              className="bg-white rounded-[20px] p-[40px] w-[480px] relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-[20px] right-[20px] text-grey1 cursor-pointer text-[20px]"
                onClick={handleCloseModal}
              >
                ✕
              </button>

              <p className="typo-pr-r-14 text-text1">인증번호</p>
              <input
                className="w-full border rounded-[8px] p-[12px] mt-[8px] focus:outline-main-blue"
                placeholder="인증번호를 입력해 주세요."
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />

              <div className="flex gap-[12px] mt-[24px]">
                {/* 💡 취소 버튼 배치 */}
                <button
                  className="flex-1 h-[48px] bg-grey3 rounded-[8px] typo-pr-r-16 cursor-pointer"
                  onClick={handleCloseModal}
                >
                  취소
                </button>
                <button
                  disabled={!code.trim()}
                  className={`flex-1 h-[48px] rounded-[8px] typo-pr-r-16 text-white transition-colors
                    ${code.trim() ? "bg-main-blue cursor-pointer" : "bg-grey1 cursor-not-allowed"}`}
                  onClick={() => {
                    onAccept(vmId, code);
                    handleCloseModal();
                  }}
                >
                  인증 완료
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBarBellItem;
