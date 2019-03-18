const INITIAL_STATE = {
  notify: []
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "GET_NOTIFY":
      return { ...state, notify: action.payload };
    default:
      return state;
  }
};
