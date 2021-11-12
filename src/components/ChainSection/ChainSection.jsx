import { useEffect, useState } from "react";
import style from "./chain-section.module.scss";
import { Card, ChainSelector } from "../index";
import { useFetch } from "../../hooks/useFetch";

export const ChainSection = () => {
  const [sendEnabledChains, setSendEnabledChains] = useState(false);
  const [receiveEnabledChains, setReceiveEnabledChains] = useState(false);
  const [sendActiveChain, setSendActiveChain] = useState("");
  const [receiveActiveChain, setReceiveActiveChain] = useState("");

  let API = `${process.env.REACT_APP_API_URL}/V1/supported/chains`;
  const allChains = useFetch(API);

  useEffect(() => {
    if (allChains !== null) {
      let sendChains = allChains.result.filter((chain) => chain.sendingEnabled);
      setSendEnabledChains(sendChains);
      setSendActiveChain(sendChains[0]);

      let receiveChains = allChains.result.filter(
        (chain) => chain.recievingEnabled
      );
      setReceiveEnabledChains(receiveChains);
      setReceiveActiveChain(receiveChains[0]);
    }
  }, [allChains]);

  const setSendChain = (chain) => {
    setSendActiveChain(chain);
  };

  const setReceiveChain = (chain) => {
    setReceiveActiveChain(chain);
  };

  return (
    <Card>
      <div className="mb-4">
        <p className={style.title}>Transform from</p>
        {sendEnabledChains && (
          <ChainSelector
            chains={sendEnabledChains}
            activeChain={sendActiveChain}
            setActiveChain={setSendChain}
          />
        )}
      </div>

      <div className="mb-4">
        <p className={style.title}>Transform to</p>
        {receiveEnabledChains && (
          <ChainSelector
            chains={receiveEnabledChains}
            activeChain={receiveActiveChain}
            setActiveChain={setReceiveChain}
          />
        )}
      </div>

      <div className="mb-4"></div>
    </Card>
  );
};

// to do
// the two chains should not be the same