import { combineReducers } from "redux";
import auth from "./authReducer";
import getRecordsReducer from "./getBuyerRecordsReducer";
import getDataReducer from "./getDataReducer";

export default combineReducers({ auth, getRecordsReducer, getDataReducer });
