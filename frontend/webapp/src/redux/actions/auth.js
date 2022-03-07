import {LOGIN,LOGIN_START,LOGIN_END,LOGOUT,SHOW_NOTIFICATIONS} from "./actionTypes";

export const logIn = () => {
	// return (
	// 		{
	// 			type: SIGN_IN,
	// 			payload: {
	// 				email,
	// 				role,
	// 				token
	// 			}
	// 		}
	// 	);



    return (dispatch)=>{

        dispatch({type:LOGIN_START});

        setTimeout(()=>{
            let email = 'hamza@gmail.com';
            let role = 'admin';
            let token = 'token123456';
            const no_error = "";
            dispatch({type: LOGIN,payload:{email,role,token}});
            dispatch({type:LOGIN_END,payload:{error:no_error}});
        },5000);


    }
};

// reducer: [email,role,token]


export const logOut = () => {
	return{
		type: LOGOUT,
	};
};