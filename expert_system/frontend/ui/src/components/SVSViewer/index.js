import React, { useState } from "react";
import ImagePatchDisplay from "./ImagePatchDisplay";
import Controller from "./Controller";
import Draggable from "react-draggable";
import axios from "axios";

export default function SVSViewer(props){

    let {svs_width,svs_height} = props;
    
    let [displayPos,setDisplayPos] = useState({x:window.innerWidth/2,y:0});
    let [mouseMovementStart,setMouseMovementStart] = useState(false);
    let [filename,setFileName] = useState(props.filename);

    let [coordX,setCoordX] = useState(30);
    let [coordY,setCoordY] = useState(30);



    let getOrignalTile = (x,y)=>{
        return new Promise((res,rej)=>{
            axios.get('http://localhost:5000/getSvsPatch',{params:{filename:filename,x:coordX,y:coordY}}).then(({data})=>{
                res(data['tile']);
            }).catch((err)=>rej(err))
        });
    }

    let getInferenceTile = (x,y)=>{
        return new Promise(async (res,rej)=>{

            // #state
            // #0-found in cache
            // #1-starting rendering
            // #2-still rendering
            // #3-renderingResultAvailable
            



            await axios.get('http://localhost:5000/getSvsPatchResult',{params:{filename:filename,x:coordX,y:coordY}}).then(({data})=>{
                let status = data['status']
                

                if(status == 0 || status == 3){
                    res(data['img_str'])
                }

            })


                let timer = setInterval(function funtimes(){

                    axios.get('http://localhost:5000/getSvsPatchResult',{params:{filename:filename,x:coordX,y:coordY}}).then(({data})=>{
                        let status = data['status']
                        
                        switch (status) {
                            case 0:
                                //return result
                                console.log("Result: Found In Cache")
                                res(data['img_str'])
                                clearInterval(timer)
                                break;
                            case 1:
                                //do nothing
                                console.log("Result: Starting Rendering")
                                break;
                            case 2:
                                //do nothing
                                console.log("Result: Still Rendering")
                                break;
                            case 3:
                                //return result
                                console.log("Result: Rendered")
                                res(data['img_str'])
                                clearInterval(timer)
                                break;
                                
                            default:
                                console.log(status);
                                break;
                        }
                    }).catch((err)=>rej(err))                
                },10000);
            

            // let intervalId = setInterval(getInferedImage,30000);
            // console.log("GOOOOOOOOOOOOOOOOOOOOOOD")
            // console.log(intervalId)
            // function getInferedImage(){
            //     axios.get('http://localhost:5000/getSvsPatchResult',{params:{filename:filename,x:coordX,y:coordY}}).then(({data})=>{
            //         let status = data['status']
            //         console.log("DOING IT")
            //         switch (status) {
            //             case 0:
            //                 //return result
            //                 print("Result: Found In Cache")
            //                 clearInterval(intervalId)
            //                 break;
            //             case 1:
            //                 //do nothing
            //                 print("Result: Starting Rendering")
            //                 break;
            //             case 2:
            //                 //do nothing
            //                 print("Result: Still Rendering")
            //                 break;
            //             case 3:
            //                 //return result
            //                 print("Result: Rendered")
            //                 clearInterval(intervalId)
            //                 break;
                            
            //             default:
            //                 break;
            //         }
            //     }).catch((err)=>console.log(err))                
            // }

            // axios.get('http://localhost:5000/getSvsPatch',{params:{filename:filename,x:coordX,y:coordY}}).then(({data})=>{
            //     res(data['tile']);
            // }).catch((err)=>rej(err))
        
        
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
            <div className="fadeOnHover" style={{position:"absolute",padding:"25px",margin:"20px",background:"white",zIndex:5000}}>
            {"Displaying Row:"+coordX + " Col :"+coordY}
                
                <small>
                <br/>
                <br/>
                Blue: epithelial<br/>
                Red: inflammatory<br/>
                Green: spindle-shaped<br/>
                Cyan: miscellaneous<br/>
                </small>
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
                <div onMouseDown={()=>setMouseMovementStart(true)} style={{height:"100%",width:"10px",position:"absolute",top:"0px",right:"0px",background:"white",cursor:"col-resize",display:"flex",justifyContent:"center",alignItems:"center",boxShadow:"rgb(0, 0, 0) 0px 0px 20px"}}>
                <div style={{fontWeight:"bold"}}>
                    .<br/>.<br/>.
                </div>
                </div>
        </div>

        <Draggable>
            <Controller onClickUp={handleUp} onClickDown={handleDown} onClickLeft={handleLeft} onClickRight={handleRight}/>
        </Draggable>
        </div>
    )


}