import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import { Box, IconButton, Slide, TextField, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

// import closeBtn from "@/assets/image/button/closeBtn.svg";
import link from "@/assets/image/vmManage/vmManageModal/link.svg";
import user from "@/assets/image/vmManage/vmManageModal/user.svg";
import copyBtn from "@/assets/image/vmManage/vmManageModal/copy.svg";
import axiosClient from "@/services/api";
import { CurrentStatus } from "@/types/vm";

// import ImageBtn from "../button/ImageBtn";
import ToggleSwitch from "../button/ToggleSwitch";

import VMManageBtn from "./VMManageBtn";
import VMManageUsers from "./VMManageUsers";

import "./VMManageModal.css";

interface VMDetailModalProps {
  open: boolean;
  vmId: string | null;
  onClose: () => void;
  onChangeStatus: (id: string, newStatus: CurrentStatus) => void;
  onChangeName: (id: string, newName: string) => void;
}

interface VMStatus {
  vm_id: string;
  vm_name: string;
  status: string;
  os: string;
  instance_type: string;
  resources: {
    vcpu: number;
    ram: number;
    disk: number;
  };
  network: {
    ip: string;
  };
  time_info: {
    start_time: string;
    uptime: string;
  };
}

const VMDetailModal = ({
  open,
  vmId,
  onClose,
  // onChangeStatus,
  onChangeName,
}: VMDetailModalProps) => {
  const [isUnderEditingName, setIsUnderEditingName] = useState(false);
  const [vmStatus, setVmStatus] = useState<VMStatus | null>(null);
  const [editedName, setEditedName] = useState<string>("");
  const [toggleSwitch, setToggleSwitch] = useState(false);
  const [isChangingStatus, setIsChangingStatus] = useState(false);

  // 유저 관리 클릭
  const [openUserManage, setOpenUserManage] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axiosClient.get(`/vm/${vmId}/status`);
      setVmStatus(data);
      setEditedName(data.vm_name);

      if (data.status === "start begin" || data.status === "started begin") {
        setToggleSwitch(true);
      } else {
        setToggleSwitch(false);
      }
    };

    if (vmId) {
      fetchData();
    }
  }, [vmId]);

  useEffect(() => {
    if (!vmStatus || isChangingStatus) {
      return;
    }
    const shouldBeOn =
      vmStatus.status === "run" ||
      vmStatus.status === "start begin" ||
      vmStatus.status === "started begin";
    if (toggleSwitch !== shouldBeOn) {
      setToggleSwitch(shouldBeOn);
    }
  }, [vmStatus, toggleSwitch, isChangingStatus]);

  // 바깥 영역 클릭 처리
  useEffect(() => {
    if (!open) return;

    const onClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      // 만약 클릭 대상이 modalRef도 아니고, VMManageUsers 영역(.vm-manage-users)에도 속하지 않으면 onClose 호출
      if (
        modalRef.current &&
        !modalRef.current.contains(target) &&
        !target.closest(".vm-manage-users")
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", onClickOutside);

    return () => {
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, [open, onClose]);

  const onSaveName = async () => {
    if (
      vmStatus &&
      editedName.trim() !== "" &&
      editedName !== vmStatus.vm_name
    ) {
      onChangeName(vmStatus.vm_id, editedName.trim());
      try {
        await axiosClient.patch(`/vm/${vmId}/name`, {
          new_name: editedName.trim(),
        });
      } catch (error) {
        console.error(error);
      }
    }
    setIsUnderEditingName(false);
  };

  const onClickConnectBtn = async () => {
    try {
      const { data } = await axiosClient.get(`/vm/${vmId}/connect`);
      window.open(data.url, "guacamole-console", "noopener,noreferrer");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Slide
        className="vm-manage-modal"
        direction="up"
        in={open}
        mountOnEnter
        unmountOnExit
      >
        <Box
          ref={modalRef}
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "35.5vh",
            minHeight: "300px",
            bgcolor: "background.paper",
            boxShadow: 24,
            borderTopLeftRadius: "8px",
            borderTopRightRadius: "8px",
            zIndex: 1300,
          }}
        >
          <section className="flex flex-col justify-between pt-[44px] pl-[4.167%] pr-[2.8125%] pb-[1.4583%] h-full">
            {vmStatus ? (
              <div className="flex flex-col h-full gap-[19.166267369429803545759463344514%]">
                {/* <div className="flex justify-between items-start">
                  <Typography variant="h6" gutterBottom>
                    <p className="p-18-400">인스턴스 ID: {vmStatus?.vm_id}</p>
                  </Typography>
                  <div className="title-btn-wrap a-items-center">
                    <ImageBtn src={closeBtn} alt="X" onClick={onClose} />
                  </div>
                </div> */}

                <div className="vm-modal-inside flex justify-between h-full">
                  <section className="flex justify-between w-[75.26041666666666666666666666666667%]">
                    <ModalColumn>
                      <Typography>
                        <p className="flex items-center w-full whitespace-nowrap typo-pr-r-18">
                          인스턴스 이름:
                          {!isUnderEditingName ? (
                            <div className="flex items-center ml-[8px] w-full">
                              <span
                                className="w-full cursor-pointer"
                                onClick={() => setIsUnderEditingName(true)}
                              >
                                <p className="w-full typo-pr-r-18 line-clamp-1 overflow-ellipsis">
                                  {editedName}
                                </p>
                              </span>
                              <IconButton
                                size="small"
                                onClick={() => setIsUnderEditingName(true)}
                              >
                                <ModeEditOutlineOutlinedIcon />
                              </IconButton>
                            </div>
                          ) : (
                            <TextField
                              value={editedName}
                              onChange={(event) => {
                                setEditedName(event.target.value);
                              }}
                              onBlur={onSaveName}
                              onKeyDown={(event) => {
                                if (event.key === "Enter") {
                                  onSaveName();
                                }
                              }}
                              size="small"
                              variant="standard"
                              autoFocus
                              sx={{
                                ml: 1,
                                width: "fit-content",
                                fontSize: "18px",
                              }}
                            />
                          )}
                        </p>
                      </Typography>
                      <Typography>
                        <p className="p-18-400">OS: {vmStatus.os}</p>
                      </Typography>
                      <Typography>
                        <p className="p-18-400">
                          인스턴스 유형: {vmStatus.instance_type}
                        </p>
                      </Typography>
                      <Typography>
                        <p className="p-18-400">
                          RAM: {vmStatus.resources.ram}GB
                        </p>
                      </Typography>
                    </ModalColumn>
                    <ModalColumn>
                      <Typography
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          position: "relative",
                        }}
                      >
                        <p className="typo-pr-r-18">인스턴스 상태: </p>
                        <div className="relative size-1">
                          <ToggleSwitch
                            className="absolute top-[50%] left-0 -translate-y-1/2"
                            checked={toggleSwitch}
                            disabled={isChangingStatus}
                            onChange={async () => {
                              if (isChangingStatus || !vmId) {
                                return;
                              }
                              const next = !toggleSwitch;
                              setIsChangingStatus(true);
                              setToggleSwitch(next);
                              try {
                                await axiosClient.patch(`/vm/${vmId}/state`, {
                                  state: next ? "run" : "stop",
                                });
                              } catch {
                                setToggleSwitch(!next);
                              } finally {
                                setIsChangingStatus(false);
                              }
                            }}
                          />
                        </div>
                      </Typography>
                      <Typography>
                        <p className="typo-pr-r-18">
                          Public IP 주소: {vmStatus.network.ip || "-"}
                        </p>
                      </Typography>
                      <Typography>
                        <p className="typo-pr-r-18">
                          vCPU: {vmStatus.resources.vcpu}
                        </p>
                      </Typography>
                      <Typography>
                        <p className="typo-pr-r-18">
                          DISK: {vmStatus.resources.disk}GB
                        </p>
                      </Typography>
                    </ModalColumn>
                    <ModalColumn>
                      <Typography>
                        <p className="typo-pr-r-18">&nbsp;</p>
                      </Typography>
                      <Typography>
                        <p className="typo-pr-r-18">
                          시작 시간: {vmStatus.time_info.start_time}
                        </p>
                      </Typography>
                      <Typography>
                        <p className="typo-pr-r-18">
                          실행 시간: {vmStatus.time_info.uptime}
                        </p>
                      </Typography>
                    </ModalColumn>
                  </section>
                  <section className="bottom-btn-wrap flex justify-end items-end">
                    <VMManageBtn
                      disabled
                      className="user-manage-btn"
                      src={user}
                      onClick={() => {
                        setOpenUserManage(!openUserManage);
                      }}
                    >
                      유저 관리
                    </VMManageBtn>
                    <VMManageBtn
                      className="link-btn"
                      src={link}
                      onClick={onClickConnectBtn}
                    >
                      연결
                    </VMManageBtn>
                  </section>
                </div>
              </div>
            ) : (
              <Typography>선택된 VM이 없습니다.</Typography>
            )}
          </section>
        </Box>
      </Slide>

      <VMManageUsers open={openUserManage} setOpen={setOpenUserManage} />
    </div>
  );
};

const ModalColumn: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  return (
    <div
      className={twMerge("vm-modal-column flex flex-col w-[310px]", className)}
      {...props}
    ></div>
  );
};
export default VMDetailModal;
