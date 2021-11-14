import { useState } from "react";
import style from "./token-selector.module.scss";
import { TokenOption as Option, Modal, SearchBar } from "..";
import { ReactComponent as Arrow } from "../../assets/svgs/angle-down.svg";

export const TokenSelector = ({
  tokens,
  activeToken,
  setActiveToken,
  amount,
  setAmount,
  activeTokenBalance,
  max = true,
  readOnly = false,
}) => {
  const [showTokens, setShowTokens] = useState(false);
  const [filteredTokens, setFilteredTokens] = useState(tokens);

  const toggleTokens = (e) => {
    // e.stopPropagation();
    setShowTokens(!showTokens);
  };

  const handleChange = (e) => {
    setAmount(e.target.value);
  };

  const handleTokenChange = (token) => {
    setActiveToken(token);
    toggleTokens();
  };

  const handleMax = () => {
    setAmount(activeTokenBalance);
  };

  const filterTokens = (search) => {
    if (search.length > 0) {
      const regex = new RegExp(search, "gi");
      let filteredTokens = tokens.filter((item) => {
        if (
          (item.token.name && item.token.name.match(regex)) ||
          (item.token.symbol && item.token.symbol.match(regex))
        ) {
          return item;
        }
      });

      setFilteredTokens(filteredTokens);
    } else {
      setFilteredTokens(tokens);
    }
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
          <button type="button" className={style.maxBtn} onClick={handleMax}>
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
          <Arrow className={`${style.arrow} ${showTokens ? style.up : ""}`} />
        </div>

        <Modal title="select token" onShow={showTokens} onClose={toggleTokens}>
          <SearchBar onChange={filterTokens} />
          {filteredTokens.length > 0 ? (
            filteredTokens.map((item, index) => {
              return (
                <Option
                  item={item.token}
                  small
                  key={`${index}-${item.token.symbol}`}
                  onClick={() => {
                    handleTokenChange(item);
                  }}
                  classes={style.tokenOptionList}
                  active={activeToken === item}
                />
              );
            })
          ) : (
            <p className={style.noTokensText}>Tokens not found</p>
          )}
        </Modal>
      </div>
    </>
  );
};
