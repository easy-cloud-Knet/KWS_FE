import { useContext } from "react";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";

import AuthContext from "../contexts/AuthContext";

import "./NavBar.css";

const NavBar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
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
        className="navbar_logo h5-bold"
        onClick={(event) => {
          onClickLink(event, "/");
        }}
      >
        KWS
      </Link>
      {!isAuthenticated ? (
        <div className="navbar_login">
          <button
            onClick={() => {
              navigate("/signin");
            }}
            className="signin_btn"
          >
            로그인
          </button>
        </div>
      ) : (
        <div className="navbar_login">
          <button
            onClick={() => {
              // context 호출
              logout();
              navigate("/");
            }}
            className="signin_btn"
          >
            로그아웃
          </button>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
