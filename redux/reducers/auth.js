const INITIAL_STATE = {
  user: [],
  loginState: false
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "USER":
      return { ...state, user: action.payload };
    case "LOGIN":
      return { ...state, loginState: action.payload };
    case "ERROR":
      return { ...state, loginState: action.payload };
    default:
      return state;
  }
};
