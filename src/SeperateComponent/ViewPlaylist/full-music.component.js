import { Box, Typography, Avatar, Grid, TextField, Divider,FormControl, RadioGroup, FormControlLabel, Radio, Dialog, Menu,MenuItem, LinearProgress } from "@mui/material";

//Modal
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';



// Icon
import { Close, DragHandle, MoreVert } from "@mui/icons-material";

// Image
import Image from "../../assets/images/audiowaves.jpeg";
import Sound from "../../assets/images/audiowaves.jpeg"
import PauseImg from "../../assets/images/pausepic.png";
import PlayImg from "../../assets/images/playpic.png";

// Component
import { AvatarListComponent, DialogModalComponent } from "../General";
import { parseBlob } from 'music-metadata';
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import { saveCurrentSong,selectedAudioId,selectedAudioState,selectedAudio } from 'src/redux/reducers/group.slice';
import { deleteCurrentSong, setSelectedAudio, setSelectedAudioId, setSelectedAudioState } from "src/redux/actions/group.action";
import { useSelector } from "react-redux";

//aws for encryption
const AWS = require('aws-sdk');
const s3 = new AWS.S3({
  accessKeyId: process.env.REACT_APP_ACCESSKEYID,
  secretAccessKey: process.env.REACT_APP_SECRETACCESSKEY,
  region: process.env.REACT_APP_REGION,
});

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




