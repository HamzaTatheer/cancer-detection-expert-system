import {LOGIN,LOGOUT,LOGIN_START,LOGIN_END} from "../actionTypes";
import {LOCAL_STORAGE_AUTH} from "../../utilities/constants";


const initial_state = {isLoggedIn:false};
export default (
    state=initial_state,
    action
    )=> {

        switch(action.type){

            case LOGIN:{
                let data = {...state,isLoggedIn:true, ...action.payload};
                localStorage.setItem(LOCAL_STORAGE_AUTH,JSON.stringify(data))
                return data;
            }


            case LOGOUT:{
                localStorage.setItem(LOCAL_STORAGE_AUTH,JSON.stringify(initial_state));
                return initial_state;
            }

            default:{
                let data = localStorage.getItem(LOCAL_STORAGE_AUTH);
                return data ? JSON.parse(data) : initial_state;
            }

        }

};