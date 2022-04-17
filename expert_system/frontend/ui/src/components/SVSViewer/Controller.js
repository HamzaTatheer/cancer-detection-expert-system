import React from 'react';
import { ArrowUpward,ArrowDownward,ArrowBack,ArrowForward } from '@mui/icons-material';
import { Icon, IconButton } from '@mui/material';
import Draggable from 'react-draggable';
import { useState } from 'react';

export default function SvsViewer(props){

    let [opacity,setOpacity] = useState(1);


    return (
        <div style={{width:"100%",height:"100%",position:"absolute",display:"contents"}}>

        <Draggable onStart={()=>setOpacity(0.8)} onStop={()=>setOpacity(1)} defaultPosition={{x: window.innerWidth - 300, y: window.innerHeight-300}} bounds={{left: 0, top: 0, right: window.innerWidth-200, bottom: window.innerHeight-300}}>
        <div className='grabbable' style={{width:"fit-content",height:"fit-content",display:"flex",alignItems:'center',background:"white",boxShadow:"rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",padding:"10px",opacity,transition: "opacity 1s linear"}}>
            <IconButton onClick={()=> props.onClickLeft()}>
            <ArrowBack/>
            </IconButton>
            <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                
                <IconButton onClick={()=> props.onClickUp()}>
                <ArrowUpward/>
                </IconButton>
                <div style={{width:"15px",height:"15px",margin:"10px",borderRadius:"10px",background:"#eee"}}></div>
                <IconButton onClick={()=> props.onClickDown()}>
                <ArrowDownward/>
                </IconButton>
            </div>
            <IconButton onClick={()=>props.onClickRight()}>
            <ArrowForward/>
            </IconButton>
        </div>
        </Draggable>


        </div>
    )


}