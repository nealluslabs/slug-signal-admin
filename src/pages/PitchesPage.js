import { Helmet } from 'react-helmet-async';
import { Grid, Container, Typography, FormControl, Box, Select, MenuItem, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyGroups } from 'src/redux/actions/group.action';
import { fetchUserData } from 'src/redux/actions/auth.action';

import merge from 'lodash/merge';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import { fetchMyTransactions } from 'src/redux/actions/transaction.action';
import CustomToggleSwitch from 'src/components/buttons/CustomToogleSwitch';
import CustomSearchBar from 'src/components/global/CustomSearchBar';
import SearchIcon from '@mui/icons-material/Search';
import ViewStudents from 'src/components/students/ViewStudents';
import AddStudent from 'src/components/students/AddStudent';
import { getStudents } from 'src/redux/actions/student.action';

import CampaignCard from 'src/components/listcards/campaign-card';

import corn from 'src/assets/images/corn.jpeg';
import maize from 'src/assets/images/corn.jpeg';
import potato from 'src/assets/images/potato.jpeg';
import plantain from 'src/assets/images/plantain.jpeg';
import onion from 'src/assets/images/onion.jpeg'
import okra from 'src/assets/images/okra.jpeg'
import gombo from 'src/assets/images/gombo.jpeg'
import bergine from 'src/assets/images/bergine.jpeg'
import eggplant from 'src/assets/images/bergine.jpeg'
import millet from 'src/assets/images/millet.jpeg'
import pepper from 'src/assets/images/pepper.jpeg'
import yam from 'src/assets/images/yam.jpeg'
import cocoyam from 'src/assets/images/cocoyam.jpeg'
import cabbage from 'src/assets/images/cabbage.jpeg'
import tomato from 'src/assets/images/tomato.jpeg'

//animals/produce
import chicken from 'src/assets/images/chicken.jpeg'
import sheep from 'src/assets/images/sheep.jpeg'
import cow from 'src/assets/images/cow.jpeg'
import donkey from 'src/assets/images/donkey.jpeg'
import goat from 'src/assets/images/goat.jpeg'
import horse from 'src/assets/images/horse.jpeg'



import amfootball from 'src/assets/images/amfootball.jpeg'
import PitchCard from 'src/components/listcards/pitch-card';
import CropStats from 'src/components/home/crop-stats';


