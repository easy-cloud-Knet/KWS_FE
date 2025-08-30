export type Status = "시작" | "중지" | "재부팅" | "삭제";
export type CurrentStatus = "booting" | "launching";
export type UserType = "admin" | "user";

export interface VM {
  id: string;
  vmName: string;
  instanceType: string;
  currentStatus: CurrentStatus;
  status: Status;
  publicIP?: string;
  key: string;
  os: string;
  startTime: string;
  runTime: string;
  userType: UserType;
}

export interface OsList {
  name: string;
  img?: string;
  version: { [key: string]: string }[];
  hardware: string[];
}
