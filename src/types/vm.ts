export type Status = "시작" | "중지" | "재부팅" | "삭제";

export interface VM {
  id: string;
  vmName: string;
  instanceType: string;
  status: Status;
  publicIP?: string;
  key: string;
  os: string;
  startTime: string;
  runTime: string;
}
