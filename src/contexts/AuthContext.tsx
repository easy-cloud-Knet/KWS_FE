import axios from "axios";
import Cookies from "js-cookie";
import React, { createContext, useState, useEffect, ReactNode } from "react";
import { useLocation } from "react-router-dom";

import { setupAxiosInterceptors } from "../utils/AxiosInterceptors";
import { SERVER_URL } from "../constants/serverUrl";
import { ACCESS_TOKEN_EXP_TIME, REFRESH_TOKEN_EXP_TIME } from "../constants/tokenExpireTime";

// AuthContext에서 사용할 인터페이스 정의
export interface AuthContextType {
  isAuthenticated: boolean;
  userNickname: string;
  login: (accessToken: string, refreshToken: string, userNickname: string) => void;
  logout: () => void;
  refreshAccessToken: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  userNickname: "username",
  login: () => {},
  logout: () => {},
  refreshAccessToken: async () => null,
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userNickname, setUserNickname] = useState<string>(
    () => localStorage.getItem("userNickname") || "username"
  );

  const location = useLocation();

  useEffect(() => {
    const accessToken = Cookies.get("accessToken");
    const refreshToken = Cookies.get("refreshToken");
    setIsAuthenticated(!!accessToken && !!refreshToken);
  }, [location]);

  const login = (accessToken: string, refreshToken: string, userNickname: string) => {
    Cookies.set("accessToken", accessToken, {
      expires: ACCESS_TOKEN_EXP_TIME,
      secure: true,
      sameSite: "Strict",
    });
    Cookies.set("refreshToken", refreshToken, {
      expires: REFRESH_TOKEN_EXP_TIME,
      secure: true,
      sameSite: "Strict",
    });

    setUserNickname(userNickname);
    localStorage.setItem("userNickname", userNickname);
    setIsAuthenticated(true);
  };

  const logout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    setUserNickname("username");
    localStorage.removeItem("userNickname");
    setIsAuthenticated(false);
  };

  const refreshAccessToken = async (): Promise<string | null> => {
    const refreshToken = Cookies.get("refreshToken");
    if (!refreshToken) {
      logout();
      return null;
    }

    try {
      const response = await axios.post(
        `${SERVER_URL}auth/newToken`,
        {},
        {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        }
      );
      const { accessToken } = response.data;
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
      value={{ isAuthenticated, userNickname, login, logout, refreshAccessToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
