import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import { Box, Typography, Slide, TextField, IconButton } from "@mui/material";
import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";

import closeBtn from "../../assets/image/button/closeBtn.svg";
import link from "../../assets/image/vmManage/vmManageModal/link.svg";
import user from "../../assets/image/vmManage/vmManageModal/user.svg";
import { Status, VM } from "../../types/vm";
import ImageBtn from "../button/ImageBtn";
import ToggleSwitch from "../button/ToggleSwitch";

import VMManageBtn from "./VMManageBtn";
import VMManageUsers from "./VMManageUsers";

import "./VMManageModal.css";

interface VMDetailModalProps {
  open: boolean;
  vm: VM | null;
  onClose: () => void;
  onChangeStatus: (id: string, newStatus: Status) => void;
  onChangeName: (id: string, newName: string) => void;
}

const VMDetailModal: React.FC<VMDetailModalProps> = ({
  open,
  vm,
  onClose,
  // onChangeStatus,
  onChangeName,
}) => {
  const [isUnderEditingName, setIsUnderEditingName] = useState(false);
  const [editedName, setEditedName] = useState<string>(vm?.vmName || "");
  const [toggleSwitch, setToggleSwitch] = useState(false);

  // 유저 관리 클릭
  const [openUserManage, setOpenUserManage] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);

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

  const onSaveName = () => {
    if (vm && editedName.trim() !== "" && editedName !== vm.vmName) {
      onChangeName(vm.id, editedName.trim());
    }
    setIsUnderEditingName(false);
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
          <section
            className="flex flex-col justify-between pt-[44px] pl-[4.167%] pr-[2.8125%] pb-[1.4583%]"
            style={{ height: "100%" }}
          >
            <div className="flex flex-col h-full gap-[19.166267369429803545759463344514%]">
              <div className="flex justify-between items-start">
                <Typography variant="h6" gutterBottom>
                  <p className="p-18-400">인스턴스 ID: {vm?.id}</p>
                </Typography>
                <div className="title-btn-wrap a-items-center">
                  <ImageBtn src={closeBtn} alt="X" onClick={onClose} />
                </div>
              </div>
              {vm ? (
                <div className="vm-modal-inside j-content-between h-full">
                  <ModalColumn>
                    <Typography>
                      <p className="p-18-400 flex items-center relative">
                        VM 이름:
                        {!isUnderEditingName ? (
                          <div className="flex items-center absolute left-[40%]">
                            <span
                              className="c-pointer"
                              onClick={() => setIsUnderEditingName(true)}
                              style={{ marginLeft: "8px" }}
                            >
                              <p className="p-18-400">{vm.vmName}</p>
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
                              position: "absolute",
                              left: "40%",
                              ml: 1,
                              fontSize: "18px",
                            }}
                          />
                        )}
                      </p>
                    </Typography>
                    <Typography
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        position: "relative",
                      }}
                    >
                      <p className="p-18-400">인스턴스 상태: </p>
                      <div className="relative size-1">
                        <ToggleSwitch
                          className="absolute top-[50%] left-0 -translate-y-1/2"
                          checked={toggleSwitch}
                          onChange={() => setToggleSwitch(!toggleSwitch)}
                        />
                      </div>
                    </Typography>
                    <Typography>
                      <p className="p-18-400">
                        인스턴스 유형: {vm.instanceType}
                      </p>
                    </Typography>
                  </ModalColumn>
                  <ModalColumn>
                    <Typography>
                      <p className="p-18-400">
                        Public IP 주소: {vm.publicIP || "-"}
                      </p>
                    </Typography>
                    <Typography>
                      <p className="p-18-400">키 이름: {vm.key}</p>
                    </Typography>
                    <Typography>
                      <p className="p-18-400">OS: {vm.os}</p>
                    </Typography>
                  </ModalColumn>
                  <ModalColumn className="w-[40.452111838191552647233789411065%]">
                    <Typography>
                      <p className="p-18-400">시작 시간: {vm.startTime}</p>
                    </Typography>
                    <Typography>
                      <p className="p-18-400">실행 시간: {vm.runTime}</p>
                    </Typography>
                    <Typography>
                      <section className="bottom-btn-wrap j-content-end">
                        <VMManageBtn
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
                          onClick={() => {}}
                        >
                          연결
                        </VMManageBtn>
                      </section>
                    </Typography>
                  </ModalColumn>
                </div>
              ) : (
                <Typography>선택된 VM이 없습니다.</Typography>
              )}
            </div>
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
      className={clsx("vm-modal-column flex flex-col", className)}
      {...props}
    ></div>
  );
};

export default VMDetailModal;
