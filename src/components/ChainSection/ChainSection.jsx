import { useEffect, useState } from "react";
import style from "./chain-section.module.scss";
import { Card, ChainSelector } from "../index";

export const ChainSection = () => {
  const [sendingEnabledChains, setSendingEnabledChains] = useState(false);

  useEffect(() => {
    let result = [
      {
        chainId: 1,
        name: "Ethereum",
        isL1: true,
        isTestnet: false,
        sendingEnabled: true,
        icon: "https://static.debank.com/image/chain/logo_url/eth/42ba589cd077e7bdd97db6480b0ff61d.png",
        recievingEnabled: true,
        currecy: {
          address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
          name: "Ether",
          symbol: "ETH",
          decimals: 18,
        },
        rpcs: ["https://main-light.eth.linkpool.io/"],
        explorers: ["https://etherscan.io/"],
      },
      {
        chainId: 10,
        name: "Optimism",
        isL1: false,
        isTestnet: false,
        sendingEnabled: false,
        icon: "https://static.debank.com/image/chain/logo_url/op/01ae734fe781c9c2ae6a4cc7e9244056.png",
        recievingEnabled: true,
        rpcs: ["https://mainnet.optimism.io/"],
        currecy: {
          address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
          name: "Ether",
          symbol: "OETH",
          decimals: 18,
        },
        explorers: ["https://optimistic.etherscan.io/"],
      },
      {
        chainId: 56,
        name: "BSC",
        isL1: false,
        icon: "https://static.debank.com/image/chain/logo_url/bsc/7c87af7b52853145f6aa790d893763f1.png",
        isTestnet: false,
        sendingEnabled: true,
        recievingEnabled: true,
        currecy: {
          address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
          name: "Binance Chain Native Token",
          symbol: "BNB",
          decimals: 18,
        },
        rpcs: [
          "https://bsc-dataseed1.binance.org",
          "https://bsc-dataseed2.binance.org",
          "https://bsc-dataseed3.binance.org",
          "https://bsc-dataseed4.binance.org",
          "https://bsc-dataseed1.defibit.io",
          "https://bsc-dataseed2.defibit.io",
          "https://bsc-dataseed3.defibit.io",
          "https://bsc-dataseed4.defibit.io",
          "https://bsc-dataseed1.ninicoin.io",
          "https://bsc-dataseed2.ninicoin.io",
          "https://bsc-dataseed3.ninicoin.io",
          "https://bsc-dataseed4.ninicoin.io",
          "wss://bsc-ws-node.nariox.org",
        ],
        explorers: ["https://bscscan.com/"],
      },
    ];

    setSendingEnabledChains(result);
  }, []);

  return (
    <Card>
      <p className={style.title}>
        Transform from
      </p>
      {sendingEnabledChains && <ChainSelector chains={sendingEnabledChains} />}
    </Card>
  );
};
