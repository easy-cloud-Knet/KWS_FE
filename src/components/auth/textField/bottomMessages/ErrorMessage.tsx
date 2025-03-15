import invalid from "../../../../assets/image/input/invalid.svg";

const ErrorMessage = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="a-items-center" style={{ gap: "5px", paddingLeft: "3px" }}>
      <img src={invalid} alt="" />
      <p className="p-16-400 c-red">{children}</p>
    </div>
  );
};

export default ErrorMessage;
