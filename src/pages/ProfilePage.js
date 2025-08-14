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
import SmallCustomSearchBar from 'src/components/global/SmalllCustomSearchBar';
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
import { getFileName } from 'src/utils/getFileFormat';

const CHART_HEIGHT = 392;
const LEGEND_HEIGHT = 72;

const CHART_DATA = [50, 50];

export default function ProfilePage() {
  const theme = useTheme();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { myGroups, isLoading } = useSelector((state) => state.group);
  //const { students } = useSelector((state) => state.student);


  const students = [
    {id:"0S91dTHhu7t0Zc6645Gb" ,class:"Sophomore",paymentStatus:"Clark University",fname:"Norman ",lname:"Steven",amount:"$9,700"},
    {id:"75LPiOJKwtndeC67o5d3",class:"Senior",paymentStatus:"Morehouse College",fname:"Grace ",lname:"Kenneth",amount:"$8,000"},
    {id:"8Gnbs3WPwJ7ZzzvHgORs",class:"Freshman",paymentStatus:"Mercer University",fname:"Chris ",lname:"Stones",amount:"$7,700"},
    {id:"amfootball",class:"Junior",paymentStatus:"Bradley University",fname:"Kennedy ",lname:"Fisher",amount:"$6,500"}
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

  useEffect(() => {
    dispatch(getStudents());
    dispatch(fetchUserData(user?.id));
  }, []);

  const myCoolerGroups = myGroups?.length ? (
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
  );

  return (
    <>
      <Container maxWidth="xl">
        
        {/* <SearchBox style={{ width: '100%' }} /> */}

        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={6}>
            <div style={{ background: '#F8F8F8', padding: '10px' }}>
              <ProfileCard
                headerOne={'Statistics'}
                headerTwo={'Profile'}
                value={'13'}
                type={'three'}
              />
            </div>
          </Grid>

          <Grid item xs={8} md={12} lg={6}>
            <div style={{ background: '#F8F8F8', padding: '10px' }}>
              <CampaignCard headerOne={'Statistics'} headerTwo={'Current Deal'} value={'$9,500'} type={'two'} image={maccies} />
            </div>
          </Grid>

         
         {/*<Grid container spacing={2} style={{marginTop:"2rem"}}>
         
          <Grid item xs={12} md={3} lg={3}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 240,
                border: '1px solid #F8F8F8',
                backgroundColor: '#F8F8F8',
                borderRadius: '10px',
              }}
            >
              <DashboardCard header={'Total Number of Deals'} value={'20'} img={TeacherImg} />
            </Paper>
          </Grid>

         
          <Grid item xs={12} md={3} lg={3}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 240,
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

          
          { <Grid item xs={12} md={3} lg={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 240,
              border: '1px solid #F8F8F8',
              backgroundColor: '#F8F8F8',
              borderRadius: '10px'
            }}
          >
            <DashboardCard header={'Number of Engagements'} value={"2"} img={TeacherImg} />
          </Paper>
        </Grid> }

        
          <Grid item xs={12} md={3} lg={3}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 240,
                border: '1px solid #F8F8F8',
                backgroundColor: '#F8F8F8',
                borderRadius: '10px',
              }}
            >
              <DashboardCard header={'Total Expense'} value={'$60,000'} img={TeacherImg}  />
            </Paper>
          </Grid>
            </Grid>*/}


        <br />



          <Grid item /*xs={6}*/ sx={{width:"max-content",display: 'flex', alignItems: 'center',px:1,py:2, mt: 4, mb: 4,backgroundColor:"#F9F9F9",borderRadius:"2rem" }}>
            <Box sx={{ width: '100%' }}>
              <Button
                variant={'contained'}
                style={{
                  minHeight: '50px',
                  minWidth: '180px',
                  backgroundColor: '#000000',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '20px',
                  marginRight: '4px',
                }}
                // onClick={handleOne}
              >
               Deals
              </Button>
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
                // onClick={handleOne}
              >
               Pitches
              </Button>

            </Box>

            {/* <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
             <Button variant="contained" style={{ minHeight: '50px', minWidth: '100px', backgroundColor: '#000000' }}>
                Export
              </Button>
              &nbsp; &nbsp;
              <Button variant="contained" style={{ minHeight: '50px', minWidth: '100px', backgroundColor: '#D72A34' }}>
                Print
              </Button>
            </Box>*/}
          </Grid>

          <Grid container spacing={2} sx={{background: '#F8F8F8', padding: '10px'}}>
     
     {/*here */}  
      <Grid container spacing={2} sx={{ padding: '10px'}}>
          <Grid item xs={3} sx={{mb: 0}}>
        <p style={{fontSize:"24px",fontWeight:"600",position:"relative",top:"-1.2rem",left:"2rem"}}>Deals</p>
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
              Select Class
            </MenuItem>
        <MenuItem value={'JSS 1'}>JSS 1</MenuItem>
        <MenuItem value={'JSS 2'}>JSS 2</MenuItem>
        <MenuItem value={'JSS 3'}>JSS 3</MenuItem>
        <MenuItem value={'SS 1'}>SS 1</MenuItem>
        <MenuItem value={'SS 2'}>SS 2</MenuItem>
        <MenuItem value={'SS 3'}>SS 3</MenuItem>
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
              Select Sport
            </MenuItem>
            <MenuItem value={1}>Basketball</MenuItem>
            <MenuItem value={2}>Football</MenuItem>
            <MenuItem value={3}>Baseball</MenuItem>
            <MenuItem value={3}>Hockey</MenuItem>
            <MenuItem value={3}>Soccer</MenuItem>
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

            <Grid item xs={12} md={12} lg={12} style={{marginTop:"-3rem"}}>
            <div style={{background: '#F8F8F8',  padding: '10px'}}>
           <StudentCampaignStats students={students}/> 
            </div>
            </Grid>
            
          </Grid>
          {/* <Grid item xs={8} md={12} lg={12}>
              <div style={{background: '#F8F8F8',  padding: '10px'}}>
                <CustomChart headerOne={"Statistics"} headerTwo={'Earnings & Expense'}  value={"200"} type={"two"}/>
                </div>
            </Grid> */}
        </Grid>
      </Container>
    </>
  );
}
