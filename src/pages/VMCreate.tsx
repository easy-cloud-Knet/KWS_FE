import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { AxiosError } from "axios";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import debian from "@/assets/image/vmCreate/debian.png";
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

interface InstanceTypes {
  id: number;
  typename: string;
  vcpu: number;
  ram: number;
  dsk: number;
}

const VMCreateContent: React.FC = () => {
  const [vmName, setVmName] = useState<RequiredInput>({
    value: "",
    showError: false,
  });
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

  // Backend에서 제공하는 인스턴스 타입/OS 목록 (id 매핑용)
  const [instanceTypes, setInstanceTypes] = useState<InstanceTypes[]>([]);
  const [osOptions, setOsOptions] = useState<{ id: number; name: string }[]>(
    []
  );

  // ubuntu-cloud-24.04.img -> nameLabel: ubuntu, versionLabel: 24.04
  const computedOsList: OsList[] = osOptions.map((o) => {
    const dotIdx = o.name.lastIndexOf(".");
    const noExt = dotIdx > -1 ? o.name.slice(0, dotIdx) : o.name;
    const parts = noExt.split("-");
    const nameLabel = parts[0] || noExt;
    const versionLabel = parts.length > 1 ? parts[parts.length - 1] : "";
    return {
      id: o.id,
      name: nameLabel,
      img: nameLabel === "ubuntu" ? ubuntu : debian,
      // label: last segment (version), value: original filename
      version: [{ [versionLabel || noExt]: o.name }],
      hardware: instanceTypes.map((t) => t.typename),
    };
  });

  useEffect(() => {
    const fetchVmRequirements = async () => {
      try {
        const { data } = await axiosClient.get("/vm/");
        setInstanceTypes(data.instance_types || []);
        setOsOptions(data.os || []);
      } catch (error) {
        console.error("Failed to fetch VM requirements", error);
      }
    };
    fetchVmRequirements();
  }, []);

  const onCreateVM = async () => {
    try {
      // 선택된 OS 이미지 파일명(`osVersionImgName`)과 매칭되는 id를 찾고, 없으면 첫 번째 항목 사용
      const selectedOsId =
        osOptions.find((o) => o.name === osVersionImgName)?.id ??
        osOptions[0]?.id;

      const selectedTypeId =
        instanceTypes.find((t) => t.typename === hw)?.id ??
        instanceTypes[0]?.id;

      if (!selectedOsId || !selectedTypeId) {
        alert(
          "VM 생성에 필요한 정보(OS/Instance Type)가 준비되지 않았습니다. 잠시 후 다시 시도해주세요."
        );
        return;
      }

      await axiosClient.post("/vm/", {
        name: vmName.value,
        os_id: selectedOsId,
        ip: "0.0.0.0",
        type_id: selectedTypeId,
        is_public: openSharedUser === "public",
      });

      navigate("/manage");
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
                  {computedOsList.map((item) => (
                    <VMCreateOsImage
                      key={String(item.id ?? item.name)}
                      item={item}
                    />
                  ))}
                </div>
                <div className="mt-[20px]">
                  <p className="p-16-400 mb-[20px]">하드웨어 선택</p>
                  <VMCreateHwDropdown
                    hardwareList={instanceTypes.map((t) => t.typename)}
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
                  title="vCPU"
                  content={instanceTypes.find((t) => t.typename === hw)?.vcpu || "(비어 있음)"}
                />
                <VMInfoToBeCreatedItem
                  className="w-[26.72131147540984%] bg-(--Grey2)"
                  title="Ram"
                  content={instanceTypes.find((t) => t.typename === hw)?.ram || "(비어 있음)"}
                />
                <VMInfoToBeCreatedItem
                  className="w-[26.72131147540984%] bg-(--Grey2)"
                  title="Disk"
                  content={instanceTypes.find((t) => t.typename === hw)?.dsk || "(비어 있음)"}
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
                    navigate("/manage");
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
