import style from "./card.module.scss";

export const Card = ({ children, minimize, onClick }) => {
  return (
    <div className={`${style.card} ${minimize ? style.minimize : ""}`} onClick={onClick}>
      {children}
    </div>
  );
};
