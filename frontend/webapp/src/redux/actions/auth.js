import {LOGIN,LOGOUT,LOADING_START,LOADING_END,SHOW_NOTIFICATIONS} from "../actionTypes";

export const logIn = () => {
    
    return (dispatch)=>{

        dispatch({type:LOADING_START});

        setTimeout(()=>{
            let email = 'hamza@gmail.com';
            let role = 0;
            let token = 'token123456';
            const no_error = "";
            dispatch({type: LOGIN,payload:{email,role,token}});
            dispatch({type:LOADING_END,payload:{error:no_error}});
        },5000);


    }
};

// reducer: [email,role,token]


export const logOut = () => {
	return{
		type: LOGOUT,
	};
};