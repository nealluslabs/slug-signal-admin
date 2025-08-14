import React, { useState } from 'react';
import { Button, Box } from '@mui/material';

const CustomToggleSwitch = ({activeButton, setActiveButton, handleViewStudentsClick, handleAddStudentsClick}) => {


  return (
    <Box
      sx={{
        display: 'flex',
        borderRadius: '20px',
        overflow: 'hidden',
        padding: '4px',
        backgroundColor: '#F9F9F9',
      }}
    >
      <Button
        variant={activeButton === 'viewStudents' ? 'contained' : 'outlined'}
        style={{
          minHeight: '50px',
          minWidth: '180px',
          backgroundColor: activeButton === 'viewStudents' ? '#000000' : '#000000',
          color: activeButton === 'viewStudents' ? '#fff' : '#fff',
          border: 'none',
          borderRadius: '20px',
          marginRight: '4px',
        }}
        onClick={handleViewStudentsClick}
      >
        Filter
      </Button>
      <Button
        variant={activeButton === 'addStudents' ? 'contained' : 'outlined'}
        style={{
          minHeight: '50px',
          minWidth: '180px',
          backgroundColor: activeButton === 'addStudents' ? '#D72A34' : '#D72A34',
          color: activeButton === 'addStudents' ? '#FFF' : '#FFF',
          border: 'none',
          borderRadius: '20px',
        }}
        onClick={handleAddStudentsClick}
      >
         New Deal
      </Button>
    </Box>
  );
};

export default CustomToggleSwitch;
