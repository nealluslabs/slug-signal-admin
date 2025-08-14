import { Box, Typography, Avatar, Menu, MenuItem, Dialog } from "@mui/material";

// Icon
import { Close, DragHandle, MoreVert,Delete } from "@mui/icons-material";


// Image
import Image from "../../assets/images/uploading.gif";

// Component
import { AvatarListComponent } from "../General";
import { parseBlob } from 'music-metadata';
import { useEffect,useState } from "react";
import { saveCurrentSong } from "src/redux/reducers/group.slice";
import { deleteCurrentSong, setSelectedAudio, setSelectedAudioId, setSelectedAudioState } from "src/redux/actions/group.action";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
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

const NewMusicComponent = ({ show,file,fileFullDetails,name,uploadStatus,removeFile,indexToBeRemoved,fileToDelete }) => {
  
    const {newlyUploadedPlaylist,currentSong,
        newlyUploadedFiles,currentCoverArt,
        allPlaylists,selectedAudio,selectedAudioId,
        selectedAudioState,} = useSelector((state)=> state.group)

const dispatch = useDispatch()

const menuOptions = [
    { title: "Edit File", link: "", extra: false },
    { title: "Delete File", link: "", extra: false },
  ]

  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
const [loadingSubmit,setLoadingSubmit] = useState(false) //this setLoadingSubmit is for me(Dagogo) to pass into deleteCurrentSOng below, and to show loading, in the uploadStatus variable , while the song gets deleted

    const handleClick = (event) => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
        
        setOpen(true);
        //dispatch(fetchSongsForOnePlaylist(fileFullDetails && fileFullDetails.playlistId))
    };

    const handleClose = (e) => {
      e.stopPropagation()
        setAnchorEl(null);
        setOpen(false);

    };


console.log("NEW MUSIC COMPONENT FILE FULL DETAILS ------>",fileFullDetails)


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

const [play,setPlay] = useState(false)
/*PLAYING AUDIO FROM INDIVIDUAL COMPONENT - START */
  
useEffect(()=>{
    console.log("MEDIA TEMPORARY URL --->",fileFullDetails )
    if(fileFullDetails.uploadId !== selectedAudioId ){
      setPlay(false)
      //audioRef.current.pause()
    }

    if(fileFullDetails.uploadId === selectedAudioId ){
      dispatch(setSelectedAudio(/*fileFullDetails && fileFullDetails.mediaUrl?fileFullDetails.mediaUrl:*/fileFullDetails && fileFullDetails.mediaTemporaryUrl ))
      //dispatch(setSelectedAudio(fileFullDetails && fileFullDetails.unuploadedFileUrl))
      dispatch(setSelectedAudioState(true))
    }


   },[selectedAudioId])



   const playAudio = () => {
    
 

    setPlay(!play)

    if(fileFullDetails.uploadId === selectedAudioId ){dispatch(setSelectedAudioState(!selectedAudioState))}
  
    if(fileFullDetails.uploadId !== selectedAudioId ){  
    dispatch(setSelectedAudioId(fileFullDetails && fileFullDetails.individualId))
    dispatch(setSelectedAudio(/*fileFullDetails && fileFullDetails.mediaUrl?fileFullDetails.mediaUrl:*/fileFullDetails && fileFullDetails.mediaTemporaryUrl ))
   //dispatch(setSelectedAudio(fileFullDetails && fileFullDetails.unuploadedFileUrl)) /*NOTE THIS UNUPLOADED FILE URL */
   dispatch(setSelectedAudioState(true))
    }

    
 
};

/*PLAYING AUDIO FROM INDIVIDUAL COMPONENT - END*/




    return (
        <Box my={0.7} sx={{ display: "flex", alignItems: "center" }}>
            {
                !show && <DragHandle />
            }




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
                                        <Typography  sx={{ fontSize: 14, fontFamily: "inter", fontWeight: "900" }}
                                                 onClick={ ()=>{
                                                  
                                                   if(item.title ==="Edit File"){
                                                  dispatch(saveCurrentSong(fileFullDetails))
                                                  }
                                                  else if(item.title ==="Delete File"){
                                                    
                                                    removeFile(indexToBeRemoved,fileFullDetails && fileFullDetails.individualId)
                                                  }
                                                  

                                                  
                                                  
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
             onClick={(e)=>{e.stopPropagation();playAudio() }}
                sx={{ 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "space-between", 
                    background: "#252328", 
                    
                    width:"100%",
                    //minWidth: "30rem",
                    height:"2.5rem",
                    padding: "4px 2px",
                    cursor:"pointer"
                }}
            >
                
                <Box sx={{ display: "flex", alignItems: "center",width:"100%",}}>
                    <Box component="img" src={ Image } sx={{ width: 25, height: 25, marginRight: "14px" }} />
                   
                   
                   
                    <Box>
                        <Typography sx={{ fontSize: 14, fontFamily: "inter", fontWeight: "900"}}>
                        {name && name.length<24?name:name && name.substring(0,24)+'...'}
                        </Typography>
                        <Typography sx={{ fontSize: 10, fontFamily: "inter" }}>
                            {uploadStatus}
                        </Typography>
                    </Box>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center",opacity:"0",userSelect:"none" }}>
                    <Typography  sx={{ fontSize: 12, color: "#2DCF5B", fontFamily: "inter", marginRight: "8px" }}>
                        Approved
                    </Typography>
                    <AvatarListComponent />
                   
                </Box>
                {/*<Close onClick={(e)=>{e.stopPropagation()}} />*/}
                <Delete onClick={(e)=>{removeFile(indexToBeRemoved,fileFullDetails && fileFullDetails.individualId)}} />
               { /*;dispatch(saveCurrentSong(fileFullDetails))*/}
            </Box>
        </Box>
    )

}

export default NewMusicComponent;
