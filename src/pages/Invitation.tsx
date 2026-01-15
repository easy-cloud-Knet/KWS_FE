import { useNavigate } from "react-router-dom";

import MuiBtn from "../components/button/MuiBtn";

import "./Invitation.css";

const Invitation = () => {
  const navigate = useNavigate();
  return (
    <section className="invitation flex justify-center items-center">
      <div className="invitation-card relative">
        <p className="absolute top-[24px] left-[32px] text-[21px] font-semibold">사용자 초대</p>
        <div className="invitation-inside flex justify-center items-center text-center">
          <div className="flex flex-col justify-between">
            <p className="typo-pr-r-21 flex">
              <p className="text-main-blue">닉네임&nbsp;</p>
              <p className="text-text1">(msgr@kw.ac.kr)&nbsp;</p>
              님으로부터&nbsp;<p className="text-main-blue">VM1</p>에 초대되었습니다.
            </p>
            <p className="typo-pr-r-21">&nbsp;</p>
            <p className="typo-pr-r-21">수락하시겠습니까?</p>
          </div>
        </div>
        <div className="invitation-btn-wrap flex justify-between">
          <MuiBtn
            variant="text"
            onClick={() => {
              navigate("/manage");
            }}
          >
            아니오
          </MuiBtn>
          <MuiBtn variant="contained" sx={{ width: "119px" }}>
            초대수락
          </MuiBtn>
        </div>
      </div>
    </section>
  );
};

export default Invitation;
