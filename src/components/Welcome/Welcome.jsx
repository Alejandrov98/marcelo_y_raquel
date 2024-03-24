import React from "react";
import Style from "./Welcome.module.css";
import { BsInfoCircle, BsImage, BsPeople, BsBook } from "react-icons/bs"; // Importa los íconos deseados

export default function Welcome() {
  return (
    <div className={Style.background}>
      <div className={Style.top}>
        <span className={Style.mr}>M + R</span>
      </div>
      <div className={Style.navbar}>
        <div>
          <a className={Style.navLink} href="#informacionEvento">
            <BsInfoCircle className={Style.icon} /> Información
          </a>
        </div>
        <div>
          <a className={Style.navLink} href="#fotos" disabled>
            <BsImage className={Style.icon} /> Álbum
          </a>
        </div>
        <div>
          <a className={Style.navLink} href="#ListaInvitados" disabled>
            <BsPeople className={Style.icon} /> Invitados
          </a>
          
        </div>
        <div>
          <a className={Style.navLink} href="#libroFirmas" disabled>
            <BsBook className={Style.icon} /> Firmas
          </a>
          <span className={Style.comingSoon}>(próximamente)</span>
        </div>
      </div>
    </div>
  );
}
