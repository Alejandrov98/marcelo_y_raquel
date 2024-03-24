import Information from "./components/Information/Information";
import Welcome from "./components/Welcome/Welcome";
import "bootstrap/dist/css/bootstrap.min.css";
import Style from "./App.module.css";
import Album from "./components/Album/Album";
import Confirmar from "./components/Confirmar/Confirmar";
import Lista from "./components/Lista/Lista";

function App() {
  return (
    <div>
      <Welcome />
      <div className={Style.background}>
        <Confirmar />
        <Information />
        <Album />
        <Lista/>
      </div>
    </div>
  );
}

export default App;
