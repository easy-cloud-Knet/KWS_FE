import Cookies from "js-cookie";
import React, { createContext, useState, useEffect, ReactNode } from "react";

import {
  ACCESS_TOKEN_EXP_TIME,
  REFRESH_TOKEN_EXP_TIME,
} from "@/constants/tokenExpireTime";
import axiosClient from "@/services/api";
import { setupAxiosInterceptors } from "@/utils/AxiosInterceptors";

// AuthContext에서 사용할 인터페이스 정의
export interface AuthContextType {
  isAuthenticated: boolean;
  userNickname: string;
  userEmail: string;
  login: (
    accessToken: string,
    refreshToken: string,
    userNickname: string,
    userEmail: string
  ) => void;
  logout: () => void;
  refreshAccessToken: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const accessToken = Cookies.get("accessToken");
    const refreshToken = Cookies.get("refreshToken");
    return !!accessToken && !!refreshToken;
  });
  const [userNickname, setUserNickname] = useState<string>(
    () => localStorage.getItem("userNickname") || "username"
  );
  const [userEmail, setUserEmail] = useState<string>(
    () => localStorage.getItem("userEmail") || ""
  );

  useEffect(() => {
    const accessToken = Cookies.get("accessToken");
    const refreshToken = Cookies.get("refreshToken");
    setIsAuthenticated(!!accessToken && !!refreshToken);
  }, []);

  const login = (
    accessToken: string,
    refreshToken: string,
    userNickname: string,
    userEmail: string
  ) => {
    Cookies.set("accessToken", accessToken, {
      expires: ACCESS_TOKEN_EXP_TIME,
      secure: false,
      sameSite: "Strict",
    });
    Cookies.set("refreshToken", refreshToken, {
      expires: REFRESH_TOKEN_EXP_TIME,
      secure: false,
      sameSite: "Strict",
    });

    setUserNickname(userNickname);
    setUserEmail(userEmail);
    localStorage.setItem("userNickname", userNickname);
    localStorage.setItem("userEmail", userEmail);

    setIsAuthenticated(true);
  };

  const logout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    setUserNickname("username");
    localStorage.removeItem("userNickname");
    localStorage.removeItem("userEmail");
    setIsAuthenticated(false);
  };

  const refreshAccessToken = async (): Promise<string | null> => {
    const refreshToken = Cookies.get("refreshToken");
    if (!refreshToken) {
      logout();
      return null;
    }

    try {
      const response = await axiosClient.post(
        "/users/refresh-access-token",
        {},
        {
          params: {
            refresh_token: refreshToken,
          },
        }
      );
      const { access_token: accessToken } = response.data;
      Cookies.set("accessToken", accessToken, {
        expires: ACCESS_TOKEN_EXP_TIME,
        secure: true,
        sameSite: "Strict",
      });
      setIsAuthenticated(true);
      return accessToken;
    } catch (error) {
      console.error("Access token refresh failed:", error);
      logout();
      return null;
    }
  };

  useEffect(() => {
    // Axios 인터셉터 설정
    setupAxiosInterceptors({ refreshAccessToken, logout });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userNickname,
        userEmail,
        login,
        logout,
        refreshAccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
