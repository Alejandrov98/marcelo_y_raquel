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

    default:
      return { ...state };
  }
};

export default rootReducer;
