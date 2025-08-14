
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
    InputLabel,
   
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
import { useRef, useState } from "react";



const SearchBox = styled("div")(({ theme }) => ({
    backgroundColor: "transparent", // Completely white background
    borderBottom: "1px solid gray", // Optional: Add a subtle border
    borderRadius:"0px" /*theme.shape.borderRadius*/,
    width: "100%",
    display: "flex",
    alignItems: "center",
    padding: "5px 10px", // Inner padding
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Optional: Subtle shadow
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
      //backgroundColor: '#252328',
     // backgroundColor:"#272229",
     background:"#272229",
      border:"0.5px solid #606060",
      borderRadius: 10,
      width: 500,
      height:400
    },
    dialogPaper2: {
      //backgroundColor: '#252328',
      //backgroundColor:"#272229",
      background:"#272229",
      border:"0.5px solid #606060",
      borderRadius: 10,
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
      fontSize: '1.2rem',
      paddingBottom:"10px",
      //borderBottom:"2px solid #fff"
    },

    applyFilter: {
      color: 'gray',
      fontSize: '0.95rem',
      fontFamily:"inter",
      fontWeight:"400",
      paddingBottom:"10px",
      //borderBottom:"2px solid #fff"
    },
    selectRooty: {
      backgroundColor: 'white',
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
      width: '100%',
    },
  }));





const SearchSongsComponent = () => {

  const dispatch = useDispatch()

 const [openModal, setOpenModal] = useState(false);

 const [openModal2, setOpenModal2] = useState(false);

 const selectLabels = [
  'Tempo [1]',
  'Lyrics',
  'BPM',
  'Vocals',
  'Genre',
  'Mood [4]',
  'Instruments',
];

  const handleCloseModal = () => {
    setOpenModal(false);
    };

    const classes = useStyles();
    const [filterType, setFilterType] = useState('Audio Files');
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorEl2, setAnchorEl2] = useState(null);

    const customAnchorRef = useRef(null);


    const [selections, setSelections] = useState({});
  
    const handleChange = (event) => {
      setFilterType(event.target.value);
    };

    const handleChange2 = (label) => (event) => {
      setSelections({ ...selections, [label]: event.target.value });
    };
  
    // When the anchor element is clicked, store it
    const handleAnchorClick = (event) => {
      //setAnchorEl(event.currentTarget);
      setAnchorEl(customAnchorRef.current);
    };


    // When the anchor element is clicked, store it
    const handleAnchorClick2 = (event) => {
      setAnchorEl2(event.currentTarget);
    };
  
    // Close the popover and trigger any additional onClose logic
    const handlePopoverClose = () => {
      setAnchorEl(null);
     // if (onClose) onClose();
      setOpenModal(false);
    };


    const handlePopoverClose2 = () => {
      setAnchorEl2(null);
     // if (onClose) onClose();
      setOpenModal2(false);
    };
  
    const openPopover = Boolean(anchorEl);
    const openPopover2 = Boolean(anchorEl2);
    

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


        {/*THE POPVER INSIDE THE POPOVER, THE SECOND ONE */}
          <Popover
        open={openPopover2}
        anchorEl={anchorEl2}
        onClose={handlePopoverClose2}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        PaperProps={{
          className: classes.dialogPaper2,
        }}
      >
        <DialogContent>
          <Box className={classes.contentBox}>
            <Typography variant="h6" className={classes.label}>
              Filter by
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



      {/**THE FIRST LEVEL POPOVER */}
      <Popover
      style={{scale:"0.75", transform: 'translateX(240px)'}}
        open={openPopover}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
      
        anchorOrigin={{
          vertical: 'top',
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
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid white"}}>
            <Typography variant="h6" className={classes.label}>
              Filter By
            </Typography>

            <Typography variant="p" className={classes.applyFilter}>
              Apply Filters | Clear All Filters
            </Typography>
            </div>
           {/*
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
                  
                  </InputAdornment>
                }
              >
                <MenuItem value="Audio Files">Audio Files</MenuItem>
                <MenuItem value="Images">Images</MenuItem>
                <MenuItem value="Documents">Documents</MenuItem>
              </Select>
            </FormControl>
              </>*/}



       <Box
            display="flex"
            flexWrap="wrap"
            gap={2}
            sx={{ rowGap: 2, columnGap: 2 }}
          >
            {selectLabels.map((label) => (
              <FormControl onClick={handleAnchorClick2}
                key={label}
                variant="outlined"
                size="small"
                sx={{
                  borderRadius:"0.3rem",
                  minWidth: '7rem',
                  width: 'max-content',
                  backgroundColor: '#fff',
                  '& .MuiSelect-select': {
                    color: 'grey',
                    paddingRight: '32px',
                  },
                  '& .MuiInputLabel-root': {
                    color: 'grey',
                    fontSize: '13px',
                  },
                  '& .MuiSvgIcon-root': {
                    color: 'grey',
                  },
                }}
              >
                <InputLabel>{label}</InputLabel>
                {/*
                <Select
                  value={selections[label] || ''}
                  onChange={handleChange2(label)}
                  label={label}
                  open={false}
                >
                  <MenuItem value="">None</MenuItem>
                  <MenuItem value="Option 1">Option 1</MenuItem>
                  <MenuItem value="Option 2">Option 2</MenuItem>
                 </Select>
                 */}


                 
            <FormControl fullWidth>
              <Select
                labelId="filter-label"
                value={""}
                onChange={handleChange2}
                open={false}
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
                  
                  </InputAdornment>
                }
              >
                <MenuItem value="Audio Files">Audio Files</MenuItem>
                <MenuItem value="Images">Images</MenuItem>
                <MenuItem value="Documents">Documents</MenuItem>
              </Select>
            </FormControl>
              
              </FormControl>
            ))}
          </Box>
        </Box>



          
        </DialogContent>
      </Popover>


            <SearchBox>
            <SearchIconWrapper >
              <p ref={customAnchorRef} style={{position:"absolute",left:"-120px",top:"0px",opacity:"0",cursor:"none",color:"transparent"}}>hullo</p>
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
                  
                  
                  }} placeholder="search or filter songs..." />
              
            </SearchBox>
        </>
    )
}

export default SearchSongsComponent;
