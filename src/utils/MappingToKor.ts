import { CurrentStatus, UserType } from "../types/vm";

export const userTypeMapping = (userType: UserType) => {
  if (userType === "admin") {
    return "어드민";
  } else if (userType === "user") {
    return "유저";
  } else {
    return "";
  }
};

export const currentStatusMapping = (currentStatus: CurrentStatus) => {
  if (currentStatus === "prepare begin") {
    return "진행중";
  } else if (currentStatus === "start begin") {
    return "시작중";
  } else if (currentStatus === "started begin") {
    return "실행중";
  } else if (currentStatus === "stopped end") {
    return "중지됨";
  } else if (currentStatus === "release end") {
    return "종료됨";
  } else {
    return "진행중";
  }
};
