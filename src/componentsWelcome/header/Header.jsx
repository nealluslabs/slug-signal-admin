import React ,{useState}from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './header.css'
import Nav from '../nav/Nav'
//import { setRecruiter,setDemo } from 'src/redux/reducers/auth.slice'
import { useDispatch } from 'react-redux'
/*import laptop from 'src/assets/images/laptop.svg'

import LoanSlider from './LoanSlider'*/



const Header = () => {

   const [input,setInput] = useState(1000)
   const navigate= useNavigate()
   const dispatch = useDispatch()

   const handleChange = (e) => {
    setInput(e.target.value);
    console.log("this is the parent speaking,we are in header")
  };

  return (
    
   
    <header className="header-pm">
    {/*<Nav/>*/}
    <div className="container-pm header__container-1">
      

      <div className="headerExplainer">
         <h2 className="text-light" style={{marginBottom:"0rem",color:"black"}}> Your NIL agent at your fingertips.</h2>
   
         
            <p className="text-light" style={{maxWidth:"50%",margin:"0 auto",marginTop:"1rem",marginBottom:"-1rem",color:"grey",fontSize:"22px"}}>
            Welcome to the New Age of Athlete Partnerships
           </p>
        
   
           <div className="header-btn-placement" >
           
           
   
              <button onClick ={()=>{navigate('/login')}} className="btn">
                Learn More
              </button>
     
     
             
            </div>

      </div>
     
    

    </div>


    <div className="container-pm header__container-2">
      
    {/**DO NOT DELETE!! THE BACKGROUND (IN CSS FILE) IS  BEING USED HERE */}
  
    </div>
    </header>
    
  )
}

export default Header