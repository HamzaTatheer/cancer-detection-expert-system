import React,{useEffect, useState} from 'react';
import View from './View';

export default function RecyclerView(){



    let block = (id,background,left,top)=><div id={"viewer-patch"+id+1} style={{width:screen.width/3+"px",height:"300px",position:"absolute",left,top,background}}><h1 color='white'>{id}</h1></div>


    let [informerId,setInformerId] = useState(0);
    let [dragState,setDragState] = useState(false);

    let [displacement,setDisplacement] = useState({x:0,y:0});



    let notifyDragStart = ()=>setDragState(!dragState);
    let notifyDisplacement = (_informerId,_displacement)=>{
        setDisplacement(_displacement);
        setInformerId(_informerId);
    };



    const sides = [[0,0],[screen.width/3,0],[screen.width/3 + screen.width/3,0]];
    let [assignedSides,setAssignedSides] = useState([sides[0],sides[1],sides[2]]);
    const colors = ["red","blue","green"];


    let notifyOutside = (id,which_side)=>{
    }


    //id of each view needs to be different!
    return (

        <>
        {
            colors.map((color,index)=>{

                return (<View 
                id={index+1}
                startPosition={{x:assignedSides[index][0],y:assignedSides[index][1]}}
                newStartPosition={{x:0,y:0}}
                notifyDragStart={notifyDragStart}
                notifyDisplacement={notifyDisplacement}
                notifyOutside={notifyOutside}
                dragStartListener={dragState} 
                informerId={informerId} 
                deltaX={displacement.x} 
                deltaY={displacement.y}>
                {block(index+1,color,0,0)}
                </View>);
            })
        }
        </>
    );
}