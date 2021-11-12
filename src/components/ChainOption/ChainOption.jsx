import style from "./chain-option.module.scss";

export const ChainOption = ({ item, onClick, active, classes, small }) => {
  return (
    <div
      className={`${style.option} ${active ? style.active : ""} ${classes} ${
        small ? style.small : ""
      }`}
      onClick={onClick}
    >
      <img src={item.icon} alt="chain icon" className={style["option__icon"]} />
      <span>{item.name}</span>
    </div>
  );
};
