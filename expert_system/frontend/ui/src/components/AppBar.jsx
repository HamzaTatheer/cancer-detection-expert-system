import {useState} from "react";
import AppBar from '@mui/material/AppBar';
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import SnackBar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import {useSelector} from 'react-redux';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/LogoutRounded';
import { Hidden, SwipeableDrawer } from '@mui/material';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';


import { useNavigate } from "react-router-dom";
import {useDispatch} from 'react-redux';
import {logOut} from '../redux/actions/auth';

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

  
  export default function CustomAppBar(){
      let loading = useSelector((state)=>state.loading);
      let auth_info = useSelector((state)=>state.auth);
      let [toggle,setToggle] = useState(false);
      let isLoggedIn = auth_info.isLoggedIn;
      let dispatch = useDispatch();


      return (
        <div style={{marginBottom:"10px"}}>

        <AppBar position='static' style={{padding:'20px',background: 'white',color:'black'}} enableColorOnDark>
        <div style={{display:'flex',justifyContent:"space-between",alignItems:'center',width:"100%"}}>
            <div style={{display:"flex",alignItems:"center"}}>
                

                <Hidden xsUp={!isLoggedIn} xsDown={!isLoggedIn}>
                  <IconButton onClick={()=>setToggle(true)}>
                      <MenuIcon fontSize="large" style={{color:"#43ccf7"}}/>
                  </IconButton>
                </Hidden>
                
                <h2 onClick={()=>window.location.href="/"} style={{marginLeft:"10px",cursor:"pointer"}}>Ai Medi Care</h2>
            </div>
            {
            isLoggedIn ? 
            <IconButton sx={{ background: 'white',marginRight:'30px' }} onClick={()=>dispatch(logOut())}>
                <LogoutIcon sx={{ color: 'black' }}/>
            </IconButton>
            :
            null
            }
        </div>

        </AppBar>
        {loading ? <LinearProgress/> : null}

        <SwipeableDrawer
          anchor={"left"}
          open={isLoggedIn ? toggle : false}
          onOpen={()=>setToggle(true)}
          onClose={()=>setToggle(false)}
        >
          <div style={{margin:"40px"}}>
            <b onClick={()=>window.location.href="/home"} style={{cursor:"pointer"}}>Ai Medi Care</b>
          </div>
          <div style={{marginTop:"60px",textAlign:"center"}}>
              
              
              <List>
                <ListItem button>
                  <ListItemText>Home</ListItemText>
                </ListItem>
                <Divider/>

                <ListItem button>
                  <ListItemText>Breast Cancer Segmentation</ListItemText>
                </ListItem>
                <Divider/>


                <ListItem button>
                  <ListItemText>Heart Failiure Readmission Prediction</ListItemText>
                </ListItem>
                <Divider/>

                <ListItem button>
                  <ListItemText>Melanoma Cancer Detection</ListItemText>
                </ListItem>
                <Divider/>

              </List>


          </div>
        </SwipeableDrawer>

        </div>
      
    );
  }