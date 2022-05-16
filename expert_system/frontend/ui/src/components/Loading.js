import React from "react";
import { CircularProgress } from '@mui/material';

export default function Loading(props){

    return (
        <div style={{position:"absolute",top:"45%",left:"45%"}}>            
            <div style={{textAlign:"center"}}>
                <CircularProgress size={80}/>
                <p style={{userSelect:"none"}}>{props.label ? props.label : "Loading.."}</p>
            </div>
        </div>
    )

}