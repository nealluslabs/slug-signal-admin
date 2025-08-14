import { Box, Typography, Avatar, Grid, TextField, Divider,FormControl, RadioGroup, FormControlLabel, Radio, Menu, MenuItem, Dialog } from "@mui/material";

//Modal
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';



// Icon
import { Close, DragHandle, MoreVert } from "@mui/icons-material";

// Image
import Image from "../../assets/images/audiowaves.jpeg";
import Pause from "../../assets/images/pausepic.png";
import Play from "../../assets/images/playpic.png";
import Sound from "../../assets/images/audiowaves.jpeg"
import placeholderPic from "../../assets/images/av.png"

// Component
import { AvatarListComponent, DialogModalComponent } from "../General";
import { parseBlob } from 'music-metadata';
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { saveAllSongsFromAPlaylist, saveCurrentSong, savePlaylistCreatorActivePlaylist, savePlaylistCreatorPlaylists } from 'src/redux/reducers/group.slice';

import { fetchSongsForOnePlaylist,deletePlaylist, fetchSongsForCurrentPlaylistToEdit, fetchAndAddSongsForAllPlaylistsToEdit, fetchCurrentlyEditingPlaylistName } from 'src/redux/actions/group.action';
import { notifySuccessFxn } from "src/utils/toast-fxn";

const style = {
    position: 'absolute',
    top: '0%',
    left: '30%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #fff',
    boxShadow: 24,
    p: 4,
    color:"white"
  };

  const inputStyle = {
    background: 'white',
    marginRight: '30px',
    width: '15rem',
    borderRadius:"0.5rem",
    
  
  };

  const inputContainer = {
    display: 'flex',
    alignItems: 'center',
    width:'100%',
  
  };


  const inputContainerBig = {
    display: 'flex',
    alignItems: 'center',
    justifyContent:'center',
    width:'100%',
   
  };



