const INITIAL_STATE = {
  user: [],
  users: [],
  ranking: [],
  loginState: false
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "USER":
      return { ...state, user: action.payload };
    case "GET_USERS":
      return { ...state, users: action.payload };
    case "GET_RANKING":
      return { ...state, ranking: action.payload.reverse() };
    case "LOGIN":
      return { ...state, loginState: action.payload };
    case "ERROR":
      return { ...state, loginState: action.payload };
    default:
      return state;
  }
};
