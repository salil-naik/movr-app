import { useEffect, useState } from "react";
import style from "./chain-selector.module.scss";
import { ReactComponent as Arrow } from "../../assets/svgs/angle-down.svg";

export const ChainSelector = ({ chains, activeChain, setActiveChain }) => {
  const [availableChains, setAvailableChains] = useState(chains);
  const [showOptions, setShowOptions] = useState(false);

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setShowOptions(!showOptions);
  };

  // to set the available chains
  // available chains = all chains - active chain
  useEffect(() => {
    setAvailableChains(chains.filter((chain) => chain !== activeChain));
  }, [activeChain, chains]);

  return (
    <div className={style.select} onClick={toggleDropdown}>
      <Option item={activeChain} active />

      {showOptions && (
        <div className={style["option-container"]}>
          {availableChains.map((chain) => {
            return (
              <Option
                item={chain}
                onClick={() => setActiveChain(chain)}
                key={chain.chainId}
              />
            );
          })}
        </div>
      )}

      <Arrow className={`${style.arrow} ${showOptions ? style.up : ""}`} />
    </div>
  );
};

const Option = ({ item, onClick, active }) => {
  return (
    <div
      className={`${style.option} ${active ? style.active : ""}`}
      onClick={onClick}
    >
      <img src={item.icon} alt="chain icon" className={style["option__icon"]} />
      <span>{item.name}</span>
    </div>
  );
};

// to do
// outside click to close the dropdown
