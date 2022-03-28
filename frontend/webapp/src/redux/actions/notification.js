import {ADD_NOTIFICATION,REMOVE_NOTIFICATION} from "../actionTypes";

/*
@params
type:
error
warning
info
success
*/
export const showNotification = (notification,type) => {
    
    return (dispatch)=>{

        let uuid = Math.floor(Math.random()*10)
        dispatch({type:ADD_NOTIFICATION,payload:{id:uuid,notification,type}})

        setTimeout(()=>{
            dispatch({type:REMOVE_NOTIFICATION,payload:{id:uuid}});
        },3000);


    }
};