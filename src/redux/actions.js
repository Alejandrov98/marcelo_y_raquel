import axios from "axios";

export const GET_INVITADOS = "GET_INVITADOS";
export const POST_INVITADO = "POST_INVITADO";

export const GET_FOTOS = "GET_FOTOS";
export const POST_FOTO = "POST_FOTO";

export const GET_FIRMAS = "GET_FIRMAS";
export const POST_FIRMA = "POST_FIRMA";

//DEV

const firmasURL = import.meta.env.VITE_API_FIRMAS_URL;
const fotosURL = import.meta.env.VITE_API_FOTOS_URL;
const invitadosURL = import.meta.env.VITE_API_INVITADOS_URL;

// Actions  de Tiendas y comercios

export const GetInvitados = () => {
  return async function (dispatch) {
    try {
      var response = await axios.get(invitadosURL);

      if (response.data !== null) {
        return dispatch({
          type: GET_INVITADOS,
          payload: response.data,
        });
      } else {
        return dispatch({
          type: GET_INVITADOS,
          payload: [],
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const PostInvitado = (atributos) => {
  return async function (dispatch) {
    try {
      var f = new FormData();
      f.append("METHOD", "POST");
      f.append("nombre_completo", atributos.nombre_completo);
      var response = await axios.post(invitadosURL, f);
      console.log("Invitado creada en la ACTION: ", response.data);
      return dispatch({
        type: POST_INVITADO,
        payload: response.data,
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};


export const GetFotos = () => {
  return async function (dispatch) {
    try {
      var response = await axios.get(fotosURL);

      if (response.data !== null) {
        return dispatch({
          type: GET_FOTOS,
          payload: response.data,
        });
      } else {
        return dispatch({
          type: GET_FOTOS,
          payload: [],
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const PostFoto = (atributos) => {
  return async function (dispatch) {
    try {
      var f = new FormData();
      f.append("METHOD", "POST");
      f.append("foto", atributos.foto);
      f.append("id_invitado", atributos.id_invitado)
      var response = await axios.post(invitadosURL, f);
      console.log("Invitado creada en la ACTION: ", response.data);
      return dispatch({
        type: POST_INVITADO,
        payload: response.data,
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};