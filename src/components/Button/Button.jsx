import style from "./button.module.scss";

export const Button = ({ children, onClick, block }) => {
  return (
    <button
      className={`${style.button} ${block ? style.block : ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
