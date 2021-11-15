import style from "./quotes.module.scss";
import { useFetch } from "../../hooks/useFetch";
import { useState, useEffect } from "react";

function convertAmount(amount, decimals) {
  return (amount / 1000000).toFixed(decimals);
}

function convertMiddlewareAmount(amount, decimals) {
  return (amount / 1000000000000000000).toFixed(decimals);
}


function getStyle(tag){
    if(tag == "Polygon"){
        return  {
            color: '#7544ff',
            backgroundColor: '#efe7fd',
        }
    } else if(tag == "xDai") {
        return  {
            color: '#2F7E75',
            backgroundColor: '#E0F2F3',
        }
    } else if(tag == "bsc"){
        return  {
            color: '#F0B90B',
            backgroundColor: '#FAEAB5',
        }
    }
}

export const Quotes = ({formData}) => {
  const [dataRes, setDataRes] = useState(null);
    let QUOTE_API = `${process.env.REACT_APP_API_URL}/V1/quote?fromAsset=${formData.sendToken.token.address}&fromChainId=${formData.sendChain.chainId}&toAsset=${formData.receiveToken.token.address}&toChainId=${formData.receiveChain.chainId}&amount=${formData.amount}&sort=cheapestRoute`;
  //   let newUrl =
  //     "http://13.233.145.211:8000/V1/quote?fromAsset=${data.sendToken.token.address}&fromChainId=${data.sendChain.chainId}&toAsset=${data.receiveToken.token.address}&toChainId=${data.receiveChain.chainId}&amount=${data.amount}&sort=cheapestRoute`";
  // let newUrl =
  //   "http://13.233.145.211:8000/V1/quote?fromAsset=0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee&fromChainId=137&toAsset=0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48&toChainId=1&amount=100000000000000000000&sort=cheapestRoute";
  const [data, dataLoading] = useFetch(QUOTE_API);
  useEffect(() => {
    if (data !== null) {
      setDataRes(data.result);
      console.log("routes", data.result.routes[0]);
    }
  }, [data, dataLoading]);

  if (dataLoading) {
    return <div>
        <h2 className={style.title}>Loading Available Routes ...</h2>
        <div className={style.quoteCard}>
            <div className={style.placeholderCard}></div>
            <div className={style.placeholderCard}></div>
            <div className={style.placeholderCard}></div>
        </div>
    </div>;
  }

  return (
    <div>
      <h2 className={style.title}>Available Routes</h2>
      {dataRes !== null &&
        dataRes.routes.length > 0 &&
        dataRes.routes.map((route, index) => {
          //   for middleware
          let middleware = route.middlewareRoute;
          let mwFromAssets = middleware.fromAsset;
          let mwInputAmount = convertMiddlewareAmount(
            middleware.inputAmount,
            2
          );
          let mwFromChainId = mwFromAssets.chainId;

          // for bridge
          let bridgeRoute = route.bridgeRoute;
          let brFromAssets = bridgeRoute.fromAsset;
          let brToAssets = bridgeRoute.toAsset;
          let brFromChainId = bridgeRoute.fromChainId;
          let brToChainId = bridgeRoute.toChainId;
          let brInputAmount = convertAmount(bridgeRoute.inputAmount, 2);
          let brOutputAmount = convertAmount(bridgeRoute.outputAmount, 2);

          //   fees
          let fees = route.fees;
          let bridgeFee = convertAmount(fees.bridgeFee.amount, 2);
          let middlewareFee = convertAmount(fees.middlewareFee.amount, 2);

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
        })}
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
      <span className={style.chainTag} style={getStyle(chainName)}>on {chainName}</span>
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
