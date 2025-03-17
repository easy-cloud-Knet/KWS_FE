import invalid from "../../../../assets/image/input/invalid.svg";

const ErrorMessage = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="a-items-center">
      <img src={invalid} alt="" />
      <p className="p-12-400 c-red">{children}</p>
    </div>
  );
};

export default ErrorMessage;
