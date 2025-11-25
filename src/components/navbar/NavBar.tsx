import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import ic_logo from "@/assets/image/ic_logo.svg";
import ic_arrow_down from "@/assets/image/navbar/ic_arrow_down.svg";
import ic_arrow_up from "@/assets/image/navbar/ic_arrow_up.svg";
import ic_bell from "@/assets/image/navbar/ic_bell.svg";
import ic_bell_with_alarm from "@/assets/image/navbar/ic_bell_with_alarm.svg";
import AuthContext from "@/contexts/AuthContext";

import MuiBtn from "../button/MuiBtn";

import NavBarBellItem from "./NavBarBellItem";
import "./NavBar.css";

type BellItemListType = "invitation" | "join" | "relinquish";

interface BellItemList {
  id: string;
  from: string;
  target: string;
  type: BellItemListType;
}

const bellItemList: BellItemList[] = [
  {
    id: "1",
    from: "미숫가루 (altntrkfn8282@naver.com)",
    target: "VM1",
    type: "invitation",
  },
  {
    id: "2",
    from: "미숫가루 (altntrkfn8282@naver.com)",
    target: "VM1",
    type: "join",
  },
  {
    id: "3",
    from: "미숫가루 (altntrkfn8282@naver.com)",
    target: "VM1",
    type: "relinquish",
  },
];

const NavBar = () => {
  const { isAuthenticated, logout, userNickname, userEmail } =
    useContext(AuthContext)!;
  const navigate = useNavigate();
  const location = useLocation();

  const [openBellDialog, setOpenBellDialog] = useState(false);
  const [isAlarmExist, setIsAlarmExist] = useState(false);
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);

  const onClickLink = (
    event: React.MouseEvent<HTMLAnchorElement>,
    path: string
  ): void => {
    if (location.pathname === path) {
      event.preventDefault(); // 링크 기본 동작 block
      window.location.reload(); // 새로고침 수행
    } else {
      navigate(path);
    }
  };

  const mapTypeToContent = (type: BellItemListType) => {
    switch (type) {
      case "invitation":
        return "에 초대되었습니다.";
      case "join":
        return "에 합류를 요청합니다.";
      case "relinquish":
        return "admin 변경 요청입니다.";
    }
  };

  return (
    <nav className="navbar">
      <Link
        to={isAuthenticated ? "/manage" : "/"}
        className="navbar_logo"
        onClick={(event) => {
          onClickLink(event, "/");
        }}
      >
        <img src={ic_logo} alt="" className="size-[64px]" />
      </Link>
      {!isAuthenticated ? (
        <div className="navbar_login">
          <MuiBtn
            variant="contained"
            className="signin_btn"
            onClick={() => {
              navigate("/signin");
            }}
          >
            로그인
          </MuiBtn>
        </div>
      ) : (
        <div className="flex items-center relative whitespace-nowrap">
          <button
            className="cursor-pointer"
            onClick={() => {
              setOpenBellDialog(!openBellDialog);
            }}
          >
            <img src={!isAlarmExist ? ic_bell : ic_bell_with_alarm} alt="" />
          </button>
          {openBellDialog && (
            <div className="absolute bottom-0 translate-x-[calc(-100%+36px)] translate-y-[calc(100%+16px)] py-[8px] px-[24px] w-[549px] min-h-[120px] rounded-[10px] bg-[#F2F8FF]">
              {bellItemList.map((item, index) => (
                <>
                  <NavBarBellItem
                    key={item.id}
                    from={item.from}
                    content={`[${item.target}] ${mapTypeToContent(item.type)}`}
                  />
                  {index !== bellItemList.length - 1 && (
                    <div className="w-full h-[0.5px] bg-[#E6E7E8]" />
                  )}
                </>
              ))}
            </div>
          )}
          <div className="ml-[12px] mr-[20px] w-[1px] h-[36px] bg-[#E6E7EB]" />
          <p className="p-18-500 c-text1 flex">
            환영합니다,&nbsp;<p className="c-black">{userNickname}</p>&nbsp;
            {userEmail}&nbsp;님!
          </p>
          <button
            className="ml-[8px] size-[24px] cursor-pointer"
            onClick={() => {
              setOpenLogoutDialog(!openLogoutDialog);
            }}
          >
            <img src={!openLogoutDialog ? ic_arrow_down : ic_arrow_up} alt="" />
          </button>
          {openLogoutDialog && (
            <button
              className="absolute top-0 right-0 translate-y-[100%] w-[127px] h-[45px] bg-[#ECEFF3] rounded-b-[4px] text-[18px] font-medium text-[#272B33] cursor-pointer"
              onClick={() => {
                // context 호출
                logout();
                navigate("/");
              }}
            >
              로그아웃
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
