import { Box, Typography, Slide, TextField, IconButton } from "@mui/material";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import React, { useEffect, useRef, useState } from "react";

import VMManageBtn from "./VMManageBtn";
import VMManageUsers from "./VMManageUsers";
import ImageBtn from "../button/ImageBtn";
import ToggleSwitch from "../button/ToggleSwitch";

import { Status, VM } from "../../types/vm";

import closeBtn from "../../assets/image/button/closeBtn.svg";
import link from "../../assets/image/vmManage/vmManageModal/link.svg";
import user from "../../assets/image/vmManage/vmManageModal/user.svg";

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
      <Slide className="vm-manage-modal" direction="up" in={open} mountOnEnter unmountOnExit>
        <Box
          ref={modalRef}
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "384px",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderTopLeftRadius: "8px",
            borderTopRightRadius: "8px",
            zIndex: 1300,
          }}
        >
          <section className="f-dir-column j-content-between" style={{ height: "100%" }}>
            <div>
              <div className="vm-manage-modal-title j-content-between a-items-start">
                <Typography variant="h6" gutterBottom>
                  <p className="p-18-400">인스턴스 ID:{vm?.id}</p>
                </Typography>
                <div className="title-btn-wrap a-items-center">
                  <ImageBtn src={closeBtn} alt="X" onClick={onClose} />
                </div>
              </div>
              {vm ? (
                <div className="vm-modal-inside j-content-between">
                  <ModalColumn>
                    <Typography>
                      <p className="p-18-400 a-items-center">
                        VM 이름:
                        {!isUnderEditingName ? (
                          <>
                            <span
                              className="c-pointer"
                              onClick={() => setIsUnderEditingName(true)}
                              style={{ marginLeft: "8px" }}
                            >
                              <p className="p-18-400">{vm.vmName}</p>
                            </span>
                            <IconButton size="small" onClick={() => setIsUnderEditingName(true)}>
                              <ModeEditOutlineOutlinedIcon />
                            </IconButton>
                          </>
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
                            sx={{ ml: 1 }}
                          />
                        )}
                      </p>
                    </Typography>
                    <Typography sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <p className="p-18-400">인스턴스 상태: </p>
                      <ToggleSwitch
                        checked={toggleSwitch}
                        onChange={() => setToggleSwitch(!toggleSwitch)}
                      />
                    </Typography>
                    <Typography>
                      <p className="p-18-400">인스턴스 유형: {vm.instanceType}</p>
                    </Typography>
                  </ModalColumn>
                  <ModalColumn>
                    <Typography>
                      <p className="p-18-400">Public IP 주소: {vm.publicIP || "-"}</p>
                    </Typography>
                    <Typography>
                      <p className="p-18-400">키 이름: {vm.key}</p>
                    </Typography>
                    <Typography>
                      <p className="p-18-400">OS: {vm.os}</p>
                    </Typography>
                  </ModalColumn>
                  <ModalColumn>
                    <Typography>
                      <p className="p-18-400">시작 시간: {vm.startTime}</p>
                    </Typography>
                    <Typography>
                      <p className="p-18-400">실행 시간: {vm.runTime}</p>
                    </Typography>
                  </ModalColumn>
                </div>
              ) : (
                <Typography>선택된 VM이 없습니다.</Typography>
              )}
            </div>
          </section>

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
            <VMManageBtn className="link-btn" src={link} onClick={() => {}}>
              연결
            </VMManageBtn>
          </section>
        </Box>
      </Slide>

      <VMManageUsers open={openUserManage} setOpen={setOpenUserManage} />
    </div>
  );
};

const ModalColumn: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="vm-modal-column f-dir-column">{children}</div>;
};

export default VMDetailModal;
