import React, { useEffect, useState,useReducer } from 'react';
import { CircularProgress } from '@mui/material';
import { showNotification } from "../../redux/actions/notification";
import { useDispatch } from "react-redux";


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

    let dispatch = useDispatch();

    let {width,height,background} = props;
    background = background ? background : "white";
    let {getTile,x,y} = props;
    let [Img,setImg] = useState();
    const [, forceUpdate] = useReducer(x => x + 1, 0);

    //console.log(getTile);

    useEffect(()=>{

        console.log(x);
        console.log(y);

        getTile(x,y).then((imgstr)=>{
            setImg(imgstr);
            forceUpdate();
        }).catch((err)=>{
            console.log(err)
            dispatch(showNotification("Error Loading Image","error"));
        });

    },[x,y])


    return (
        <div style={{width:width,height:height,background,position:"relative"}}>
            <img height="100%" width="100%" key={Img} src={"data:image/png;base64,"+Img}/>
        </div>
    )


}