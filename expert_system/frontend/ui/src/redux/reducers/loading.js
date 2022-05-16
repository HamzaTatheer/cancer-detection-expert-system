import {LOADING_START,LOADING_END} from "../actionTypes";


const initial_state = false;
export default (
    state=initial_state,
    action
    )=> {

        switch(action.type){

            case LOADING_START:{
                return true;
            }

            case LOADING_END:{
                return false;
            }

            default:{
                return initial_state
            }

        }

};