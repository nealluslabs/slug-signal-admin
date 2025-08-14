import { Helmet } from 'react-helmet-async';
import { Grid, Container, Typography, Paper, Button, MenuItem, FormControl, Select, Box, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { fCurrency, fNumber } from '../utils/formatNumber';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import EmptyRowCard from 'src/components/home/empty-row-card';
import SearchIcon from '@mui/icons-material/Search';
import { fetchUserData } from 'src/redux/actions/auth.action';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import { fetchMyTransactions } from 'src/redux/actions/transaction.action';
import HomeCoolersCard from 'src/components/home/home-coolers-card';
import CustomSearchBar from 'src/components/global/CustomSearchBar';
import DashboardCard from 'src/components/home/dashboard-card';

import TeacherImg from '../assets/images/dashboard/teacher.png';
import StudentImg from '../assets/images/dashboard/student.png';

import maccies from 'src/assets/images/maccies.png';


import PieChartCard from 'src/components/home/pie-chart-card';
import CampaignCard from 'src/components/home/campaign-card';


import CustomChart from 'src/components/home/custom-chart';
import { getStudents } from 'src/redux/actions/student.action';
import StudentFinanceStats from 'src/components/home/student-finance-stats';
import ProfileCard from 'src/components/home/profile-card';
import StudentCampaignStats from 'src/components/home/student-campaign-stats';

import SmallCustomSearchBar from 'src/components/global/SmalllCustomSearchBar';

import redboy from 'src/assets/images/redboy.jpeg';
import greenboy from 'src/assets/images/greenboy.jpeg';
import athlete from 'src/assets/images/athlete.jpeg';
import amfootball from 'src/assets/images/amfootball.jpeg'
import PitchCard from 'src/components/listcards/pitch-card';
import blank from 'src/assets/images/rec.png';

import DealCard from 'src/components/listcards/deal-card';
import { saveDob, saveGender, saveHighlights, saveInstagram, savePitchRate, savePosition, saveProfilePicture, saveProfilePictureBlob, saveProfilePictureName, saveSport, saveTeam, saveTiktok, saveTwitter } from 'src/redux/reducers/pitch.slice';
import { notifyErrorFxn } from 'src/utils/toast-fxn';

const CHART_HEIGHT = 392;
const LEGEND_HEIGHT = 72;

const CHART_DATA = [50, 50];

export default function CreatePitchGeneralInfoPage() {
  const theme = useTheme();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  //const { myGroups, isLoading } = useSelector((state) => state.group);
  const { dob,gender,sport,
    position,team,twitter,
    tiktok,instagram,highlights,
    pitchRate,profilePicture,
    profilePictureName,
    previousPartnerships,
    preferredBrands,usp,brandAlignment,
    careerGoals,isLoading 
  } = useSelector((state) => state.pitch);

  //const { students } = useSelector((state) => state.student);




  const students = [
    {id:"0S91dTHhu7t0Zc6645Gb" ,class:"Spring Collection",paymentStatus:"Ongoing",fname:"Mcdonalds ",lname:"",amount:"$9,700"},
    {id:"75LPiOJKwtndeC67o5d3",class:"Glamore Galore",paymentStatus:"Complete",fname:"Starbucks ",lname:"",amount:"$8,000"},
    {id:"8Gnbs3WPwJ7ZzzvHgORs",class:"Spring Release",paymentStatus:"Complete",fname:"Atlanta ",lname:"",amount:"$7,700"},
    {id:"amfootball",class:"Fashion Week",paymentStatus:"Complete",fname:"Bain & Co ",lname:"",amount:"$6,500"}
  ]

  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');
  



  const [briefIntroduction,setBriefIntroduction] = useState('');
  
  const [selectedFile4, setSelectedFile4] = useState({selectedFile: [], selectedFileName: []});
const [file4, setFile4] = useState();

const handleselectedFile4 = event => {
  setSelectedFile4({
      selectedFile: event.target.files[0],
      selectedFileName: event.target.files[0].name
  });
  setFile4(URL.createObjectURL(event.target.files[0]));

  dispatch(saveProfilePicture(URL.createObjectURL(event.target.files[0])))
  dispatch(saveProfilePictureName(event.target.files[0].name))
  dispatch(saveProfilePictureBlob(event.target.files[0]))
};


  // useEffect(() => {
  //   if(user?.id == undefined){
  //    return navigate("/login");
  //   }
  //  }, [])

 // useEffect(() => {
 //   dispatch(fetchMyTransactions(user?.id));
 //   console.log('Transac Changed.');
 // }, [user]);

  useEffect(() => {
    dispatch(getStudents());
    dispatch(fetchUserData(user?.id));
  }, []);

  /*const myCoolerGroups = myGroups?.length ? (
    myGroups
      .slice(0, 3)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .map((group) => {
        return (
          <HomeCoolersCard
            groupId={group.groupId}
            name={group.groupName}
            fee={fCurrency(group.amount)}
            count={`${group.members.length} OF ${group.noOfSavers} SAVERS`}
            img={group.imageUrl}
            members={group.members}
            isMember={group.members.includes(user?.id)}
            startDate={group.startDate}
          />
        );
      })
  ) : (
    <>
      <EmptyRowCard msg={'Coolers you have joined will appear here.'} />
    </>
  );*/

  return (
    <>


      <Helmet>
        <title>  UfarmX </title>
      </Helmet>

      <Container maxWidth="xl">
        
        {/* <SearchBox style={{ width: '100%' }} /> */}

        <Grid container spacing={3}>
         

          <Grid item xs={8} md={12} lg={12}>
              <div style={{background: 'white',  padding: '10px',display:"flex",flexDirection:"column",gap:"1rem",position:"relative",left:"-3.2rem",backgroundColor:"transparent",marginBottom:"0.5rem"}}>
              

               <DealCard pic={profilePicture && profilePicture.length>2?profilePicture:blank} collection={'$0'} name={'NORMAN STEVEN'} uni={'Clark University'} type={"two"}/>
              
                </div>
            </Grid>




        <br />




          <Grid container spacing={2} sx={{background: '#F8F8F8', padding: '10px',width:"96.5%"}}>

      {/**here 2 */} 
      <Grid container spacing={2} sx={{ padding: '10px'}}>
          <Grid item xs={12} sx={{mb: 0}}>
        <p style={{fontSize:"24px",fontWeight:"600",position:"relative",top:"-1.2rem",left:"2rem"}}>General Information</p>
         </Grid>


      
         <Grid item xs={12}  sx={{mb: 0,position:"relative",top:"-1.2rem",display:"flex",gap:"0.5rem", flexDirection:"row"}}>
       

       <Grid item xs={5.8} sx={{mb: 0,position:"relative",top:"-1.2rem",left:"2rem"}}>
       <p style={{fontSize:"16px",fontWeight:"400",position:"relative",left:"0.6rem"}}>Date of Birth</p>
       
       <TextField
         name="Date of Birth"
         placeholder={"Date of Birth "}
         required
         value={dob}
         onChange ={(e)=>{dispatch(saveDob(e.target.value))}}
        
         
         style={{height:"3rem",width:"95%"}}
         InputProps={{
           style:{
             height:"3rem",
             paddingLeft:"1rem",
             backgroundColor:"white"
           }
          
         }}
       /> 
       </Grid>


       <Grid item xs={5.8} sx={{mb: 0,position:"relative",top:"-1.2rem",left:"2rem"}}>
       <p style={{fontSize:"16px",fontWeight:"400",position:"relative",left:"0.6rem"}}>Gender</p>
       <TextField
         name="Gender"
         placeholder={"Gender"}
         required
         value={gender}
         onChange ={(e)=>{dispatch(saveGender(e.target.value))}}
         
         style={{height:"3rem",width:"95%"}}
         InputProps={{
           style:{
             height:"3rem",
             paddingLeft:"1rem",
             backgroundColor:"white"
           }
          
         }}
       /> 


  

           
       </Grid>


        </Grid>




        <Grid item xs={12}  sx={{mb: 0,position:"relative",top:"-1.2rem",display:"flex",gap:"0.5rem", flexDirection:"row"}}>
       

       <Grid item xs={3.8} sx={{mb: 0,position:"relative",top:"-1.2rem",left:"2rem"}}>
       <p style={{fontSize:"16px",fontWeight:"400",position:"relative",left:"0.6rem"}}>Sport</p>
       
       <TextField
         name="Sport"
         placeholder={"Sport "}
         required
         value={sport}
         onChange ={(e)=>{dispatch(saveSport(e.target.value))}}
        
         
         style={{height:"3rem",width:"95%"}}
         InputProps={{
           style:{
             height:"3rem",
             paddingLeft:"1rem",
             backgroundColor:"white"
           }
          
         }}
       /> 
       </Grid>


       <Grid item xs={3.8} sx={{mb: 0,position:"relative",top:"-1.2rem",left:"2rem"}}>
       <p style={{fontSize:"16px",fontWeight:"400",position:"relative",left:"0.6rem"}}>Position/Role</p>
       <TextField
         name="Position/Role"
         placeholder={"Position/Role"}
         required
         value={position}
         onChange ={(e)=>{dispatch(savePosition(e.target.value))}}
         
         style={{height:"3rem",width:"95%"}}
         InputProps={{
           style:{
             height:"3rem",
             paddingLeft:"1rem",
             backgroundColor:"white"
           }
          
         }}
       /> 


  

           
       </Grid>



       <Grid item xs={3.8} sx={{mb: 0,position:"relative",top:"-1.2rem",left:"2rem"}}>
       <p style={{fontSize:"16px",fontWeight:"400",position:"relative",left:"0.6rem"}}>Team/ Organization</p>
       <TextField
         name="Team/ Organization"
         placeholder={"Team/ Organization"}
         required
         value={team}
         onChange ={(e)=>{dispatch(saveTeam(e.target.value))}}
         
         style={{height:"3rem",width:"95%"}}
         InputProps={{
           style:{
             height:"3rem",
             paddingLeft:"1rem",
             backgroundColor:"white"
           }
          
         }}
       /> 


  

           
       </Grid>


        </Grid>
         

      

     


        <Grid item xs={12}  sx={{mb: 0,position:"relative",top:"-1.2rem",display:"flex",gap:"0.5rem", flexDirection:"row"}}>
       

       <Grid item xs={3.8} sx={{mb: 0,position:"relative",top:"-1.2rem",left:"2rem"}}>
       <p style={{fontSize:"16px",fontWeight:"400",position:"relative",left:"0.6rem"}}>Twitter</p>
       
       <TextField
         name="twitter"
         placeholder={"twitter "}
         required
         value={twitter}
         onChange ={(e)=>{dispatch(saveTwitter(e.target.value))}}
        
         
         style={{height:"3rem",width:"95%"}}
         InputProps={{
           style:{
             height:"3rem",
             paddingLeft:"1rem",
             backgroundColor:"white"
           }
          
         }}
       /> 
       </Grid>


       <Grid item xs={3.8} sx={{mb: 0,position:"relative",top:"-1.2rem",left:"2rem"}}>
       <p style={{fontSize:"16px",fontWeight:"400",position:"relative",left:"0.6rem"}}>Tiktok</p>
       <TextField
         name="Tiktok"
         placeholder={"Tiktok"}
         required
         value={tiktok}
         onChange ={(e)=>{dispatch(saveTiktok(e.target.value))}}
         
         style={{height:"3rem",width:"95%"}}
         InputProps={{
           style:{
             height:"3rem",
             paddingLeft:"1rem",
             backgroundColor:"white"
           }
          
         }}
       /> 


  

           
       </Grid>



       <Grid item xs={3.8} sx={{mb: 0,position:"relative",top:"-1.2rem",left:"2rem"}}>
       <p style={{fontSize:"16px",fontWeight:"400",position:"relative",left:"0.6rem"}}>Instagram</p>
       <TextField
         name="Instagram"
         placeholder={"Instagram"}
         required
         value={instagram}
         onChange ={(e)=>{dispatch(saveInstagram(e.target.value))}}
         
         style={{height:"3rem",width:"95%"}}
         InputProps={{
           style:{
             height:"3rem",
             paddingLeft:"1rem",
             backgroundColor:"white"
           }
          
         }}
       /> 


  

           
       </Grid>


        </Grid>
         



        


         <Grid item xs={12} sx={{mb: 0,position:"relative",top:"-1.2rem",left:"2rem"}}>
        <p style={{fontSize:"16px",fontWeight:"400",position:"relative",left:"0.6rem"}}>Career Highlights</p>
        
        <TextField
          name="Career Highlights"
          placeholder={"Career Highlights "}
          required
          value={highlights}
          onChange ={(e)=>{dispatch(saveHighlights(e.target.value))}}
          
          style={{height:"10rem",width:"95%"}}
          InputProps={{
            style:{
              height:"10rem",
              paddingLeft:"1rem",
              backgroundColor:"white",
              display:"flex",
              alignItems:"flex-start",
              justifyContent:"flex-start"
            }
           
          }}
        /> 


         </Grid>





         <Grid item xs={12}  sx={{mb: 0,position:"relative",top:"1.2rem",display:"flex",gap:"0.5rem", flexDirection:"row"}}>
       

        <Grid item xs={5.8} sx={{mb: 0,position:"relative",top:"-1.2rem",left:"2rem"}}>
        <p style={{fontSize:"16px",fontWeight:"400",position:"relative",left:"0.6rem"}}>Pitch Rate</p>
        
        <TextField
          name="Pitch Rate"
          placeholder={"Pitch Rate "}
          required
          value={pitchRate}
          onChange ={(e)=>{dispatch(savePitchRate(e.target.value))}}
         
          
          style={{height:"3rem",width:"95%"}}
          InputProps={{
            style:{
              height:"3rem",
              paddingLeft:"1rem",
              backgroundColor:"white"
            }
           
          }}
        /> 
        </Grid>


        <Grid item xs={5.8} sx={{mb: 0,position:"relative",top:"-1.2rem",left:"2rem"}}>
        <p style={{fontSize:"16px",fontWeight:"400",position:"relative",left:"0.6rem"}}>Profile Picture</p>
        <TextField
          name="Profile Picture"
          placeholder={"Upload "}
          required
          value={profilePictureName}
         
          
          style={{height:"3rem",width:"95%"}}
          InputProps={{
            style:{
              height:"3rem",
              paddingLeft:"1rem",
              backgroundColor:"white"
            }
           
          }}
        /> 


                 <input
                  type="file"
                  style={{ display: 'flex',width:"95%",position:"relative",top:"-3.0rem",opacity:"0",height:"3rem" }}
                  onChange={handleselectedFile4}
                   />
        </Grid>


         </Grid>
       
       
       
      
    </Grid>
    {/**here 2 */}

        
            
          </Grid>

        <center style={{width:"100%" ,display: 'flex', justifyContent: 'center',}}>
          <Grid item /*xs={6}*/ sx={{width:"max-content",display: 'flex', alignItems: 'center',px:1,py:2, mt: 4, mb: 4,backgroundColor:"#F9F9F9",borderRadius:"2rem" }}>
            <Box sx={{ width: '100%' }}>
              
              &nbsp; &nbsp;

              <Button
                variant={'contained'}
                style={{
                  minHeight: '50px',
                  minWidth: '180px',
                  backgroundColor: '#D72A34',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '20px',
                  marginRight: '4px',
                }}

                onClick={()=>{

                  if(!dob ||
                    !gender ||
                    !sport ||
                    !position ||
                    !team ||
                    !twitter ||
                    !tiktok ||
                    !instagram ||
                    !highlights ||
                    !pitchRate ||
                    !profilePicture
                    
                  ){

                    (notifyErrorFxn("Please fill in all fields!"))
                  }
                    
                  else  {

                  navigate('/dashboard/create-pitch-brand-collabs-page')
                  }
                }}
               
              >
               Next
              </Button>

            </Box>

          </Grid>
        </center>   

        </Grid>
      </Container>
    </>
  );
}