export default function PitchesPage() {
  const theme = useTheme();
 
  const dispatch = useDispatch();
 

  const { myGroups, isLoading,loggedInFarmer } = useSelector((state) => state.group);
  
  console.log("PITCHES PAGE, LOGGED IN FARMER IS-->",loggedInFarmer)


  const { students } = useSelector((state) => state.student);

  const user = useSelector((state)=> state.auth)
const navigate = useNavigate()
  useEffect(()=>{

  
    if(user && !user.user){
      navigate('/login')
    }

  },[])



 // useEffect(() => {
 //   dispatch(fetchMyGroups(user?.coolers));
 //   dispatch(fetchMyTransactions(user?.id));
 //   console.log("Transac Changed.");
 // }, [user])
//
 // useEffect(() => {
 //   dispatch(getStudents());
 //   dispatch(fetchUserData(user?.id));
 // }, [])



  const [selectedOption, setSelectedOption] = useState('');
  const [activeButton, setActiveButton] = useState('viewStudents');

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleViewStudentsClick = () => {
    setActiveButton('viewStudents');
 
  };

  const handleAddStudentsClick = () => {
    setActiveButton('addStudents');
  };

  const [farmersFromDB,setFarmersFromDB] =  useState([]);

  useEffect(()=>{
   
    const cropsStatic = [

      {id:"0S91dTHhu7t0Zc6645Gb",cropName:"Corns",cropType:"Cash Crops",lastHarvest:"50",harvestDate:"01-01-2024"},
      {id:"75LPiOJKwtndeC67o5d3",cropName:"Potato",cropType:"Cash Crops",lastHarvest:"50",harvestDate:"01-01-2024"},
      {id:"8Gnbs3WPwJ7ZzzvHgORs",cropName:"Plantain",cropType:"Cash Crops",lastHarvest:"30",harvestDate:"01-01-2024"}
  
    ]
  

    let farmersFromDBArray = [ ]
  
   
    loggedInFarmer && loggedInFarmer.crop_types ? loggedInFarmer.crop_types.split(/\s+/).slice(0,3).forEach((item,index)=>{
   
      farmersFromDBArray.push(
      {id: index===0?"0S91dTHhu7t0Zc6645Gb":index===1?"75LPiOJKwtndeC67o5d3":index===2?"8Gnbs3WPwJ7ZzzvHgORs":Math.random(),
      cropName:item,
      cropType:"Cash Crops",
     lastHarvest:index===0?"20":index===1?"30":"50"
     ,harvestDate:"01-01-2024",
     image:  item.toLowerCase().includes("maize")?maize :
     item.toLowerCase().includes("potato")?potato :
     item.toLowerCase().includes("corn")?corn :
     item.toLowerCase().includes("gombo")?gombo :
     item.toLowerCase().includes("okra")?okra :
     item.toLowerCase().includes("okro")?okra :
     item.toLowerCase().includes("tomat")?tomato :
     item.toLowerCase().includes("millet")?millet :
     item.toLowerCase().includes("yam")?yam :
     item.toLowerCase().includes("cocoyam")?cocoyam :
     item.toLowerCase().includes("onion")?onion :
     item.toLowerCase().includes("oignon")?onion :
     item.toLowerCase().includes("pepper")?pepper :
     item.toLowerCase().includes("bergine")?bergine :
     item.toLowerCase().includes("cabbage")?cabbage :
     corn
    }

      )

   })
    :
    loggedInFarmer && loggedInFarmer.produce ? loggedInFarmer.produce.split(/\s+/).filter((plug)=>(plug !=="and"||plug !=="et" )).slice(0,3).forEach((item,index)=>{

      
      farmersFromDBArray.push(
        {id: index===0?"0S91dTHhu7t0Zc6645Gb":index===1?"75LPiOJKwtndeC67o5d3":index===2?"8Gnbs3WPwJ7ZzzvHgORs":Math.random(),
        cropName:item,
        cropType:"Cash Crops",
       lastHarvest:index===0?"20":index===1?"30":"50"
       ,harvestDate:"01-01-2024",
       image:item.toLowerCase().includes("maize")?maize :
       item.toLowerCase().includes("corn")?corn :
       item.toLowerCase().includes("gombo")?gombo :
       item.toLowerCase().includes("okra")?okra :
       item.toLowerCase().includes("okro")?okra :
       item.toLowerCase().includes("tomat")?tomato :
       item.toLowerCase().includes("millet")?millet :
       item.toLowerCase().includes("yam")?yam :
       item.toLowerCase().includes("cocoyam")?cocoyam :
       item.toLowerCase().includes("onion")?onion :
       item.toLowerCase().includes("oignon")?onion :
       item.toLowerCase().includes("pepper")?pepper :
       item.toLowerCase().includes("bergine")?bergine :
       item.toLowerCase().includes("cabbage")?cabbage :
       item.toLowerCase().includes("chicken")?chicken :
       item.toLowerCase().includes("ulet")?chicken :
       item.toLowerCase().includes("mouton")?sheep:
       item.toLowerCase().includes("vacher")?cow :
       item.toLowerCase().includes("ane")?donkey :
       item.toLowerCase().includes("âne")?donkey :
       item.toLowerCase().includes("chiévres")?goat :
       item.toLowerCase().includes("cheval")?horse :
       corn
      }
  
        )


  })
   :
   loggedInFarmer && loggedInFarmer.what_crop_are_you_farming ? loggedInFarmer.what_crop_are_you_farming.split(/\s+/).filter((plug)=>(plug !=="and"||plug !=="et" )).slice(0,3).forEach((item,index)=>(


     
    farmersFromDBArray.push(
      {id: index===0?"0S91dTHhu7t0Zc6645Gb":index===1?"75LPiOJKwtndeC67o5d3":index===2?"8Gnbs3WPwJ7ZzzvHgORs":Math.random(),
      cropName:item,
      cropType:"Cash Crops",
     lastHarvest:index===0?"20":index===1?"30":"50",
      harvestDate:"01-01-2024",
      image:   item.toLowerCase().includes("maize")?maize :
      item.toLowerCase().includes("corn")?corn :
      item.toLowerCase().includes("gombo")?gombo :
      item.toLowerCase().includes("okra")?okra :
      item.toLowerCase().includes("okro")?okra :
      item.toLowerCase().includes("tomat")?tomato :
      item.toLowerCase().includes("millet")?millet :
      item.toLowerCase().includes("yam")?yam :
      item.toLowerCase().includes("cocoyam")?cocoyam :
      item.toLowerCase().includes("onion")?onion :
      item.toLowerCase().includes("oignon")?onion :
      item.toLowerCase().includes("pepper")?pepper :
      item.toLowerCase().includes("bergine")?bergine :
      item.toLowerCase().includes("cabbage")?cabbage :
      corn
     
    }

      )


    ))
   :
   farmersFromDBArray = [ ...cropsStatic]


    setFarmersFromDB(farmersFromDBArray)
  
    console.log("farmers from DB ARRAY, WHICH I AM USING TO POPULATE CROP TABLE IS-->",farmersFromDBArray)
  



  },[loggedInFarmer])

  return (
    <>

     <Helmet>
        <title> Slug Signal </title>
      </Helmet>

      <Container maxWidth="xl" >
        <Grid container spacing={2} alignItems="center" justifyContent="flex-end" style={{marginTop:"0.3rem",paddingRight:"7rem"}}> 
     {/*<CustomToggleSwitch activeButton={activeButton} setActiveButton={setActiveButton} handleViewStudentsClick={handleViewStudentsClick} handleAddStudentsClick={handleAddStudentsClick}/>*/}

     {/*
            <Button
      
        style={{
          minHeight: '50px',
          minWidth: '180px',
          backgroundColor: '#000000',
          color:'#fff',
          border: 'none',
          borderRadius: '20px',
          marginRight: '4px',
          marginTop:"5px",
          marginBottom:"3px",
        }}
       
      >
        Filter
      </Button> 
      */}

      <Grid item /*xs={6}*/ style={{width:"max-content",display: 'flex',justifyContent:"flex-start", alignItems: 'flex-start', marginTop: "1.5rem", marginBottom: "2rem",backgroundColor:"#F9F9F9",borderRadius:"2rem",padding:"0.5rem" }}>
            <Box sx={{ width: '100%' /*,position:"relative",top:"-1rem",left:"-1rem"*/}}>
              <Button
                variant={'contained'}
                style={{
                  minHeight: '50px',
                  minWidth: '180px',
                  backgroundColor: '#2DA840',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '20px',
                  marginRight: '4px',
                }}
                // onClick={handleOne}
              >
               Add Crop
              </Button>
              &nbsp; &nbsp;

              <Button
                variant={'contained'}
                style={{
                  minHeight: '50px',
                  minWidth: '180px',
                  backgroundColor: '#21712E',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '20px',
                  marginRight: '4px',
                }}
                // onClick={handleOne}
              >
               Add Harvest
              </Button>

            </Box>

         
          </Grid>
     

          </Grid>
          <br/>
          
        <Grid container spacing={2}>
            <Grid item xs={8} md={12} lg={12}>
              <div style={{background: 'white',  padding: '10px',display:"flex",flexDirection:"column",gap:"1rem"}}>
               {/*activeButton === 'viewStudents' &&  <ViewStudents students={students}/>*/}  
              
               {/*activeButton === 'addStudents' && <AddStudent />*/}




               <Grid item xs={12} md={12} lg={12} >
                <div style={{background: '#F8F8F8',  padding: '10px',marginTop:"-2.5rem"}}>
              {loggedInFarmer && loggedInFarmer.firstName &&
               <CropStats crops={farmersFromDB}/> 
              }
                </div>
              </Grid>



{/* OLD FORMAT FOR DISPLAY WITH BIG CARD ICONS - DONT DELETE JUST YET, THERE IS A LOT OF LOGIC HERE
 
  loggedInFarmer && loggedInFarmer.crop_types ? loggedInFarmer.crop_types.split(/\s+/).slice(0,3).map((item,index)=>( 
    

    <PitchCard pic={
      item.toLowerCase().includes("maize")?maize :
      item.toLowerCase().includes("potato")?potato :
      item.toLowerCase().includes("corn")?corn :
      item.toLowerCase().includes("gombo")?gombo :
      item.toLowerCase().includes("okra")?okra :
      item.toLowerCase().includes("okro")?okra :
      item.toLowerCase().includes("tomat")?tomato :
      item.toLowerCase().includes("millet")?millet :
      item.toLowerCase().includes("yam")?yam :
      item.toLowerCase().includes("cocoyam")?cocoyam :
      item.toLowerCase().includes("onion")?onion :
      item.toLowerCase().includes("oignon")?onion :
      item.toLowerCase().includes("pepper")?pepper :
      item.toLowerCase().includes("bergine")?bergine :
      item.toLowerCase().includes("cabbage")?cabbage :
      corn
    } 
    collection={item} name={'Harvest Quantity: 20'} uni={'Harvest date:01-01-2024'}/>
   
  ))
  
  :

  loggedInFarmer && loggedInFarmer.produce ? loggedInFarmer.produce.split(/\s+/).filter((plug)=>(plug !=="and"||plug !=="et" )).slice(0,3).map((item,index)=>( 
   
    <PitchCard pic={
      item.toLowerCase().includes("maize")?maize :
      item.toLowerCase().includes("corn")?corn :
      item.toLowerCase().includes("gombo")?gombo :
      item.toLowerCase().includes("okra")?okra :
      item.toLowerCase().includes("okro")?okra :
      item.toLowerCase().includes("tomat")?tomato :
      item.toLowerCase().includes("millet")?millet :
      item.toLowerCase().includes("yam")?yam :
      item.toLowerCase().includes("cocoyam")?cocoyam :
      item.toLowerCase().includes("onion")?onion :
      item.toLowerCase().includes("oignon")?onion :
      item.toLowerCase().includes("pepper")?pepper :
      item.toLowerCase().includes("bergine")?bergine :
      item.toLowerCase().includes("cabbage")?cabbage :
      item.toLowerCase().includes("chicken")?chicken :
      item.toLowerCase().includes("ulet")?chicken :
      item.toLowerCase().includes("mouton")?sheep:
      item.toLowerCase().includes("vacher")?cow :
      item.toLowerCase().includes("ane")?donkey :
      item.toLowerCase().includes("âne")?donkey :
      item.toLowerCase().includes("chiévres")?goat :
      item.toLowerCase().includes("cheval")?horse :
      corn
    } 
    collection={item} name={'Harvest Quantity: 20'} uni={'Harvest date:01-01-2024'}/>
   
  ))

  :


  loggedInFarmer && loggedInFarmer.what_crop_are_you_farming ? loggedInFarmer.what_crop_are_you_farming.split(/\s+/).filter((plug)=>(plug !=="and"||plug !=="et" )).slice(0,3).map((item,index)=>( 
   
    <PitchCard pic={

      item.toLowerCase().includes("maize")?maize :
      item.toLowerCase().includes("corn")?corn :
      item.toLowerCase().includes("gombo")?gombo :
      item.toLowerCase().includes("okra")?okra :
      item.toLowerCase().includes("okro")?okra :
      item.toLowerCase().includes("tomat")?tomato :
      item.toLowerCase().includes("millet")?millet :
      item.toLowerCase().includes("yam")?yam :
      item.toLowerCase().includes("cocoyam")?cocoyam :
      item.toLowerCase().includes("onion")?onion :
      item.toLowerCase().includes("oignon")?onion :
      item.toLowerCase().includes("pepper")?pepper :
      item.toLowerCase().includes("bergine")?bergine :
      item.toLowerCase().includes("cabbage")?cabbage :
      corn
    } 


    collection={item} name={'Harvest Quantity: 20'} uni={'Harvest date:01-01-2024'}/>
   
  ))

  :
   
   
   <>
               <PitchCard pic={corn} collection={'CORN'} name={'Harvest Quantity: 20'} uni={'Harvest date:01-01-2024'}/>
               <PitchCard pic={potato} collection={'POTATO'} name={'Harvest Quantity: 50'}  uni={'Harvest date:01-01-2024'}/>
              
               <PitchCard pic={plantain} collection={'PLANTAIN'} name={'Harvest Quantity: 30'}  uni={'Harvest date:01-01-2024'}/>

   </>
*/}

              
                </div>
            </Grid>
            
          </Grid>
      </Container>
    </>
  );
}
