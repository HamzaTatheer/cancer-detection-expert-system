import React, { useState } from "react";
import ImagePatchDisplay from "./ImagePatchDisplay";
import Controller from "./Controller";
import Draggable from "react-draggable";

export default function SVSViewer(){
    
    let [displayPos,setDisplayPos] = useState({x:window.innerWidth,y:0});

    let [mouseMovementStart,setMouseMovementStart] = useState(false);


    let DisplayStats = ()=>{
        return (
            <div style={{position:"absolute",zIndex:5000}}>
            {JSON.stringify(displayPos)}
            {JSON.stringify(mouseMovementStart)}
            </div>
        );
    }
    //<DisplayStats/>

    return (
        <div  onMouseUp={()=>setMouseMovementStart(false)} onMouseMove={(e)=> mouseMovementStart ? setDisplayPos({x:e.clientX,y:e.clientY}) : null} style={{height:"81vh",width:"100vw",position:"relative"}}>
        
        <div style={{position:"absolute",height:"inherit"}}>
            <ImagePatchDisplay img="https://i.ibb.co/9h32wCw/result.png" width="100vw" height="100%" background="#FFE7C7" />
        </div>

        <div style={{height:"inherit",position:"absolute",left:"0px",right:window.innerWidth - displayPos.x,overflow:"hidden"}}>
                <ImagePatchDisplay img="https://i.ibb.co/Lrqrn8h/input.png" width="100vw" height="100%" background="#FEF8DD"/>
                <div onMouseDown={()=>setMouseMovementStart(true)} style={{height:"100%",width:"10px",position:"absolute",top:"0px",right:"0px",background:"gray"}}/>
        </div>

        <Controller onClickUp={()=>{console.log("Change")}} onClickDown={()=>{console.log("Change")}} onClickLeft={()=>{console.log("Change")}} onClickRight={()=>{console.log("Change")}}/>
        </div>
    )


}