import { useState, useEffect } from "react";
import style from "./token-section.module.scss";
import { Card, TokenSelector, Button, TokenOption } from "../index";
import { ReactComponent as Arrow } from "../../assets/svgs/arrow-right.svg";

// hooks
import { useFetch } from "../../hooks/useFetch";
import { useWeb3React } from "@web3-react/core";

export const TokenSection = ({ data, sendData, maxState, setMaxState }) => {
  const [sendAmount, setSendAmount] = useState("");
  const [receiveAmount, setReceiveAmount] = useState("");
  const [balance, setBalance] = useState(0);
  const { account } = useWeb3React();
  const [FROM_TOKEN_API, setFROM_TOKEN_API] = useState("");
  const [TO_TOKEN_API, setTO_TOKEN_API] = useState("");

  useEffect(() => {
    let isMounted = true;

    if(isMounted) {
    setFROM_TOKEN_API(`${process.env.REACT_APP_API_URL}/v1/supported/from-token-list?fromChainId=${data.sendChain.chainId}&toChainId=${data.receiveChain.chainId}`)
    setTO_TOKEN_API(`${process.env.REACT_APP_API_URL}/v1/supported/to-token-list?fromChainId=${data.sendChain.chainId}&toChainId=${data.receiveChain.chainId}`)
    }

    return () => {isMounted = false}
  }, [data]);

  // balances
  let balAPI = `${process.env.REACT_APP_API_URL}/v1/balances?userAddress=${account}`;
  let [bal, balLoading] = useFetch(balAPI);
  // console.log("balance", bal);

  // from token list
  const [sendTokens, setSendTokens] = useState(false);
  const [activeSendToken, setActiveSendToken] = useState(false);

  const [fromTokenList, fromListLoading] = useFetch(FROM_TOKEN_API);

  useEffect(() => {
    if (fromTokenList !== null) {
      setSendTokens(fromTokenList.result);
      setActiveSendToken(fromTokenList.result[1]);
    }
  }, [fromTokenList]);

  const sendTokenChange = (token) => {
    setActiveSendToken(token);
    setBalance(0);
    // setSendAmount("");

    bal.result.map((token) => {
      if (token.chainId === activeSendToken.chainId) {
        if (token.address === activeSendToken.token.address) {
          setBalance(token.amount);
        }
      }
    });

    updateData();
  };

  // to token list
  const [receiveTokens, setReceiveTokens] = useState(false);
  const [activeReceiveToken, setActiveReceiveToken] = useState(false);

  const [toTokenList, toListLoading] = useFetch(TO_TOKEN_API);

  useEffect(() => {
    if (toTokenList !== null) {
      setReceiveTokens(toTokenList.result);
      setActiveReceiveToken(toTokenList.result[0]);
    }
  }, [toTokenList]);

  const receiveTokenChange = (token) => {
    setActiveReceiveToken(token);
    updateData();
  };

  // sends the data to the parent component (homepage)
  const updateData = () => {
    sendData({
      fromToken: activeSendToken,
      toToken: activeReceiveToken,
      amount: sendAmount,
    });
  };

  return (
    <Card
      minimize={!maxState}
      // onClick={maxState ? undefined : () => setMaxState(true)}
    >
      <div style={{ display: maxState ? "block" : "none" }}>
        <div className="mb-4">
          <p className={style.title}>
            Transform from{" "}
            <span className={style.balance}>
              Balance: {balance} {balance !== 0 && activeSendToken.token.symbol}
            </span>
          </p>
          {sendTokens && (
            <TokenSelector
              tokens={sendTokens}
              activeToken={activeSendToken}
              setActiveToken={sendTokenChange}
              amount={sendAmount}
              setAmount={setSendAmount}
              activeTokenBalance={balance}
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
        <Button block onClick={updateData} disabled={!sendAmount}>
          See all routes
        </Button>
      </div>

      <div
        className="align-items-center"
        style={{ display: maxState ? "none" : "flex" }}
      >
        {sendTokens && (
          <TokenOption
            item={activeSendToken.token}
            classes={style.option}
            noHover
          />
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
    </Card>
  );
};
