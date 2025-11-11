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
  if (currentStatus === "booting") {
    return "부팅중";
  } else if (currentStatus === "launching") {
    return "실행중";
  } else if (currentStatus === "started begin") {
    return "실행중";
  } else {
    return "";
  }
};
