import style from "./card.module.scss";

export const Card = ({ children }) => {
  return <div className={style.card}>{children}</div>;
};