const PlaylistBoxComponent = ({ 
  show,
  file,
  fileFullDetails,
  name,
  uploadStatus,
  handleExpandIndex,
  indexToBeExpanded,
  uploadId,
  setSongstab,
  setFilestab,
  setPlayliststab,
 
  setPlaylistSongsTab,
  setSliceStart,
  setSliceEnd,
  setList, }) => {

const location = useLocation()
const dispatch = useDispatch()
const navigate = useNavigate()

const [anchorEl, setAnchorEl] = useState(null);
const {user} = useSelector((state)=>state.auth)
const { playlistCreatorPlaylists,allSongsFromAllPlaylistsToEdit} = useSelector((state)=>state.group)


const [maxChars, setMaxChars] = useState(24);

const copy = playlistCreatorPlaylists && playlistCreatorPlaylists.length?[...playlistCreatorPlaylists]:[]
console.log("IS OUR PLAYLIST CREATOR LIST EMPTY--->",playlistCreatorPlaylists)

useEffect(() => {
  // Function to update maxChars based on window width
  const updateMaxChars = () => {
    const width = window.innerWidth;
    if (width < 400) {
      setMaxChars(10); // Very small screens
    } else if (width < 600) {
      setMaxChars(13); // Small screens
    } else if (width < 1300) {
      setMaxChars(16); // Medium screens
    } else {
      setMaxChars(24); // Default
    }
  };

  updateMaxChars(); // Initial check
  window.addEventListener("resize", updateMaxChars); // Listen for resizes

  return () => {
    window.removeEventListener("resize", updateMaxChars); // Cleanup
  };
}, []);


    //const open = Boolean(anchorEl);
console.log("THIS IS WHAT WE HAVE FOR PLAYLIST COMPONENT --->",fileFullDetails)


    const handleClick = (event) => {
      event.stopPropagation()
        setAnchorEl(event.currentTarget);
        
        setOpen(true);
        //dispatch(fetchSongsForOnePlaylist(fileFullDetails && fileFullDetails.playlistId))
    };

    const handleClose = (e) => {
      e.stopPropagation()
        setAnchorEl(null);
        setOpen(false);

    };

    const handleCopyFunction =(playlistId)=>{

           // Get the current URL
  const currentUrl = window.location.origin; // Gets the base URL (e.g., http://localhost:3000 or https://example.com)

  // Append the playlistId as a parameter
  const newUrl = `${currentUrl}/playlistview/${playlistId}`;



  // Copy the new URL to the clipboard
  navigator.clipboard
    .writeText(newUrl)
    .then(() => {
      // Notify the user of success
      notifySuccessFxn("Copied to Clipboard!");
    })
    .catch((err) => {
      console.error("Failed to copy to clipboard:", err);
    });
    }


    const handleEditPlaylistFunction =(playlistId)=>{
      dispatch(fetchCurrentlyEditingPlaylistName(playlistId)).then(()=>{ 
      dispatch(fetchSongsForCurrentPlaylistToEdit(playlistId))
       })
    
    }


    const AddToEditingPlaylistsFunction =(playlist,playlistId)=>{
      const alreadyIncludedPlaylistIds = copy.map((item)=>(item.playlistId))

     if(!alreadyIncludedPlaylistIds.includes(playlistId)){ 

      dispatch(savePlaylistCreatorPlaylists([...copy,playlist]))
     }
       //making the newest playlist the active one
     dispatch(savePlaylistCreatorActivePlaylist(playlistId))
     //
      
      dispatch(fetchAndAddSongsForAllPlaylistsToEdit(playlistId,allSongsFromAllPlaylistsToEdit))
      
    
    }




    const handleOpenInNewTabFunction =(playlistId)=>{

      // Get the current URL
const currentUrl = window.location.origin; // Gets the base URL (e.g., http://localhost:3000 or https://example.com)

// Append the playlistId as a parameter
const newUrl = `${currentUrl}/playlistview/${playlistId}`;

window.open(newUrl, "_blank");


}



  
   


const [playing,setPlaying] = useState(false)
const [open, setOpen] = useState(false);
const handleOpen = () => setOpen(true);

const menuOptions = [
  { title: "Update Playlist", link: "", extra: false },
  { title: "Copy URL", link: "", extra: false },
  { title: "Open URL", link: "", extra: false },
  { title: "Delete Playlist", link: "", extra: false },
 
]



const [openModal, setOpenModal] = useState(false);

/*FOR DIALOG OPEN MODAL COMPONENT */
const handleClickOpenModal = () => {
    setOpenModal(true);

//    const targetObject = (({ file, ...rest }) => rest)(fileFullDetails);
//    console.log("TARGET OBJECT LOOK HERE --->",targetObject)
//    dispatch(saveCurrentSong(file/*targetObject*/))
};

const handleCloseModal = () => {
    setOpenModal(false);
};
/*FOR DIALOG OPEN MODAL COMPONENT*/



//useEffect(()=>{
//
//   const  runmeta = async() => {
//       // const fileInput = document.querySelector('input[type="file"]');
//       // const file = fileInput.files[0];
//        
//        try {
//            const blob = new Blob([file]);
//          const metadata = await parseBlob(file);
//          console.log("METADATA IS --->",metadata);
//        } catch (error) {
//          console.error('Error parsing metadata:', error.message);
//        }
//      };
//
//   runmeta()
//
//},[])




    return (
        <Box my={0.7} sx={{ display: "flex", alignItems: "center",  borderTop:indexToBeExpanded===0?"0.1px solid #606060":"0px",width:"100%" }}>
            {
                !show && <DragHandle />
            }

            <Box 


                onClick={()=>{
                  
                  AddToEditingPlaylistsFunction(fileFullDetails,fileFullDetails && fileFullDetails.playlistId)
                 // dispatch(fetchSongsForOnePlaylist(fileFullDetails && fileFullDetails.playlistId))
                  
                   console.log("SONGS FOR ONE PLAYLIST HAVE STARTED LOADING!")
                   setSongstab(false)
                   setFilestab(false)
                   setPlayliststab(true)
                   //setPlayliststab(false)
                   //setPlaylistSongsTab(true)  //playlist songs are now viewed while being updated as well
                   setSliceStart(0)
                   setSliceEnd(4)
                 
                   setList ([
                     { title: "Songs", active: false },
                     { title: "Playlists", active: true },
                     { title: "Albums", active: false },
                     { title: "Files", active: false }
                 ])
                 
                 
                  }}

                sx={{ 
                 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "space-between", 
                    //background: "#252328", 
                    background:"inherit",
                    borderBottom:"1px solid grey",
                    width:"100%",
                    //height:"4.5rem",
                    minWidth: "22rem",
                    padding: "7px 2px",
                    cursor:"pointer",
                }}
            >






          {   <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <Box sx={style}>
            

              <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                    'aria-labelledby': 'basic-button',
                    }}
                    sx={{ borderRadius: "6px" }}
                >
                    <Box py={0.5} px={1}>
                        { 
                            menuOptions.map( (item, i) => (
                                <MenuItem onClick={handleClose}>
                                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                        <Typography  sx={{ fontSize: "12px", fontFamily: "inter", fontWeight: "900" }}
                                                 onClick={ ()=>{  
                                                  item.title === "Update Playlist"?AddToEditingPlaylistsFunction(fileFullDetails,fileFullDetails && fileFullDetails.playlistId)//handleEditPlaylistFunction(fileFullDetails && fileFullDetails.playlistId)
                                                  :
                                                  item.title === "Copy URL"?handleCopyFunction(fileFullDetails && fileFullDetails.playlistId)
                                                        :
                                                      item.title === "Open URL"?
                                                    
                                                        handleOpenInNewTabFunction(fileFullDetails && fileFullDetails.playlistId)
                                                        :
                                                        item.title === "Delete Playlist" &&
                                                        dispatch(deletePlaylist(fileFullDetails && fileFullDetails.playlistId,user.id))
                                                    }} >
                                          { item.title }
                                                           
                                 </Typography>
                                      
                                    </Box>
                                </MenuItem>
                            ) )
                        }
                    </Box>
                </Menu>    
          
            

                 </Box>
                  </Dialog>
               }



                
                <Box

                 sx={{ display: "flex", alignItems: "center",cursor:"pointer" }}>
                   {/* <Box component="img" src={ playing?fileFullDetails.coverArtUrl && fileFullDetails.coverArtUrl:fileFullDetails.coverArtUrl? fileFullDetails.coverArtUrl:placeholderPic } 
                 
                  sx={{ width: 60, height: 50, marginRight: "14px" }} />*/}
                   <Box>

                        <Typography sx={{ fontSize: "12px", fontFamily: "inter", fontWeight: "500" }}>
                        {name && name.length<maxChars?name:name.substring(0,maxChars)+'...'}
                        </Typography>
                       {/*
                        <Typography sx={{ fontSize: 10, fontFamily: "inter" }}>
                            {uploadStatus}
                        </Typography>
                       */}
                    </Box>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center",opacity:"1",userSelect:"none" }}>
                    <Typography  sx={{ fontSize: "12px", color: "#2DCF5B", fontFamily: "inter", marginRight: "0px" }}>
                        Approved
                    </Typography>
                   {/* <AvatarListComponent />*/}
                   {<MoreVert sx={{cursor:"pointer"}} onClick={(e)=>{e.stopPropagation();handleClick(e)/*;handleExpandIndex(indexToBeExpanded)*/}} />}
                </Box>
               

            </Box>
        </Box>
    )

}

export default PlaylistBoxComponent;
