const Button = ({ children, format, active, ...rest }) => {
  return (
    <button
      className={`${active ? "btnActive" : "lol"} w-8 h-5 mx-1 my-0`}
      title={format}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
