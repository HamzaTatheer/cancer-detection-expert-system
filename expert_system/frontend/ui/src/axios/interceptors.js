import {instance} from "./axios-config";


export const addInterceptors = (instance)=>{
	instance.interceptors.request.use(addAccessToken,handleRequestError);
	instance.interceptors.response.use(handleResponseOK,handleResponseError);
};


export const addAccessToken = (config) => {
	const data = JSON.parse(localStorage.getItem("cancer_detection_webapp_data"));
	let accessToken = data.token;
	return { ...config, headers: { "access_token": `${accessToken}` } };
};

export const handleRequestError = (error) => {
	console.log("handleRequestError", error);
	return Promise.reject(error);
};


export const handleResponseOK = (response) => {
	console.log("handleResponseOK", response);
	return response;
};

export const handleResponseError = (error) => {
	return Promise.reject(error);
};