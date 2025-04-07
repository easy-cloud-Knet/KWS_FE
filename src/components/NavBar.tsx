import { useContext } from "react";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";

import MuiBtn from "./button/MuiBtn";

import AuthContext from "../contexts/AuthContext";

import "./NavBar.css";

const NavBar = () => {
  const { isAuthenticated, logout, userNickname, userEmail } = useContext(AuthContext)!;
  const navigate = useNavigate();
  const location = useLocation();

  const onClickLink = (event: React.MouseEvent<HTMLAnchorElement>, path: string): void => {
    if (location.pathname === path) {
      event.preventDefault(); // 링크 기본 동작 block
      window.location.reload(); // 새로고침 수행
    } else {
      navigate(path);
    }
  };

  return (
    <nav className="navbar">
      <Link
        to="/"
        className="navbar_logo"
        onClick={(event) => {
          onClickLink(event, "/");
        }}
      >
        KWS
      </Link>
      {!isAuthenticated ? (
        <div className="navbar_login">
          <MuiBtn
            variant="contained"
            className="signin_btn"
            onClick={() => {
              navigate("/signin");
            }}
          >
            로그인
          </MuiBtn>
        </div>
      ) : (
        <div className="navbar_login">
          <p className="p-18-500 c-text1 flex">
            환영합니다,&nbsp;<p className="c-black">{userNickname}</p>&nbsp;{userEmail}&nbsp;님!
          </p>
          <MuiBtn
            variant="outlined"
            onClick={() => {
              // context 호출
              logout();
              navigate("/");
            }}
            className="signin_btn"
          >
            로그아웃
          </MuiBtn>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
