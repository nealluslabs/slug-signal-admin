
import { 
    styled, InputBase,
    Popover,
    DialogContent,
    Select,
    MenuItem,
    InputAdornment,
    FormControl,
    Box,
    Typography,
   
  } from "@mui/material";

  import {makeStyles} from "@mui/styles";


 // import {
 //   Popover,
 //   DialogContent,
 //   Select,
 //   MenuItem,
 //   InputAdornment,
 //   FormControl,
 //   Box,
 //   Typography,
 //   makeStyles
 // } from '@material-ui/core';


  import { Search,Filter, Filter1, FilterList } from "@mui/icons-material"
import { savePlaylistSearchTerm, saveSongSearchTerm,saveFileSearchTerm } from "src/redux/reducers/group.slice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import FilterDialog from "./Modal/FilterDialog.component";
import { useState } from "react";



const SearchBox = styled("div")(({ theme }) => ({
    backgroundColor: "transparent", // Completely transparent background
    
    borderBottom: "1px solid gray", // Optional: Add a subtle border
    borderRadius:"0px" /*theme.shape.borderRadius*/,
    width: "100%",
    display: "flex",
    alignItems: "center",
    padding: "5px 10px", // Inner padding
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Optional: Subtle shadow
    marginBottom:"-16px"
  }));
  
  const SearchInput = styled(InputBase)(({ theme }) => ({
    flex: 1,
    fontSize:"13px",
    fontStyle: "italic", 
    marginLeft: theme.spacing(1),
    "& .MuiInputBase-input": {
      padding: "5px 0",
      color: "gray", // Dark text for input
      fontStyle: "italic", 
    },
  }));
  
  const SearchIconWrapper = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "gray", // Icon color
    padding: theme.spacing(0, 1),
    cursor:"pointer"
  }));


  const useStyles = makeStyles((theme) => ({
    dialogPaper: {
      backgroundColor: '#252328',
      background:"#272229",
      border:"0.5px solid #606060",
      borderRadius: 10,
      border:"0.5px solid gray",
      width: 300,
    },
    contentBox: {
      display: 'flex',
      flexDirection: 'column',
      // /height: '10rem',
      justifyContent: 'flex-start',
      gap: theme.spacing(2),
    },
    label: {
      color: '#fff',
      fontSize: '1rem',
    },
    selectRooty: {
      backgroundColor: 'white',
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
      width: '100%',
    },
  }));





const SearchBarComponent = () => {

  const dispatch = useDispatch()

 const [openModal, setOpenModal] = useState(false);

  const handleCloseModal = () => {
    setOpenModal(false);
    };

    const classes = useStyles();
    const [filterType, setFilterType] = useState("Audio Files");
    const [anchorEl, setAnchorEl] = useState(null);
  
    const handleChange = (event) => {
      setFilterType(event.target.value);
    };
  
    // When the anchor element is clicked, store it
    const handleAnchorClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    // Close the popover and trigger any additional onClose logic
    const handlePopoverClose = () => {
      setAnchorEl(null);
     // if (onClose) onClose();
      setOpenModal(false);
    };
  
    const openPopover = Boolean(anchorEl);
    

  const { 
    songSearchTerm,
    playlistSearchTerm,
    fileSearchTerm,
    playlistSearchInFocus,
    fileSearchInFocus,
    songSearchInFocus,
    } = useSelector((state)=> state.group)

    return (
        <>

          {/*<FilterDialog open={openModal} onClose={handleCloseModal} />*/}




      <Popover
        open={openPopover}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        PaperProps={{
          className: classes.dialogPaper,
        }}
      >
        <DialogContent>
          <Box className={classes.contentBox}>
            <Typography variant="h6" className={classes.label}>
              Filter By
            </Typography>

            <FormControl fullWidth>
              <Select
                labelId="filter-label"
                value={filterType}
                onChange={handleChange}
                sx={{
                  width: '20%',
                  height: '2rem',
                  fontSize: '13px',
                  fontFamily: 'inter',
                  background: 'white',
                  position: 'relative',
                }}
                InputProps={{ style: { backgroundColor: 'white', color: 'black' } }}
                classes={{ root: classes.selectRooty }}
                endAdornment={
                  <InputAdornment position="end">
                    {/* You can add an icon here */}
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
      </Popover>


            <SearchBox>
            <SearchIconWrapper >
                    <FilterList  onClick={handleAnchorClick}/>
                </SearchIconWrapper>
                <SearchInput onChange={(e)=>{
                 
                 if(songSearchInFocus){

                 dispatch(saveSongSearchTerm(e.target.value))
                   }

                   else if(fileSearchInFocus) {

                    dispatch(saveFileSearchTerm(e.target.value))
  
                   }

                 else if(playlistSearchInFocus) {

                  dispatch(savePlaylistSearchTerm(e.target.value))

                 }
                  
                  
                  }} placeholder="search or filter files..." />
              
            </SearchBox>
        </>
    )
}

export default SearchBarComponent;
