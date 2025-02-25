import "./button.css";

const Button = ({
  children,
  variant = "primary",
  onClick,
  disabled,
  hidden,
  loading = false,
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
      {loading ? <span>...</span> : children}
    </button>
  );
};

export default Button;
