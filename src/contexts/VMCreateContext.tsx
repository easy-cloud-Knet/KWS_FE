import { createContext, useEffect, useState } from "react";

interface VMCreateContextType {
  os: string;
  setOs: React.Dispatch<React.SetStateAction<string>>;
  osVersion: string;
  setOsVersion: React.Dispatch<React.SetStateAction<string>>;
  osVersionImgName: string;
  setOsVersionImgName: React.Dispatch<React.SetStateAction<string>>;
  hw: string;
  setHw: React.Dispatch<React.SetStateAction<string>>;
  openSharedUser: string;
  setOpenSharedUser: React.Dispatch<React.SetStateAction<string>>;
}

const VMCreateContext = createContext<VMCreateContextType | undefined>(
  undefined
);

export const VMCreateProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [os, setOs] = useState<string>("");
  const [osVersion, setOsVersion] = useState<string>("");
  const [osVersionImgName, setOsVersionImgName] = useState<string>("");
  const [hw, setHw] = useState<string>("");
  const [openSharedUser, setOpenSharedUser] = useState<string>("private");

  const value = {
    os,
    setOs,
    osVersion,
    setOsVersion,
    osVersionImgName,
    setOsVersionImgName,
    hw,
    setHw,
    openSharedUser,
    setOpenSharedUser,
  };

  useEffect(() => {
    setHw("");
  }, [os]);

  return (
    <VMCreateContext.Provider value={value}>
      {children}
    </VMCreateContext.Provider>
  );
};

export default VMCreateContext;
