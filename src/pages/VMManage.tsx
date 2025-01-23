import {
  Alert,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  Paper,
  Select,
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

type Status = "시작" | "중지" | "재부팅" | "삭제";

interface VM {
  id: string;
  vmName: string;
  status: Status;
  publicIP?: string;
  key: string;
  os: string;
  startTime: string;
  runTime: string;
}

const VMManage: React.FC = () => {
  const [vmList, setVmList] = useState<VM[]>([]);
  const [checkedVMs, setCheckedVMs] = useState<string[]>([]);

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteAlert, setDeleteAlert] = useState({
    show: false,
    success: false,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const vmList: VM[] = [
      {
        id: "123e4567-e89b-12d3-a456-426614174000",
        vmName: "VM1",
        status: "시작",
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
        publicIP: "192.168.1.1",
        key: "key example",
        os: "Ubuntu 24.04 LTS",
        startTime: "2025-01-18 10:00",
        runTime: "5시간",
      },
    ];

    setVmList(vmList);
  }, []);

  const onCloseDeleteDialog = () => {
    setShowDeleteDialog(false);
  };

  const onClickDeleteBtn = () => {
    setVmList((prevList) => prevList.filter((vm) => !checkedVMs.includes(vm.id)));
    setCheckedVMs([]);

    // TODO: API 연결

    setDeleteAlert({ show: true, success: true });
    onCloseDeleteDialog();
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
              <TableCell>Public IP 주소</TableCell>
              <TableCell>키 이름</TableCell>
              <TableCell>OS</TableCell>
              <TableCell>시작 시간</TableCell>
              <TableCell>실행 시간</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vmList.map((vm) => (
              <TableRow key={vm.id} hover selected={checkedVMs.includes(vm.id)}>
                <TableCell padding="checkbox">
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
                <TableCell>
                  <Select
                    sx={{ minWidth: "100px" }}
                    value={vm.status}
                    onChange={(event) => {
                      setVmList((prevList) =>
                        prevList.map((prevVM) =>
                          prevVM.id === vm.id
                            ? { ...prevVM, status: event.target.value as Status }
                            : prevVM
                        )
                      );
                    }}
                  >
                    <MenuItem value="시작">시작</MenuItem>
                    <MenuItem value="중지">중지</MenuItem>
                    <MenuItem value="재부팅">재부팅</MenuItem>
                    <MenuItem value="삭제">삭제</MenuItem>
                  </Select>
                </TableCell>
                <TableCell>{vm.publicIP || "-"}</TableCell>
                <TableCell>{vm.key}</TableCell>
                <TableCell>{vm.os}</TableCell>
                <TableCell>{vm.startTime}</TableCell>
                <TableCell align="center">{vm.runTime}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
export default VMManage;
