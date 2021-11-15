import style from "./quotes.module.scss";
import { useFetch } from "../../hooks/useFetch";
import { useState, useEffect } from "react";
import BigNumber from "bignumber.js";

function convertAmount(amount, decimals) {
  return (amount / 1000000).toFixed(decimals);
}

function getActualAmount(amount, decimals) {
  let actualAmount = amount / Math.pow(10, decimals);
  return actualAmount.toFixed(2);
}

function setActualAmount(amount, decimals) {
  let actualAmount = BigNumber(amount).times(Math.pow(10, decimals));
  return actualAmount;
}

function getStyle(tag) {
  if (tag == "Polygon") {
    return {
      color: "#7544ff",
      backgroundColor: "#efe7fd",
    };
  } else if (tag == "xDai") {
    return {
      color: "#2F7E75",
      backgroundColor: "#E0F2F3",
    };
  } else if (tag == "bsc") {
    return {
      color: "#F0B90B",
      backgroundColor: "#FAEAB5",
    };
  }
}

export const Quotes = ({ formData }) => {
  const [dataRes, setDataRes] = useState(null);
  const [QUOTE_API, setQUOTE_API] = useState(null);
  const [data, dataLoading, hasError] = useFetch(QUOTE_API);

  useEffect(() => {
    if (data !== null && data !== undefined) {
      setDataRes(data.result);
    }
  }, [data, dataLoading]);

  useEffect(() => {
    setQUOTE_API(`${process.env.REACT_APP_API_URL}/v1/quote?fromAsset=${formData.sendToken.token.address}&fromChainId=${formData.sendChain.chainId}&toAsset=${formData.receiveToken.token.address}&toChainId=${formData.receiveChain.chainId}&amount=${setActualAmount(formData.amount, formData.sendToken.token.decimals)}&sort=cheapestRoute`)
  }, [formData]);

  if (dataLoading) {
    return (
      <div>
        <h2 className={style.title}>Loading Available Routes ...</h2>
        <div className={style.quoteCard}>
          <div className={style.placeholderCard}></div>
          <div className={style.placeholderCard}></div>
          <div className={style.placeholderCard}></div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className={style.title}>Available Routes</h2>
      {dataRes &&
        dataRes.routes.length > 0 ? (
        dataRes.routes.map((route, index) => {
          //   for middleware
          let middleware = route.middlewareRoute;
          let mwFromAssets = middleware.fromAsset;
          let mwInputAmount = getActualAmount(middleware.inputAmount, mwFromAssets.decimals);
          let mwFromChainId = mwFromAssets.chainId;

          // for bridge
          let bridgeRoute = route.bridgeRoute;
          let brFromAssets = bridgeRoute.fromAsset;
          let brToAssets = bridgeRoute.toAsset;
          let brFromChainId = bridgeRoute.fromChainId;
          let brToChainId = bridgeRoute.toChainId;
          let brInputAmount = getActualAmount(bridgeRoute.inputAmount, brFromAssets.decimals)
          let brOutputAmount = getActualAmount(bridgeRoute.outputAmount, brToAssets.decimals);

          //   fees
          let fees = route.fees;
          let bridgeFee = getActualAmount(fees.bridgeFee.amount, brFromAssets.decimals);
          let middlewareFee = getActualAmount(fees.middlewareFee.amount, mwFromAssets.decimals);

          let chainName = {
            1: "Ethereum",
            137: "Polygon",
            0x64: "xDai",
            56: "BSC",
          };

          return (
            <div className={style.quoteCard} key={index}>
              {middleware && (
                <>
                  <TokenDetails
                    icon={mwFromAssets.icon}
                    symbol={mwFromAssets.symbol}
                    amount={mwInputAmount}
                    chainName={chainName[mwFromChainId]}
                  />
                  <Connector
                    title="Swap"
                    fee={middlewareFee}
                    name={middleware.middlewareName}
                  />
                </>
              )}
              <TokenDetails
                icon={brFromAssets.icon}
                symbol={brFromAssets.symbol}
                amount={brInputAmount}
                chainName={chainName[brFromChainId]}
              />
              <Connector
                title="Bridge"
                fee={bridgeFee}
                name={bridgeRoute.bridgeName}
              />
              <TokenDetails
                icon={brToAssets.icon}
                symbol={brToAssets.symbol}
                amount={brOutputAmount}
                chainName={chainName[brToChainId]}
              />
            </div>
          );
        })):(
          <div>No results found</div>
        )}
    </div>
  );
};

const TokenDetails = ({ icon, symbol, amount, chainName }) => {
  return (
    <div className={style.infoCard}>
      <div className="d-flex justify-content-start">
        <span className={style.amount}>{amount}</span>
        <span className={style.symbol}>{symbol}</span>
        <img src={icon} alt="token icon" className={style.icon} />
      </div>
      <span className={style.chainTag} style={getStyle(chainName)}>
        on {chainName}
      </span>
    </div>
  );
};

function truncateString(str) {
  if (str.length > 20) {
    return str.substring(0, 20) + "...";
  }
  return str;
}

const Connector = ({ title, fee, name }) => {
  return (
    <div className={style.connector}>
      <div className={style.connectorTitle}>
        {truncateString(`${name} ${title}`)}
      </div>
      <div className={style.connectorFee}>Fee: ${fee}</div>
    </div>
  );
};
