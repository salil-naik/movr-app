import { useEffect, useState } from "react";
import style from "./chain-section.module.scss";
import { Card, ChainSelector } from "../index";
import { useFetch } from "../../hooks/useFetch";

export const ChainSection = () => {
  const [sendingEnabledChains, setSendingEnabledChains] = useState(false);
  const [receivingEnabledChains, setReceivingEnabledChains] = useState(false);

  let API = `${process.env.REACT_APP_API_URL}/V1/supported/chains`;
  const allChains = useFetch(API);

  useEffect(() => {
    if (allChains !== null) {
      let sendChains = allChains.result.filter(
        (chain) => chain.sendingEnabled
      );
      setSendingEnabledChains(sendChains);

      let receiveChains = allChains.result.filter(
        (chain) => chain.recievingEnabled
      );
      setReceivingEnabledChains(receiveChains);
    }
  }, [allChains]);

  return (
    <Card>
      <div className="mb-4">
        <p className={style.title}>Transform from</p>
        {sendingEnabledChains && (
          <ChainSelector chains={sendingEnabledChains} />
        )}
      </div>

      <div className="mb-4">
        <p className={style.title}>Transform to</p>
        {receivingEnabledChains && (
          <ChainSelector chains={receivingEnabledChains} />
        )}
      </div>

      <div className="mb-4">
        
      </div>
    </Card>
  );
};
