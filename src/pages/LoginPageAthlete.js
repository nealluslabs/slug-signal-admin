import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Container, Typography, Divider, Stack, Button } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';

import IMG from '../assets/images/login-athlete.jpeg';
import BONLOGO from '../assets/images/logo.png';
import LoginForm from 'src/components/login/LoginForm';
import LoginFormAthlete from 'src/components/login/LoginFormAthlete';
import { useNavigate } from 'react-router-dom';
import { FaArrowCircleLeft } from "react-icons/fa";

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
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function LoginPageAthlete() {
  const mdUp = useResponsive('up', 'md');
  const navigate = useNavigate()

  return (
    <>
      <Helmet>
        <title> Slug Signal </title>
      </Helmet>

      <StyledRoot style={{ flexDirection: 'row-reverse' }}>
        {mdUp && (
           <StyledSection style={{ border: '0px solid green', flex: 2 }}>
       </StyledSection>
        )}

        <Container maxWidth="sm" style={{ border: '0px solid red', flex: 2 }}>


        <div  onClick ={()=>{navigate('/home')}} style={{fontSize:"2rem",color:"white",fontWeight:"900",color:"#C32914",position:"absolute",top:"1rem",left:"1rem",cursor:"pointer"}}>
        <FaArrowCircleLeft/>

         {/*<div style={{ display: 'flex', justifyContent: 'center', marginBottom: '50px' }}>
          <img src={BONLOGO} width="160" height="160" />
        </div>*/}
       
      </div>
          



          <StyledContent>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '50px' }}>
           {/*<img src={BONLOGO} width="240" height="45" />*/}
          </div>
            <Typography variant="h4" gutterBottom>
              Login
            </Typography>
            <LoginFormAthlete />
            <Typography variant="body2" sx={{ mt: 2 }}>
              Don’t have an account yet? {''}
              <Link href='/register' variant="subtitle2"><span style={{ color:"blue",textDecoration:"underline",cursor:"pointer" }} >Register Here.</span> </Link>
          </Typography>

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
