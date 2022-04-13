import React,{useState} from 'react';
import {Dialog,DialogTitle,DialogContent,DialogActions,TextField,Button} from '@mui/material';
import LinearProgress from "../components/LinearProgressWithLabel";
import axios from "axios";


export default function PatientForm(props){

    let [patientName,setPatientName] = useState("");
    let [cnic,setCnic] = useState("");
    let [selectedFile,setSelectedFile] = useState(null);
    let [imgId,setImgId] = useState(null);
    let [error,setError] = useState(null);
    let [percentage,setPercentage] = useState(0);

    let onFileSelect = event => {
        setSelectedFile(event.target.files[0]);


        var req = new XMLHttpRequest();

        req.onreadystatechange = function() {
            if(this.readyState=== 4 && this.status===201){
                setImgId(JSON.parse(this.responseText).uuid);//string
            }
        };

        req.addEventListener('progress', function (evt) {
            var percentage = (evt.loaded / evt.total * 100);
            setPercentage(percentage);
        });
        
        req.addEventListener('load', function () {
            alert('Upload Finished');
        });

        req.open('POST', 'http://localhost:5000/uploadPatientFile');
        req.setRequestHeader('Content-Type', 'application/octet-stream');
        req.send(selectedFile);

    };

    let submitForm = ()=>{
        setError("");

        if(patientName.length === 0){
            setError("Please Enter Patient Name");
            return;
        }


        if(selectedFile === null ){
            setError("Please Select File To Upload");
            return;
        }

        if(selectedFile.name.slice(-4) !== '.svs'){
            setError("Only Svs file is supported");
            return;
        }
        
        // axios.post( "http://localhost:5000/addPatient").catch((err)=>{
        //     console.log(err);
        // });

        //axios.post( "localhost:5000/uploadPatientFile",selectedFile,{"Content-Type":"application/octet-stream"});

        setPatientName("");
        setSelectedFile(null);
        setCnic("");
        setError("");
        props.onClose();        
    }

    return (
        <Dialog {...props}>
        <DialogTitle>Add New Patient</DialogTitle>
        <DialogContent>
            <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Patient Name"
            type="text"
            fullWidth
            variant="standard"
            value={patientName}
            onChange={(e)=>setPatientName(e.target.value)}
            />

            <TextField
            margin="dense"
            id="name"
            label="CNIC"
            type="text"
            fullWidth
            variant="standard"
            value={cnic}
            onChange={(e)=>setCnic(e.target.value)}
            />


            <br/>
            <br/>
            <br/>

            {percentage > 0 ? <LinearProgress value={percentage} /> : null} 


        <div style={{width:"100%"}}>
            <Button
            style={{float:"right"}}
            component="label"
            
            >
            Upload File {selectedFile == null ? null : "("+selectedFile.name+")"}
            <input
                onChange={onFileSelect}
                type="file"
                hidden
            />
            </Button>

        </div>


        <p style={{color:'red'}}>{error}</p>

        </DialogContent>
        <DialogActions>
            <Button onClick={()=>props.onClose()}>Close</Button>
            <Button onClick={submitForm}>Submit</Button>
        </DialogActions>
      </Dialog>
    );
}