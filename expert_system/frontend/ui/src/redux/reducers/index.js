import {combineReducers} from "redux";
import auth_reducer from "./auth";
import loading_reducer from './loading';
import notifications_reducer from "./notifications";

const allReducers = combineReducers({
    auth:auth_reducer,
    loading:loading_reducer,
    notifications:notifications_reducer
});

export default allReducers;