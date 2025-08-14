import React,{useEffect,useRef} from 'react'
import {
  useWindowSize,
  useWindowWidth,
  useWindowHeight,
} from '@react-hook/window-size'



import './testimonials.css'
import AVTR1 from 'src/assets/images/avatar8.jpeg'
import AVTR2 from 'src/assets/images/avatar5.jpg'
import AVTR3 from 'src/assets/images/avatar6.jpg'
import AVTR4 from 'src/assets/images/avatar7.jpg'

import property from 'src/assets/images/property.png'
import healthcare from 'src/assets/images/healthcare.png'
import education from 'src/assets/images/education.png'
import FinTech from 'src/assets/images/fintech.png'
import automotive from 'src/assets/images/automotive.png'
import startups from 'src/assets/images/startups.png'
import restaurants from 'src/assets/images/restaurants.png'
import charity from 'src/assets/images/charity.png'
import corporate from 'src/assets/images/corporate.png'
import software from 'src/assets/images/software.png'
import retail from 'src/assets/images/retail.png'
import legal from 'src/assets/images/legal.png'



import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay} from 'swiper';

//swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Testimonials = () => {

const onlyWidth = useWindowWidth()

 

  return (
    <section id='testimonials'>
      
   <center style={{maxWidth:"60%", margin:"0 auto"}}>
   <h1>Industries We Serve</h1>
  
   Looking for more phone calls, form submissions, 
   sales, and brand engagement? Our experience 
    includes work with product and service companies 
    that serve B2B and B2C customers, as well  as non-profit organizations. 
   
   </center>
     
   <Swiper className="container testimonials__container"
   //swiper js options
   modules={[ Navigation,Pagination, Scrollbar, A11y,Autoplay]}
   loop={true}
   autoplay={{
    delay: 3500,
    disableOnInteraction: false,
  }}
   scrollbar={{ draggable: true }}
   slidesPerView={onlyWidth <= 520 ?1 :(onlyWidth <= 1000? 2: (onlyWidth <= 1500? 3: 4))}

   spaceBetween={30}
   pagination={{clickable:true}}
   
   > 
   {/*1 */}
    <SwiperSlide className="testimonial">
     <div className="client__avatar">
     <img src={retail} alt="avatar one" />
     </div>

     
     <h3 className="client__name">E-commerce and Retail</h3>
    
    </SwiperSlide>

     {/*2 */}
    <SwiperSlide className="testimonial">
     <div className="client__avatar">
     <img src={software} alt="avatar one" />

     </div>

     <h3 className="client__name">Software and Hi-Tech</h3>
     

    </SwiperSlide>

 {/*3 */}
    <SwiperSlide className="testimonial">
     <div className="client__avatar">
     <img src={corporate} alt="avatar one" />
     </div>
    
     <h3 className="client__name">Corporate and Consulting</h3>
    

    </SwiperSlide>

  {/*4 */}
  <SwiperSlide className="testimonial">
     <div className="client__avatar">
     <img src={charity} alt="avatar one" />
     </div>
    
     <h3 className="client__name">Non-Profits and Charity</h3>
    

    </SwiperSlide>



{/*1 */}
<SwiperSlide className="testimonial">
     <div className="client__avatar">
     <img src={restaurants} alt="avatar one" />
     </div>

     
     <h3 className="client__name">Restaurant and Venues</h3>
     
    </SwiperSlide>

     {/*2 */}
    <SwiperSlide className="testimonial">
     <div className="client__avatar">
     <img src={startups} alt="avatar one" />

     </div>

     <h3 className="client__name">Start Ups</h3>
     

    </SwiperSlide>

 {/*3 */}
    <SwiperSlide className="testimonial">
     <div className="client__avatar">
     <img src={automotive} alt="avatar one" />
     </div>
    
     <h3 className="client__name">Automotive</h3>
     
    </SwiperSlide>

  {/*4 */}
  <SwiperSlide className="testimonial">
     <div className="client__avatar">
     <img src={FinTech} alt="avatar one" />
     </div>
    
     <h3 className="client__name">FinTech</h3>
     

    </SwiperSlide>


{/*1 */}
<SwiperSlide className="testimonial">
     <div className="client__avatar">
     <img src={education} alt="avatar one" />
     </div>

     
     <h3 className="client__name">Education and Human Resources</h3>
     

    </SwiperSlide>

    
   

 {/*3 */}
    <SwiperSlide className="testimonial">
     <div className="client__avatar">
     <img src={healthcare} alt="avatar one" />
     </div>
    
     <h3 className="client__name">Healthcare and Social Services</h3>
     

    </SwiperSlide>

  {/*4 */}
  <SwiperSlide className="testimonial">
     <div className="client__avatar">
     <img src={property} alt="avatar one" />
     </div>
    
     <h3 className="client__name">Real Estate and Property</h3>
    

    </SwiperSlide>

    <SwiperSlide className="testimonial">
     <div className="client__avatar">
     <img src={legal} alt="avatar one" />
     </div>
    
     <h3 className="client__name">Legal and Professional</h3>
    

    </SwiperSlide>




  </Swiper> 


    </section>
  )
}

export default Testimonials