import { useState, useEffect } from "react";
import style from "./token-section.module.scss";
import { Card, TokenSelector, Button, TokenOption } from "../index";
import { ReactComponent as Arrow } from "../../assets/svgs/arrow-right.svg";
import { useFetch } from "../../hooks/useFetch";

export const TokenSection = ({ data, sendData, maxState, setMaxState }) => {
  const [sendAmount, setSendAmount] = useState("");
  const [receiveAmount, setReceiveAmount] = useState("");
  const [balance, setBalance] = useState(0);

  // balances
  let balAPI = `${process.env.REACT_APP_API_URL}/V1/balances?userAddress=0xF0Fc5aE54d1CBDc87545AA7831a8225CB6dE35a0`;
  let bal = useFetch(balAPI);

  // from token list
  const [sendTokens, setSendTokens] = useState(false);
  const [activeSendToken, setActiveSendToken] = useState(false);

  let FROM_TOKEN_API = `${process.env.REACT_APP_API_URL}/V1/supported/from-token-list?fromChainId=${data.sendChain.chainId}&toChainId=${data.receiveChain.chainId}`;
  const fromTokenList = useFetch(FROM_TOKEN_API);

  useEffect(() => {
    if (fromTokenList !== null) {
      setSendTokens(fromTokenList.result.slice(0, 5));
      setActiveSendToken(fromTokenList.result[1]);
    }
  }, [fromTokenList]);

  const sendTokenChange = (token) => {
    setActiveSendToken(token);

    bal.result.map((token) => {
      if (token.address === activeSendToken) {
        setBalance(token.amount);
      }
    });
  };

  // to token list
  const [receiveTokens, setReceiveTokens] = useState(false);
  const [activeReceiveToken, setActiveReceiveToken] = useState(false);

  let TO_TOKEN_API = `${process.env.REACT_APP_API_URL}/V1/supported/to-token-list?fromChainId=${data.sendChain.chainId}&toChainId=${data.receiveChain.chainId}`;
  const toTokenList = useFetch(TO_TOKEN_API);

  useEffect(() => {
    if (toTokenList !== null) {
      setReceiveTokens(toTokenList.result.slice(0, 5));
      setActiveReceiveToken(toTokenList.result[0]);
    }
  }, [toTokenList]);

  const receiveTokenChange = (token) => {
    setActiveReceiveToken(token);
  };

  const submit = () => {
    sendData({
      fromToken: activeSendToken,
      toToken: activeReceiveToken,
      amount: sendAmount,
    });
  };

  return (
    <Card
      minimize={!maxState}
      onClick={maxState ? undefined : () => setMaxState(true)}
    >
      {maxState ? (
        <>
          <div className="mb-4">
            <p className={style.title}>
              Transform from{" "}
              <span className={style.balance}>
                Balance: {balance}{" "}
                {balance !== 0 && activeSendToken.token.symbol}
              </span>
            </p>
            {sendTokens && (
              <TokenSelector
                tokens={sendTokens}
                activeToken={activeSendToken}
                setActiveToken={sendTokenChange}
                amount={sendAmount}
                setAmount={setSendAmount}
              />
            )}
          </div>
          <div className="mb-4">
            <p className={style.title}>Transform to</p>
            {receiveTokens && (
              <TokenSelector
                tokens={receiveTokens}
                activeToken={activeReceiveToken}
                setActiveToken={receiveTokenChange}
                amount={receiveAmount}
                max={false}
                readOnly={true}
              />
            )}
          </div>
          <Button block onClick={submit} disabled={!sendAmount}>
            See all routes
          </Button>
        </>
      ) : (
        <div className="d-flex align-items-center">
          {sendTokens && (
            <TokenOption item={activeSendToken.token} classes={style.option} noHover />
          )}
          <Arrow style={{ height: "24px" }} />
          {receiveTokens && (
            <TokenOption
              item={activeReceiveToken.token}
              classes={style.option}
              noHover
            />
          )}
        </div>
      )}
    </Card>
  );
};
