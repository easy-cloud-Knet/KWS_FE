export type Status = "시작" | "중지" | "재부팅" | "삭제";
export type CurrentStatus =
  | "prepare begin"
  | "start begin"
  | "started begin"
  | "stopped end"
  | "release end";
export type UserType = "admin" | "user";

export interface VM {
  id: string;
  vmName: string;
  instanceType: string;
  status: CurrentStatus;
  publicIP?: string;
  key: string;
  os: string;
  startTime: string;
  runTime: string;
  userType: UserType;
}

export interface OsList {
  id?: number;
  name: string;
  img?: string;
  version: { [key: string]: string }[];
  hardware: string[];
}
