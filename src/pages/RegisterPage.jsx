import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Container, Typography, Divider, Stack, Button } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';

import IMG from '../assets/images/trends.jpg';
import BONLOGO from '../assets/images/audiovybez-full.png';
import LoginForm from 'src/components/login/LoginForm';
import RegisterForm from 'src/components/register/RegisterForm';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  backgroundColor: 'black',
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 950,//change image width here
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
  backgroundImage: `url(${IMG})`,
  backgroundSize: '100% 130%', 
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

export default function RegisterPage() {
  const mdUp = useResponsive('up', 'md');

  return (
    <>
      <Helmet>
        <title> Slug Signal  </title>
      </Helmet>

      <StyledRoot style={{ flexDirection: 'row' }}>
        {mdUp && (
           <StyledSection style={{ border: '0px solid green', flex: 2 }}>
       </StyledSection>
        )}

        <Container maxWidth="sm" style={{ border: '0px solid red', flex: 2,backgroundColor:"white",color:"black" }}>
          <StyledContent>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '50px' }}>
         {/* <img src={BONLOGO} width="240" height="45" />*/}
          </div>
            <Typography style={{margin:"0 auto",marginBottom:"2rem"}} variant="h4" gutterBottom>
              Sign up for Slug Signal
            </Typography>
            <RegisterForm />
           
           { <Typography variant="body2" sx={{ mt: 2 }}>
              Already have an account? {''}
              <Link href='/login' variant="subtitle2">Login</Link>
            </Typography>
           } 


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
