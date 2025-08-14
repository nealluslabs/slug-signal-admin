import { Helmet } from 'react-helmet-async';
import { Grid, Container, Typography, Paper, Button, MenuItem, FormControl, Select, Box } from '@mui/material';
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
import PieChartCard from 'src/components/home/pie-chart-card';
import CampaignCard from 'src/components/home/campaign-card';
import CustomChart from 'src/components/home/custom-chart';
import { getStudents } from 'src/redux/actions/student.action';
import StudentFinanceStats from 'src/components/home/student-finance-stats';
import redboy from 'src/assets/images/redboy.jpeg'
import jeansfarmer from 'src/assets/images/jeansfarmer.jpeg'
import corn from 'src/assets/images/corn.jpeg'

import SmallCustomSearchBar from 'src/components/global/SmalllCustomSearchBar';
import AdditionalInfoCard from 'src/components/home/additional-info-card';
import CropDepositStats from 'src/components/home/crop-deposit-stats';
import CropStats from 'src/components/home/crop-stats';
import InsightsCard from 'src/components/home/insights-card';
import CropDetailsCard from 'src/components/home/crop-details-card';

const CHART_HEIGHT = 392;
const LEGEND_HEIGHT = 72;

const CHART_DATA = [50, 50];

export default function CropProfilePage() {
  const theme = useTheme();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { myGroups, isLoading } = useSelector((state) => state.group);
  //const { students } = useSelector((state) => state.student);

  const students = [
    {id:"0S91dTHhu7t0Zc6645Gb" ,class:"Sophomore",paymentStatus:"Clark University",fName:"Norman ",lName:"Steven",amount:"$9,700"},
    {id:"75LPiOJKwtndeC67o5d3",class:"Senior",paymentStatus:"Morehouse College",fName:"Grace ",lName:"Kenneth",amount:"$8,000"},
    {id:"8Gnbs3WPwJ7ZzzvHgORs",class:"Freshman",paymentStatus:"Mercer University",fName:"Chris ",lName:"Stones",amount:"$7,700"},
    {id:"amfootball",class:"Junior",paymentStatus:"Bradley University",fName:"Kennedy ",lName:"Fisher",amount:"$6,500"}
  ]



  const crops = [
    {id:"0S91dTHhu7t0Zc6645Gb", cropName:"Corn",cropType:"Cash Crops",lastHarvest:"20",harvestDate:"01-01-2024"},
    {id:"75LPiOJKwtndeC67o5d3",cropName:"Potato",cropType:"Cash Crops",lastHarvest:"50",harvestDate:"01-01-2024"},
    {id:"8Gnbs3WPwJ7ZzzvHgORs",cropName:"Plantain",cropType:"Cash Crops",lastHarvest:"30",harvestDate:"01-01-2024"},
   
  ]



  const cropDeposits = [
    {id:"0S91dTHhu7t0Zc6645Gb" ,cropName:"Corn",companyName:"Container #1",depositDate:"01-01-2024",lName:"Steven",earnings:"$90"},
    {id:"75LPiOJKwtndeC67o5d3",cropName:"Potato",companyName:"Container #2",depositDate:"01-01-2024",lName:"Kenneth",earnings:"$80"},
    {id:"8Gnbs3WPwJ7ZzzvHgORs",cropName:"Plantain",companyName:"Container #3",depositDate:"01-01-2024",lName:"Stones",earnings:"$70"},
    
  ]



  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');


  // useEffect(() => {
  //   if(user?.id == undefined){
  //    return navigate("/login");
  //   }
  //  }, [])

 // useEffect(() => {
 //   dispatch(fetchMyTransactions(user?.id));
 //   console.log('Transac Changed.');
 // }, [user]);

//  useEffect(() => {
//    dispatch(getStudents());
//    dispatch(fetchUserData(user?.id));
//  }, []);

 { /*const myCoolerGroups = myGroups?.length ? (
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
            //isMember={group.members.includes(user?.id)}
            startDate={group.startDate}
          />
        );
      })
  ) : (
    <>
      <EmptyRowCard msg={'Coolers you have joined will appear here.'} />
    </>
  );*/}

  return (
    <>

      <Helmet>
        <title> Slug Signal </title>
      </Helmet>

      <Container maxWidth="xl">
        
        {/* <SearchBox style={{ width: '100%' }} /> */}


      
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={6}>
            <div style={{ background: '#F8F8F8', padding: '10px' }}>
             {/* <PieChartCard
                headerOne={'Statistics'}
                headerTwo={'Profile'}
                value={'13'}
                type={'one'}
              />*/}

     
       <CropDetailsCard headerOne={'Statistics'} headerTwo={'Profile'} value={'3'} type={'one'} image={corn} farmName={'Jenkins Farm'} farmerName={"John Jenkins"} city={"Dakar, Senegal"} email={"jjenkins@gmail.com"} phoneNumber={"+221 555-380-1000"} />
            </div>
          </Grid>

          <Grid item xs={8} md={12} lg={6}>
            <div style={{ background: '#F8F8F8', padding: '10px' }}>
            <InsightsCard headerOne={'Statistics'} headerTwo={'Agent'} value={''} type={'two'}  farmName={'Jenkins Farm'} farmerName={"Djibril Cisse"} city={"Dakar, Senegal"} email={"djibril@ufarmx.com"} phoneNumber={"+221 555-123-1000"}  image={redboy}/>
            </div>
          </Grid>


        {/*
          <Grid container spacing={2} style={{marginTop:"2rem"}}>
          <div style={{ background: '#F8F8F8', padding: '10px',width:"100%" }}>
              <AdditionalInfoCard headerOne={'Statistics'} headerTwo={'Agent'} value={''} type={'two'}  farmName={'Jenkins Farm'} farmerName={"Djibril Cisse"} city={"Dakar, Senegal"} email={"djibril@ufarmx.com"} phoneNumber={"+221 555-123-1000"}  image={redboy}/>
            </div>
          </Grid>
            */}

        {/* 
          <Grid container spacing={2} style={{marginTop:"0.5rem"}}>
             First Grid Item 
          <Grid item xs={12} md={3} lg={3}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 100,
                border: '1px solid #F8F8F8',
                backgroundColor: '#F8F8F8',
                borerRadius: '10px',
              }}
            >
              <DashboardCard header={'Total Number of Athletes'} value={'20'} img={TeacherImg} />
            </Paper>
          </Grid>

         Second Grid Item 
          <Grid item xs={12} md={3} lg={3}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 100,
                border: '1px solid #F8F8F8',
                backgroundColor: '#F8F8F8',
                borderRadius: '10px',
              }}
            >
              <DashboardCard
                header={'Total Number of Deals'}
                value={students?.length ? students?.length : '0'}
                img={StudentImg}
              />
            </Paper>
          </Grid>

          Third Grid Item 
          { <Grid item xs={12} md={3} lg={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 100,
              border: '1px solid #F8F8F8',
              backgroundColor: '#F8F8F8',
              borderRadius: '10px'
            }}
          >
            <DashboardCard header={'Number of Engagements'} value={"2"} img={TeacherImg} />
          </Paper>
        </Grid> }

          Fourth Grid Item 
          <Grid item xs={12} md={3} lg={3}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 100,
                border: '1px solid #F8F8F8',
                backgroundColor: '#F8F8F8',
                borderRadius: '10px',
              }}
            >
              <DashboardCard header={'Total Expense'} value={'$60,000'} img={TeacherImg}  />
            </Paper>
          </Grid>
        </Grid>
            */}

        <br />



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
               Deposits
              </Button>
              &nbsp; &nbsp;

              {/*
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
               Deposits
              </Button>
              */}

            </Box>

         
          </Grid>


  




         <Grid container spacing={2} sx={{background: '#F8F8F8', padding: '10px'}}>
       
       {/**here 2 */}
         <Grid container spacing={2} sx={{ padding: '10px'}}>
         <Grid item xs={3} sx={{mb: 0}}>
       <p style={{fontSize:"24px",fontWeight:"600",position:"relative",top:"-1.2rem",left:"2rem"}}>Crop Deposits</p>
        </Grid>
      
      
      
       <Grid xs={2} item sx={{mb: 0}}>
    <FormControl sx={{ minWidth: 140, background: 'white' }}>
         <Select
           value={selectedClass}
           onChange={(e) => setSelectedClass(e.target.value)}
           displayEmpty
           label=""
           sx={{
             height: 45,
             minWidth: 140,
             p: 1,
           }}
         >
           <MenuItem value="">
             Select Type
           </MenuItem>
       <MenuItem value={'JSS 1'}>1</MenuItem>
       <MenuItem value={'JSS 2'}>2</MenuItem>
       <MenuItem value={'JSS 3'}>3</MenuItem>
       <MenuItem value={'SS 1'}>4</MenuItem>
      
         </Select>
       </FormControl>
     </Grid>
  
    <Grid xs={2} item sx={{mb: 0}}>
    <FormControl sx={{ minWidth: 140, background: 'white' }}>
         <Select
           value={selectedSection}
           onChange={(e) => setSelectedSection(e.target.value)}
           displayEmpty
           label=""
           sx={{
             height: 45,
             minWidth: 140,
             p: 1,
           }}
         >
           <MenuItem value="">
             Select Class
           </MenuItem>
           <MenuItem value={1}>1</MenuItem>
           <MenuItem value={2}>2</MenuItem>
           <MenuItem value={3}>3</MenuItem>
          
         </Select>
       </FormControl>
     </Grid>
     &nbsp; &nbsp;

     <Box sx={{ width: '20%', marginTop: '1.2%',}}>
       <SmallCustomSearchBar   title={"Search Crop"} />
     </Box>
     
     <Box sx={{ flexGrow: 1}}>
       <Button
         variant="contained"
         style={{ height: '45px', minWidth: '45px', backgroundColor: '#000000',  marginTop: '9.5%' }}
       >
         <SearchIcon />
       </Button>
     </Box>

     <Grid item sx={{mb: 0}}>
    <FormControl sx={{ minWidth: 140, background: 'white' }}>
         <Select
           value={selectedFilter}
           onChange={(e) => setSelectedFilter(e.target.value)}
           displayEmpty
           label=""
           sx={{
             height: 45,
             minWidth: 120,
             p: 1,
           }}
         >
           <MenuItem value="">
             Filter By
           </MenuItem>
           <MenuItem value={1}>Option 1</MenuItem>
           <MenuItem value={2}>Option 2</MenuItem>
           <MenuItem value={3}>Option 3</MenuItem>
         </Select>
       </FormControl>
     </Grid>
   </Grid>
   {/*here */}

           <Grid item xs={12} md={12} lg={12} >
           <div style={{background: '#F8F8F8',  padding: '10px',marginTop:"-2.5rem"}}>
          <CropDepositStats cropDeposits={cropDeposits}/> 
           </div>
           </Grid>
           
         </Grid>




          
        
        </Grid>
      </Container>
    </>
  );
}
