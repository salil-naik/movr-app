import { useState } from "react";
import style from "./header.module.scss";
import logo from "../../assets/images/logo.png";

// hooks
import { useWeb3React } from "@web3-react/core";
import { useInactiveListener } from "../../hooks/useInactiveListener";

// components
import { injected } from "../Wallet/Connector";
import { Button } from "..";

// functions
async function connect(activate) {
  try {
    await activate(injected);
  } catch (err) {
    console.log(err);
  }
}

function disconnect(deactivate) {
  try {
    deactivate();
  } catch (err) {
    console.log(err);
  }
}

function truncate(str) {
  return str.slice(2, 5) + "..." + str.slice(-3);
}

export const Header = () => {
  const [showProfile, setShowProfile] = useState(false);
  const { active, account, activate, deactivate, chainId } = useWeb3React();

  function toggleProfile() {
    setShowProfile(!showProfile);
  }

  // to connect in reaction to user activity with regards to the injected provider
  useInactiveListener();

  return (
    <header className={style.header}>
      <div className="d-flex align-items-center justify-content-between w-100">
        <div className="d-flex align-items-center">
          <img src={logo} alt="website logo" className={style.logo} />
          <span className={style.name}>Movr Network</span>
        </div>

        {/* login and profile section */}
        {active ? (
          <div className={style.account} onClick={toggleProfile}>
            <span>Account {truncate(account)}</span>
            {showProfile && (
              <Profile account={account} deactivate={deactivate} />
            )}
          </div>
        ) : (
          <Button
            onClick={() => connect(activate)}
          >
            {active ? account : "Connect your wallet"}
          </Button>
        )}
      </div>
    </header>
  );
};

// profile component
const Profile = ({ account, deactivate }) => {
  return (
    <div className={style["account__profile"]}>
      <div className={style["account__profile__header"]}>
        <div className="d-flex w-100 justify-content-between">
          <span>Account {truncate(account)}</span>
          {/* <span>Chain</span> */}
        </div>
      </div>
      <div className={style["account__profile__content"]}>
        <button
          className={style["account__profile__content__button"]}
          onClick={() => {
            disconnect(deactivate);
          }}
        >
          Disconnect
        </button>
      </div>
    </div>
  );
};
