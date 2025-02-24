import "./button.css";

const Button = ({
  children,
  variant = "primary",
  onClick,
  disabled,
  hidden,
  ...rest
}) => {
  return (
    <button
      hidden={hidden}
      disabled={disabled}
      className={`button ${variant}`}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
