import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthTextFieldV2 from "../components/auth/textField/AuthTextFieldV2";
import VMCreateOsImage from "../components/vmCreate/VMCreateOsImage";

import axiosClient from "../services/api";

import { HardWare, OsList } from "../types/vm";

import ubuntu from "../assets/image/vmCreate/ubuntu.svg";
import addIcon from "../assets/image/vmManage/button/add.svg";

import "./VMCreate.css";
import VMCreateHwDropdown from "../components/vmCreate/hw_dropdown/HwDropdown";
import VMInfoToBeCreatedItem from "../components/vmCreate/VMInfoToBeCreatedItem";
import VMManageBtn from "../components/vmManage/VMManageBtn";
import MuiBtn from "../components/button/MuiBtn";

interface RequiredInput {
  value: string;
  showError: boolean;
}

const VMCreate: React.FC = () => {
  const [vmName, setVmName] = useState<RequiredInput>({
    value: "",
    showError: false,
  });
  // const [osList, setOsList] = useState<OsList[]>([
  const osList: OsList[] = [
    {
      name: "Ubuntu",
      img: ubuntu,
      version: ["24.04 LTS", "22.04 LTS", "20.04 LTS", "24.10", "23.10", "23.04"],
    },
    {
      name: "CentOS",
      img: ubuntu,
      version: ["8 Stream", "7 Stream"],
    },
  ];
  // const [hardwareList, setHardwareList] = useState<HardWare[]>(["Light (Server)", "Heavy (Storage)"]);
  const hardwareList: HardWare[] = ["Light (Server)", "Heavy (Storage)"];
  const [os, setOs] = useState<string>("Ubuntu");
  const [osVersion, setOsVersion] = useState<string>("");
  const [hw, setHw] = useState<HardWare>("Light (Server)");
  const [openSharedUser, setOpenSharedUser] = useState<string>("private");

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
    <div className="vm-create flex justify-center size-full ">
      <section className="pt-[40px] w-[81.04166666666667%]">
        <h1 className="h1-bold">VM 생성</h1>
        <section className="flex justify-between mb-[56px]">
          <section className="create-section w-[55.7840616966581%]">
            <div className="mb-[24px]">
              <p className="pl-[32px] h-[75px] a-items-center p-16-500 c-text1">VM 정보 입력</p>
              <hr className="border-[#E6E7EB]" />
            </div>

            <section className="px-[32px] flex flex-col gap-[56px]">
              <div>
                <p className="p-16-400" style={{ marginBottom: "20px" }}>
                  VM 이름
                </p>
                <AuthTextFieldV2
                  value={vmName.value}
                  placeholder="한글, 영문, 숫자 포함 가능, 2~12자"
                  onBlur={() => setVmName({ ...vmName, showError: true as boolean })}
                  onChange={(e) => setVmName({ ...vmName, value: e.target.value as string })}
                  error={vmName.showError && !vmName.value}
                  helperText={vmName.showError && "* 필수"}
                  required
                  style={{ width: "100%" }}
                />
              </div>
              <div>
                <p className="p-16-400 mb-[20px]">OS 선택</p>
                <div className="inline-grid grid-cols-4 gap-[20px]">
                  {osList.map((item) => (
                    <VMCreateOsImage
                      key={item.name}
                      item={item}
                      setOs={setOs}
                      osVersion={osVersion}
                      setOsVersion={setOsVersion}
                    />
                  ))}
                </div>
              </div>
              <div>
                <p className="p-16-400 mb-[20px]">하드웨어 선택</p>
                <VMCreateHwDropdown hardwareList={hardwareList} hw={hw} setHw={setHw} />
              </div>

              <div>
                <p className="p-16-400 mb-[20px]">Shard User 공개</p>
                <RadioGroup
                  className="flex justify-between w-[50.46082949308756%]"
                  row
                  defaultValue="private"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setOpenSharedUser(event.target.value as unknown as string);
                  }}
                >
                  <FormControlLabel value="private" control={<Radio />} label="private" />
                  <FormControlLabel value="public" control={<Radio />} label="Public" />
                </RadioGroup>
              </div>
            </section>
          </section>
          <section className="create-section w-[39.20308483290488%]">
            <div className="mb-[24px]">
              <p className="pl-[32px] h-[75px] a-items-center p-16-500 c-text1">생성될 VM 요약</p>
              <hr className="border-[#E6E7EB]" />
            </div>
            <section className="px-[32px] flex flex-col gap-[28px]">
              <VMInfoToBeCreatedItem className="w-full" title="VM 이름" content="(비어 있음)" />
              <div className="flex justify-between w-full">
                <VMInfoToBeCreatedItem
                  className="w-[47.43589743589744%]"
                  title="OS"
                  content={osVersion ? os + " " + osVersion : "(비어 있음)"}
                />
                <VMInfoToBeCreatedItem
                  className="w-[47.43589743589744%]"
                  title="Hardware"
                  content={hw ? hw : "(비어 있음)"}
                />
              </div>
              <div className="flex justify-between w-full">
                <VMInfoToBeCreatedItem
                  className="w-[26.72131147540984%] bg-(--Grey2)"
                  title="vGPU"
                  content="1"
                />
                <VMInfoToBeCreatedItem
                  className="w-[26.72131147540984%] bg-(--Grey2)"
                  title="Ram"
                  content="2GB"
                />
                <VMInfoToBeCreatedItem
                  className="w-[26.72131147540984%] bg-(--Grey2)"
                  title="Disk"
                  content="20GB"
                />
              </div>
              <div className="flex justify-between w-full">
                <VMInfoToBeCreatedItem
                  className="w-[47.43589743589744%] bg-(--Grey2)"
                  title="Virtual ether Port"
                  content="1"
                />
                <VMInfoToBeCreatedItem
                  className="w-[47.43589743589744%] bg-(--Grey2)"
                  title="netType"
                  content="isolated"
                />
              </div>
              <VMInfoToBeCreatedItem
                className="w-full"
                title="Shared User"
                content={openSharedUser}
              />

              <div className="flex justify-between w-full">
                <MuiBtn className="w-[88px]">취소</MuiBtn>
                <VMManageBtn className="add cursor-pointer" src={addIcon} onClick={onCreateVM}>
                  생성
                </VMManageBtn>
              </div>
            </section>
          </section>
        </section>
      </section>
    </div>
  );
};

export default VMCreate;
