import { useEffect, useState } from "react";
import style from "./chain-section.module.scss";
import { Card, ChainSelector, Button, ChainOption } from "../index";
import { ReactComponent as Arrow } from "../../assets/svgs/arrow-right.svg";
import { useFetch } from "../../hooks/useFetch";

export const ChainSection = ({ sendData, maxState, setMaxState }) => {
  const [sendChains, setSendChains] = useState(false);
  const [receiveChains, setReceiveChains] = useState(false);
  const [activeSendChain, setActiveSendChain] = useState("");
  const [activeReceiveChain, setActiveReceiveChain] = useState("");

  let API = `${process.env.REACT_APP_API_URL}/V1/supported/chains`;
  const allChains = useFetch(API);

  useEffect(() => {
    if (allChains !== null) {
      let sendChainsArr = allChains.result.filter(
        (chain) => chain.sendingEnabled
      );
      setSendChains(sendChainsArr);
      setActiveSendChain(sendChainsArr[0]);

      let receiveChainsArr = allChains.result.filter(
        (chain) => chain.recievingEnabled
      );
      setReceiveChains(receiveChainsArr);
      setActiveReceiveChain(receiveChainsArr[1]);
    }
  }, [allChains]);

  const setSendChain = (chain) => {
    setActiveSendChain(chain);
  };

  const setReceiveChain = (chain) => {
    setActiveReceiveChain(chain);
  };

  const submit = () => {
    sendData({
      sendChain: activeSendChain,
      receiveChain: activeReceiveChain,
    });
    setMaxState(false);
  };

  return (
    <Card
      minimize={!maxState}
      onClick={maxState ? undefined : () => setMaxState(true)}
    >
      {maxState ? (
        <>
          <div className="mb-4">
            <p className={style.title}>Transform from</p>
            {sendChains && (
              <ChainSelector
                chains={sendChains}
                activeChain={activeSendChain}
                setActiveChain={setSendChain}
              />
            )}
          </div>

          <div className="mb-4">
            <p className={style.title}>Transform to</p>
            {receiveChains && (
              <ChainSelector
                chains={receiveChains}
                activeChain={activeReceiveChain}
                setActiveChain={setReceiveChain}
              />
            )}
          </div>

          <Button block onClick={submit}>
            Begin new transfer
          </Button>
        </>
      ) : (
        <div className="d-flex align-items-center">
          <ChainOption item={activeSendChain} noHover classes={style.option} />
          <Arrow style={{ height: "24px" }} />
          <ChainOption
            item={activeReceiveChain}
            noHover
            classes={style.option}
          />
        </div>
      )}
    </Card>
  );
};

// to do
// the two chains should not be the same
