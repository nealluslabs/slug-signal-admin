import React from 'react'
import './loginUpdated.css'
import bxNetworkChartSvg from './bxNetworkChartsvg1.jpeg'
import accentLogo from './accentLogo.png'
import barcode from './barcode2.png'

import LoginForm from './login-form';
import { Link } from 'react-router-dom'
/*overlapGroup1: "rectangle-1-1.png",
iconLock: "bx-lock-open-alt-svg-1.png",
iconUser: "bx-user-svg-1.png",*/



const loginPageData = {
 
  spanText1: "Contractor Login",
  spanText2: "Email Address",
  spanText3: "Password",
  spanText4: "Login",
  spanText5: "Don't have an account yet?",
  spanText6: "Register here",
  spanText7: "Welcome to CMC Network",
  spanText8: "We're on a mission to help MBE & WBE Contractors grow",
  spanText9: "Connect with other contractors, resources and more in our community.",
  spanText10: "Apply to our foundation program & project matching",
  };


  const{ 
    spanText1,
    spanText2,
    spanText3,
    spanText4,
    spanText5,
    spanText6,
    spanText7,
    spanText8,
    spanText9,
    spanText10
  } = loginPageData








 const  LoginUpdatedPage = () => {
  


  return (
    <div className="overall-backround" >
    <div className="container-center-horizontal"  >
    <div className="login-page screen">
    <img src={accentLogo} className = "login-accent-logo"  alt=""/>
    
      
      <div className="login-content" >
     
      <h2 style={{position:"absolute" ,top:"25%"}}>UfarmX</h2>
       <LoginForm />
       

      Dont Have an account? {/*<Link style={{color:"lightblue"}} to ={'/register'}>*/} <span style={{ color:"blue",textDecoration:"underline" }} >Register Here.</span>  {/*</Link> */}
      </div>
     
    </div>





    <div className="overlap-group1" style={{ backgroundImage: `url(${bxNetworkChartSvg})` }}>
      
      <div className='intro-box'>
        
        <div className ="welcome-barcode">
      <img src={barcode} alt="White Barcode"/>

        <h1> Welcome to UfarmX</h1>
        </div>

      <div className = "intro-desc">
         <h1>We’re on a mission to connect Athletes and Brands</h1>
         <ul>
          {/*<li>Connect with other contractors, resources and more in our community.</li>
          <li>Apply to our foundation program & project matching</li>*/}
         
         </ul>
       </div>

      </div>
   </div>
</div>
</div>
  )
};

export default   LoginUpdatedPage 


  

