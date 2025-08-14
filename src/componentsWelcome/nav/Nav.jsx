import React from 'react'
import './nav.css'
import {AiOutlineHome} from "react-icons/ai"
import {AiOutlineUser} from "react-icons/ai"
import {BiBook} from "react-icons/bi"
import {RiServiceLine} from "react-icons/ri"
import {BiMessageSquareDetail} from "react-icons/bi"
import {useState} from 'react'
//import navIcon from 'src/assets/images/navicon.svg'
import navIcon from 'src/assets/images/logo.png'


import HamburgerMenu from './HamburgerMenu'

import { Box, Button, Grid } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Link from 'src/chat-src/theme/overrides/Link'


const Nav = () => {
 
  const [activeNav,setActiveNav] = useState('#')
const navigate = useNavigate()
 
  return (

    <nav className='nav-pm'>
  
     <div className='navContainer' >
      <div style={{fontSize:"2rem",fontWeight:"900",color:"black"/*,color:"#E88B1E"*/}}>
        UfarmX
        {/*<img src={navIcon} style={{width:"200px"}} alt="agency partner  logo"/>*/}
      </div>
    
    
      <div className='navLinks desktopDisp'  style={{display:"flex",justifyContent:"center !important",alignItems:"center !important"}}>    
         {/*<a href="/register" style={{width:"7rem"}} onClick={()=>{setActiveNav('#')}} className={activeNav === 'projects'? 'active':''} >Brands</a>
         <a href="/login" style={{width:"7rem"}} onClick={()=>{setActiveNav('projects')}}className={activeNav === '#'? 'active':''}  >Athletes</a>*/}
         
         <Button
                variant={'contained'}
                style={{
                  minHeight: '50px',
                  minWidth: '180px',
                  backgroundColor: '#D72A34',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '5px',
                  marginRight: '4px',
                  fontSize:"1.1rem"
                }}
                onClick={()=>{navigate('/login')}}
              >
               Brands
              </Button>

         
             <a style={{
                  height: '50px',
                  width: '180px',
                  position:"relative",
                  top:"-16px",
                  left:"0px"
                }} 
                   >
              <Button
                variant={'contained'}
                style={{
                  minHeight: '50px',
                  minWidth: '180px',
                  backgroundColor: '#000000',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '5px',
                  marginRight: '4px',
                  fontSize:"1.1rem"
                }}
                onClick={()=>{navigate('/login-athlete')}}
              >
                
               Athletes
              </Button>
              </a>
           

      </div>  

      <HamburgerMenu className="mobileDisp"/>

    </div>
    </nav>
  )
}

export default Nav