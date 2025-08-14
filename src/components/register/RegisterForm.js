import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link,
   Stack, 
   IconButton,
    InputAdornment,
     TextField,
      Checkbox,
    Card,
    CardContent,
    Typography,
    Avatar,
    Button,
    Box,

 } from '@mui/material';
 import { FaTimes } from "react-icons/fa"
import { MdPersonAddAlt1 } from "react-icons/md"
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../iconify';
import { useDispatch, useSelector } from 'react-redux';
import { signin,signup } from 'src/redux/actions/auth.action';
import { fetchFarmerByPhone } from 'src/redux/actions/group.action';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch(); 

  const userSignUp = (e) => {
    e.preventDefault();
    setLoading(true);
    const user = { email, companyName,password,firstName,lastName };
    dispatch(signup(user, navigate, setLoading));

   // dispatch(fetchFarmerByPhone( user.email,navigate, setLoading))

    
    setTimeout(()=>{setLoading(false)},3000)
  }

  return (
    <>
     <form  onSubmit={userSignUp}>
      <Stack spacing={3}>


      <TextField required name="firstName"   autoComplete="off"  type="text" label="First name" 
          style={{color:"white",backgroundColor:"white"}}
        InputProps={{
          style:{height:"3rem",padding:"10px",color:"black",background:"white"},
         
        }}
        
        onChange={(e) => setFirstName(e.target.value)}/>




<TextField required name="lastName"   autoComplete="off"  type="text" label="Last name" 
          style={{color:"white",backgroundColor:"white"}}
        InputProps={{
          style:{height:"3rem",padding:"10px",color:"black",background:"white"},
         
        }}
        
        onChange={(e) => setLastName(e.target.value)}/>




      <TextField required name="companyName"   autoComplete="off"  type="text" label="Company name" 
          style={{color:"white",backgroundColor:"white"}}
        InputProps={{
          style:{height:"3rem",padding:"10px",color:"black",background:"white"},
         
        }}
        
        onChange={(e) => setCompanyName(e.target.value)}/>



        <TextField required name="email"   autoComplete="off"  type="text" label="Email address" 
          style={{color:"white",backgroundColor:"white"}}
        InputProps={{
          style:{height:"3rem",padding:"10px",color:"black",background:"white"},
         
        }}
        
        onChange={(e) => setEmail(e.target.value)}/>

        <TextField
          name="password"
          label="Password"
          required
          autoComplete="off" 
          style={{color:"white",backgroundColor:"white"}}
          onChange={(e) => setPassword(e.target.value)}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            style:{height:"3rem",padding:"10px",color:"black",background:"white"},
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            )
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        {/*
        <>
        <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
          <Checkbox name="remember" label="Remember me" />
          <div >
            Remember Me
          </div> 
        </div>

        <div >
          Forgot Password?
        </div> 

        </>
        
        */}

      </Stack>




      <LoadingButton onClick={()=>{signin()}} fullWidth size="large" type="submit" disabled={loading} style={{background: "linear-gradient(to right, #A01565, #3E256E)",borderRadius:"5rem", color: 'white'}}>
        {loading ? "Loading..." : "SIGN UP"}
      </LoadingButton>
      </form>
    </>
  );
}
