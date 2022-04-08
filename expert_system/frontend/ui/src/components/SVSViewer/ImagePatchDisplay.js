import React, { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';


let Loading = ()=>{

    return (
        <div style={{position:"absolute",top:"45%",left:"45%"}}>            
            <div style={{textAlign:"center"}}>
                <CircularProgress size={80}/>
                <p style={{userSelect:"none"}}>Loading Image</p>
            </div>
        </div>
    )

}


//use this later
//{Img ? Img : <Loading/>}
export default function SvsViewer(props){

    let {width,height,background} = props;
    background = background ? background : "white";
    let {imageid,tileSize,XYcoordinate} = props;
    let [Img,setImg] = useState();

    useEffect(()=>{
    },[tileSize,XYcoordinate])


    return (
        <div style={{width:width,height:height,background,position:"relative"}}>
            {props.img ? <img height="100%" width="100%" src={props.img}/> : <Loading/>}
        </div>
    )


}