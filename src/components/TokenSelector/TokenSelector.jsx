import { useState, useEffect } from "react";
import style from "./token-selector.module.scss";
import { ChainOption as Option, Modal } from "..";
import { ReactComponent as Arrow } from "../../assets/svgs/angle-down.svg";

export const TokenSelector = ({ tokens, activeToken, setActiveToken }) => {
  const [showTokens, setShowTokens] = useState(false);
  const [filteredTokens, setFilteredTokens] = useState(tokens);

  const toggleTokens = (e) => {
    e.stopPropagation();
    setShowTokens(!showTokens);
  };

  useEffect(() => {
    setFilteredTokens(tokens.filter((token) => token !== activeToken));
  }, [activeToken, tokens]);

  return (
    <>
      <div className={style.tokenSelector}>
        <input type="number" placeholder="0" />

        <button type="button">Max</button>

        <div className={style.tokensSection} onClick={toggleTokens}>
          <Option
            item={activeToken.token}
            active
            small
            classes={style.tokenOption}
          />

          {showTokens && (
            <Modal title="select token" onClose={() => setShowTokens(false)}>
              {filteredTokens.map((item, index) => {
                return (
                  <Option
                    item={item.token}
                    small
                    key={`${index}-${item.token.symbol}`}
                    onClick={() => setActiveToken(item)}
                    classes={style.tokenOptionList}
                  />
                );
              })}
            </Modal>
          )}

          <Arrow className={`${style.arrow} ${showTokens ? style.up : ""}`} />
        </div>
      </div>
    </>
  );
};
