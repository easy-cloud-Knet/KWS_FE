import { InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import axiosClient from "../services/api";

import "./VMCreate.css";

interface RequiredInput {
  value: string;
  showError: boolean;
}

const VMCreate: React.FC = () => {
  const [vmName, setVmName] = useState<RequiredInput>({
    value: "",
    showError: false,
  });
  const [os, setOs] = useState<string>("Ubuntu");

  const navigate = useNavigate();

  const onCreateVM = async () => {
    try {
      await axiosClient.post(
        "/vm",
        {},
        {
          params: {
            name: vmName.value,
            os: os,
            ip: "",
          },
        }
      );

      navigate("/");
    } catch {
      alert("VM 생성에 실패했습니다.");
    }
  };

  return (
    <div className="vm-create f-dir-column">
      <h1 className="h1-bold">VM 생성</h1>
      <Stack spacing={2} sx={{ width: 300 }}>
        <TextField
          label="vm 이름"
          value={vmName.value}
          placeholder="vm 이름 *"
          onBlur={() => setVmName({ ...vmName, showError: true as boolean })}
          onChange={(e) => setVmName({ ...vmName, value: e.target.value as string })}
          error={vmName.showError && !vmName.value}
          helperText={vmName.showError && "* 필수"}
          required
        />

        <Stack>
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
            OS 선택
          </InputLabel>
          <Select
            value={os}
            onChange={(e) => {
              setOs(e.target.value as string);
            }}
          >
            <MenuItem value="Ubuntu">Ubuntu 24.04 LTS</MenuItem>
            <MenuItem value="another1">또 뭐써요..?</MenuItem>
            <MenuItem value="another2">몰라요...</MenuItem>
          </Select>
        </Stack>
      </Stack>

      <div>
        <button onClick={() => window.history.back()}>취소</button>
        <button
          onClick={() => {
            if (!vmName.value) {
              setVmName({ ...vmName, showError: true });
              return;
            }
            onCreateVM();
          }}
        >
          생성
        </button>
      </div>
    </div>
  );
};

export default VMCreate;
