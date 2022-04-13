//service to view image
//middle loaded at certain zoom level
//cursor moved to the right
//cursor movement stopped
//get visible area
//svs viewer with file connector, socketio connection, real time image request, patch processed, location returned


import React, { useEffect,useState } from 'react';
import {useLocation} from 'react-router-dom'
import Loading from '../components/Loading';
import SvsViewer from "../components/SVSViewer";
import axios from "axios";
import { useDispatch } from 'react-redux';
import { showNotification } from '../redux/actions/notification';

export default function ImageViewer(){

    let dispatch = useDispatch();
    let {state} = useLocation();
    let [dim,setDim] = useState();
    
    if(state == null){
        state = {filename:"TCGA-HE-7130-01Z-00-DX1.1E46B522-6A18-4286-B84A-4C7FFD3B4833.svs"}
    }

    let filename = state.filename;


    useEffect(()=>{
        axios.get("http://localhost:5000/getSvsDimensions",{  params: {
            filename
          }}).then(({data})=>{
            setDim({height:data.height,width:data.width});
            console.log(data);
        }).catch((err)=>{
            console.log(err);
            dispatch(showNotification("Can not Load Svs File","error"));
        })
    },[])


    return <>{dim ? <SvsViewer svs_height={dim.height} svs_width={dim.width}  filename={filename}/> : <Loading label="Loading Svs"/>}</>

}
