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

import { saveBrandAlignment, saveCareerGoals, saveDob, saveGender, saveHighlights, saveInstagram, savePitchRate, savePosition, savePreferredBrands, savePreviousPartnerships, saveProfilePicture, saveProfilePictureName, saveSport, saveTeam, saveTiktok, saveTwitter, saveUsp } from 'src/redux/reducers/pitch.slice';
import { uploadPitchImage } from 'src/redux/actions/pitch.action';
import { notifyErrorFxn } from 'src/utils/toast-fxn';

const CHART_HEIGHT = 392;
const LEGEND_HEIGHT = 72;

const CHART_DATA = [50, 50];

export default function CreatePitchBrandCollabsPage() {
  const theme = useTheme();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
 // const { myGroups, isLoading } = useSelector((state) => state.group);
  //const { students } = useSelector((state) => state.student);

  const { dob,gender,sport,
    position,team,twitter,
    tiktok,instagram,highlights,
    pitchRate,profilePicture,
    profilePictureBlob,
    profilePictureName,
    previousPartnerships,
    preferredBrands,usp,brandAlignment,
    careerGoals,isLoading 
  } = useSelector((state) => state.pitch);

  const pitchDetailsObject = {
   
    dob,
    gender,
    sport,
    position,
    team,
    twitter,
    tiktok,
    instagram,
    highlights,
    pitchRate,
    profilePicture,
    profilePictureName,
    previousPartnerships,
    preferredBrands,
    usp,
    brandAlignment,
    careerGoals,
  }


  const students = [
    {id:"0S91dTHhu7t0Zc6645Gb" ,class:"Spring Collection",paymentStatus:"Ongoing",fname:"Mcdonalds ",lname:"",amount:"$9,700"},
    {id:"75LPiOJKwtndeC67o5d3",class:"Glamore Galore",paymentStatus:"Complete",fname:"Starbucks ",lname:"",amount:"$8,000"},
    {id:"8Gnbs3WPwJ7ZzzvHgORs",class:"Spring Release",paymentStatus:"Complete",fname:"Atlanta ",lname:"",amount:"$7,700"},
    {id:"amfootball",class:"Fashion Week",paymentStatus:"Complete",fname:"Bain & Co ",lname:"",amount:"$6,500"}
  ]

  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');

  const [loading,setLoading] = useState(false)
 




  const [selectedFile4, setSelectedFile4] = useState({selectedFile: [], selectedFileName: []});
const [file4, setFile4] = useState();
const handleselectedFile4 = event => {
  setSelectedFile4({
      selectedFile: event.target.files[0],
      selectedFileName: event.target.files[0].name
  });
  setFile4(URL.createObjectURL(event.target.files[0]));
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
              

               <DealCard pic={profilePicture&& profilePicture.length>2?profilePicture:blank} collection={'$0'} name={'NORMAN STEVEN'} uni={'Clark University'} type={"two"}/>
              
                </div>
            </Grid>




        <br />




          <Grid container spacing={2} sx={{background: '#F8F8F8', padding: '10px',width:"96.5%"}}>

      {/**here 2 */} 
      <Grid container spacing={2} sx={{ padding: '10px'}}>
          <Grid item xs={12} sx={{mb: 0}}>
        <p style={{fontSize:"24px",fontWeight:"600",position:"relative",top:"-1.2rem",left:"2rem"}}>Brand Collaborations</p>
         </Grid>




         

         <Grid item xs={12} sx={{mb: 0,position:"relative",top:"-1.2rem",left:"2rem"}}>
        <p style={{fontSize:"16px",fontWeight:"400",position:"relative",left:"0.6rem"}}>Previous Partnerships</p>
        
        <TextField
          name="Previous Partnerships"
          placeholder={"Have you previously worked with any brands? If yes, which ones?"}
          required
          value={previousPartnerships}
          onChange ={(e)=>{dispatch(savePreviousPartnerships(e.target.value))}}
          
          style={{height:"5rem",width:"95%"}}
          InputProps={{
            style:{
              height:"5rem",
              paddingLeft:"1rem",
              backgroundColor:"white"
            }
           
          }}
        /> 


         </Grid>


         <Grid item xs={12} sx={{mb: 0,position:"relative",top:"-1.2rem",left:"2rem"}}>
        <p style={{fontSize:"16px",fontWeight:"400",position:"relative",left:"0.6rem"}}>Preferred Brands</p>
        
        <TextField
          name="Preferred Brands"
          placeholder={"Are there any brands you particularly admire or would like to work with?"}
          required
          value={preferredBrands}
          onChange ={(e)=>{dispatch(savePreferredBrands(e.target.value))}}
         
          
          style={{height:"5rem",width:"95%"}}
          InputProps={{
            style:{
              height:"5rem",
              paddingLeft:"1rem",
              backgroundColor:"white"
            }
           
          }}
        /> 


         </Grid>



         <Grid item xs={12} sx={{mb: 0,position:"relative",top:"-1.2rem",left:"2rem"}}>
        <p style={{fontSize:"16px",fontWeight:"400",position:"relative",left:"0.6rem"}}>Brand Alignment</p>
        
        <TextField
          name="Brand Alignment"
          placeholder={"Brand Alignment"}
          required
          value={brandAlignment}
          onChange ={(e)=>{dispatch(saveBrandAlignment(e.target.value))}}
         
          
          style={{height:"5rem",width:"95%"}}
          InputProps={{
            style:{
              height:"5rem",
              paddingLeft:"1rem",
              backgroundColor:"white"
            }
           
          }}
        /> 


         </Grid>


         <Grid item xs={12} sx={{mb: 0,position:"relative",top:"-1.2rem",left:"2rem"}}>
        <p style={{fontSize:"16px",fontWeight:"400",position:"relative",left:"0.6rem"}}>Unique Selling Proposition (USP)</p>
        
        <TextField
          name="Unique Selling Proposition"
          placeholder={"Unique Selling Proposition "}
          required
          value={usp}
          onChange ={(e)=>{dispatch(saveUsp(e.target.value))}}
          
          style={{height:"5rem",width:"95%"}}
          InputProps={{
            style:{
              height:"5rem",
              paddingLeft:"1rem",
              backgroundColor:"white"
            }
           
          }}
        /> 


         </Grid>


   
         <Grid item xs={12} sx={{mb: 0,position:"relative",top:"-1.2rem",left:"2rem"}}>
        <p style={{fontSize:"16px",fontWeight:"400",position:"relative",left:"0.6rem"}}>Career Goals</p>
        
        <TextField
          name="Career Goals"
          placeholder={"What are your short term and long term career goals "}
          required
          value={careerGoals}
          onChange ={(e)=>{dispatch(saveCareerGoals(e.target.value))}}
          
          style={{height:"5rem",width:"95%"}}
          InputProps={{
            style:{
              height:"5rem",
              paddingLeft:"1rem",
              backgroundColor:"white"
            }
           
          }}
        /> 


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

                  if(!previousPartnerships ||
                    !preferredBrands ||
                    !usp ||
                    !brandAlignment ||
                    !careerGoals
                    
                    
                  ){

                    (notifyErrorFxn("Please fill in all fields!"))
                  }else if(!profilePictureBlob){
                    (notifyErrorFxn("Please upload your profile picture and try again!"))
                  }
                    
                  else  {
                dispatch(uploadPitchImage(pitchDetailsObject,profilePictureBlob,user,navigate,setLoading))
                  
                  }
                }}
               
               
              >
               {loading?"loading..":"Submit"}
              </Button>

            </Box>

          </Grid>
        </center>   

        </Grid>
      </Container>
    </>
  );
}
