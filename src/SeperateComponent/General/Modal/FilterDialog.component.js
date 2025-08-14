import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  Select,
  MenuItem,
  InputAdornment,
  FormControl,
  InputLabel,
  Box,
  Typography,
  makeStyles
} from '@material-ui/core';
//import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const useStyles = makeStyles((theme) => ({
  dialogPaper: {
    backgroundColor: '#252328',
    borderRadius: 10,
    width: 300,
  },
  contentBox: {
    display: 'flex',
    flexDirection: 'column',
   
    height:"10rem",
    justifyContent: 'flex-start',
    gap: theme.spacing(2),
  },
  label: {
    color: '#fff',
    fontSize:"1rem"
  },
  selectRooty: {
    backgroundColor: '#fff',
    backgroundColor: 'white',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    width: '100%',
  },
}));

export default function FilterDialog({ open, onClose }) {
  const classes = useStyles();
  const [filterType, setFilterType] = useState('Audio Files');
  const [anchorEl,setAnchorEl] = useState(null);

  const handleChange = (event) => {
    setFilterType(event.target.value);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    //setOpen(true)
    };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      classes={{ paper: classes.dialogPaper }}
      onClick={handleClick}
    >
      <DialogContent>
        <Box className={classes.contentBox}>
          <Typography variant="h6" className={classes.label}>
            Filter By
          </Typography>

          <FormControl fullWidth>
            {/*<InputLabel id="filter-label">Select Type</InputLabel>*/}
            <Select
              labelId="filter-label"
              value={filterType}
              onChange={handleChange}
              sx={{
                width: "20%",
                height:"2rem",
                fontSize: "13px",
                fontFamily: "inter",
                background: "white",
                position:"relative",
               
              }}
              InputProps={{ style:{backgroundColor:"white",color:"black"}}}
              classes={{ root: classes.selectRooty }}
              endAdornment={
                <InputAdornment position="end">
                  {/*<ArrowDropDownIcon />*/}
                </InputAdornment>
              }
            >
              <MenuItem value="Audio Files">Audio Files</MenuItem>
              <MenuItem value="Images">Images</MenuItem>
              <MenuItem value="Documents">Documents</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
