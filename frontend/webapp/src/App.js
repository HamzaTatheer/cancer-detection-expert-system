import React,{useEffect, useState} from 'react';
import { useSelector } from 'react-redux';

import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes,Switch } from "react-router-dom";

import AppBar from "./components/AppBar";
import Alert from '@mui/material/Alert';


import ProtectedRoute from './components/ProtectedRoute';
import Authentication from './Pages/Authentication';
import Dashboard from './Pages/Dashboard';
import ImageViewer from './Pages/ImageViewer';
import Home from "./Pages/Home";



function appBarLabel(label) {
  return (
    <Toolbar>
      <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
        {label}
      </Typography>
    </Toolbar>
  );
}

function NotificationViewer(){
  let notifications = useSelector((state)=>state.notifications);

  return (
    <div style={{position:'absolute',right:'30px',top:'80px'}}>
      
      <div style={{display:'flex',flexDirection:'column-reverse'}}>
        {notifications.map(({id,notification,type}) => <Alert style={{minWidth:'400px',margin:'10px'}} key={id} severity={type} >{notification}</Alert>)}
      </div>

    </div>
  );

}



export default function App() {




  return (
    
    <>
      <AppBar/>
      <NotificationViewer/>

      
      <Router>
        <Routes>
        <Route exact path='/viewimage' element={<ProtectedRoute privelages={[0,1,2,3]} element={ImageViewer}/>} />
          <Route exact path='/dashboard' element={<ProtectedRoute privelages={[0,1,2,3]} element={Dashboard}/>} />
          <Route exact path='/home' element={<ProtectedRoute privelages={[0,1,2,3]} element={Home}/>}/>
          <Route exact path="/" element={<Authentication/>} />
        </Routes>
      </Router>
    </>
  );
}