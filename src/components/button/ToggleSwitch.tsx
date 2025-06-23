import "./ToggleSwitch.css";

const ToggleSwitch: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({
  className,
  ...props
}) => {
  return (
    <div className={className}>
      <label className="toggle-switch">
        <input type="checkbox" {...props} />
        <span className="slider round"></span>
      </label>
    </div>
  );
};

export default ToggleSwitch;
