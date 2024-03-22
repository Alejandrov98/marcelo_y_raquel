import React from "react";
import Style from "./Information.module.css";
import mapa from "../../assets/mapa.png";
import inv from "../../assets/Marcelo y Raquel.png";
import { FaMapMarkerAlt } from "react-icons/fa";

export default function Information() {
  
  return (
    <div class='container'>
      <div id="informacionEvento" className={Style.container}>
        <img src={inv} alt="" className={Style.image} />
      </div>
      <div className={Style.mapCard}>
        <h3 className={Style.title}>
        <FaMapMarkerAlt className={Style.icon} /> ¿Cómo llegar? (Toca el mapa
          para ver)
        </h3>
        <a
          href="https://maps.app.goo.gl/z47aDzQQWovvmjGw9"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={mapa} className={Style.map} alt="" />
        </a>
      </div>
    </div>
  );
}
