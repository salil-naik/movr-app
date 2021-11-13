import style from "./button.module.scss";

export const Button = ({ children, onClick, block, disabled }) => {
  return (
    <button
      className={`${style.button} ${block ? style.block : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
