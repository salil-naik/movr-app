import style from "./header.module.scss";
import logo from "../../assets/images/logo.png";
import { useWeb3React } from "@web3-react/core";
import { injected } from "../Wallet/Connector";

export const Header = () => {
  const { active, account, activate, deactivate } =
    useWeb3React();

  async function connect() {
    try {
      await activate(injected);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <header className={style.header}>
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <img src={logo} alt="website logo" className={style.logo} />
          <span className={style.name}>Movr Network</span>
        </div>
        <button onClick={connect}>
          {active ? account : "Connect your wallet"}
        </button>
      </div>
    </header>
  );
};
