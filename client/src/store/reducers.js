import { combineReducers } from "redux";
import authReducer from "./auth/authReducer"
import globalReducer from "./global/globalReducer"

export default combineReducers({
    auth:authReducer,
    global:globalReducer,
})