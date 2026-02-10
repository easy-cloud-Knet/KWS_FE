import { useNavigate } from "react-router-dom";
import horizontalArrow from "@/assets/image/landing/horizontal_arrow.svg";
import LandingInputField from "@/components/LandingInputField";
import ic_baseline_copyright from "@/assets/image/landing/ic_baseline_copyright.svg";
import icon1 from "@/assets/image/landing/icon1.png";
import icon2 from "@/assets/image/landing/icon2.png";
import icon3 from "@/assets/image/landing/icon3.png";
import cloud from "@/assets/image/landing/cloud.png";
import third_page from "@/assets/image/landing/third_page.png";

const Landing = () => {
  const navigate = useNavigate();
  return (
    <main className="w-full mx-auto">
      {" "}
      {/*max-w-[1200px]가 자꾸 방해해서 일단 잠시 지움*/}
      <div className="absolute inset-x-1/2 -translate-x-1/2 w-full h-full bg-[var(--BG_Blue2)] -z-10" />
      <img
        src={cloud}
        alt=""
        className="absolute pointer-events-none size-[655px] transform -scale-x-100 mx-auto mt-[-140px] ml-[15px] blur-[18px]"
      />
      <img
        src={cloud}
        alt=""
        className="absolute pointer-events-none size-[1558px] mx-auto mt-[-230px] ml-[600px] blur-[5px] overflow-hidden"
      />
      <section className="flex justify-center items-center w-full h-[calc(100vh-290px)]">
        <div className="flex flex-col justify-between pt-[82px] pb-[68px] h-[502px]">
          <h1 className="text-(--BlueBlack) text-[96px] font-semibold text-center">
            당신의 <span className="text-(--Main_Blue)">아이디어</span>가
            실현되는
            <br />
            가장 빠른 길.
          </h1>
          <div className="flex flex-col gap-[32px]">
            <p className="text-(--BlueBlack) text-[20px] font-normal text-center mt-[25px]">
              생각하는 대로, 번거로움 없이. 바로 만드는 컴퓨팅 환경.
              <br />
              도들에서 당신의 가상 머신을 만들어 보세요.
            </p>
            <button
              className="block mx-auto w-[452px] h-[48px] bg-[var(--Main_Blue)] rounded-[10px] 
                         text-white font-semibold cursor-pointer mt-[50px]"
              onClick={() => {
                navigate("/manage");
              }}
            >
              시작하기
            </button>
          </div>
        </div>
      </section>
      <section className="flex flex-col items-center pt-[540px] pb-[322px]">
        <h1 className="text-[64px] font-semibold whitespace-nowrap text-center mb-[100px]">
          어디서든, 클릭 단 세 번으로 생성
        </h1>

        <div className="w-full flex justify-center">
          <div className="flex gap-[80px] justify-start">
            <div
              className="w-[448px] h-[403px] bg-white rounded-[20px]
                      shadow-[0_0_24px_10px_#007BFF12]
                      p-[32px]"
            >
              <div className="py-[32px]">
                <img src={icon1} alt="" className="size-[70px]" />
              </div>
              <p className="text-[40px] font-semibold whitespace-nowrap pb-[25px]">
                손쉬운 <span className="text-(--Main_Blue)">인스턴스 생성</span>
              </p>
              <p className="text-[24px] font-semibold text-(--Grey3)">
                클릭 단 세 번{" "}
                <span className="font-normal">
                  으로
                  <br /> 원하는 성능의 인스턴스 생성
                </span>
              </p>
            </div>

            <div
              className="w-[448px] min-h-[403px] bg-white rounded-[20px]
                      shadow-[0_0_24px_10px_#007BFF12]
                      p-[32px]"
            >
              <div className="py-[32px]">
                <img src={icon2} alt="" className="size-[70px]" />
              </div>
              <p className="text-[40px] font-semibold whitespace-nowrap pb-[25px]">
                간편한 <span className="text-(--Main_Blue)">웹 콘솔</span>
              </p>
              <p className="text-[24px] font-normal text-(--Grey3)">
                별다른 환경설정 없이도
                <br />
                <span className="font-semibold">어느 컴퓨터에서나 </span>{" "}
                인스턴스에 접속
              </p>
            </div>

            <div
              className="w-[448px] min-h-[403px] bg-white rounded-[20px]
                      shadow-[0_0_24px_10px_#007BFF12]
                      p-[32px]"
            >
              <div className="py-[32px]">
                <img src={icon3} alt="" className="size-[70px]" />
              </div>
              <p className="text-[40px] font-semibold whitespace-nowrap pb-[25px]">
                인스턴스 생성 <span className="text-(--Main_Blue)">자동화</span>
              </p>
              <p className="text-[24px] font-normal text-(--Grey3)">
                수많은 인스턴스 생성-삭제를
                <br />
                <span className="font-semibold"> 완전히 자동화</span>
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="flex flex-col items-center pt-[272px] pb-[322px]">
        <div className="absolute top-[2464px] left-[-170px] w-[2261px] h-[1272px] bg-[radial-gradient(ellipse_at_center,rgba(0,123,255,1),transparent_30%)] blur-[500px] pointer-events-none z-10" />
        <div className="relative z-50">
          <div className="w-full flex justify-center">
            <div className="flex justify-start">
              <div className="w-[1520px] h-[673px] grid grid-cols-[656px_426px_1fr] grid-rows-[310px_1fr] gap-[90px]">
                {/* 왼쪽 큰 카드 */}
                <div
                  className="col-span-1 row-span-2 w-full h-full  bg-white rounded-[20px]
                          shadow-[0_0_24px_10px_#007BFF12]
                          p-[32px]"
                >
                  <div className="w-full flex justify-center">
                    <img src={third_page} alt="" className="size-[400px]" />
                  </div>
                  <p className="text-[48px] font-semibold whitespace-nowrap pb-[25px]">
                    브라우저로{" "}
                    <span className="text-(--Main_Blue)">즉시 관리</span>
                  </p>

                  <p className="text-[32px] font-normal text-(--Grey3) ">
                    언제 어디서나 웹 콘솔을 통해 인스턴스의
                    <br /> 상태를 확인하고 원격 제어
                  </p>
                </div>

                {/* 오른쪽 위 가로 카드 */}
                <div
                  className="col-span-2 w-full h-full  bg-white rounded-[20px]
                          shadow-[0_0_24px_10px_#007BFF12]
                          p-[32px]"
                ></div>

                {/* 오른쪽 아래 작은 카드들 */}
                <div className="col-span-2 grid grid-cols-[2fr_1fr] gap-[80px]">
                  <div
                    className="h-full bg-white rounded-[20px] shadow-[0_0_24px_10px_#007BFF12]
                          p-[32px]"
                  />
                  <div
                    className="h-full bg-white rounded-[20px] shadow-[0_0_24px_10px_#007BFF12]
                          p-[32px]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="relative flex flex-col items-center pt-[400px] pb-[322px] overflow-hidden">
        <div className="absolute top-[300px] left-1/2 -translate-x-1/2 w-[4440px] h-[4440px] rounded-[50%] bg-(--White) shadow-[0_-12px_90px_15px_#007BFF12]" />
        <div className="relative z-10">
          <h2 className="text-center text-[64px] font-semibold pt-[86px]">
            생생한 실제 사용 리뷰
          </h2>
          <p className="text-center text-[32px] font-normal text-(--Text1) pt-[14px]">
            도들을 실제로 사용해본 사용자의 리뷰
          </p>
          {/*<div className=" w-[458px] min-h-[627px] bg-white rounded-[20px] shadow-[0_0_24px_10px_#007BFF12] p-[32px] pt-[250px]"></div>*/}
        </div>
      </section>
      <section className="flex flex-col items-center h-[1080px] pt-[403px] mb-[100px]">
        <div className="flex justify-center w-screen h-[680px] bg-(--BG_Blue2) py-[200px] ">
          <div className="flex flex-col items-center">
            <h1 className="mb-[56px] text-[40px] font-semibold">
              🔽 <span className="text-(--Main_Blue)">사전신청</span> 알림받기
              🔽
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
          </div>
        </div>
      </section>
      <section className="flex justify-between h-[1080px] pt-[188px] max-w-[1200px] mx-auto">
        <div>
          <h1 className="text-(--Main_Blue) text-[32px] font-semibold">
            도들에게 문의해 주세요.
          </h1>
          <img src={horizontalArrow} alt="" />
          <p className="mt-[8px] text-(--Text1) text-[16px] font-normal">
            연락처: kwangwoonwebservice@gmail.com
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
                <LandingInputField
                  className="w-[423px]"
                  placeholder="제목을 작성해 주세요."
                />
              </div>
              <div className="flex justify-between">
                <p className="text-[24px] font-semibold text-(--BlueBlack) text-right whitespace-nowrap">
                  회사명:
                </p>
                <LandingInputField
                  className="w-[423px]"
                  placeholder="회사명을 작성해 주세요."
                />
              </div>
              <div className="flex justify-between">
                <p className="text-[24px] font-semibold text-(--BlueBlack) text-right whitespace-nowrap">
                  이메일:
                </p>
                <LandingInputField
                  className="w-[423px]"
                  placeholder="알림 받을 이메일을 작성해 주세요."
                />
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
