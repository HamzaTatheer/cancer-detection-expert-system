import React,{useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import {useNavigate} from 'react-router-dom';
import LinearProgress from '@mui/material/LinearProgress';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import {useDispatch,useSelector} from 'react-redux';
import {logIn,logOut} from '../redux/actions/auth';
import {showNotification} from '../redux/actions/notification';


export default function Authentication(props) {

  let [email,setEmail] = useState("");
  let [password,setPassword] = useState("");
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let auth_info = useSelector((state)=>state.auth);

  let isLoggedIn = auth_info.isLoggedIn;
  useEffect(()=>{

    if(isLoggedIn === true){
      navigate('/Home',{replace:true})
    }

  },[isLoggedIn])

  let handleLogin = ()=>{


    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
      //dispatch notificaion
      //alert("Invalid Email");
      dispatch(showNotification("Your Email is Invalid. Please Try Again",'error'));
      return;
    }

    if (password.length < 4){
      dispatch(showNotification("Your password in Invalid. Password length must be greater than 4",'error'));
      return;
    }

    dispatch(logIn());

  }


  return (
    <>
    <div style={{height:'80vh',width:'100vw',display:'flex',justifyContent:'center',alignItems:'center'}}>
      
      <div style={{display:'flex',flexDirection:'column',width:'250px',height:'200px'}}>
        <TextField onChange={(e)=>setEmail(e.target.value)} value={email} placeholder='email' style={{padding:'10px'}}/>
        <TextField onChange={(e)=>setPassword(e.target.value)} value={password} type='password' placeholder='password' style={{padding:'10px'}}/>
        <Button onClick={handleLogin} variant="contained" style={{width:'90%',alignSelf:'center'}}><span>Login</span></Button>
      </div>
    </div>
    </>
  );
}