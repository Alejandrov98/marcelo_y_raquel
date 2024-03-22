import Information from "./components/Information/Information";
import Welcome from "./components/Welcome/Welcome";
import "bootstrap/dist/css/bootstrap.min.css";
import Style from "./App.module.css";
import Album from "./components/Album/Album";
import ListaInvitados from "./components/ListaInvitados/ListaInvitados";

function App() {
  return (
    <div>
      <Welcome />
      <div className={Style.background}>
        <ListaInvitados />
        <Information />
        <Album />
      </div>
    </div>
  );
}

export default App;
