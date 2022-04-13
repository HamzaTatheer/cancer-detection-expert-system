import React, { useState } from "react";
import ImagePatchDisplay from "./ImagePatchDisplay";
import Controller from "./Controller";
import Draggable from "react-draggable";
import axios from "axios";

export default function SVSViewer(props){

    let {svs_width,svs_height} = props;
    
    let [displayPos,setDisplayPos] = useState({x:window.innerWidth,y:0});
    let [mouseMovementStart,setMouseMovementStart] = useState(false);
    let [filename,setFileName] = useState(props.filename);

    let [coordX,setCoordX] = useState(10);
    let [coordY,setCoordY] = useState(30);



    let getOrignalTile = (x,y)=>{
        return new Promise((res,rej)=>{
            axios.get('http://localhost:5000/getSvsPatch',{params:{filename:filename,x:coordX,y:coordY}}).then(({data})=>{
                res(data['tile']);
            }).catch((err)=>rej(err))
        });
    }

    let getInferenceTile = (x,y)=>{
        return new Promise((res,rej)=>{
            axios.get('http://localhost:5000/getSvsPatch',{params:{filename:filename,x:coordX,y:coordY}}).then(({data})=>{
                res(data['tile']);
            }).catch((err)=>rej(err))
        });
    }



    let handleUp =()=>{
        if(coordX-1 >= 0){
            setCoordX(coordX-1);
        }
    }

    let handleDown =()=>{
        if(coordX+1 <= svs_height){
            setCoordX(coordX+1);
        }
    }

    let handleLeft =()=>{
        if(coordY-1 >= 0){
            setCoordY(coordY-1);
        }
    }

    let handleRight =()=>{


        if(coordY+1 <= svs_width){
            setCoordY(coordY+1);
        }
    }


    let DisplayStats = ()=>{

        {JSON.stringify(displayPos)}
        {JSON.stringify(mouseMovementStart)}

        return (
            <div style={{position:"absolute",padding:"10px",zIndex:5000}}>
            {" X:"+coordX + ",Y:"+coordY}
            </div>
        );
    }
    //<DisplayStats/>
    //for handling bar, i did 100vw to 99vw. this might be buggy. later need to make right:10px for bar to fix it and width back to 100vw
    return (
        <div className="noselect"  onMouseUp={()=>setMouseMovementStart(false)} onMouseMove={(e)=> mouseMovementStart ? setDisplayPos({x:e.clientX,y:e.clientY}) : null} style={{height:"80vh",width:"100vw",position:"relative"}}>
        <DisplayStats/>
        <div style={{position:"absolute",height:"inherit"}}>
            <ImagePatchDisplay alt="tile result" width="100vw" height="100%" background="#FFE7C7" getTile={getInferenceTile} x={coordX} y={coordY}/>
        </div>

        <div style={{height:"inherit",position:"absolute",left:"0px",right:window.innerWidth - displayPos.x,overflow:"hidden"}}>
                <ImagePatchDisplay alt="tile orignal" width="100vw" height="100%" background="#FEF8DD" getTile={getOrignalTile} x={coordX} y={coordY}/>
                <div onMouseDown={()=>setMouseMovementStart(true)} style={{height:"100%",width:"10px",position:"absolute",top:"0px",right:"0px",background:"gray"}}/>
        </div>

        <Controller onClickUp={handleUp} onClickDown={handleDown} onClickLeft={handleLeft} onClickRight={handleRight}/>
        </div>
    )


}