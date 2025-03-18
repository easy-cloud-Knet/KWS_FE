import {
  Alert,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import MuiBtn from "../components/button/MuiBtn";
import VMManageBtn from "../components/vmManage/VMManageBtn";
import VMDetailModal from "../components/vmManage/VMManageModal";

import axiosClient from "../services/api";

import { Status, VM } from "../types/vm";

import { currentStatusMapping, userTypeMapping } from "../utils/MappingToKor";

import booting from "../assets/image/vmManage/booting.svg";
import launching from "../assets/image/vmManage/launching.svg";
import time from "../assets/image/vmManage/time.svg";
import addIcon from "../assets/image/vmManage/button/add.svg";
import deleteIcon from "../assets/image/vmManage/button/delete.svg";
import refreshIcon from "../assets/image/vmManage/button/refresh.svg";

import "./VMManage.css";

const VMManage: React.FC = () => {
  const [vmList, setVmList] = useState<VM[]>([]);
  const [checkedVMs, setCheckedVMs] = useState<string[]>([]);

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteAlert, setDeleteAlert] = useState({
    show: false,
    success: false,
  });

  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedVMId, setSelectedVMId] = useState<string | null>(null);

  const selectedVM = vmList.find((vm) => vm.id === selectedVMId) || null;

  const navigate = useNavigate();

  useEffect(() => {
    const vmList: VM[] = [
      {
        id: "123e4567-e89b-12d3-a456-426614174000",
        vmName: "VM1",
        currentStatus: "booting",
        status: "시작",
        instanceType: "t2.micro",
        publicIP: "192.168.1.1",
        key: "key example",
        os: "Ubuntu 24.04 LTS",
        startTime: "2025-01-18 10:00",
        runTime: "5.5h",
        userType: "admin",
      },
      {
        id: "123e4567-e89b-12d3-a456-426614174001",
        vmName: "VM2",
        currentStatus: "launching",
        status: "시작",
        instanceType: "t2.medium",
        publicIP: "192.168.1.1",
        key: "key example",
        os: "Ubuntu 24.04 LTS",
        startTime: "2025-01-18 10:00",
        runTime: "5.5h",
        userType: "user",
      },
    ];

    setVmList(vmList);
  }, []);

  const onCloseDeleteDialog = () => {
    setShowDeleteDialog(false);
  };

  const onClickDeleteBtn = async () => {
    // TODO: API 연결
    await axiosClient.delete(`/vm/$`);

    setVmList((prevList) => prevList.filter((vm) => !checkedVMs.includes(vm.id)));
    setCheckedVMs([]);

    setDeleteAlert({ show: true, success: true });
    onCloseDeleteDialog();
  };

  // modal 관련 함수들
  const onCloseDetailModal = () => {
    setShowDetailModal(false);
    setSelectedVMId(null);
  };

  const onChangeName = (id: string, newName: string) => {
    setVmList((prevList) => prevList.map((vm) => (vm.id === id ? { ...vm, vmName: newName } : vm)));
  };

  const onChangeStatus = (id: string, newStatus: Status) => {
    setVmList((prevList) =>
      prevList.map((vm) => (vm.id === id ? { ...vm, status: newStatus } : vm))
    );
  };

  return (
    <div className="vm-manage">
      <p className="title p-36-600">VM 리스트</p>

      <div className="vm-manage-btn-wrap j-content-end">
        {checkedVMs.length > 0 && (
          <VMManageBtn
            className="delete"
            src={deleteIcon}
            onClick={() => setShowDeleteDialog(true)}
            disabled={!(checkedVMs.length > 0)}
          >
            삭제
          </VMManageBtn>
        )}
        <VMManageBtn className="refresh" src={refreshIcon} onClick={() => window.location.reload()}>
          갱신
        </VMManageBtn>
        <VMManageBtn className="add" src={addIcon} onClick={() => navigate("/create")}>
          생성
        </VMManageBtn>
      </div>

      <Dialog
        open={showDeleteDialog}
        onClose={onCloseDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="sm"
        fullWidth={true}
      >
        <DialogTitle id="alert-dialog-title" sx={{ marginBottom: "calc(31px - 16px)" }}>
          <p className="p-21-400">VM 삭제</p>
        </DialogTitle>
        <DialogContent>
          <DialogContentText className="f-dir-column" sx={{ gap: "32px" }}>
            <p className="p-16-400 c-black">
              {checkedVMs.length}개의 항목을 정말 삭제하시겠습니까?
            </p>
            <p className="p-16-400 c-black d-flex">
              삭제 시&nbsp;<p className="c-red">되돌릴 수 없습니다.</p>
            </p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <MuiBtn
            variant="contained"
            onClick={onClickDeleteBtn}
            sx={{ width: "96px", background: "var(--BlueBlack, #272B33)" }}
          >
            삭제하기
          </MuiBtn>
          <MuiBtn onClick={onCloseDeleteDialog} autoFocus sx={{ width: "96px" }}>
            취소하기
          </MuiBtn>
        </DialogActions>
      </Dialog>

      {/* 3초 후 삭제 alert */}
      <Snackbar
        open={deleteAlert.show}
        autoHideDuration={3000}
        onClose={() => setDeleteAlert({ ...deleteAlert, show: false })}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity={deleteAlert.success ? "success" : "error"} sx={{ width: "100%" }}>
          {deleteAlert.success ? "성공적으로 삭제되었습니다." : "삭제 중 오류가 발생했습니다."}
        </Alert>
      </Snackbar>

      {/* VM 상세 정보 Modal */}
      {showDetailModal && (
        <VMDetailModal
          open={showDetailModal}
          vm={selectedVM}
          onClose={onCloseDetailModal}
          onChangeStatus={onChangeStatus}
          onChangeName={onChangeName}
        />
      )}

      <TableContainer
        className="table-container"
        component={Paper}
        style={{ marginTop: "20px", width: "86.667vw" }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ height: "59px" }}>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={checkedVMs.length > 0 && checkedVMs.length < vmList.length}
                  checked={vmList.length > 0 && checkedVMs.length === vmList.length}
                  onChange={(event) => {
                    if (event.target.checked) {
                      const allVMIds = vmList.map((vm) => vm.id);
                      setCheckedVMs(allVMIds);
                    } else {
                      setCheckedVMs([]);
                    }
                  }}
                  sx={{ color: "var(--Grey1, #808B96)" }}
                />
              </TableCell>
              <TableCellAttribute>VM 이름</TableCellAttribute>
              <TableCellAttribute>스냅샷</TableCellAttribute>
              <TableCellAttribute>Public IP 주소</TableCellAttribute>
              <TableCellAttribute>유저 역할</TableCellAttribute>
              <TableCellAttribute>인스턴스 상태</TableCellAttribute>
            </TableRow>
          </TableHead>
          <TableBody>
            {vmList.map((vm) => (
              <TableRow
                key={vm.id}
                hover
                selected={checkedVMs.includes(vm.id)}
                onClick={() => {
                  setSelectedVMId(vm.id);
                  setShowDetailModal(true);
                }}
                sx={{ cursor: "pointer" }}
              >
                <TableCell padding="checkbox" onClick={(event) => event.stopPropagation()}>
                  <Checkbox
                    checked={checkedVMs.includes(vm.id)}
                    onChange={() => {
                      // THX to CHATGPT
                      setCheckedVMs((prevSelected) =>
                        // id가 이미 선택된 상태일 경우 제거, 아닐 경우 추가
                        prevSelected.includes(vm.id)
                          ? prevSelected.filter((vmId) => vmId !== vm.id) // 현재의 id를 제외한 나머지 id들만 filter
                          : [...prevSelected, vm.id]
                      );
                    }}
                    sx={{ color: "var(--Grey1, #808B96)" }}
                  />
                </TableCell>
                <TableCell sx={{ width: "25%" }}>
                  <p className="p-16-600">{vm.vmName}</p>
                </TableCell>
                <TableCell>{vm.instanceType}</TableCell>
                <TableCell>{vm.publicIP || "-"}</TableCell>
                <TableCell>
                  <div className={`user-type ${vm.userType} p-16-400 f-center`}>
                    {userTypeMapping(vm.userType)}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="current-status-wrap a-items-center">
                    <div className={`current-status ${vm.currentStatus} p-16-400 f-center`}>
                      <img src={vm.currentStatus === "booting" ? booting : launching} alt="" />
                      {currentStatusMapping(vm.currentStatus)}
                    </div>
                    <div className="runtime a-items-center">
                      <img src={time} alt="" />
                      <p className="p-16-400 c-grey1">{vm.runTime}</p>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
export default VMManage;

const TableCellAttribute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <TableCell>
      <p className="p-14-400 c-grey1">{children}</p>
    </TableCell>
  );
};
