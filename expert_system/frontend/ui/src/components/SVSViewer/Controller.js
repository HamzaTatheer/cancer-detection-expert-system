import React from 'react';
import { ArrowUpward,ArrowDownward,ArrowBack,ArrowForward } from '@mui/icons-material';
import { Icon, IconButton } from '@mui/material';

export default function SvsViewer(props){

    return (
        <>

        <div style={{position:"absolute",right:"150px",bottom:"100px",display:"flex",alignItems:'center',background:"white",boxShadow:"rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",padding:"10px"}}>
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
        </>
    )


}