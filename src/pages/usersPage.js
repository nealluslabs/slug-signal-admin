import Sidebar from '../componentsMyNetwork/Sidebar';
import Feed from '../componentsMyNetwork/Feed';
import Rightbar from '../componentsMyNetwork/Rightbar';
import { Box, createTheme, Stack, ThemeProvider } from '@mui/material';
import Navbar from '../componentsMyNetwork/Navbar';
import Add from '../componentsMyNetwork/Add';
import { useState, useEffect } from 'react';

// Components
import { DashboardSidebar, DashboardFeedComponent, DashboardRightbarComponent } from 'src/SeperateComponent/Dashboard';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ScreenSearchComponent from 'src/componentsMyNetwork/screenSearchComponent';
import DisplayCard from 'src/componentsMyNetwork/displayCard';
import UserDisplayCard from 'src/componentsMyNetwork/UserDisplayCard';
import UserStatsTable from 'src/components/home/user-stats-table';
import { fetchAllUsers } from 'src/redux/actions/user.action';

function UsersPage() {
  const [mode, setMode] = useState('dark');

  const darkTheme = createTheme({
    palette: {
      mode: mode,
      background: {
        default: '#FFF', // Page background
      },
    },
  });
  const { allUsers, isLoading, error } = useSelector((state) => state.user);

  const [fetchedUsers, setFetchedUsers] = useState(allUsers);

  const user = useSelector((state) => state.auth);
  console.log(' LOGGED IN USER IS -->', user);
  const navigate = useNavigate();
  useEffect(() => {
    if (user && !user.user) {
      navigate('/login');
    }
  }, []);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllUsers());
    setFetchedUsers(allUsers);
  }, []);
  console.log('Fetching all users========>>>>>>>', allUsers);

  const dummyData = [
    { id: 1, firstName: 'Alice', lastName: 'Johnson', email: 'alice.johnson@example.com', accountCreated: '2024-01-15' },
    { id: 2, firstName: 'Bob', lastName: 'Smith', email: 'bob.smith@example.com', accountCreated: '2024-02-03' },
    { id: 3, firstName: 'Charlie', lastName: 'Davis', email: 'charlie.davis@example.com', accountCreated: '2024-03-22' },
    { id: 4, firstName: 'Diana', lastName: 'Prince', email: 'diana.prince@example.com', accountCreated: '2025-04-10' },
    { id: 5, firstName: 'Ethan', lastName: 'Clark', email: 'ethan.clark@example.com', accountCreated: '2025-05-27' },
  ];

    const users = allUsers && allUsers.length > 0 ? allUsers : dummyData;


  // console.log('Fetched All Users ===========>>>>>>>>>>', allUsers);

  return (
    <ThemeProvider theme={darkTheme}>
      <Box bgcolor={'background.default'} sx={{ height: '100vh', marginLeft: '11%', width: 'calc(100% - 15%)' }}>
        <Navbar active="users" />

        <ScreenSearchComponent title="Users" />
        {/* <FarmerStatsLong farmers={pastCampaigns} /> */}

        <Box
          mx="88px"
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 2,
          }}
        >
          {/* <UserDisplayCard /> */}
          {/* <UserDisplayCard user={user} /> */}
          {/* <UserStatsTable user={dummyUsers.map((users)=>(
            {users}
          ))} /> */}

          <UserStatsTable
            user={users.map((u) => ({
              id: u.id,
              firstName: u.firstName,
              lastName: u.lastName,
              email: u.email,
              accountCreated: u.accountCreated || 'Monday, July 28, 2025',
            }))}
          />
        </Box>

        {/* <Add /> */}
      </Box>
    </ThemeProvider>
  );
}

export default UsersPage;
