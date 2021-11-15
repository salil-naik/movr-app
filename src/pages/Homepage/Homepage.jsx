import { useWeb3React } from "@web3-react/core";
import { useState } from "react";
// import style from "./homepage.module.scss";
import { ChainSection, TokenSection, Quotes } from "../../components/";


export const Homepage = () => {
  const [isSectionTwoActive, setIsSectionTwoActive] = useState(false);
  const [expandChainsSection, setExpandChainsSection] = useState(true);
  const [showQuote, setShowQuote] = useState(false);

  let defaultChains = {sendChain: 1, receiveChain: 10}

  const [data, setData] = useState({
    sendChain: {chainId: defaultChains.sendChain},
    receiveChain: {chainId: defaultChains.receiveChain},
    sendToken: "",
    receiveToken: "",
    amount: "",
  });

  const setChains = (chain) => {
    setIsSectionTwoActive(true);
    setData({
      ...data,
      sendChain: chain.sendChain,
      receiveChain: chain.receiveChain,
    });
  };

  // set tokens
  const setTokens = (token) => {
    setData({
      ...data,
      sendToken: token.fromToken,
      receiveToken: token.toToken,
      amount: token.amount,
    });

    token.amount && setShowQuote(true);
  };

  const {active, account, chainId} = useWeb3React();

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-5" style={{paddingTop: "80px"}}>
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
          <div className="col-md-7" style={{paddingTop: "80px"}}>
            {showQuote && <Quotes formData={data}/>}
          </div>
        </div>
      </div>
    </>
  );
};
