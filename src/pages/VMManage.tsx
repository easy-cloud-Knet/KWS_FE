import {
  Alert,
  Button,
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

import { Status, VM } from "../types/vm";

import VMDetailModal from "../components/vmManage/VMManageModal";
import axiosClient from "../services/api";

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
        status: "시작",
        instanceType: "t2.micro",
        publicIP: "192.168.1.1",
        key: "key example",
        os: "Ubuntu 24.04 LTS",
        startTime: "2025-01-18 10:00",
        runTime: "5시간",
      },
      {
        id: "123e4567-e89b-12d3-a456-426614174001",
        vmName: "VM2",
        status: "시작",
        instanceType: "t2.medium",
        publicIP: "192.168.1.1",
        key: "key example",
        os: "Ubuntu 24.04 LTS",
        startTime: "2025-01-18 10:00",
        runTime: "5시간 30분",
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
      <div className="j-content-end">
        <button className="default-button" onClick={() => window.location.reload()}>
          갱신
        </button>
        <button className="default-button" onClick={() => navigate("/create")}>
          생성
        </button>
        <button
          className="default-button"
          onClick={() => setShowDeleteDialog(true)}
          disabled={!(checkedVMs.length > 0)}
        >
          삭제
        </button>
      </div>

      <Dialog
        open={showDeleteDialog}
        onClose={onCloseDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">정말 삭제하시겠습니까?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            삭제된 VM은 복구할 수 없습니다. 삭제하시겠습니까?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCloseDeleteDialog} autoFocus>
            취소
          </Button>
          <Button onClick={onClickDeleteBtn}>삭제</Button>
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

      <TableContainer component={Paper} style={{ marginTop: "20px" }}>
        <Table>
          <TableHead>
            <TableRow>
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
                />
              </TableCell>
              <TableCell>VM 이름</TableCell>
              <TableCell>인스턴스 ID(UUID)</TableCell>
              <TableCell>인스턴스 상태</TableCell>
              <TableCell>인스턴스 유형</TableCell>
              <TableCell>Public IP 주소</TableCell>
              <TableCell>실행 시간</TableCell>
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
                  />
                </TableCell>
                <TableCell>{vm.vmName}</TableCell>
                <TableCell>{vm.id}</TableCell>
                <TableCell>{vm.status}</TableCell>
                <TableCell>{vm.instanceType}</TableCell>
                <TableCell>{vm.publicIP || "-"}</TableCell>
                <TableCell>{vm.runTime}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
export default VMManage;
