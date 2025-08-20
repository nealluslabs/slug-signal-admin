import { createTheme, Container, ThemeProvider, Grid, TextField, Typography, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
//import { fetchCandidateData } from 'src/redux/actions/auth.action';
// @mui
import { useTheme, styled } from '@mui/material/styles';

import COCA from 'src/assets/images/coca.png';

import { ToastContainer } from 'react-toastify';

//react-icons
import { PiCaretRightBold } from 'react-icons/pi';
import { FaPlus } from 'react-icons/fa';
import Navbar from 'src/componentsMyNetwork/Navbar';
import Header from 'src/layouts/dashboard/header';
import { fetchAllApprovedTrends, fetchAllTrends } from 'src/redux/actions/group.action';
import { fetchUserDataSilent } from 'src/redux/actions/auth.action';
// import { setTrendInFocus } from "src/redux/actions/group.action"; // adjust path

const RespContent = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    width: '100%',
    height: '100%',
  },

  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    width: '100%',
    height: '100%',
  },
}));

export default function SettingsPage() {
  const theme = useTheme();
  // const classes = useStyles()
  const [mode, setMode] = useState('dark');
  const dispatch = useDispatch();

  const darkTheme = createTheme({
    palette: {
      mode: mode,
      background: {
        default: '#FFF', // Page background
      },
    },
  });
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAllApprovedTrends());
  }, []);

  useEffect(() => {
    dispatch(fetchAllTrends());
  }, []);

  const { mySignals, allTrends, filteredTrends } = useSelector((state) => state.group);
  const { user } = useSelector((state) => state.auth);
  const [randomSignals, setRandomSignals] = useState([]);

  const [loading, setLoading] = useState(false);

  const [waiting, setWaiting] = useState(false);

  const [company1, setCompany1] = useState(false);
  const [company2, setCompany2] = useState(false);
  const [signalsForThisUser, setSignalsForThisUser] = useState([]);

  useEffect(() => {
    dispatch(fetchUserDataSilent('fYSBPTAm8FcxJocuygc79nOZT6x2'));
    //I AM SIMULATING FETCHING SIGNALS FOR UT1@SLUGSIGNAL.COM AS THE SLUG DASH PAGE DOES NOT INVOLVE A LOGIN
    //AND WE HAVE TO LOGIN TO GET 'MY SIGINALS'
  }, []);

  useEffect(() => {
    // if(user && !user.user){
    //   navigate('/login')
    // }

    function getRandomTrends(allTrends, mySignals, setRandomSignals) {
      // Step 1: Filter out trends whose id is in mySignals
      const filteredTrends = allTrends && allTrends.filter((trend) => mySignals && !mySignals.includes(trend.id));

      // Step 2: Shuffle the filtered array using Fisher-Yates
      for (let i = filteredTrends && filteredTrends.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [filteredTrends[i], filteredTrends[j]] = [filteredTrends[j], filteredTrends[i]];
      }

      // Step 3: Slice out the first 4
      const selectedTrends = filteredTrends && filteredTrends.slice(0, 4);

      // Step 4: Set the selected trends
      setRandomSignals(selectedTrends);
    }

    getRandomTrends(allTrends, mySignals, setRandomSignals);

    // console.log('signals=======>>>>>>>', allTrends);

    if (mySignals && mySignals.length) {
      const allSignalIds = allTrends.map((item) => item.id);
      let signalsInterim = [];
      console.log('ALL SIGNAL IDS IS-->', allSignalIds);
      mySignals &&
        mySignals.forEach((signalId) => {
          const index = allSignalIds.indexOf(signalId);
          if (index !== -1 /*&& !(signalsForThisUser.map(item => item.id).includes(signalId))*/) {
            signalsInterim.push(allTrends[index]);
          }
        });

      setSignalsForThisUser([...signalsInterim]);
    }
  }, [mySignals]);

  const [open, setOpen] = useState(false);
  const { trendInFocus } = useSelector((state) => state.group);
  // console.log('user signals ================>>>>>>>>', signalsForThisUser);

  return (
    <ThemeProvider theme={darkTheme}>
      <Navbar active="settings" />
      <Container maxWidth="xl" sx={{ marginTop: '5%', backgroundColor: '' }}>
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        {
          <>
            <RespContent
              style={{ display: 'flex', marginLeft: '10%', width: 'calc(100% - 13%)', marginTop: '2%', gap: '3rem' }}
            >
              {
                <Container maxWidth="md" sx={{ py: 3 }}>
                  {/* Trends Row */}
                  <Grid container alignItems="center" spacing={2} sx={{ mb: 3 }}>
                    {/* Label */}
                    <Grid item xs={3}>
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        Trends
                      </Typography>
                    </Grid>
                    {/* Input */}
                    <Grid item xs={9}>
                      <TextField
                        placeholder="Write trends here..."
                        multiline
                        rows={6}
                        fullWidth
                        variant="outlined"
                        InputProps={{
                          style: {
                            color: '#000',
                            backgroundColor: '#fff',
                          },
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '5px',
                            '& fieldset': {
                              borderColor: '#000', 
                            },
                            '&:hover fieldset': {
                              borderColor: '#000', 
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: '#000',
                              borderWidth: '2px',
                            },
                          },
                        }}
                      />
                    </Grid>
                  </Grid>

                  <Grid container alignItems="center" spacing={2}>
                    <Grid item xs={3}>
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        Insights
                      </Typography>
                    </Grid>
                    <Grid item xs={9}>
                      <TextField
                        placeholder="Write Insights here..."
                        multiline
                        rows={6}
                        fullWidth
                        variant="outlined"
                        InputProps={{
                          style: {
                            color: '#000',
                            backgroundColor: '#fff',
                          },
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '5px',
                            '& fieldset': {
                              borderColor: '#000', 
                            },
                            '&:hover fieldset': {
                              borderColor: '#000',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: '#000', 
                              borderWidth: '2px',
                            },
                          },
                        }}
                      />
                    </Grid>
                  </Grid>
                              <Grid style={{width: '100%', display: 'flex', justifyContent: 'center', marginTop: '4rem'}}>
                  <Button
                    variant="contained"
                    // fullWidth
                    style={{
                      backgroundColor: '#000000',
                      height: '3rem',
                      textTransform: 'none',
                      width: '14.25rem',
                      color: '#ffffff'
                    }}
                  >
                    Submit
                  </Button>
                </Grid>
                </Container>
              }
            </RespContent>
          </>
        }
      </Container>
    </ThemeProvider>
  );
}
