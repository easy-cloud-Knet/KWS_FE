import { Dialog, DialogActions, DialogContent, DialogContentText } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

import ToggleList from "./ToggleList";
import AuthTextFieldV2 from "../auth/textField/AuthTextFieldV2";
import MuiBtn from "../button/MuiBtn";
import TextBtn from "../button/TextBtn";

import deletion from "../../assets/image/vmManage/vmManageUsers/delete.svg";
import succession from "../../assets/image/vmManage/vmManageUsers/succession.svg";

import "./VMManageUsers.css";

interface VMManageUsersProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const VMManageUsers: React.FC<VMManageUsersProps> = ({ open, setOpen }) => {
  const handleClose = (reason: string) => {
    if (reason === "backdropClick") {
      setOpen(false);
    }
  };

  const descriptionElementRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <Dialog
      className="vm-manage-users"
      open={open}
      onClose={handleClose}
      scroll={"paper"}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <section className="vm-manage-users-header f-dir-column">
        <p className="p-16-400">사용자 초대</p>
        <div className="input-wrap j-content-between">
          <div className="input">
            <AuthTextFieldV2 placeholder="이메일 아이디" />
          </div>
          <MuiBtn variant="contained" sx={{ width: "88px" }}>
            전송
          </MuiBtn>
        </div>
      </section>

      <section className="flex-col j-content-between h-full">
        <DialogContent className="contents" dividers={false}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
            sx={{ paddingBottom: "12px", maxHeight: "260px", overflowY: "scroll" }}
          >
            <section className="admin-list user-list">
              <h4 className="p-14-400 c-grey1">admin</h4>
              <p className="user-name p-16-400 c-black">미숫가루</p>
            </section>

            <section className="shared-user-list user-list">
              <h4 className="p-14-400 c-grey1">shared user</h4>
              <User email="msgr@kw.ac.kr">미숫가루</User>
              <User email="msgr@kw.ac.kr">미숫가루</User>
            </section>

            <ToggleList title="대기중">
              <p className="p-16-400 c-black">pizza1</p>
              <p className="p-16-400 c-black">pizza2</p>
            </ToggleList>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <MuiBtn variant="text" onClick={() => setOpen(false)}>
            확인
          </MuiBtn>
        </DialogActions>
      </section>
    </Dialog>
  );
};

export default VMManageUsers;

interface UserProps {
  children?: React.ReactNode;
  email?: string;
}

const User: React.FC<UserProps> = ({ children, email }) => {
  const [hover, setHover] = useState(false);
  const userRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const userElement = userRef.current;
    const handleMouseEnter = () => {
      setHover(true);
    };
    const handleMouseLeave = () => {
      setHover(false);
    };
    userElement?.addEventListener("mouseenter", handleMouseEnter);
    userElement?.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      userElement?.removeEventListener("mouseenter", handleMouseEnter);
      userElement?.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="user j-content-between a-items-center" ref={userRef}>
      <div className="flex">
        <p className="user-name p-16-400 c-black">{children}</p>
        <p className="user-name p-16-400 c-grey1">{email}</p>
      </div>
      {hover && (
        <div className="user-btn-wrap a-items-center">
          <TextBtn className="user-btn-inside-wrap a-items-center">
            <img src={deletion} alt="X" />
            <p className="p-12-400 c-red">삭제</p>
          </TextBtn>

          <TextBtn className="user-btn-inside-wrap a-items-center">
            <img src={succession} alt="->" />
            <p className="p-12-400 c-blue">admin 계승</p>
          </TextBtn>
        </div>
      )}
    </div>
  );
};
