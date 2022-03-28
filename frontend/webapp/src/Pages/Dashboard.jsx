import React from 'react';
import { TableRow,TableCell,TableBody, Button, TextField } from '@mui/material';
import { Popover } from '@mui/material';
import { useNavigate } from 'react-router-dom';


export default function Dashboard(){


    let navigate = useNavigate();

    let data = [
        {id:1,name:"Hamza Tatheer",status:"uploaded",hasInference:true},
        {id:2,name:"Khizer Hayat",status:"uploading",hasInference:true},
        {id:4,name:"Umair Hussain",status:"inference done",hasInference:true},
        {id:5,name:"Muntazer Baig",status:"inference done",hasInference:true},
        {id:6,name:"Rashid Mia",status:"inference done",hasInference:true},
        {id:7,name:"Omair Hayat",status:"inference done",hasInference:true},
        {id:8,name:"Umair Ali",status:"inference done",hasInference:true},
        {id:9,name:"Musa Sheikh",status:"inference done",hasInference:true},

    ]



    return (

        <>

        <div style={{marginTop:"100px",width:"100%",display:"flex",justifyContent:"center"}}>
        <div>
        <TableBody>
            <TableRow>
                <TableCell style={{textAlign:"center"}}>
                    Patient No
                </TableCell>
                <TableCell style={{textAlign:"center"}}>
                    Patient Name
                </TableCell>

                <TableCell style={{textAlign:"center"}}>
                    Status
                </TableCell>

                <TableCell style={{textAlign:"center"}}>
                </TableCell>

                <TableCell style={{textAlign:"center"}}>
                    <Button style={{padding:"0px"}}>
                        Create New
                    </Button>
                </TableCell>

            </TableRow>

            {data.map((item)=>            
            
            <TableRow>
                <TableCell>
                    {item.id}
                </TableCell>
                <TableCell>
                    {item.name}
                </TableCell>

                <TableCell>
                    {item.status}
                </TableCell>

                <TableCell>
                    <Button style={{color:'green'}} onClick={()=>navigate("/viewimage",{replace:true})}>
                        Run Inference
                    </Button>
                </TableCell>

                <TableCell>
                    <Button>
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