import React,{useState} from 'react';
import DraggableCore from 'react-draggable';

export default function RecyclerView(){


    let block = (background)=><div style={{width:"300px",height:"300px",background}}></div>
    let [initialPosition1,setinitialPosition1] = useState({x: 200, y: 150});    
    let [position1,setPosition1] = useState({x: 300, y: 0});
    let [position2,setPosition2] = useState({x: 0, y: 0});
    let [relativeDist,setRelativeDist] = useState({x:0,y:0});

    console.log(position2);

    let handleStop = (obj)=>{
        setPosition1({x: position1.x + (obj.clientX - initialPosition1.x),y:position1.y});
    }

    let handleStart = (obj)=>{
         setinitialPosition1({x:obj.clientX,y:position1.y});
         setRelativeDist({x:position2.x-obj.clientX,y:position2.y});
    }

    let handleDrag = (obj)=>{
        setPosition2({x:obj.x+relativeDist.x,y:position2.y})
    }



    return (
        <>
        <div style={{display:"flex",flexDirection:"row"}}>
            <DraggableCore position={position1} axis="x"  onStart={handleStart} onDrag={handleDrag} onStop={handleStop}>
                {block("red")}
            </DraggableCore>
            <DraggableCore position={position2} >
                {block("blue")}
            </DraggableCore>
        </div>
        </>
    );

}