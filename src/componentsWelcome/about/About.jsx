import React from 'react'
import './about.css'
import mobileAndWeb from 'src/assets/images/mobile&web.png'
import {AiOutlineArrowRight} from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { RiHome2Line } from 'react-icons/ri'

const About = () => {


const navigate= useNavigate()


  return (

    <>


    <section id='about'>
    <div className="container-hp about__container">
      

      <div className="aboutExplainer">
      <h2 style={{fontWeight:"800",marginBottom:"-4rem"}}> ANALYTICS</h2>
      <h3 style={{fontWeight:"600",fontSize:"24px"}}>Our Comprehensive Database Houses Verified College Athletes </h3>
 
         <p style={{color:"#909090",fontSize:"22px"}}>
         At the heart of our platform is an optimized recommendation algorithm
          designed to enhance your discovery experience unlocking new opportunities
           in the evolving world of sports and marketing.
        </p>

       {/*<div className = "about-btn-placement" >
        <button   onClick={()=>{navigate('/login')}} className="btn ">
           Get Started 
         </button>

         <p  onClick={()=>{navigate('/dashboard/home')}} className="btn-invisible" >See How It Works</p>
       </div>*/}


      </div>
     
   

{<div className='headerCTA'>
    
 
<img  className='CTAboximg' src={mobileAndWeb} alt="search image"/>

   
    
    </div>}
   
      

   
   
</div>

    </section>



</>
  )
}

export default About