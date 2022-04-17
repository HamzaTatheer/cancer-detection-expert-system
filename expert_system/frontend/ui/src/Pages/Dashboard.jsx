import React,{useState} from 'react';
import { TableRow,TableCell,TableBody, Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PatientForm from "../components/PatientForm";
import InferanceSelection from '../components/InferenceSelection';
import axios from "axios";
import SearchBar from "../components/SearchBar";






export default function Dashboard(){


    let navigate = useNavigate();
    let [isInferenceSelectOpen,setInfererenceSelectOpen] = useState(false);
    let [selectedSvs,setSelectedSvs] = useState(null);
    let [isFormOpen,setFormOpen] = useState(false);
    let [searchText,setSearchText] = useState("");

    let filteredListBySearch = (arr,item_name,searchText) => {
        if (searchText == "") return arr;
        else
          return arr.filter((item, index) => {
            return item[item_name].includes(searchText);
          });
      };
    


    let data = [
        {id:1,name:"Hamza Tatheer",cnic:"39241928337829",status:"uploaded",filename:"TCGA-B0-5711-01Z-00-DX1.6839921f-ec08-4e94-8bf9-4b5a4fcdda45.svs",hasInference:true},
        {id:2,name:"Khizer Hayat",cnic:"34241928337829",status:"uploading",filename:"TCGA-HE-7130-01Z-00-DX1.1E46B522-6A18-4286-B84A-4C7FFD3B4833.svs",hasInference:true},
        {id:4,name:"Umair Hussain",cnic:"34241928337829",status:"inference done",filename:"TCGA-HE-7130-01Z-00-DX1.1E46B522-6A18-4286-B84A-4C7FFD3B4833.svs",hasInference:true},
        {id:5,name:"Muntazer Baig",cnic:"34241928337829",status:"inference done",filename:"TCGA-HE-7130-01Z-00-DX1.1E46B522-6A18-4286-B84A-4C7FFD3B4833.svs",hasInference:true},
        {id:6,name:"Rashid Mia",cnic:"34241928337829",status:"inference done",filename:"TCGA-HE-7130-01Z-00-DX1.1E46B522-6A18-4286-B84A-4C7FFD3B4833.svs",hasInference:true},
        {id:7,name:"Omair Hayat",cnic:"34241928337829",status:"inference done",filename:"TCGA-HE-7130-01Z-00-DX1.1E46B522-6A18-4286-B84A-4C7FFD3B4833.svs",hasInference:true},
        {id:8,name:"Umair Ali",cnic:"34241928337829",status:"inference done",filename:"TCGA-HE-7130-01Z-00-DX1.1E46B522-6A18-4286-B84A-4C7FFD3B4833.svs",hasInference:true},
        {id:9,name:"Musa Sheikh",cnic:"34241928337829",status:"inference done",filename:"TCGA-HE-7130-01Z-00-DX1.1E46B522-6A18-4286-B84A-4C7FFD3B4833.svs",hasInference:true},

    ]

    return (

        <>
        
        <PatientForm open={isFormOpen} onClose={()=>setFormOpen(false)}/>
        <InferanceSelection open={isInferenceSelectOpen} onClose={()=>{setInfererenceSelectOpen(false);setSelectedSvs(null)}} svs_file={selectedSvs}/>

        <div style={{height:"200px",marginTop:"-10px",width:"100%",display:"flex",justifyContent:"center",alignItems:"center",background:"pink"}}>
        <SearchBar onTextChange={(text)=>{setSearchText(text)}} placeholder="Search By Cnic"/>
        </div>


        <div style={{marginTop:"100px",width:"100%",display:"flex",justifyContent:"center"}}>

        <div>
        <TableBody>
            <TableRow>
                <TableCell >
                    Patient No
                </TableCell>
                <TableCell >
                    Patient Name
                </TableCell>

                <TableCell >
                    Cnic
                </TableCell>

                <TableCell >
                    Status
                </TableCell>

                <TableCell >
                </TableCell>

                <TableCell >
                    <Button onClick={()=>setFormOpen(true)} style={{padding:"0px"}}>
                        Create New
                    </Button>
                </TableCell>

            </TableRow>

            {filteredListBySearch(data,"cnic",searchText).map((item)=>            
            
            <TableRow>
                <TableCell>
                    {item.id}
                </TableCell>
                <TableCell>
                    {item.name}
                </TableCell>
                <TableCell>
                    {item.cnic}
                </TableCell>

                <TableCell>
                    {item.status}
                </TableCell>

                <TableCell>
                    <Button style={{color:'green'}} onClick={()=>{setSelectedSvs(item.filename);setInfererenceSelectOpen(true)}} >
                        Run Inference
                    </Button>
                </TableCell>

                <TableCell>
                    <Button onClick={()=>navigate("/viewimage",{replace:true,state:{filename:item.filename}})}>
                        View
                    </Button>
                </TableCell>

            </TableRow>
            )}
        </TableBody>
        </div>
        </div>
        </>
    );
}