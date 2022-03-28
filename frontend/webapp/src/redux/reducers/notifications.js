import {ADD_NOTIFICATION,REMOVE_NOTIFICATION} from "../actionTypes";


const initial_state = [];
export default (
    state=initial_state,
    action
    )=> {


        switch(action.type){

            case ADD_NOTIFICATION:{
                return [...state,action.payload];
            }

            case REMOVE_NOTIFICATION:{
                let {id} = action.payload;
                return state.filter((obj)=>obj.id !== id)
            }

            default:{
                return initial_state
            }

        }

};