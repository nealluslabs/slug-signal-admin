import React from 'react'
import './featureshome.css'
import { BsFillPatchCheckFill } from 'react-icons/bs'
import {BsWatch} from 'react-icons/bs'
import {FaLaptopCode,FaLock} from 'react-icons/fa'
import  building from 'src/assets/images/building.png'
import  webpage from 'src/assets/images/webpage.png'
import ecom from 'src/assets/images/ecom.png'

const Features = () => {
  return (
    <section id='featureshome'>
   
   

   <center style={{maxWidth:"70%", margin:"0 auto"}}>
   <h1>Turning Your Thoughts into Reality</h1>
   From problem-solving to execution, Agency Partner
    Interactive covers every phase of full-stack development.
   </center>
   
   <div className="container featureshome__container">
   
      <div className="featureshome__backend">
        <div className='iconContainer'>
        <img src={building} alt="" />
        </div>
       <h3>Enterprise Platforms</h3>
       <p>
       Each of our applications is built to streamline 
       your business workflow with an easily manageable
        UI for users to optimize their daily tasks and performance.
       </p>
  
       
      </div>

       <div className="featureshome__backend">
       <div className='iconContainer'>
       <img src={webpage} alt="" />
        </div>
       <h3>Web Portals</h3>
       <p>
       Our innovative, customer-centric portals
        range across a variety of industries,
         all providing customers with an engaging user experience.
       </p>
       </div>

       <div className="featureshome__backend">
       <div className='iconContainer'>
       <img src={ecom} alt="" />
        </div>
       <h3>eCommerce Web Apps</h3>
      
         <p>
         API becomes an integral part of your business
          by focusing on product functionality, user 
          adaptation, and proactive thinking when providing
           solutions from payment integrations to bookings 
           and cashback systems.
        </p>

       </div>
          

   </div>

     
     
    </section>
  )
}

export default Features