import style from "./chain-option.module.scss";

export const ChainOption = ({ item, onClick, active, classes }) => {
  return (
    <div
      className={`${style.option} ${active ? style.active : ""} ${classes}`}
      onClick={onClick}
    >
      <img src={item.icon} alt="chain icon" className={style["option__icon"]} />
      <span>{item.name}</span>
    </div>
  );
};
