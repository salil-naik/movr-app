import { useWeb3React } from "@web3-react/core";
import { useState } from "react";
// import style from "./homepage.module.scss";
import { ChainSection, TokenSection } from "../../components/index";

export const Homepage = () => {
  const [isSectionTwoActive, setIsSectionTwoActive] = useState(false);
  const [expandChainsSection, setExpandChainsSection] = useState(true);

  let defaultChains = {sendChain: 1, receiveChain: 137}

  const [data, setData] = useState({
    sendChain: {chainId: defaultChains.sendChain},
    receiveChain: {chainId: defaultChains.receiveChain},
    sendToken: "",
    receiveToken: "",
  });

  const setChains = (chain) => {
    setIsSectionTwoActive(true);
    setData({
      ...data,
      sendChain: chain.sendChain,
      receiveChain: chain.receiveChain,
    });
  };

  const setTokens = (token) => {
    setData({
      ...data,
      sendToken: token.fromToken,
      receiveToken: token.toToken,
      amount: token.amount,
    });
  };

  const {active, account, chainId} = useWeb3React();

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-5">
            <ChainSection
              sendData={setChains}
              maxState={expandChainsSection}
              setMaxState={(res) => setExpandChainsSection(res)}
            />
            <div className="mb-2"></div>
            <div style={{ display: isSectionTwoActive ? "block" : "none" }}>
              <TokenSection
                data={data}
                sendData={setTokens}
                maxState={!expandChainsSection}
                setMaxState={(res) => setExpandChainsSection(!res)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
