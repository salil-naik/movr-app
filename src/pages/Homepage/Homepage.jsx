import { useState, useEffect } from "react";
// import style from "./homepage.module.scss";
import { ChainSection, TokenSection } from "../../components/index";

export const Homepage = () => {
  const [data, setData] = useState({
    sendChain: {chainId: 1},
    receiveChain: {chainId: 137},
    sendToken: '',
    receiveToken: '',
    amount: '',
  });

  const setChains = (chain) => {
    setData({
      ...data,
      sendChain: chain.sendChain,
      receiveChain: chain.receiveChain,
    })
  }

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <>
    <div className="container">
      <div className="row">
        <div className="col-5">
            {/* <ChainSection sendData={setChains}/> */}
            <TokenSection data={data}/>
        </div>
      </div>
    </div>
    </>
  );
};
