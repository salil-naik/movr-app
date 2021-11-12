import { useState, useEffect } from "react";
import style from "./token-section.module.scss";
import { Card, TokenSelector } from "../index";
import { useFetch } from "../../hooks/useFetch";

export const TokenSection = ({ data }) => {
  const [minVersion, setMinVersion] = useState(false);
  const [sendTokens, setSendTokens] = useState(false);
  const [activeSendToken, setActiveSendToken] = useState(false);

  let API = `${process.env.REACT_APP_API_URL}/V1/supported/from-token-list?fromChainId=${data.sendChain.chainId}&toChainId=${data.receiveChain.chainId}`;
  const sendTokenList = useFetch(API);

  useEffect(() => {
    if (sendTokenList !== null) {
      setSendTokens(sendTokenList.result.slice(0, 100));
      setActiveSendToken(sendTokenList.result[1]);
    }
  }, [sendTokenList]);

  const sendTokenChange = (token) => {
    setActiveSendToken(token);
  };

  // to maximize the token selection section
  const maximize = () => {
    setMinVersion(false);
  };

  return (
    <Card minimize={minVersion} onClick={minVersion ? maximize : undefined}>
      {minVersion ? (
        <h2>Salil naik</h2>
      ) : (
        <div className="mb-4">
          <p className={style.title}>Transform from</p>
          {sendTokens && (
            <TokenSelector
              tokens={sendTokens}
              activeToken={activeSendToken}
              setActiveToken={sendTokenChange}
            />
          )}
        </div>
      )}
    </Card>
  );
};
