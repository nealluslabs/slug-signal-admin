import { Box, Button, CardMedia, Menu, MenuItem, Typography } from "@mui/material";

import Sound from "../../../assets/images/sound.png";
import { useDispatch, useSelector } from "react-redux";
import { saveCurrentSong,saveCurrentCollaboratorImg, saveSongCreatorSongs } from "src/redux/reducers/group.slice";
import { useRef, useState } from "react";


import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import 'react-horizontal-scrolling-menu/dist/styles.css';
import { notifyErrorFxn, notifySuccessFxn } from "src/utils/toast-fxn";

const AddCollaboratorDetailsComponent = () => {
   
    const dispatch= useDispatch()
    const { currentSong,allFiles,songCreatorSongs } = useSelector((state) => state.group);

    const [previouslyUploadedFiles,setPreviouslyUploadedFiles] = useState(allFiles && allFiles)
    const imageFormats = ["jpg", "jpeg", "png", "gif", "bmp", "webp", "tiff", "svg"];

    console.log("CURRENT SONG IS --->",currentSong)

    const customAnchorRef = useRef(null)

    console.log("PREVoo UPLOADED FILES --->",previouslyUploadedFiles.filter((file)=>(imageFormats.some((format) => (file.name.toLowerCase().includes(format)))))[0])

    const [file, setFile] = useState()
    const [selectedFile, setSelectedFile] = useState({selectedFile: [], selectedFileName: []})
    const [selectedPic, setSelectedPic] =useState({name:null})
    
    const handleselectedFile = event => {
        setSelectedFile({
            selectedFile: event.target.files[0],
            selectedFileName: event.target.files[0].name
        })
        setFile(URL.createObjectURL(event.target.files[0]))

        dispatch(saveCurrentCollaboratorImg({
            //YOU STOPPED HERE
            file:event.target.files[0],
            name:event.target.files[0].name
        }))
    }


    const handleClickTop = (event) => {
        event.stopPropagation()
          //setAnchorEl(event.currentTarget)
          setAnchorEl(customAnchorRef.current)
        
          //dispatch(fetchSongsForOnePlaylist(fileFullDetails && fileFullDetails.playlistId))
      }



                //const [open,setOpen] = useState(false)
            const [anchorEl, setAnchorEl] = useState(null)
            
            
            const open = Boolean(anchorEl)
            
            const handleClick = (event) => {
            setAnchorEl(event.currentTarget)
            //setOpen(true)
            }
            
            const handleClose = () => {
             
                setAnchorEl(null)
              
            }
            
            
    

    const formData = [
        { label: "First Name", value: currentSong && currentSong.name?currentSong.name :"",placeholder: currentSong && currentSong.name?currentSong.name :"Enter song title", type: "text" },
        { label: "Last Name",value:currentSong &&  currentSong.metadata && currentSong.metadata.artist?currentSong.metadata && currentSong.metadata.artist : "" ,placeholder:currentSong && currentSong.metadata && currentSong.metadata.artist?currentSong.metadata && currentSong.metadata.artist : "Select artist", type: "text" },
        { label: "Email",value:currentSong && currentSong.metadata && currentSong.metadata.featuredArtist?currentSong.metadata && currentSong.metadata.featuredArtist : "" ,placeholder:currentSong && currentSong.metadata && currentSong.metadata.featuredArtist?currentSong.metadata && currentSong.metadata.featuredArtist : "Select any featured artist", type: "text" },
        /*{ label: "BPM",value:currentSong && currentSong.metadata && currentSong.metadata.bpm?currentSong.metadata && currentSong.metadata.bpm : " " ,placeholder:currentSong && currentSong.metadata && currentSong.metadata.bpm?currentSong.metadata && currentSong.metadata.bpm : "Enter track's BPM", type: "text" },
        { label: "Key", value:currentSong && currentSong.metadata && currentSong.metadata.songInfoKey?currentSong.metadata && currentSong.metadata.songInfoKey : " ",placeholder:currentSong && currentSong.metadata && currentSong.metadata.songInfoKey?currentSong.metadata && currentSong.metadata.songInfoKey : "Enter song's key signature", type: "text" },
        { label: "Track Length", value:currentSong && currentSong.metadata && currentSong.metadata.trackLength?currentSong.metadata && currentSong.metadata.trackLength : "**DO NOT TYPE HERE**",placeholder:currentSong && currentSong.metadata && currentSong.metadata.trackLength?currentSong.metadata && currentSong.metadata.trackLength : "**DO NOT TYPE HERE**", type: "text" },
        { label: "Song Description",value:currentSong && currentSong.metadata && currentSong.metadata.description?currentSong.metadata && currentSong.metadata.description : "" ,placeholder:currentSong && currentSong.metadata && currentSong.metadata.description?currentSong.metadata && currentSong.metadata.description : "Enter description", type: "text" },
        { label: "Sounds Like",value:currentSong && currentSong.metadata && currentSong.metadata.similarSong?currentSong.metadata && currentSong.metadata.similarSong : " " ,placeholder:currentSong && currentSong.metadata && currentSong.metadata.similarSong?currentSong.metadata && currentSong.metadata.similarSong : "Closest reference to track", type: "text" }*/
    ]

    return (
      <>
      <p ref={customAnchorRef} style={{position:"absolute",left:"-9rem",top:"14rem",color:"transparent",opacity:"0"}}>anchor</p>
        <Box sx={{display:"flex",flexDirection:"row-reverse",width:"50rem",position:"relative",height:"82.9vh"}} >
             
            <Box mb={3} sx={{ cursor: "pointer" ,width:"50%",display:"flex",justifyContent:"center",position:"relative",top:"0.5rem"}}>
               {/* <Box 
                    component="img" src={  currentSong && currentSong.coverArt?currentSong.coverArt :Sound } 
                    sx={{ border: "1px solid grey", margin: "1px auto" }}
               />*/}




                {/*<Typography sx={{ fontSize: 14, fontWeight: "bold", fontFamily: "inter", textAlign: "center" }}>Add Cover Art</Typography>*/}
            </Box>
            
             <Box style={{display:"flex",flexDirection:"column",width:"100%"}}>
            {
                formData.map( (item, key) => (
                    <Box my={1} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <Typography mr={1} sx={{ fontSize: 14, fontFamily: "inter", fontWeight: "bold" }}>
                            { item.label }:
                        </Typography>
                        <input 
                          value={item.value}
                          onChange={(e)=>{
                           
                             let newSongDetails = {...currentSong}
                             let metadata2 =currentSong.metadata?{...currentSong.metadata}:{}

                           item.label === "Song Title"?  newSongDetails["name"] = e.target.value
                           :
                           item.label === "Artist"? metadata2["artist"] = e.target.value
                           :
                           item.label === "Featured Artist"? metadata2["featuredArtist"] = e.target.value
                           :
                           item.label === "BPM"? metadata2["bpm"] = e.target.value
                           :
                           item.label === "Key"? metadata2["songInfoKey"] = e.target.value
                           :
                           item.label === "Track Length"? metadata2["trackLength"] = e.target.value
                           :
                           item.label === "Song Description"? metadata2["description"] = e.target.value
                           :
                          metadata2["similarSong"] = e.target.value

                            dispatch(saveCurrentSong(
                                {...newSongDetails,
                                  metadata:metadata2
                              }))

                          }}

                            placeholder={ item.placeholder }
                            style={{ 
                                padding: "2px 6px", fontSize: "13px", fontFamily: "inter", outline: "none", 
                                width: "64%" 
                            }}
                            type={ item.type }
                        />
                    </Box>
                ) )
            }
         </Box>

        </Box>
        </>
    )
}

export default AddCollaboratorDetailsComponent
