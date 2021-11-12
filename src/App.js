import "./styles/app.scss";
import { Header } from "./components/index";
import { Homepage } from "./pages/Homepage/Homepage";

function App() {
  return <div className="App">
    <Header />
    <Homepage />
  </div>;
}

export default App;
