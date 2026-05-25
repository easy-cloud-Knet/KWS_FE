import { useContext, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axiosClient from "@/services/api";
import ic_logo from "@/assets/image/new_ic_logo.png";
import ic_arrow_down from "@/assets/image/navbar/ic_arrow_down.svg";
import ic_arrow_up from "@/assets/image/navbar/ic_arrow_up.svg";
import ic_bell from "@/assets/image/navbar/ic_bell.svg";
import ic_bell_with_alarm from "@/assets/image/navbar/ic_bell_with_alarm.svg";
import AuthContext from "@/contexts/AuthContext";
import Cookies from "js-cookie";

import MuiBtn from "../button/MuiBtn";

import NavBarBellItem from "./NavBarBellItem";
import "./NavBar.css";

const NavBar = () => {
  const { isAuthenticated, logout, userNickname, userEmail } =
    useContext(AuthContext)!;
  const navigate = useNavigate();
  const location = useLocation();

  const [openBellDialog, setOpenBellDialog] = useState(false);
  const [isAlarmExist, setIsAlarmExist] = useState(false); // 수정
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);

  const [invitationUsers, setInvitationUsers] = useState<{
    shared_user_invitations: {
      vm_id: string;
      vm_name: string;
      owner_name: string;
      owner_email: string;
      status: string;
      invited_at: string;
    }[];
    admin_change_requests: {
      msg: string;
    }[];
  }>({
    shared_user_invitations: [],
    admin_change_requests: [],
  });

  const onClickLink = (
    event: React.MouseEvent<HTMLAnchorElement>,
    path: string,
  ): void => {
    if (location.pathname === path) {
      event.preventDefault();
      window.location.reload();
    } else {
      navigate(path);
    }
  };

  // fetchInvitations를 useEffect 밖으로 꺼냄 (SSE에서도 호출해야 하니까)
  const fetchInvitations = async () => {
    try {
      const { data } = await axiosClient.get(`/vm/shared-users/invitations`);
      setInvitationUsers(data);
      // pending 항목 있으면 벨 아이콘 활성화
      setIsAlarmExist(
        data.shared_user_invitations.some(
          (item: { status: string }) => item.status === "pending",
        ),
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) return;

    fetchInvitations();

    // 쿠키에서 직접 꺼내기
    const accessToken = Cookies.get("accessToken");

    const eventSource = new EventSource(
      `/api/vm/shared-users/invitations/stream?token=${accessToken}`,
    );

    eventSource.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (data.type === "admin_change_request" || data.type === "invitation") {
        fetchInvitations();
      }
    };

    eventSource.onerror = () => {
      eventSource.close();
    };

    return () => eventSource.close();
  }, [isAuthenticated]);

  const acceptUser = async (vmId: string) => {
    try {
      await axiosClient.patch(`/vm/${vmId}/shared-users/accept`);
      const { data } = await axiosClient.get(`/vm/shared-users/invitations`);
      setInvitationUsers(data);
    } catch (error) {
      console.error(error);
    }
  };

  const rejectUser = async (vmId: string) => {
    try {
      await axiosClient.patch(`/vm/${vmId}/shared-users/reject`);
      const { data } = await axiosClient.get(`/vm/shared-users/invitations`);
      setInvitationUsers(data);
    } catch (error) {
      console.error(error);
    }
  };

  const verifyAdmin = async (vmId: string) => {
    try {
      await axiosClient.post(`/vm/${vmId}/admin/verify`);
      const { data } = await axiosClient.get(`/vm/shared-users/invitations`);
      setInvitationUsers(data);
    } catch (error) {
      console.error(error);
    }
  };

  const rejectAdmin = async (vmId: string) => {
    try {
      await axiosClient.patch(`/vm/${vmId}/admin/reject`);
      const { data } = await axiosClient.get(`/vm/shared-users/invitations`);
      setInvitationUsers(data);
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
              {invitationUsers.shared_user_invitations.filter(
                (item) => item.status === "pending",
              ).length === 0 ? (
                <div className="flex justify-center items-center h-[120px]">
                  <p className="text-grey1 typo-pr-m-18">
                    초대받은 항목이 없습니다🥺
                  </p>
                </div>
              ) : (
                invitationUsers.shared_user_invitations
                  .filter((item) => item.status === "pending") // 수락 시 pending만 필터링 하기
                  .map((item, index) => (
                    <>
                      <NavBarBellItem
                        key={item.vm_id}
                        from={`${item.owner_name} (${item.owner_email})`}
                        content={
                          invitationUsers.admin_change_requests.length > 0
                            ? `[${item.vm_name}] 어드민 변경 요청입니다.`
                            : `[${item.vm_name}] 에 초대되었습니다.`
                        }
                        vmId={item.vm_id}
                        onAccept={
                          invitationUsers.admin_change_requests.length > 0
                            ? verifyAdmin
                            : acceptUser
                        }
                        onReject={
                          invitationUsers.admin_change_requests.length > 0
                            ? rejectAdmin
                            : rejectUser
                        }
                        isAdminChange={
                          invitationUsers.admin_change_requests.length > 0
                        }
                      />
                      {index !==
                        invitationUsers.shared_user_invitations.length - 1 && (
                        <div className="w-full h-[0.5px] bg-[#E6E7E8]" />
                      )}
                    </>
                  ))
              )}
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
