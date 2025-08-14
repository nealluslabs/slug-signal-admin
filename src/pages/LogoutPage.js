import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from '@mui/material/Container';

import { Helmet } from 'react-helmet-async';

import { logout } from "src/redux/actions/auth.action";
import { useNavigate } from "react-router-dom";


export default function LogoutPage() {
    const dispatch = useDispatch();
   const navigate = useNavigate()
  
    useEffect(() => {
   
   
      dispatch(logout(navigate));  
     

    }, [])
  
  

  return (
    <>
      <Helmet>
        <title> Slug Signal </title>
      </Helmet>

      <Container maxWidth="xl">
        
        </Container>
    </>
  );
}
