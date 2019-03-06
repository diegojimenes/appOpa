const INITIAL_STATE = {
  lastId: false
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SEND_COMMENT":
      return { ...state, lastId: action.payload };
    default:
      return state;
  }
};
