

import React,{useEffect, useState} from 'react';
import {Dialog,DialogTitle,DialogContent,DialogActions,TextField,Button} from '@mui/material';
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import LinearProgress from "../components/LinearProgressWithLabel";
import axios from "axios";


export default function InferanceSelection(props){

    let [thumbnail,setThumbnail] = useState(null);
    let [estimatedTime,setEstimatedTime] = useState(0);
    const [crop, setCrop] = useState();

    useEffect(()=>{
        if(props.svs_file !== undefined){
    
            axios.post("http://localhost:5000/getSvsThumbnail",{svs_file:props.svs_file,thumbnail_height:300}).then(({data})=>{    
                setThumbnail("data:image/png;base64,"+data.thumbnail);
            }).catch((err)=>console.log(err))
    
        }},[props.svs_file])


    let updateEstimatedTime = (data)=>{
        alert("Estimated Time: " + estimatedTime);
        console.log(crop);
    }


    let onClose = ()=>{
        setCrop();
        props.onClose();
    }

    return (
        <Dialog {...props} onClose={onClose}>
        <DialogTitle>Select Area to run inference on <span style={{fontSize:"11px"}}> (Gray Area already has Results) </span></DialogTitle>
        <DialogContent>
            <ReactCrop crop={crop} onDragEnd={updateEstimatedTime} onChange={(c) => setCrop(c)}>
                <img src={thumbnail} />
            </ReactCrop>
        </DialogContent>
        <DialogActions>
            <Button onClick={()=>props.onClose()}>Close</Button>
            <Button>Run Inference</Button>
        </DialogActions>
      </Dialog>
    );
}