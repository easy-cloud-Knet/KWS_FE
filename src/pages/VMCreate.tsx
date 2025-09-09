import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { AxiosError } from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import ubuntu from "@/assets/image/vmCreate/ubuntu.svg";
import addIcon from "@/assets/image/vmManage/button/add.svg";
import AuthTextFieldV2 from "@/components/auth/textField/AuthTextFieldV2";
import MuiBtn from "@/components/button/MuiBtn";
import VMCreateHwDropdown from "@/components/vmCreate/hw_dropdown/HwDropdown";
import VMCreateOsImage from "@/components/vmCreate/VMCreateOsImage";
import VMInfoToBeCreatedItem from "@/components/vmCreate/VMInfoToBeCreatedItem";
import VMManageBtn from "@/components/vmManage/VMManageBtn";
import VMCreateContext, { VMCreateProvider } from "@/contexts/VMCreateContext";
import axiosClient from "@/services/api";
import { OsList } from "@/types/vm";

import "./VMCreate.css";

interface RequiredInput {
  value: string;
  showError: boolean;
}

const VMCreateContent: React.FC = () => {
  const [vmName, setVmName] = useState<RequiredInput>({
    value: "",
    showError: false,
  });
  const osList: OsList[] = [
    {
      name: "Ubuntu",
      img: ubuntu,
      version: [
        { "24.04 LTS": "ubuntu-cloud-24.04.img" },
        { "22.04 LTS": "ubuntu-cloud-22.04.img" },
        // "20.04 LTS",
        // "24.10",
        // "23.10",
        // "23.04",
      ],
      hardware: ["Light (Server)" /*, "Heavy (Storage)", "GPU (AI/ML)"*/],
    },
    // {
    //   name: "CentOS",
    //   img: ubuntu,
    //   version: ["8 Stream", "7 Stream"],
    //   hardware: ["Light (Server)", "Heavy (Storage)"],
    // },
  ];

  const {
    os,
    osVersion,
    osVersionImgName,
    hw,
    setHw,
    openSharedUser,
    setOpenSharedUser,
  } = useContext(VMCreateContext)!;
  const navigate = useNavigate();

  const onCreateVM = async () => {
    try {
      await axiosClient.post("/vm/", {
        name: vmName.value,
        os: osVersionImgName,
        ip: "sadffasd",
      });

      navigate("/");
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data);
      }
      alert("VM 생성에 실패했습니다.");
    }
  };

  return (
    <div className="vm-create flex justify-center size-full ">
      <section className="pt-[40px] w-[81.04166666666667%]">
        <h1 className="h1-bold">인스턴스 생성</h1>
        <section className="flex justify-between gap-[4.0625%] mt-[32px] mb-[56px]">
          <section className="create-section flex-1 max-w-[868px]">
            <div className="mb-[24px]">
              <p className="pl-[32px] h-[75px] a-items-center p-16-500 c-text1">
                인스턴스 정보 입력
              </p>
              <hr className="border-[#E6E7EB]" />
            </div>

            <section className="px-[32px] flex flex-col gap-[56px]">
              <div>
                <p className="p-16-400" style={{ marginBottom: "20px" }}>
                  인스턴스 이름
                </p>
                <AuthTextFieldV2
                  value={vmName.value}
                  placeholder="한글, 영문, 숫자 포함 가능, 2~12자"
                  onBlur={() =>
                    setVmName({ ...vmName, showError: true as boolean })
                  }
                  onChange={(e) =>
                    setVmName({ ...vmName, value: e.target.value as string })
                  }
                  error={vmName.showError && !vmName.value}
                  helperText={vmName.showError && "* 필수"}
                  required
                  style={{ width: "100%" }}
                />
              </div>
              <div className="z-10">
                <p className="p-16-400 mb-[20px]">OS 선택</p>
                <div className="inline-grid grid-cols-4 gap-[20px]">
                  {osList.map((item) => (
                    <VMCreateOsImage key={item.name} item={item} />
                  ))}
                </div>
                <div className="mt-[20px]">
                  <p className="p-16-400 mb-[20px]">하드웨어 선택</p>
                  <VMCreateHwDropdown
                    hardwareList={
                      osList.find((item) => item.name === os)?.hardware || []
                    }
                    hw={hw}
                    setHw={setHw}
                    disabled={!osVersion}
                  />
                </div>
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
                  <FormControlLabel
                    value="private"
                    control={<Radio />}
                    label="private"
                  />
                  <FormControlLabel
                    value="public"
                    control={<Radio />}
                    label="Public"
                  />
                </RadioGroup>
              </div>
            </section>
          </section>
          <section className="create-section w-[39%]">
            <div className="mb-[24px]">
              <p className="pl-[32px] h-[75px] a-items-center p-16-500 c-text1">
                생성될 인스턴스 요약
              </p>
              <hr className="border-[#E6E7EB]" />
            </div>
            <section className="px-[32px] flex flex-col gap-[28px]">
              <VMInfoToBeCreatedItem
                className="w-full"
                title="인스턴스 이름"
                content={vmName.value || "(비어 있음)"}
              />
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
                <MuiBtn
                  className="w-[88px]"
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  취소
                </MuiBtn>
                <VMManageBtn
                  className="add cursor-pointer"
                  src={addIcon}
                  onClick={onCreateVM}
                >
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

const VMCreate = () => {
  return (
    <VMCreateProvider>
      <VMCreateContent />
    </VMCreateProvider>
  );
};

export default VMCreate;
