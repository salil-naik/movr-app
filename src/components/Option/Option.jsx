import { useEffect } from "react";
import style from "./option.module.scss";

export const ChainOption = ({
  item,
  onClick,
  active,
  classes,
  small,
  noHover,
}) => {
  return (
    <div
      className={`${style.option} ${active ? style.active : ""} ${classes} ${
        small ? style.small : ""
      } ${noHover ? style["no-hover"] : ""}`}
      onClick={onClick}
    >
      {item.icon ? (
        <img
          src={item.icon}
          alt="chain icon"
          className={style["option__icon"]}
          loading="lazy"
        />
      ) : (
        <div className={style["option__icon"]}>
          {item.name !== null ? item.name[0] : "A"}
        </div>
      )}

      <span>{item.name !== null ? item.name : "Anonymous"}</span>
    </div>
  );
};

export const TokenOption = ({
  item,
  onClick,
  active,
  classes,
  small,
  noHover,
}) => {
  useEffect(()=> {
    console.log('option run');
  }, [])
  return (
    <div
      className={`${style.option} ${active ? style.active : ""} ${classes} ${
        small ? style.small : ""
      } ${noHover ? style["no-hover"] : ""}`}
      onClick={onClick}
    >
      {item.icon ? (
        <img
          src={item.icon}
          alt="chain icon"
          className={style["option__icon"]}
          loading="lazy"
        />
      ) : (
        <div className={style["option__icon"]}>
          {item.symbol !== null ? item.symbol[0] : "U"}
        </div>
      )}

      <span>
        <span style={{ fontWeight: "500" }}>
          {item.symbol !== null ? item.symbol : "UNK"}
        </span>{" "}
        <span style={{color: '#6E798F',fontSize: '12px'}}>{item.name !== null ? ' - '+item.name : " - Unknown"}</span>
      </span>
    </div>
  );
};
