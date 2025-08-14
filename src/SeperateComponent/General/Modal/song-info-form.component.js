import { Box, Button, CardMedia, Menu, MenuItem, Typography } from "@mui/material";

import Sound from "../../../assets/images/sound.png";
import { useDispatch, useSelector } from "react-redux";
import { saveCurrentSong,saveCurrentCoverArt, saveSongCreatorSongs } from "src/redux/reducers/group.slice";
import { useRef, useState } from "react";


import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import 'react-horizontal-scrolling-menu/dist/styles.css';
import { notifyErrorFxn, notifySuccessFxn } from "src/utils/toast-fxn";

const SongInfoComponent = () => {
   
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

        dispatch(saveCurrentCoverArt({
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
        { label: "Song Title", value: currentSong && currentSong.name?currentSong.name :"",placeholder: currentSong && currentSong.name?currentSong.name :"Enter song title", type: "text" },
        { label: "Artist",value:currentSong &&  currentSong.metadata && currentSong.metadata.artist?currentSong.metadata && currentSong.metadata.artist : "" ,placeholder:currentSong && currentSong.metadata && currentSong.metadata.artist?currentSong.metadata && currentSong.metadata.artist : "Select artist", type: "text" },
        { label: "Featured Artist",value:currentSong && currentSong.metadata && currentSong.metadata.featuredArtist?currentSong.metadata && currentSong.metadata.featuredArtist : "" ,placeholder:currentSong && currentSong.metadata && currentSong.metadata.featuredArtist?currentSong.metadata && currentSong.metadata.featuredArtist : "Select any featured artist", type: "text" },
        { label: "BPM",value:currentSong && currentSong.metadata && currentSong.metadata.bpm?currentSong.metadata && currentSong.metadata.bpm : " " ,placeholder:currentSong && currentSong.metadata && currentSong.metadata.bpm?currentSong.metadata && currentSong.metadata.bpm : "Enter track's BPM", type: "text" },
        { label: "Key", value:currentSong && currentSong.metadata && currentSong.metadata.songInfoKey?currentSong.metadata && currentSong.metadata.songInfoKey : " ",placeholder:currentSong && currentSong.metadata && currentSong.metadata.songInfoKey?currentSong.metadata && currentSong.metadata.songInfoKey : "Enter song's key signature", type: "text" },
        { label: "Track Length", value:currentSong && currentSong.metadata && currentSong.metadata.trackLength?currentSong.metadata && currentSong.metadata.trackLength : "**DO NOT TYPE HERE**",placeholder:currentSong && currentSong.metadata && currentSong.metadata.trackLength?currentSong.metadata && currentSong.metadata.trackLength : "**DO NOT TYPE HERE**", type: "text" },
        { label: "Song Description",value:currentSong && currentSong.metadata && currentSong.metadata.description?currentSong.metadata && currentSong.metadata.description : "" ,placeholder:currentSong && currentSong.metadata && currentSong.metadata.description?currentSong.metadata && currentSong.metadata.description : "Enter description", type: "text" },
        { label: "Sounds Like",value:currentSong && currentSong.metadata && currentSong.metadata.similarSong?currentSong.metadata && currentSong.metadata.similarSong : " " ,placeholder:currentSong && currentSong.metadata && currentSong.metadata.similarSong?currentSong.metadata && currentSong.metadata.similarSong : "Closest reference to track", type: "text" }
    ]

    return (
      <>
      <p ref={customAnchorRef} style={{position:"absolute",left:"-9rem",top:"14rem",color:"transparent",opacity:"0"}}>anchor</p>
        <Box sx={{display:"flex",flexDirection:"row-reverse",width:"50rem",position:"relative"}} >
             
            <Box mb={3} sx={{ cursor: "pointer" ,width:"50%",display:"flex",justifyContent:"center",position:"relative",top:"0.5rem"}}>
               {/* <Box 
                    component="img" src={  currentSong && currentSong.coverArt?currentSong.coverArt :Sound } 
                    sx={{ border: "1px solid grey", margin: "1px auto" }}
               />*/}

               <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center' }}>
                 <CardMedia
                   style={{ border: '0.2px solid black', backgroundColor: '#fff', width: '200px',height:'200px' }}
                   component="img"
                   height="100"
                   width="100"
                   image={file ? file :currentSong && currentSong.coverArtUrl?currentSong.coverArtUrl :Sound}
                   alt="IMG"
                 />
                 <Button component="label" variant="contained"
                 onClick={(e)=>{handleClickTop(e)}} 
                 style={{ minHeight: '45px', minWidth: '145px', backgroundColor:'inherit',color:"white" ,marginTop: '15px' }}>
                   <b>Add Cover Art</b>
                  {/* <input
                     type="file"
                     style={{ display: 'none' }}
                     //onChange={handleselectedFile}
                     
                   />*/}
                 </Button>



                 <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                  'aria-labelledby': 'basic-button',
                  }}
                  sx={{ borderRadius: "6px",
                  //transform: 'translateX(-140px) translateY(-120px)',
                  display:"flex",
                  justifyContent:"center",
                  alignItems:"center",
                  position:"relative",
                  top:"14rem",
                 // background:"#302C34",
                  //width:"1050px",
                  height:"720px"
                  }}

                  PaperProps={{
                    sx: {
                      borderRadius: "6px",
                      transform: 'translateX(-150px) translateY(-100px)',
                    position:"absolute",
                   
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      background: "#252328", // custom background
                      height: "1500px", // custom height
                      width: "1170px", // optional width if you want a wide menu
                    }
                }}
                  >

                 <Typography variant="h6" sx={{borderBottom:"1px solid #E61484",paddingBottom:"6px",width:"max-content",margin:"0 auto",marginBottom:"1rem"}}>
                  Select your Image and then save
                  </Typography>
                  <Box py={0.5} px={1} sx={{ background:"inherit"/*background:"#302C34",*/,width:"1000px",height:"100%",display: "flex", justifyContent: "center",flexDirection:"row",gap:"1rem"}}>
                  
   
                  <ScrollMenu  wrapperClassName={"scrollMenu-cover-art-list"} itemClassName="scrollMenu-cover-art-list-item"  scrollContainerClassName={"scrollContainer"}>
                  { previouslyUploadedFiles && previouslyUploadedFiles.length > 0 && 
                  previouslyUploadedFiles.filter((file)=>(imageFormats.some((format) => (file.name.toLowerCase().includes(format))))  ).map( (item, i) => (
                  <MenuItem >
                  <Box sx={{height: "230px", width:"200px" , display: "flex", justifyContent: "center",alignItems:"center" ,flexDirection:"row",gap:"1rem"}}>
                  <Typography sx={{ fontSize: 14, fontFamily: "inter", fontWeight: "500" }}
                  onClick={ ()=>{
                    setSelectedPic(item)
                    /*
                  
                   dispatch(saveCurrentSong(
                    {
                        ...currentSong,
                        coverArtUrl:item.mediaTemporaryUrl||item.mediaUrl,
                        coverArtName:item.name
                    }
                   ));

                   dispatch(saveSongCreatorSongs(
                    songCreatorSongs.map((song)=>(
                        song.songId === currentSong.songId ?
                        {

                            ...currentSong,
                        coverArtUrl:item.mediaTemporaryUrl||item.mediaUrl,
                        coverArtName:item.name
                        }

                        :
                        song
                    ))
                   ))
                   
                */}} >
                  <Box component="img" src={ item.mediaTemporaryUrl|| item.mediaUrl||item.coverArtUrl } sx={{ height: "200px", width: "200px" }} />
                  <Typography sx={{borderBottom:selectedPic.name && selectedPic.name ===item.name?"1px solid #E61484":"0px",paddingBottom:selectedPic.name && selectedPic.name ===item.name?"6px":"0px"}}></Typography>
                  {item.name}
                  </Typography>
                  </Box>
                  </MenuItem>
                  ) )
                  
                  }
                   </ScrollMenu>
                  </Box>


                    <Box sx={{ display: "flex",gap:"10px",alignItems:"center",justifyContent:"center",backgroundColor:"inherit" ,marginBottom:"30px"}}>
                     
                       <Button
                       variant="contained"
                       //startIcon={<MdPersonAddAlt1 />}
                       sx={{
                         marginTop: 0,
                         borderRadius: '5rem',
                         paddingX: 3,
                         background: "linear-gradient(to right, #A01565, #3E256E)",
                         color: '#fff',
                         textTransform: 'none',
                         fontSize: '12px',
                         scale:"1.3"
                       }}


                       onClick={()=>{
                     
                        if(selectedPic.name !== null){
                        dispatch(saveCurrentSong(
                            {
                                ...currentSong,
                                coverArtUrl:selectedPic.mediaTemporaryUrl||selectedPic.mediaUrl,
                                coverArtName:selectedPic.name
                            }
                           ))
        
                           dispatch(saveSongCreatorSongs(
                            songCreatorSongs.map((song)=>(
                                song.songId === currentSong.songId ?
                                {
        
                                    ...currentSong,
                                coverArtUrl:selectedPic.mediaTemporaryUrl||selectedPic.mediaUrl,
                                coverArtName:selectedPic.name
                                }
        
                                :
                                song
                            ))
                           ))

                           setSelectedPic({name:null})
                           handleClose()
                           notifySuccessFxn("Image has been updated!")

                    }
                    else{

                       notifyErrorFxn("Please Select an Image first!")

                    }
                
                
                }}
                    


                     >
                       Save
                     </Button>

       
                 </Box>
                 
                  </Menu> 




               </div>


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

export default SongInfoComponent
