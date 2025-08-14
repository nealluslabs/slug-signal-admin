import React from 'react'
import './explore.css'
import mobileAndWeb from 'src/assets/images/footballcatch.jpeg'
import {AiOutlineArrowRight} from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { RiHome2Line } from 'react-icons/ri'

const Explore = () => {


const navigate= useNavigate()


  return (

    <>


    <section id='explore'>
    <div className="container-hp explore__container">
      

    
         {<div className='headerCTA'>
           
        
            <img  className='CTAboximgExplore' src={mobileAndWeb} alt="search image"/>
    
       
        
        </div>}
       





      <div className="exploreExplainer">
      <h2 style={{fontWeight:"800",marginBottom:"-4rem"}}> EXPLORE</h2>
      <h3 style={{fontWeight:"600",fontSize:"24px"}}>Extensive Database of Verified College Athletes </h3>
 
         <p style={{color:"#909090",fontSize:"22px"}}>
         Combining human expertise with artificial intelligence tools, 
         UfarmX is pioneering the first platform of its kind for the new NIL 
         landscape. Our comprehensive database showcases athletes who have carved
          out a niche as creators, sharing engaging and compelling content.
        </p>


        

       {/*<div className = "explore-btn-placement" >
        <button   onClick={()=>{navigate('/login')}} className="btn ">
           Get Started 
         </button>

         <p  onClick={()=>{navigate('/dashboard/home')}} className="btn-invisible" >See How It Works</p>
       </div>*/}


      </div>
     
   

      

   
   
</div>

    </section>


</>
  )
}

export default Explore