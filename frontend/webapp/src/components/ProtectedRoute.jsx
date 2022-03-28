import React, { Component, useState } from "react";
import { Route, Navigate, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { useSelector } from "react-redux";
import {LOCAL_STORAGE_AUTH} from '../utilities/constants';

const ProtectedRoute = (props) => {

  let {element,privelages} = props;
  let Component = element;

  let auth = useSelector((state) => state.auth);


  const raw_data = localStorage.getItem(LOCAL_STORAGE_AUTH);
  if(raw_data == null){
     alert("Please Login To see this page");
     return (<Navigate to={{ pathname: "/", state: { from: props.location}}}/>);
  }
            
  const data = JSON.parse(raw_data);

  let role = data.role;

  if (auth.isLoggedIn == false){
    return (<Navigate to={{ pathname: "/", state: { from: props.location}}}/>)
  }


  if (!privelages.includes(role)){
    alert("You dont have the privelages to access this page");
    return (<Navigate to={{ pathname: "/", state: { from: props.location}}}/>);
  }

  return <Component/>;
};

const mapStateToProps = (state) => ({
  user: state.auth,
});

export default connect(mapStateToProps, null)(ProtectedRoute);