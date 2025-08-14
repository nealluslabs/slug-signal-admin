import React from 'react'
import './experience.css'
import { BsFillPatchCheckFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'
/*import agileBased from  'src/assets/images/agileBased.png'
import businessOriented from  'src/assets/images/businessOriented.png'
import collaboration from  'src/assets/images/collaboration.png'
import experience from  'src/assets/images/experience.png'
import userFriendly from  'src/assets/images/userFriendly.png'
import scalable from  'src/assets/images/scalable.png'*/
import bot from 'src/assets/images/bot.jpeg'
import brain from 'src/assets/images/brain.png'
import loudspeaker from 'src/assets/images/speaker-icon.png'
import suitcase from 'src/assets/images/suitcase.png'


import starbucks from 'src/assets/images/starbucks.png'
import costa from 'src/assets/images/costa.png'
import pr from 'src/assets/images/pr.png'
import dunkin from 'src/assets/images/dunkin.png'
import coca from 'src/assets/images/coca.png'
import idea from 'src/assets/images/idea.png'

import { HiSpeakerWave } from "react-icons/hi2";

import { GiTwoCoins } from "react-icons/gi";
import { IoBriefcaseSharp } from "react-icons/io5";

const Experience = () => {
  return (
    <section id='experience'>
   
   {/*<h1>Benefits Of Our Web Application Development Services</h1>*/}

  

<div className="container-pm experiencegrid__container">
     
   <div className='experiencegrid-iconContainer'>
    <center>
   <img  src={starbucks} alt="" />
   </center>
   </div>
 
 
  <div className='experiencegrid-iconContainer'>
  <center>
  <img src={costa} alt="" />
  </center>
   </div>
  
 

  <div className='experiencegrid-iconContainer'>
  <center>
  <img src={coca} alt="" />
  </center>
  </div>


  <div className='experiencegrid-iconContainer'>
  <center>
  <img src={pr} alt="" />
  </center>
  </div>

  <div className='experiencegrid-iconContainer'>
  
  <center>
  <img src={idea} alt="" />
  </center>
  </div>

  <div className='experiencegrid-iconContainer'>
  
  <center>
  <img src={dunkin} alt="" />
  </center>
  </div>

 
 

</div>



<h3 style= {{borderBottom:"1px solid #FFFFFF",paddingBottom:"10px", color:"#E88B1E",height:"0rem",marginBottom:"0rem",position:"relative",top:"0rem"}}>{/*this is the vertical line across the page */ }</h3>

 {/*  
   <div className="container-hp experience__container">
   
      <div className="experience__backend">

     <div  className="small-image" >
    
      {<HiSpeakerWave style={{color:"#E88B1E",fontSize:"50px"}}/>}
     </div>

       <div className="large-desc"  >
         <h3 style= {{borderBottom:"1px solid white",paddingBottom:"10px",color:"#E88B1E"}}>AI Job Search</h3>
        
        <div className="large-desc-img">
         <img  src={bot} alt="" style={{margin:"0 auto",borderRadius:"10%"}}/>
         </div> 
       </div>
       
      </div>

   


       <div className="experience__backend">
      
      <div className="small-image">
     
     <GiTwoCoins style={{color:"#E88B1E",fontSize:"50px"}} />
    </div>
     
       <div className="large-desc">
         <h3 style= {{borderBottom:"1px solid white",paddingBottom:"10px",color:"#E88B1E"}}>Upskill Rewards</h3>
       
         <div className="large-desc-img">
         <img  src={brain} alt="" style={{margin:"0 auto",borderRadius:"10%"}}/>
         </div> 
      
      
        </div>

       </div>




       <div className="experience__backend">
      
      <div className="small-image">
     
     <IoBriefcaseSharp style={{color:"#E88B1E",fontSize:"50px"}} />
    </div>
     
       <div className="large-desc">
         <h3 style= {{borderBottom:"1px solid white",paddingBottom:"10px",color:"#E88B1E"}}>AI interview Prep</h3>
        

         <div className="large-desc-img">
         <img  src={bot} alt="" style={{margin:"0 auto",borderRadius:"10%"}}/>
         </div> 
        
        
        </div>

       </div>
     




 

   </div>*/}

     {/*
      <center>
      <Link to= {'/page2'}>
       <button className='btn btn-primary'>Demo</button>
       </Link>
      </center>
     */}

    </section>
  )
}

export default Experience