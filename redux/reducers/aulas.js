const INITIAL_STATE = {
  aulas: [],
  erro: ""
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "GET_AULAS":
      return { ...state, aulas: action.payload };
    case "NAO_AUTORIZADO":
      return { ...state, erro: action.payload };
    default:
      return state;
  }
};
