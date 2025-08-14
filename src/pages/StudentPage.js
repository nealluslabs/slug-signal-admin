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

import redboy from 'src/assets/images/cropcompany.png';
import greenboy from 'src/assets/images/cropcompany.png';
import athlete from 'src/assets/images/cropcompany.png';
import amfootball from 'src/assets/images/cropcompany.png'


export default function StudentPage() {
  const theme = useTheme();
    
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { myGroups, isLoading } = useSelector((state) => state.group);
  const { students } = useSelector((state) => state.student);

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

  return (
    <>


      <Helmet>
        <title> Slug Signal </title>
      </Helmet>

      <Container maxWidth="xl" >
        
          {/* <CustomToggleSwitch activeButton={activeButton} setActiveButton={setActiveButton} handleViewStudentsClick={handleViewStudentsClick} handleAddStudentsClick={handleAddStudentsClick}/>*/}

          <Grid container spacing={2} alignItems="center" justifyContent="flex-end" style={{marginTop:"0.3rem",paddingRight:"2rem"}}> 
     {/*<CustomToggleSwitch activeButton={activeButton} setActiveButton={setActiveButton} handleViewStudentsClick={handleViewStudentsClick} handleAddStudentsClick={handleAddStudentsClick}/>*/}

    

      <Grid item /*xs={6}*/ style={{width:"max-content",display: 'flex',justifyContent:"flex-start", alignItems: 'flex-start', marginTop: "1.5rem", marginBottom: "2rem",backgroundColor:"#F9F9F9",borderRadius:"2rem",padding:"0.5rem" }}>
            <Box sx={{ width: '100%' /*,position:"relative",top:"-1rem",left:"-1rem"*/}}>
            
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
               Filter
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

               <CampaignCard pic={redboy} collection={'CORN'} about={"Container #1"} signed={"Date Deposited: 01-01-2024 | earnings: $20"}/>
               <CampaignCard pic={greenboy} collection={'PLANTAINS'} about={"Container #1"} signed={"Date Deposited: 01-01-2024 | earnings: $20"}/>
               <CampaignCard pic={amfootball} collection={'EGGS'} about={"Container #1"} signed={"Date Deposited: 01-01-2024 | earnings: $20"}/>
               <CampaignCard pic={athlete} collection={'BANANAS'} about={"Container #1"} signed={"Date Deposited: 01-01-2024 | earnings: $20"}/>
                </div>
            </Grid>
            
          </Grid>
      </Container>
    </>
  );
}
