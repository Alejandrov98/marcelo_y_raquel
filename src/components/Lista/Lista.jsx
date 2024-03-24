import React, { useEffect } from "react";
import Style from "./Lista.module.css";
import { useSelector, useDispatch } from "react-redux";
import { GetInvitados } from "../../redux/actions";

export default function Lista() {
  const dispatch = useDispatch();
  const invitados = useSelector((state) => state.invitados);

  useEffect(() => {
    dispatch(GetInvitados());
  }, []);

  return (
    <div className={Style.invitadosList} id='ListaInvitados'>
      <h2 className={Style.title}>Lista de Invitados: {invitados.length-2}</h2>
      <ul className={Style.invitados}>
        {invitados.map((invitado, index) => (
          <li key={index} className={Style.invitadoItem}>
            {invitado.nombre_completo}
          </li>
        )).reverse()}
      </ul>
    </div>
  );
}
