import {
  Box,
  Typography,
  Select,
  MenuItem,
  Slide,
  TextField,
  IconButton,
  Button,
} from "@mui/material";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import React, { useEffect, useRef, useState } from "react";

import ImageBtn from "../button/ImageBtn";

import { Status, VM } from "../../types/vm";

import closeBtn from "../../assets/image/button/closeBtn.svg";

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
  onChangeStatus,
  onChangeName,
}) => {
  const [isUnderEditingName, setIsUnderEditingName] = useState(false);
  const [editedName, setEditedName] = useState<string>(vm?.vmName || "");

  const modalRef = useRef<HTMLDivElement>(null);

  // 바깥 영역 클릭 처리
  useEffect(() => {
    if (!open) return;

    const onClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
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
    <Slide
      className="vm-manage-modal"
      direction="up"
      in={open}
      mountOnEnter
      unmountOnExit
      ref={modalRef}
    >
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "40%",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
          zIndex: 1300,
        }}
      >
        <div className="vm-manage-modal-title j-content-between a-items-start">
          <Typography variant="h6" gutterBottom>
            <strong>인스턴스 ID:</strong> {vm?.id}
          </Typography>
          <div className="title-btn-wrap a-items-center">
            <Button variant="contained" size="small">
              연결
            </Button>
            <ImageBtn src={closeBtn} alt="X" onClick={onClose} />
          </div>
        </div>
        {vm ? (
          <div className="vm-modal-inside j-content-between">
            <ModalColumn>
              <Typography>
                <strong>VM 이름:</strong>
                {!isUnderEditingName ? (
                  <>
                    <span
                      className="c-pointer"
                      onClick={() => setIsUnderEditingName(true)}
                      style={{ marginLeft: "8px" }}
                    >
                      {vm.vmName}
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
              </Typography>
              <Typography>
                <strong>인스턴스 상태: </strong>
                <Select
                  size="small"
                  sx={{ minWidth: "100px" }}
                  value={vm.status}
                  onChange={(event) => {
                    const newStatus = event.target.value as Status;
                    onChangeStatus(vm.id, newStatus);
                  }}
                  onClick={(event) => event.stopPropagation()}
                  MenuProps={{ disablePortal: true }}
                >
                  <MenuItem value="시작">시작</MenuItem>
                  <MenuItem value="중지">중지</MenuItem>
                  <MenuItem value="재부팅">재부팅</MenuItem>
                  <MenuItem value="삭제">삭제</MenuItem>
                </Select>
              </Typography>
              <Typography>
                <strong>인스턴스 유형:</strong> {vm.instanceType}
              </Typography>
            </ModalColumn>
            <ModalColumn>
              <Typography>
                <strong>Public IP 주소:</strong> {vm.publicIP || "-"}
              </Typography>
              <Typography>
                <strong>키 이름:</strong> {vm.key}
              </Typography>
              <Typography>
                <strong>OS:</strong> {vm.os}
              </Typography>
            </ModalColumn>
            <ModalColumn>
              <Typography>
                <strong>시작 시간:</strong> {vm.startTime}
              </Typography>
              <Typography>
                <strong>실행 시간:</strong> {vm.runTime}
              </Typography>
            </ModalColumn>
          </div>
        ) : (
          <Typography>선택된 VM이 없습니다.</Typography>
        )}
      </Box>
    </Slide>
  );
};

const ModalColumn: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="vm-modal-column f-dir-column">{children}</div>;
};

export default VMDetailModal;
