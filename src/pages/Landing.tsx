import { useNavigate } from "react-router-dom";

import connectorLine from "@/assets/image/landing/connector_line.svg";
import horizontalArrow from "@/assets/image/landing/horizontal_arrow.svg";
import ic_baseline_copyright from "@/assets/image/landing/ic_baseline_copyright.svg";
import rectangle from "@/assets/image/landing/rectangle.svg";
import LandingInputField from "@/components/LandingInputField";

const Landing = () => {
  const navigate = useNavigate();
  return (
    <main className="w-full max-w-[1200px] mx-auto">
      <section className="flex justify-between pt-[169px] w-full h-[calc(100vh-103px)]">
        <div className="flex flex-col justify-between pt-[82px] pb-[68px] h-[502px]">
          <h1 className="text-(--BlueBlack) text-[40px] font-semibold">
            당신의 <span className="text-(--Main_Blue)">아이디어</span>가
            실현되는
            <br />
            가장 빠른 길.
          </h1>
          <div className="flex flex-col gap-[32px]">
            <p className="text-(--BlueBlack) text-[20px] font-normal">
              생각하는 대로, 번거로움 없이. 바로 만드는 컴퓨팅 환경.
              <br />
              도들에서 당신의 가상 머신을 만들어 보세요.
            </p>
            <button
              className="w-full h-[48px] bg-[var(--Main_Blue)] rounded-[10px] text-white font-semibold cursor-pointer"
              onClick={() => {
                navigate("/manage");
              }}
            >
              시작하기
            </button>
          </div>
        </div>
        <div className="w-[486px] h-[502px] bg-[#D9D9D9]"></div>
      </section>
      <section className="flex flex-col items-center pt-[272px] pb-[322px]">
        <div className="w-[714px]">
          <div className="flex justify-end">
            <div className="flex flex-col gap-[56px] pt-[65px]">
              <h1 className="text-[40px] font-semibold whitespace-nowrap">
                손쉬운 <span className="text-(--Main_Blue)">인스턴스 생성</span>
              </h1>
              <p className="text-[20px] font-normal">
                <strong>클릭 단 세 번</strong>으로
                <br />
                원하는 성능의 인스턴스 생성
              </p>
            </div>
            <img className="translate-x-1/2" src={rectangle} alt="" />
          </div>
          <img src={connectorLine} alt="" />
          <div className="flex justify-start">
            <img className="-translate-x-1/2" src={rectangle} alt="" />
            <div className="flex flex-col gap-[56px] pt-[65px]">
              <h1 className="text-[40px] font-semibold whitespace-nowrap">
                <span className="text-(--Main_Blue)">웹 콘솔</span>
              </h1>
              <p className="text-[20px] font-normal whitespace-nowrap">
                별다른 환경설정 없이도
                <br />
                <strong>어느 컴퓨터에서나</strong> 인스턴스에 접속
              </p>
            </div>
          </div>
          <img className="scale-x-[-1]" src={connectorLine} alt="" />
          <div className="flex justify-end">
            <div className="flex flex-col gap-[56px] pt-[65px]">
              <h1 className="text-[40px] font-semibold whitespace-nowrap">
                인스턴스 생성 <span className="text-(--Main_Blue)">자동화</span>
              </h1>
              <p className="text-[20px] font-normal whitespace-nowrap">
                수많은 인스턴스 생성-삭제를
                <br />
                <strong>완전히 자동화</strong>
              </p>
            </div>
            <img className="translate-x-1/2" src={rectangle} alt="" />
          </div>
        </div>
      </section>
      <section className="flex flex-col items-center h-[1080px] pt-[403px]">
        <h1 className="mb-[56px] text-[40px] font-semibold">
          🔽 <span className="text-(--Main_Blue)">사전신청</span> 알림받기 🔽
        </h1>
        <div className="flex items-center gap-[12px] w-[452px]">
          <p className="text-(--BlueBlack) text-[24px] font-semibold whitespace-nowrap">
            이메일:{" "}
          </p>
          <LandingInputField />
        </div>
        <button className="mt-[32px] mb-[12px] w-[452px] h-[48px] bg-(--Main_Blue) rounded-[10px] text-white text-[18px] font-normal cursor-pointer">
          알림받기 신청!
        </button>
        <p className="text-(--Text1) text-[16px] font-normal">
          서비스가 오픈되면 작성해주신 이메일로 알림을 보내드립니다.
        </p>
      </section>
      <section className="flex justify-between h-[1080px] pt-[188px]">
        <div>
          <h1 className="text-(--Main_Blue) text-[32px] font-semibold">
            도들에게 문의해 주세요.
          </h1>
          <img src={horizontalArrow} alt="" />
          <p className="mt-[8px] text-(--Text1) text-[16px] font-normal">
            연락처: contact@doddle.kr
          </p>
        </div>
        <div>
          <section className="pt-[59px] px-[48px] pb-[48px] w-[600px] h-[652px] rounded-[10px] border-[3px] border-[#007BFF]">
            <p className="text-(--BlueBlack) text-[16px] font-normal text-right">
              아래 양식에 맞게 입력 후 전송 부탁드립니다.
            </p>
            <div className="flex flex-col gap-[20px] mt-[20px]">
              <div className="flex justify-between">
                <p className="w-[68.77px] text-[24px] font-semibold text-(--BlueBlack) text-right">
                  제목:
                </p>
                <LandingInputField className="w-[423px]" />
              </div>
              <div className="flex justify-between">
                <p className="text-[24px] font-semibold text-(--BlueBlack) text-right whitespace-nowrap">
                  회사명:
                </p>
                <LandingInputField className="w-[423px]" />
              </div>
              <div className="flex justify-between">
                <p className="text-[24px] font-semibold text-(--BlueBlack) text-right whitespace-nowrap">
                  이메일:
                </p>
                <LandingInputField className="w-[423px]" />
              </div>
              <div className="flex justify-between">
                <p className="w-[68.77px] text-[24px] font-semibold text-(--BlueBlack) text-right">
                  내용:
                </p>
                <textarea className="py-[6px] px-[12px] w-[423px] h-[270px] rounded-[6px] bg-[#F2F8FF] text-(--BlueBlack) text-[16px] font-normal  leading-[150%] focus:outline-none focus:border-[1px] focus:border-[var(--Main_Blue)]" />
              </div>
              <div className="flex justify-end">
                <button className="w-[88px] h-[48px] bg-(--Main_Blue) rounded-[10px] text-white text-[18px] font-normal cursor-pointer">
                  전송
                </button>
              </div>
            </div>
          </section>
          <p className="mt-[20px] text-[16px] font-normal text-(--Text1) text-center">
            앞으로 더욱 만족스러운 서비스를 제공하는 도들이 되겠습니다.
            감사합니다.
          </p>
        </div>
      </section>
      <section className="flex ml-[calc(50%_-_50vw)] mr-[calc(50%_-_50vw)] h-[1080px] pt-[80px] bg-(--Grey2)">
        <div className="flex justify-center items-center gap-[16px] w-full h-fit">
          <img className="size-[36px]" src={ic_baseline_copyright} alt="" />
          <p className="text-[20px] font-normal text-(--BlueBlack)">
            2025, Doddle. All rights reserved.
          </p>
        </div>
      </section>
    </main>
  );
};

export default Landing;
