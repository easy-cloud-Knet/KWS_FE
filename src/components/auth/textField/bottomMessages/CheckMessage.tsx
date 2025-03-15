import valid from "./../../../../assets/image/input/valid.svg";

const CheckMessage = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="a-items-center" style={{ gap: "5px", paddingLeft: "3px" }}>
      <img src={valid} alt="" />
      <p className="p-16-400 c-green">{children}</p>
    </div>
  );
};

export default CheckMessage;
