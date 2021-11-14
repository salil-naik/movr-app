import { Web3ReactProvider } from "@web3-react/core";
import Web3 from "web3";
import "./styles/app.scss";
import { Header } from "./components/index";
import { Homepage } from "./pages/Homepage/Homepage";

function getLibrary(provider) {
  return new Web3(provider);
}

function App() {
  return (
    <div className="App">
      <Web3ReactProvider getLibrary={getLibrary}>
        <Header />
        <Homepage />
      </Web3ReactProvider>
    </div>
  );
}

export default App;
