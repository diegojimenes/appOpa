// node modules
import { combineReducers } from "redux";
// reducers
import authReducer from "./auth";
import aulasReducer from "./aulas";
export default combineReducers({
  authReducer,
  aulasReducer
});
