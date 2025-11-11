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

import booting from "../assets/image/vmManage/booting.svg";
import addIcon from "../assets/image/vmManage/button/add.svg";
import deleteIcon from "../assets/image/vmManage/button/delete.svg";
import refreshIcon from "../assets/image/vmManage/button/refresh.svg";
import launching from "../assets/image/vmManage/launching.svg";
import time from "../assets/image/vmManage/time.svg";
import MuiBtn from "../components/button/MuiBtn";
import VMManageBtn from "../components/vmManage/VMManageBtn";
import VMDetailModal from "../components/vmManage/VMManageModal";
import axiosClient from "../services/api";
import { Status, VM } from "../types/vm";
import { currentStatusMapping, userTypeMapping } from "../utils/MappingToKor";

import "./VMManage.css";

interface VMInitStatus {
  vm_id: string;
  vm_name: string;
  is_owner: string;
  instance_type: string;
  os: string;
  ip: string;
  status: string;
  uptime: string;
}

const VMManage: React.FC = () => {
  const [vmList, setVmList] = useState<VM[]>([]);
  const [checkedVMs, setCheckedVMs] = useState<string[]>([]);

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteAlert, setDeleteAlert] = useState({
    show: false,
    success: false,
    message: "",
  });

  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedVMId, setSelectedVMId] = useState<string | null>(null);

  // const selectedVM = vmList.find((vm) => vm.id === selectedVMId) || null;

  const navigate = useNavigate();

  useEffect(() => {
    try {
      const fetchData = async () => {
        const { data } = await axiosClient.get("/vm/status");

        setVmList(
          data.map((vm: VMInitStatus) => ({
            id: vm.vm_id,
            vmName: vm.vm_name,
            currentStatus: vm.status,
            status: vm.status,
            instanceType: vm.instance_type,
            publicIP: vm.ip,
            key: vm.is_owner,
            os: vm.os,
            startTime: vm.uptime,
            runTime: vm.uptime,
            userType: vm.is_owner,
          }))
        );
      };

      fetchData();
    } catch (error) {
      console.error(error);
    }
  }, []);

  const onCloseDeleteDialog = () => {
    setShowDeleteDialog(false);
  };

  const onClickDeleteBtn = async () => {
    try {
      // 삭제 요청 병렬 수행
      const results = await Promise.allSettled(
        checkedVMs.map((vmId) => axiosClient.delete(`/vm/${vmId}`))
      );

      const succeeded: string[] = [];
      const failed: string[] = [];
      results.forEach((res, idx) => {
        if (res.status === "fulfilled") {
          succeeded.push(checkedVMs[idx]);
        } else {
          failed.push(checkedVMs[idx]);
        }
      });

      // 3) 성공한 VM만 리스트에서 제거 - 추후 fetch 로직 호출로 변경
      if (succeeded.length > 0) {
        setVmList((prev) => prev.filter((vm) => !succeeded.includes(vm.id)));
      }
      setCheckedVMs([]);
      onCloseDeleteDialog();

      if (failed.length === 0) {
        setDeleteAlert({
          show: true,
          success: true,
          message: "선택한 VM을 모두 성공적으로 삭제했습니다.",
        });
      } else if (succeeded.length > 0) {
        setDeleteAlert({
          show: true,
          success: false,
          message: `총 ${
            failed.length
          }개의 VM 삭제에 실패했습니다: ${failed.join(", ")}`,
        });
      } else {
        setDeleteAlert({
          show: true,
          success: false,
          message: "VM 삭제에 실패했습니다.",
        });
      }
    } catch {
      setDeleteAlert({
        show: true,
        success: false,
        message: "삭제 요청 중 예기치 않은 오류가 발생했습니다.",
      });
    }
  };

  // modal 관련 함수들
  const onCloseDetailModal = () => {
    setShowDetailModal(false);
    setSelectedVMId(null);
  };

  const onChangeName = (id: string, newName: string) => {
    setVmList((prevList) =>
      prevList.map((vm) => (vm.id === id ? { ...vm, vmName: newName } : vm))
    );
  };

  const onChangeStatus = (id: string, newStatus: Status) => {
    setVmList((prevList) =>
      prevList.map((vm) => (vm.id === id ? { ...vm, status: newStatus } : vm))
    );
  };

  return (
    <div className="vm-manage">
      <p className="title p-36-600">인스턴스 리스트</p>

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
        <VMManageBtn
          className="refresh"
          src={refreshIcon}
          onClick={() => window.location.reload()}
        >
          갱신
        </VMManageBtn>
        <VMManageBtn
          className="add"
          src={addIcon}
          onClick={() => navigate("/create")}
        >
          생성
        </VMManageBtn>
      </div>

      {/* 삭제 Dialog */}
      <Dialog
        open={showDeleteDialog}
        onClose={onCloseDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="sm"
        fullWidth={true}
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{ marginBottom: "calc(31px - 16px)" }}
        >
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
          <MuiBtn
            onClick={onCloseDeleteDialog}
            autoFocus
            sx={{ width: "96px" }}
          >
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
        <Alert
          severity={deleteAlert.success ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {deleteAlert.message}
        </Alert>
      </Snackbar>

      {/* VM 상세 정보 Modal */}
      {showDetailModal && (
        <VMDetailModal
          open={showDetailModal}
          vmId={selectedVMId}
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
                  indeterminate={
                    checkedVMs.length > 0 && checkedVMs.length < vmList.length
                  }
                  checked={
                    vmList.length > 0 && checkedVMs.length === vmList.length
                  }
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
              <TableCellAttribute>인스턴스 이름</TableCellAttribute>
              <TableCellAttribute>인스턴스 유형</TableCellAttribute>
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
                <TableCell
                  padding="checkbox"
                  onClick={(event) => event.stopPropagation()}
                >
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
                    <div
                      className={`current-status ${vm.currentStatus} p-16-400 f-center`}
                    >
                      <img
                        src={
                          vm.currentStatus === "booting" ? booting : launching
                        }
                        alt=""
                      />
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

const TableCellAttribute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <TableCell>
      <p className="p-14-400 c-grey1">{children}</p>
    </TableCell>
  );
};
