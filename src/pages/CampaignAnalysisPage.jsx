import {
  createTheme,
  Container,
  ThemeProvider,
  Input,
  Button,
  Typography,
  Grid,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
//import { fetchCandidateData } from 'src/redux/actions/auth.action';
// @mui
import { useTheme, styled } from '@mui/material/styles';

import { ToastContainer } from 'react-toastify';

import Navbar from 'src/componentsMyNetwork/Navbar';
import Header from 'src/layouts/dashboard/header';
import { getCampaigns, getSingleCampagin, addCampagin } from 'src/redux/actions/campaign.action';
import FarmerStatsLong from 'src/components/home/farmer-stats-long';

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

export default function MyCampaign() {
  const theme = useTheme();
  // const classes = useStyles()
  const [mode, setMode] = useState('dark');
  const dispatch = useDispatch();

  const darkTheme = createTheme({
    palette: {
      mode: mode,
      background: {
        default: '#FFF',
      },
    },
  });
  const navigate = useNavigate();

  const [campaignInput, setCampaignInput] = useState('');
  const [uploadLoading, setUploadLoading] = useState(false);

  const handleAddCampaign = () => {
    if (!campaignInput.trim()) return alert('Campaign title is required');
    setUploadLoading(true);

    const campaignData = {
      title: campaignInput,
      description: 'Auto-generated',
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
    };

    dispatch(addCampagin(campaignData, setUploadLoading, () => setCampaignInput('')));
  };

  const [open, setOpen] = useState(false);
  useEffect(() => {
    dispatch(getCampaigns());
  }, []);

  const { campaigns } = useSelector((state) => state.campaign);
  console.log('Campaigns========>>>>>>>>>>>>> ', campaigns);
  const pastCampaigns = campaigns || [];

  return (
    <ThemeProvider theme={darkTheme}>
      <Navbar active="my-campaign" />
      {/*<Header onOpenNav={() => setOpen(true)} />*/}
      <Container maxWidth="xl" sx={{ marginTop: '5%', backgroundColor: '#F8F8F8' }}>
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
              style={{ display: 'flex', marginLeft: '8%', width: 'calc(100% - 15%)', marginTop: '2%', gap: '3rem' }}
            >
              {
                <Container
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    flex: 1,
                    paddingBottom: '1.5rem',
                    marginTop: '2%',
                    marginBottom: '2%',
                    borderRadius: '15px',
                    backgroundColor: '#FFFFFF',
                    fontFamily: 'Poppins',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      paddingTop: '20px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-start',
                    }}
                  >
                    {/* <div
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', padding: '0.8rem', fontFamily: 'poopins' }}
                    >
                      <Typography variant="h4" sx={{color: '#000000', fontSize: '40px' }}>
                        <b style={{fontFamily: 'poopins', }}>Campaign Analysis</b>
                      </Typography>
                    </div> */}
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        marginTop: '1rem',
                        display: 'flex',
                        flexDirection: 'column',
                        backgroundColor: '#ffffff',
                      }}
                    >
                      <h2
                        style={{
                          fontSize: '1.5rem',
                          padding: '0.8rem',
                          marginTop: '1rem',
                          fontWeight: 700,
                          fontFamily: 'poppins',
                        }}
                      >
                        Campaign Name
                      </h2>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-around',
                          alignItems: 'center',
                          padding: '0.8rem',
                          // gap: '1.4rem',
                          fontFamily: 'poppins',
                        }}
                      >
                        <Input
                          value={campaignInput}
                          onChange={(e) => setCampaignInput(e.target.value)}
                          style={{
                            width: '70%',
                            height: '2.91rem',
                            border: '1px solid #000000',
                            color: '#000000',
                            fontSize: '1.2rem',
                            padding: '0.5rem',
                            fontFamily: 'poppins',
                          }}
                        />

                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handleAddCampaign}
                          disabled={uploadLoading}
                          style={{
                            backgroundColor: '#000000',
                            color: 'white',
                            textTransform: 'none',
                            height: '2.91rem',
                            width: '15%',
                          }}
                        >
                          <p
                            style={{
                              fontSize: '1.2rem',
                              fontWeight: 600,
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.5rem',
                              fontFamily: 'poppins',
                            }}
                          >
                            {uploadLoading ? 'Uploading...' : 'UPLOAD'}
                          </p>
                        </Button>
                      </div>
                    </div>

                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        marginTop: '2rem',
                        display: 'flex',
                        flexDirection: 'column',
                        backgroundColor: '#ffffff',
                      }}
                    >
                      <h2
                        style={{
                          fontSize: '1.5rem',
                          padding: '0.8rem',
                          marginTop: '1rem',
                          fontWeight: 700,
                          fontFamily: 'poppins',
                        }}
                      >
                        Past Campaigns
                      </h2>

                      {
                        <Grid item xs={12} md={12} lg={12}>
                          <div
                            style={{
                              background: 'white',
                              padding: '10px',
                              paddingLeft: '0',
                              paddingRight: '0',
                              marginTop: '0rem',
                              width: '100%',
                              borderWidth: 0,
                            }}
                          >
                            {pastCampaigns.length > 0 ? (
                              <FarmerStatsLong farmers={pastCampaigns} />
                            ) : (
                              <center style={{ marginTop: '6rem' }}>No Campaigns To Display</center>
                            )}
                          </div>
                        </Grid>
                      }

                      {/*
                      <TableContainer
                        component={Paper}
                        style={{ marginTop: '1rem', backgroundColor: '#ffffff', color: '#000000' }}
                      >
                        <Table>
                          <TableHead>
                            <TableRow style={{ color: '#000000', border: '1px solid #000000' }}>
                              <TableCell
                                style={{
                                  color: '#000000',
                                  border: '1px solid #000000',
                                  fontSize: '1.3rem',
                                  fontWeight: 400,
                                  fontFamily: 'poopins',
                                }}
                              >
                                <b>Campaign Name</b>
                              </TableCell>
                              <TableCell
                                style={{
                                  color: '#000000',
                                  border: '1px solid #000000',
                                  fontSize: '1.3rem',
                                  fontWeight: 400,
                                  fontFamily: 'poopins',
                                }}
                              >
                                <b>Date</b>
                              </TableCell>
                              <TableCell
                                style={{
                                  color: '#000000',
                                  border: '1px solid #000000',
                                  fontSize: '1.3rem',
                                  fontWeight: 400,
                                  fontFamily: 'poopins',
                                }}
                              >
                                <b>Analysis</b>
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {pastCampaigns.map((campaign, index) => (
                              <TableRow key={index} style={{ border: '1px solid #000000', fontFamily: 'poopins' }}>
                                <TableCell style={{ color: '#000000' }}>{campaign.title}</TableCell>
                                <TableCell style={{ color: '#000000' }}>
                                  {campaign.startDate ? new Date(campaign.startDate).toLocaleDateString('en-GB') : ''}
                                </TableCell>
                                <TableCell style={{ color: '#000000' }}>
                                  <Button variant="text" style={{ textTransform: 'none', color: '#000' }}>
                                   
                                    View Analysis
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                          */}
                    </div>
                  </div>
                </Container>
              }
            </RespContent>
          </>
        }
      </Container>
    </ThemeProvider>
  );
}
