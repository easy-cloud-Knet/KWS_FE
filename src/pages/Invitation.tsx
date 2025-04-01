import { useNavigate } from "react-router-dom";

import MuiBtn from "../components/button/MuiBtn";

import "./Invitation.css";

const Invitation = () => {
  const navigate = useNavigate();
  return (
    <section className="invitation f-center">
      <div className="invitation-card p-relative">
        <div className="invitation-inside f-center t-center">
          <div className="invitation-text f-dir-column j-content-between">
            <p className="p-16-400 d-flex">
              <p className="c-blue">닉네임&nbsp;</p>
              <p className="c-text1">(msgr@kw.ac.kr)&nbsp;</p>
              님으로부터&nbsp;<p className="c-blue">VM1</p>에 초대되었습니다.
            </p>
            <p>수락하시겠습니까?</p>
          </div>
        </div>
        <div className="invitation-btn-wrap j-content-between">
          <MuiBtn
            variant="outlined"
            onClick={() => {
              navigate("/");
            }}
          >
            아니오
          </MuiBtn>
          <MuiBtn variant="contained">초대 수락</MuiBtn>
        </div>
      </div>
    </section>
  );
};

export default Invitation;
