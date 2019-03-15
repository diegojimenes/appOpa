const INITIAL_STATE = {
  posts: [],
  post: [],
  newPost: []
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "GET_POSTS":
      return { ...state, posts: action.payload };
    case "GET_POST":
      return { ...state, post: action.payload };
    case "NEW_POST":
      return { ...state, newPost: action.payload };
    default:
      return state;
  }
};
