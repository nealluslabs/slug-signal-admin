import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, IconButton, Typography, Grid, Button } from '@mui/material';
// utils
import { bgBlur } from '../../../utils/cssStyles';
// components
import Iconify from '../../../components/iconify';
//
import Searchbar from './Searchbar2';
import AccountPopover from './AccountPopover';
import NotificationsPopover from './NotificationsPopover';
import Searchbar2 from './Searchbar2';
import { useSelector } from 'react-redux';
import CustomSearchBar from 'src/components/global/CustomSearchBar';
import { useLocation } from 'react-router-dom';

// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

const HEADER_MOBILE = 64;

const HEADER_DESKTOP = 92;

const StyledRoot = styled(AppBar)(({ theme }) => ({
  ...bgBlur({ color: theme.palette.background.default }),
  backgroundColor: 'white',
 
  boxShadow: 'none',
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${NAV_WIDTH + 1}px)`,
  },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: HEADER_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

// ----------------------------------------------------------------------

Header.propTypes = {
  onOpenNav: PropTypes.func,
};

export default function Header({ onOpenNav }) {
  const { user } = useSelector((state) => state.auth);
  const { loggedInFarmer } = useSelector((state) => state.group);
  const location = useLocation()

   console.log("LoggedIN Farmer is-->,",loggedInFarmer)

  return (
    <StyledRoot>
      <StyledToolbar>
        <IconButton
          onClick={onOpenNav}
          sx={{
            mr: 1,
            color: 'text.primary',
            display: { lg: 'none' },
          }}
        >
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>
        <Typography variant="h4" sx={{color: '#000000', fontSize: '36px' }}>
       <b> {
       location.pathname === '/dashboard/home'?
       'Dashboard':
       location.pathname === '/dashboard/products'?
       'Products':
       location.pathname === '/dashboard/deposits'?
       'Deposits':

       location.pathname === '/dashboard/profile'?
       'Profile':

       'Dashboard'
       }</b>
         {/* Welcome {user?.firstName + " " + user?.lastName}🖐🏽 */}
        </Typography>

        <Box sx={{ flexGrow: 1 }} />
        <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '24rem' }}>
        <CustomSearchBar  title="Search anything..."/>
      </Box>
      &nbsp; &nbsp;
      <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          style={{ minHeight: '50px', minWidth: '145px', backgroundColor: '#2DA840' }}
        >
          SEARCH
        </Button>
      </Box>
    </Grid>
        {/* <Searchbar /> */}
        {/* <Searchbar2 /> */}
        <Box sx={{ flexGrow: 1 }} />
        <Typography variant="h6" sx={{color: '#000000', fontSize: '16px' }}>
        {user && user.userType === "business"?"Hamilton & Marcus": loggedInFarmer && loggedInFarmer.lastName && loggedInFarmer.firstName? loggedInFarmer.lastName && loggedInFarmer.firstName?loggedInFarmer.firstName  + " " + loggedInFarmer.lastName:"Norman Stevens":"John Jenkins"} &nbsp;
        </Typography>
        <Stack
          direction="row"
          alignItems="center"
          spacing={{
            xs: 0.5,
            sm: 1,
          }}
        >
          {/* <NotificationsPopover /> */}
          <AccountPopover />
        </Stack>    
      </StyledToolbar>
    </StyledRoot>
  );
}
