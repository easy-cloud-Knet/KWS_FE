import Cookies from "js-cookie";
import { createContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

// import { setupAxiosInterceptors } from "../utils/AxiosInterceptors";

// import { SERVER_URL } from "../constants/ServerURL.ts";
import { ACCESS_TOKEN_EXP_TIME, REFRESH_TOKEN_EXP_TIME } from "../constants/tokenExpireTime";

const AuthContext = createContext({
  isAuthenticated: false,
  userNickname: "username",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  login: (accessToken: string, refreshToken: string, userNickname: string) => {},
  logout: () => {},
  refreshAccessToken: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userNickname, setUserNickname] = useState(() => {
    // 페이지 로드 시 로컬 스토리지에서 유저 닉네임을 불러옴
    return localStorage.getItem("userNickname") || "username";
  });

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

  const refreshAccessToken = async () => {
    const refreshToken = Cookies.get("refreshToken");
    if (!refreshToken) {
      logout();
      return;
    }

    // try {
    //   const response = await axios.post(
    //     `${SERVER_URL}auth/newToken`,
    //     {},
    //     {
    //       headers: {
    //         Authorization: `Bearer ${refreshToken}`,
    //       },
    //     }
    //   );
    //   const { accessToken } = response.data;
    //   Cookies.set("accessToken", accessToken, {
    //     expires: ACCESS_TOKEN_EXP_TIME,
    //     secure: true,
    //     sameSite: "Strict",
    //   });
    setIsAuthenticated(true);
    //   return accessToken;
    // } catch (error) {
    //   console.error("Access token refresh failed:", error);
    //   logout();
    //   return;
    // }
  };

  useEffect(() => {
    // Axios 인터셉터 설정
    // setupAxiosInterceptors({
    //   refreshAccessToken,
    //   logout,
    // });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userNickname,
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
