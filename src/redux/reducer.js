const initialState = {
  invitados: [],
  fotos: [],
  firmas: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_INVITADOS":
      return {
        ...state,
        invitados: action.payload,
      };

    case "POST_INVITADO":
      return {
        ...state,
      };

    case "GET_FOTOS":
      return {
        ...state,
        fotos: action.payload,
      };

    case "POST_FOTO":
      return {
        ...state,
      };

    case "GET_FIRMAS":
      return {
        ...state,
        firmas: action.payload,
      };

    case "POST_FIRMA":
      return {
        ...state,
      };

    default:
      return { ...state };
  }
};

export default rootReducer;