const FullMusicComponent = ({ show,file,fileFullDetails,name,uploadStatus,handleExpandIndex,indexToBeExpanded,uploadId }) => {

const location = useLocation()
const dispatch = useDispatch() 


const {selectedAudioId,selectedAudio,selectedAudioState,progressOnSelectedAudio} = useSelector((state)=> state.group)

const [playing,setPlaying] = useState(false)
const [open, setOpen] = useState(false);
const handleOpen = () => setOpen(true);

const [openModal, setOpenModal] = useState(false);
const [anchorEl, setAnchorEl] = useState(null);


const menuOptions = [
  { title: "Download", link: "", extra: false },
  
]


const [maxChars, setMaxChars] = useState(24);


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


const handleDownload = (fileUrl,fileName) => {
    
   
  const params = {
    Bucket: process.env.REACT_APP_S3_BUCKET,
    Key: fileName,
    Expires: 60 // URL expires in 60 seconds
  };

  const url = s3.getSignedUrl('getObject', params);





    // Create a temporary anchor element
    const link = document.createElement("a");
    link.href = url; // External file URL after it has been encrypted --see above method  s3.getSignedUrl
    link.target = "_blank"; // Open in a new tab if needed
   link.rel = "noopener noreferrer"; // Security for external links
    link.download = fileName || "download"; // Set the file name for download
    document.body.appendChild(link); // Append the link to the body
    link.click(); // Trigger the download
    document.body.removeChild(link); // Clean up
  };


/*FOR DIALOG OPEN MODAL COMPONENT */

const handleClick = (event) => {
  event.stopPropagation()
  setAnchorEl(event.currentTarget);
  
  setOpen(true);
  //dispatch(fetchSongsForOnePlaylist(fileFullDetails && fileFullDetails.playlistId))
};


const [play,setPlay] = useState(false)
/*PLAYING AUDIO FROM INDIVIDUAL COMPONENT - START */
  
useEffect(()=>{
    
    if(fileFullDetails.uploadId !== selectedAudioId ){
      setPlay(false)
      //audioRef.current.pause()
    }

    if(fileFullDetails.uploadId === selectedAudioId ){
 //     dispatch(setSelectedAudio(fileFullDetails && fileFullDetails.mediaUrl?fileFullDetails.mediaUrl:fileFullDetails && fileFullDetails.mediaTemporaryUrl ))
 //     dispatch(setSelectedAudioState(true))
      
 
            setPlay(selectedAudioState) //this is temporary logic to continue to show the play icon when we switch from one page to another
   
    }



   },[selectedAudioId,selectedAudioState])



   const playAudio = () => {
    
 
    setPlay(!play)

    if(fileFullDetails.uploadId === selectedAudioId ){dispatch(setSelectedAudioState(!selectedAudioState))}
  
    if(fileFullDetails.uploadId !== selectedAudioId ){  
    dispatch(setSelectedAudioId(fileFullDetails && fileFullDetails.uploadId))
   dispatch(setSelectedAudio(fileFullDetails && fileFullDetails.mediaUrl?fileFullDetails.mediaUrl:fileFullDetails && fileFullDetails.mediaTemporaryUrl ))
   dispatch(setSelectedAudioState(true))
    }

    
 
};

/*PLAYING AUDIO FROM INDIVIDUAL COMPONENT - END*/
const handleClose = (e) => {
e.stopPropagation()
  setAnchorEl(null);
  setOpen(false);

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
        <Box my={0.7} sx={{ display: "flex", alignItems: "center" }}>
            {
                !show && <DragHandle />
            }

            <Box 
                sx={{ 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "space-between", 
                    background: "#252328", 
                    width:"100%",
                    height:"4.5rem",
                   
                    padding: "4px 2px"
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
                                        <Typography  
                                                 onClick={ ()=>{item.title === "Download"?handleDownload(fileFullDetails.mediaUrl,fileFullDetails &&fileFullDetails.name ):
                                                    console.log("not download")
                                                    }} >
                                          {item.title}
                                         {/*<a  style={{textDecoration:"none",color:"white"}} href={`${fileFullDetails.mediaUrl}`} download={`${fileFullDetails.mediaUrl}`}>Download</a>*/}
                                                           
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


                
                <Box sx={{ display: "flex", alignItems: "center" }} onClick={(e)=>{e.stopPropagation();playAudio()}}>
                   {/* <Box component="img" src={ playing?fileFullDetails.coverArtUrl && fileFullDetails.coverArtUrl:fileFullDetails.coverArtUrl? fileFullDetails.coverArtUrl:placeholderPic } onClick={()=>{setPlaying(!playing)}} sx={{ width: 60, height: 50, marginRight: "14px" }} />*/}
                   

                    <Box
                     component="div"
                     sx={{
                       width: 60,
                       height: 50,
                       marginRight: "14px",
                       position: "relative",
                       backgroundImage: `url(${PlayImg})`,
                       backgroundSize: "cover",
                       backgroundPosition: "center",
                       
                      
                       "&::after": {
                         content: '""',
                         position: "absolute",
                         top: 0,
                         left: 0,
                         right: 0,
                         bottom: 0,
                         backgroundImage: `url(${fileFullDetails.coverArtUrl ?fileFullDetails.coverArtUrl:fileFullDetails.coverArtUrl? fileFullDetails.coverArtUrl:Sound})`,
                         backgroundSize: "cover",
                         backgroundRepeat: "no-repeat",
                         backgroundPosition: "center",
                         opacity:play && fileFullDetails.uploadId === selectedAudioId? 0.5:1, // Adjust transparency of the background image
                         zIndex: 100,
                       },
                     }}
                    />  
                   
                   
                   
                    <Box>
                        <Typography sx={{ fontSize: 14, fontFamily: "inter", fontWeight: "900" }}>
                        {name && name.length<maxChars?name:name.substring(0,maxChars)+'...'}
                        </Typography>
                        <Typography sx={{ fontSize: 10, fontFamily: "inter" }}>
                            {uploadStatus}
                        </Typography>
                    </Box>
   
                </Box>

                   <Box sx={{ width: "100%", ml: 2,position:"relative",left:"1rem" }}>
                               <LinearProgress
                                 variant="determinate"
                                 value={selectedAudioId === fileFullDetails.uploadId && progressOnSelectedAudio?progressOnSelectedAudio:0}
                                 sx={{
                                   height: 10,
                                   borderRadius: 5,
                                   "& .MuiLinearProgress-bar": {
                                     backgroundColor: "#A01565", // Customize progress color
                                   },
                                   backgroundColor: "#444", // Background color
                                 }}
                               />
                             </Box>

                <Box sx={{ display: "flex", alignItems: "center",opacity:"0",userSelect:"none" }}>
                    <Typography  sx={{ fontSize: 12, color: "#2DCF5B", fontFamily: "inter", marginRight: "8px" }}>
                        Approved
                    </Typography>
                    <AvatarListComponent />
                   
                </Box>
                {<MoreVert sx={{cursor:"pointer"}} onClick={(e)=>{e.stopPropagation();handleClick(e)/*;handleExpandIndex(indexToBeExpanded)*/}} />}

            </Box>
        </Box>
    )

}

export default FullMusicComponent;
