// node modules
import { combineReducers } from "redux";
// reducers
import authReducer from "./auth";
import aulasReducer from "./aulas";
import comentario from "./comentario";
export default combineReducers({
  authReducer,
  aulasReducer,
  comentario
});
