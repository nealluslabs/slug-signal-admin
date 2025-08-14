import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Container, Typography, Divider, Stack, Button } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';

import IMG from '../assets/images/loginbg.jpeg';
import BONLOGO from '../assets/images/logo.png';
import LoginForm from 'src/components/login/LoginForm';
import { useNavigate } from 'react-router-dom';
import { FaArrowCircleLeft } from "react-icons/fa";
import RegisterForm from 'src/components/register/RegisterFormPrev';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  backgroundColor: 'white',
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 980,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
  backgroundImage: `url(${IMG})`,
  backgroundSize: '100% 100%', 
  objectFit: 'cover',
  backgroundPosition: 'center',
}));


const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems:"center",
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
  //scale:"1.2"
}));

// ----------------------------------------------------------------------

export default function RegisterPagePrev() {
  const mdUp = useResponsive('up', 'md');
  const navigate = useNavigate()

  return (
    <>
      <Helmet>
        <title> Slug Signal</title>
      </Helmet>

      <StyledRoot style={{ flexDirection: 'row-reverse' }}>
        {/*mdUp && ( //THE PICTURE USED TO BE HERE, SO COMMENT IT OUT IF YOU NEED
           <StyledSection style={{ border: '0px solid green', flex: 2 }}>
       </StyledSection>
        )*/}

        <Container maxWidth="sm" style={{ border: '0px solid red', flex: 2 }}>
          
        <div  onClick ={()=>{navigate('/home')}} style={{fontSize:"2rem",color:"white",fontWeight:"900",color:"#21712E",position:"absolute",top:"1rem",left:"1rem",cursor:"pointer"}}>
        <FaArrowCircleLeft/>

         {/*<div style={{ display: 'flex', justifyContent: 'center', marginBottom: '50px' }}>
          <img src={BONLOGO} width="160" height="160" />
      </div>*/}
       
      </div>
          
          
          
          <StyledContent>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '50px',position:"relative" }}>
           {<img style={{position:"relative",top:"-5.5rem"}} src={BONLOGO} width="240" height="75" />}
          </div>
           {/*
            <Typography variant="h4" gutterBottom>
              Login
            </Typography>
           */}
             <div style={{minWidth:"1200px",maxWidth:"1200px",display:"flex",alignItems:"center",justifyContent:"center"}}>
            <RegisterForm  />
            </div>
             <center>
            <Typography variant="body2" sx={{ mt: 2,scale:"1.2" }}>
              Already Registered ? {''}
              <Link href='/login' variant="subtitle2"> <span style={{ color:"blue",textDecoration:"underline" }} >Login.</span> </Link>
            </Typography>
              </center>


            {/* <Divider sx={{ my: 3 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                OR
              </Typography>
            </Divider> */}
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
