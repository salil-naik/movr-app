import { useState } from "react";
import style from "./token-selector.module.scss";
import { TokenOption as Option, Modal } from "..";
import { ReactComponent as Arrow } from "../../assets/svgs/angle-down.svg";

export const TokenSelector = ({
  tokens,
  activeToken,
  setActiveToken,
  amount,
  setAmount,
  max = true,
  readOnly = false,
}) => {
  const [showTokens, setShowTokens] = useState(false);

  const toggleTokens = (e) => {
    e.stopPropagation();
    setShowTokens(!showTokens);
  };

  const handleChange = (e) => {
    setAmount(e.target.value);
  };

  return (
    <>
      <div className={style.tokenSelector}>
        <input
          type="text"
          value={amount}
          onChange={handleChange}
          placeholder="0"
          className={style.input}
          readOnly={readOnly}
        />

        {max && (
          <button type="button" className={style.maxBtn}>
            Max
          </button>
        )}

        <div className={style.tokensSection} onClick={toggleTokens}>
          <Option
            item={activeToken.token}
            noHover
            small
            classes={style.tokenOption}
          />

          <Modal title="select token" show={showTokens}>
            {tokens.map((item, index) => {
              return (
                <Option
                  item={item.token}
                  small
                  key={`${index}-${item.token.symbol}`}
                  onClick={() => setActiveToken(item)}
                  classes={style.tokenOptionList}
                  active={activeToken === item}
                />
              );
            })}
          </Modal>

          <Arrow className={`${style.arrow} ${showTokens ? style.up : ""}`} />
        </div>
      </div>
    </>
  );
};
