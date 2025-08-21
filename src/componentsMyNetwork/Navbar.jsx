import React, { useState } from 'react';
import { Box, Typography, Toolbar, styled } from '@mui/material';
import { FaPowerOff } from 'react-icons/fa6';
import { HiMenu } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearUser } from 'src/redux/reducers/auth.slice';
import { notifySuccessFxn } from 'src/utils/toast-fxn';
import { MdOutlineDashboard } from "react-icons/md";
import { AiOutlineRead } from "react-icons/ai";
import { AiTwotoneFolderOpen } from "react-icons/ai";
import { CiSettings } from "react-icons/ci";
import { TbLetterS } from "react-icons/tb";
import { IoAnalytics } from "react-icons/io5";


const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
  // background: 'black',
  position: 'relative',
  alignItems: 'flex-start',
  color: 'white',
});

const Navbar = ({ active }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenMobileNav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile toggle button */}

      <Box
        sx={{
          display: { xs: 'block', lg: 'none' }, // Show only on mobile
          position: 'fixed',
          top: 16,
          left: 16,
          zIndex: 1300,
          cursor: 'pointer',
          backgroundColor: isOpen ? '#000' : '',
          padding: '8px',
          borderRadius: '4px',
          // boxShadow: 3,
        }}
        onClick={handleOpenMobileNav}
      >
        {isOpen ? (
          <Typography color="white" fontWeight="bold" fontSize="20px">
            ✕
          </Typography>
        ) : (
          <HiMenu size={24} color="black" />
        )}
      </Box>


      {/* Sidebar */}
      <Box
        position="sticky"
        sx={{
          width: { lg: 'calc(100% - 84%)', sm: '150px' },
          height: '100vh',
          backgroundColor: 'black',
          borderRight: '0.5px solid grey',
          color: 'white',
          display: { xs: isOpen ? 'flex' : 'none', md: 'flex' },
          flexDirection: 'column',
          alignItems: 'start',
          justifyContent: 'flex-start',
          // paddingHorizontal: 102,
          paddingTop: 4,
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 1000,
          transition: 'all 0.3s ease',
        }}
      >
        {/* Close button */}
        {isOpen && (
          <Box
            sx={{
              display: { sm: 'flex', xl: 'none' },
              alignSelf: 'flex-end',
              cursor: 'pointer',
              mb: 2,
            }}
            onClick={handleOpenMobileNav}
          >
            {/* <Typography color="white">✕</Typography> */}
          </Box>
        )}

        <StyledToolbar>
          <Box
            sx={{
              //  width: 'calc(100% - 85%)',
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              // backgroundColor: 'black',
              // color: 'white',
              marginTop: '20px',
            }}
          >
           {/* Logo / Title */}
            <Box
              sx={{ display: 'flex', justifyContent:'center', alignItems: 'center', cursor: 'pointer', marginBottom: '20px',
                // backgroundColor: 'green',
              }}
              onClick={() => {
                navigate('/home');
                setIsOpen(false);
              }}
            >
              <img src="/assets/av.png" alt="company logo" style={{ height: 55, width: 55, borderRadius: '1rem' }} />
              {/* <TbLetterS size={30} /> */}

              {/* <Typography
                variant="h7"
                sx={{
                  display: { xs: 'none', sm: 'inline' },
                  fontWeight: 'bold',
                  width: '100%',
                   cursor: 'pointer',
                  // marginBottom: '80px',
                }}
              >
                SLUG SIGNAL
              </Typography> */}
            </Box>

            {/* Navigation Items */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <NavItem
                active={active === 'Dashboard menu'}
                onClick={() => {
                  navigate('');
                  setIsOpen(false);
                }}
                label="Dashboard"
                icon={<AiTwotoneFolderOpen />}
              />
              <NavItem
                active={active === 'users'}
                onClick={() => {
                  navigate('/users');
                  setIsOpen(false);
                }}
                label="Users"
                icon={<MdOutlineDashboard/>}
              />
              <NavItem
                active={active === 'dashboard'}
                onClick={() => {
                  navigate('/all-signals');
                  setIsOpen(false);
                }}
                label="All Signals"
                icon={<AiOutlineRead />}
              />
              {/* <NavItem
                active={active === 'my-campaign'}
                onClick={() => {
                  navigate('/my-campaign');
                  setIsOpen(false);
                }}
                label="Analysis"
                icon={<IoAnalytics />}
              /> */}
              <NavItem
                active={active === 'settings'}
                onClick={() => {
                  navigate('/settings');
                  setIsOpen(false);
                }}
                label="Settings"
                icon={<CiSettings />}
              />
            </Box>

            {/* Logout */}
            {/* <Box mt={2}>
              <NavItem
                active={false}
                onClick={() => {
                  dispatch(clearUser());
                  navigate('/login');
                  notifySuccessFxn('Logged Out!');
                  setIsOpen(false);
                }}
                label="Log out"
                icon={<FaPowerOff />}
                overrideStyles={{
                  position: 'relative',
                }}
              />
            </Box> */}
          </Box>
        </StyledToolbar>
      </Box>
    </>
  );
};

const NavItem = ({ onClick, label, icon, active, overrideStyles = {} }) => {
  return (
<Box
  onClick={onClick}
  sx={{
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    borderRadius: '8px',
    width: '100%',
    padding: '8px 12px', 
    boxSizing: 'border-box',
    transition: 'all 0.3s ease',
    backgroundColor: active ? '#D3D3D355' : 'transparent',
    '&:hover': {
      backgroundColor: active ? '#D3D3D355' : '#D3D3D325',
    },
    ...overrideStyles,
  }}
>
  {icon}
  <Typography sx={{ ml: 2 }}>{label}</Typography> 
</Box>
  );
};

export default Navbar;
