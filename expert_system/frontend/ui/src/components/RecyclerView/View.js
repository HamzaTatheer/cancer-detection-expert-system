import React,{useEffect, useState} from 'react';
import DraggableCore from 'react-draggable';

//RecylerView is reponsible for deciding overall positions
//View only displays stuff and reports to RecyclerView about its state
export default function View(props){

    let {id} = props;
    let {startPosition} = props;
    let {newStartPosition} = props;
    let {children} = props;
    let {notifyDragStart,notifyDisplacement} = props;
    let {dragStartListener} = props; //dragStartListener only changes state when some object is started to be dragged
    let {notifyOutside} = props;
    let {informerId,deltaX,deltaY} = props;
    


    let [viewPosition,setViewPosition] = useState(startPosition);
    let [dragStartCoord,setDragStartCoord] = useState({x:0,y:0}); // this is only for the one which is moving
    let [myStartingPosition,setMyStartingPosition] = useState({x:0,y:0}); // this is for ones who are following the mover




    let changeViewPosition = (obj)=>{
        const element = document.getElementById("viewer-patch"+id+1);
        let {x,y} = element.getBoundingClientRect();

        if(x < -1 * (screen.width/3) && y >= 0){

            notifyOutside(id,'left');
            return;
        }

        if(x >= screen.width && y > 0){
            notifyOutside(id,'right');
            return;
        }

        setViewPosition(obj);
    }


    useEffect(()=>{
        setMyStartingPosition({x:viewPosition.x,y:viewPosition.y});
        console.log("I just looked at where I am right now");
    },[dragStartListener]);

    useEffect(()=>{
        if(id !== informerId && informerId !== 0){
            changeViewPosition({
                x: myStartingPosition.x + deltaX,
                y: myStartingPosition.y + deltaY
            });
        }
    },[informerId,deltaX,deltaY])






    //this is only called for the one who started movement in the first place
    let handleStop = (obj)=>{
        changeViewPosition({
            x: myStartingPosition.x + deltaX,
            y: myStartingPosition.y + deltaY
        });
    }

    let handleStart = (obj)=>{

         notifyDragStart(); // informed to all
         setDragStartCoord({x:obj.clientX,y:obj.clientY}) // initial mouse position recorded
         console.log("getReady, someone is moving");
    }

    let handleDrag = (obj)=>{
        //inform root of displacement
        let deltaX = obj.clientX - dragStartCoord.x;
        let deltaY = obj.clientY - dragStartCoord.y;

        notifyDisplacement(id,{x:deltaX,y:deltaY});
    }


    let handleOutside = ()=>{

        notifyOutside(id,'left');
    }







    return (
        <>
        <div style={{display:"flex",flexDirection:"row"}}>
            <DraggableCore position={viewPosition}  onStart={handleStart} onDrag={handleDrag} onStop={handleStop}>
                {children}
            </DraggableCore>

        </div>
        </>
    );

}