import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home(){

    let navigate = useNavigate();

    return (

        <div style={{display:"flex",justifyContent:"center",marginTop:"70px"}}>


                <div style={{width:"840px"}}>

                    <div style={{display:"flex",justifyContent:"space-between",width:"840px"}}>
                        
                        
                        <div className="touchable" onClick={()=>navigate("/dashboard",{replace:true})} style={{cursor:"pointer", width:"25%",background:"#F457AE",color:"white",padding:"20px"}}>
                            <h1>Breast Cancer Detection</h1>
                        </div>

                        <div className="touchable" style={{cursor:"pointer",width:"59%",background:"#FFBF00",color:"white",padding:"20px"}}>
                            <h1>Heart Failiure Readmission Prediction</h1>
                        </div>
                    </div>

                    <div className="touchable" style={{cursor:"pointer",marginLeft:"auto",marginRight:"auto",background:"#89CFF0",color:"white",padding:"20px",marginTop:"30px"}}>
                        <h1>Melanoma Cancer Detection</h1>
                    </div>


                </div>


        </div>
    );


}