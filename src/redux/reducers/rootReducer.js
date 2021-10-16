import { combineReducers } from "redux";
import authReducers from "./authReducers";
import serviceReducers from "./serviceReducers";

export default combineReducers({
   auth:authReducers,
   service:serviceReducers
})