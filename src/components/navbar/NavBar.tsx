import { useContext, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axiosClient from "@/services/api";
import ic_logo from "@/assets/image/new_ic_logo.png";
import ic_arrow_down from "@/assets/image/navbar/ic_arrow_down.svg";
import ic_arrow_up from "@/assets/image/navbar/ic_arrow_up.svg";
import ic_bell from "@/assets/image/navbar/ic_bell.svg";
import ic_bell_with_alarm from "@/assets/image/navbar/ic_bell_with_alarm.svg";
import AuthContext from "@/contexts/AuthContext";

import MuiBtn from "../button/MuiBtn";

import NavBarBellItem from "./NavBarBellItem";
import "./NavBar.css";

const NavBar = () => {
  const { isAuthenticated, logout, userNickname, userEmail } =
    useContext(AuthContext)!;
  const navigate = useNavigate();
  const location = useLocation();

  const [openBellDialog, setOpenBellDialog] = useState(false);
  const [isAlarmExist] = useState(false);
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);

  const onClickLink = (
    event: React.MouseEvent<HTMLAnchorElement>,
    path: string,
  ): void => {
    if (location.pathname === path) {
      event.preventDefault(); // 링크 기본 동작 block
      window.location.reload(); // 새로고침 수행
    } else {
      navigate(path);
    }
  };

  const [invitationUsers, setInvitationUsers] = useState<{
    shared_user_invitations: {
      vm_id: string;
      vm_name: string;
      owner_name: string;
      owner_email: string;
      status: string;
      invited_at: string;
    }[];
    admin_change_requests: [];
  }>({
    shared_user_invitations: [],
    admin_change_requests: [],
  });

  useEffect(() => {
    const fetchInvitations = async () => {
      try {
        const { data } = await axiosClient.get(`/vm/shared-users/invitations`);
        setInvitationUsers(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchInvitations();
  }, []);

  const acceptUser = async (vmId: string) => {
    try {
      await axiosClient.patch(`/vm/${vmId}/shared-users/accept`);
    } catch (error) {
      console.error(error);
    }
  };

  const rejectUser = async (vmId: string) => {
    try {
      await axiosClient.patch(`/vm/${vmId}/shared-users/reject`);
    } catch (error) {
      console.error(error);
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
        <img src={ic_logo} alt="" className="size-[115px]" />
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
          {openBellDialog && ( //false만 지우면 더미데이터 생성됨
            <div className="absolute bottom-0 translate-x-[calc(-100%+36px)] translate-y-[calc(100%+16px)] py-[8px] px-[24px] w-[549px] min-h-[120px] rounded-[10px] bg-bg-blue2">
              {invitationUsers.shared_user_invitations.map((item, index) => (
                <>
                  <NavBarBellItem
                    key={item.vm_id}
                    from={`${item.owner_name} (${item.owner_email})`}
                    content={`[${item.vm_name}] 에 초대되었습니다.`}
                    vmId={item.vm_id}
                    onAccept={acceptUser}
                    onReject={rejectUser}
                  />
                  {index !==
                    invitationUsers.shared_user_invitations.length - 1 && (
                    <div className="w-full h-[0.5px] bg-[#E6E7E8]" />
                  )}
                </>
              ))}
            </div>
          )}
          <div className="ml-[12px] mr-[20px] w-[1px] h-[36px] bg-[#E6E7EB]" />
          <p className="typo-pr-m-18 text-text1 flex">
            환영합니다,&nbsp;<p className="text-blue-black">{userNickname}</p>
            &nbsp;
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
              className="absolute top-0 right-0 translate-y-[100%] w-[127px] h-[45px] bg-grey2 rounded-b-[4px] text-[18px] font-medium text-blue-black cursor-pointer"
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
