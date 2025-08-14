
import { Box, Typography, Avatar, Grid, TextField, Divider,FormControl, RadioGroup, FormControlLabel, Radio , Menu, MenuItem, Dialog} from "@mui/material";
import {useState,useEffect} from 'react';
// Component
import { DialogModalComponent, TitleAddComponent } from "../General";
import SongCreatorHeadComponent from "./song-creator-head.component";
import ListingComponent from "./listing.component";
import { useSelector } from "react-redux";
import { Droppable } from "react-beautiful-dnd";

import { saveCurrentCoverArt, saveCurrentSong, saveFileToDisplay, saveListOfNewSongsBeingCreated, saveOtherMusicFileIdsToDisplay, saveSongCreatorActive, saveSongCreatorActiveSong, saveSongCreatorSongs } from 'src/redux/reducers/group.slice';
import { useDispatch } from "react-redux";
import { notifyErrorFxn, notifySuccessFxn } from "src/utils/toast-fxn";
import { MoreVert } from "@mui/icons-material";
import PlayImg from "src/assets/images/playpic.png";
import Sound from "src/assets/images/audiowaves.jpeg"
import uuidv4 from "src/utils/uuidv4";


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

const SongCreatorSongWithChildComponent = ({currentSong,identifyingId}) => {
     const dispatch = useDispatch()
     const {/*currentSong,*/songCreatorSongs,songCreatorActive,listOfNewSongsBeingCreated,songCreatorActiveSong,fileToDisplay,otherMusicFileIdsToDisplay} = useSelector((state)=> state.group)

    
     //NOTE THAT CURRENT SONG DOES NOT HAVE THE FILE DATA, LIKE THE ACTUAL SONG, ONLY INFO ABOUT IT
     
     // FROM THE RIGHT HAND MENU, INTO THIS COLUMN
     //, THAT INVOLVES , ADDING A MORE VERT ICON BESIDE EACH CLOSE ICON OF EACH SONG,
     // OR JUST ACTIVATING IT ON CLICK OF THE BAR

  
     console.log("CURRENT SONG OTHER MUSIC FILES",songCreatorSongs)
     console.log("FILE TO DISPLAY",fileToDisplay)

     const menuOptions = [
      { title: "Main", link: "", extra: false },
      { title: "Instrumental", link: "", extra: false },
      { title: "Acapella", link: "", extra: false },
      { title: "Other", link: "", extra: false },
      
      ]

      const menuOptions2 = [
        { title: "Main", link: "", extra: false },
        { title: "Instrumental", link: "", extra: false },
        { title: "Acapella", link: "", extra: false },
        { title: "Other", link: "", extra: false },
        
        ]

        

        const menuOptions3 = [
          { title: "Main", link: "", extra: false },
          { title: "Instrumental", link: "", extra: false },
          { title: "Acapella", link: "", extra: false },
          { title: "Other", link: "", extra: false },
          
          ]

          

          const menuOptions4 = [
            { title: "Main", link: "", extra: false },
            { title: "Instrumental", link: "", extra: false },
            { title: "Acapella", link: "", extra: false },
            { title: "Other", link: "", extra: false },
            
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

      
      //const [open,setOpen] = useState(false)
      const [anchorEl, setAnchorEl] = useState(null);
      const [anchorElTop, setAnchorElTop] = useState(null);

      const [anchorEl2, setAnchorEl2] = useState(null);
      const [anchorEl3, setAnchorEl3] = useState(null);
      const [anchorEl4, setAnchorEl4] = useState(null);

      const open = Boolean(anchorEl);
      const open2 = Boolean(anchorEl2);
      const open3 = Boolean(anchorEl3);
      const open4 = Boolean(anchorEl4);
      
      const [openTop,setOpenTop] = useState(false)
      
     // const [open2,setOpen2] = useState(false)
     // const [open3,setOpen3] = useState(false)
     // const [open4,setOpen4] = useState(false)

     
      
      const handleClick = (event) => {
      
      setAnchorEl(event.currentTarget);
      //setOpen(true)
      };

      const handleClick2 = (event) => {
      
        setAnchorEl2(event.currentTarget);
        //setOpen2(true)
        };


        const handleClick3 = (event) => {
      
          setAnchorEl3(event.currentTarget);
          //setOpen3(true)
          };


         // const handleClick4 = (event) => {
      //
         //   setAnchorEl4(event.currentTarget);
         //   //setOpen4(true)
         //   };

         const [anchorEls, setAnchorEls] = useState([]); // Stores a unique anchorEl for each item
     const [openIndex, setOpenIndex] = useState(null); // Tracks which menu is open

            const handleClick4 = (event, index) => {
              const newAnchorEls = [...anchorEls];
              newAnchorEls[index] = event.currentTarget; // Assign anchorEl to corresponding item
              setAnchorEls(newAnchorEls);
              setOpenIndex(index); //change this to Boolean(AnchorEl)
              
            };
            
            const handleClose4 = () => {
              setAnchorEls([]); // Reset all anchor elements
              setOpenIndex(null);
            };


      const handleClose = () => {
      setAnchorEl(null);
     
      };

      const handleClose2 = () => {
      
        setAnchorEl2(null);
       };


       const handleClose3 = () => {
      
        setAnchorEl3(null);
       };

      //const handleClose4 = () => {
      //
      //   setAnchorEl4(null);
      //  };
      
      const [openModal, setOpenModal] = useState(false);
     

    const handleClickOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };
     
      
     // const [anchorEl, setAnchorEl] = useState(null);
      const [loadingSubmit,setLoadingSubmit] = useState(false) //this setLoadingSubmit is for me(Dagogo) to pass into deleteCurrentSOng below, and to show loading, in the uploadStatus variable , while the song gets deleted
      
      const menuOptionsTop = [
        /*{ title: "Add To Playlist", link: "", extra: false },*/
        { title: "Edit Song", link: "", extra: false },
        { title: "Manage Files", link: "", extra: false },
        { title: "Copy Track Info", link: "", extra: true },
        { title: "Remove Song", link: "", extra: false },
       
      ]
      
      const menuOptionsTemp = [
        { title: "Edit File", link: "", extra: false },
        { title: "Delete File", link: "", extra: false },
      ]
      
      
          const handleClickTop = (event) => {
            event.stopPropagation()
              setAnchorElTop(event.currentTarget);
              
              setOpenTop(true);
              //dispatch(fetchSongsForOnePlaylist(fileFullDetails && fileFullDetails.playlistId))
          };
      
          const handleCloseTop = (e) => {
            e.stopPropagation()
              setAnchorElTop(null);
              setOpenTop(false);
      
          };

          
      
      


    return (
        <Box   onClick={(e)=>{
          
        }}
        
        flex={2} p={{ xs: 0, md: 2 }} sx={{width:"100%"/*"25rem"*/,borderBottom:"0.2px solid #606060" ,backgroundColor:"inherit"}}>
            
            <Box mt={0}   
            
           
            
            >

            <Box my={-1.7} sx={{ display: "flex", alignItems: "center",marginLeft:"-1rem" }}>


            {   <Dialog
                    open={openTop}
                    onClose={handleCloseTop}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <Box sx={style}>
            

              <Menu
                    id="basic-menu"
                    anchorEl={anchorElTop}
                    open={openTop}
                    onClose={handleCloseTop}
                    MenuListProps={{
                    'aria-labelledby': 'basic-button',
                    }}
                    sx={{ borderRadius: "6px" }}
                >
                    <Box py={0.5} px={1}>
                        { 
                            menuOptionsTop.map( (item, i) => (
                                <MenuItem onClick={handleCloseTop}>
                                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                        <Typography  sx={{ fontSize: "12px", fontFamily: "inter", fontWeight: "500" }}
                                                 onClick={ ()=>{
                                              
                                                   if(item.title ==="Edit Song"){
                                                    dispatch(saveCurrentSong({...currentSong,composedSongIdentifyingId:identifyingId && identifyingId}))
                                                    //dispatch(saveCurrentSong(currentSong))
                                                    dispatch(saveCurrentCoverArt(currentSong.coverArtUrl && currentSong.coverArtUrl)) 
                                                     /*setTimeout(()=>{*/
                                                      handleClickOpenModal()
                                                   /*},1000)*/
                                                  }else if(item.title ==="Manage Files"){
                                                    if(songCreatorActiveSong && songCreatorActiveSong.songId === currentSong.songId){
                                                      dispatch(saveSongCreatorActiveSong({}))
                                                        }
                                                        else{
                                                          dispatch(saveSongCreatorActiveSong(currentSong))
                                                        }
                                                  }
                                                  else if(item.title ==="Remove Song"){
                                                    console.log("WHAT IS CURRENT SONG SAVED AS ?-->",listOfNewSongsBeingCreated)
                                                 dispatch(saveListOfNewSongsBeingCreated(listOfNewSongsBeingCreated.filter((item)=>(item.song.songId !==currentSong.songId )  )))
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


  <DialogModalComponent open={ openModal } handleClose={ handleCloseModal }  />
            

            <Box   onClick={(e)=>{
             
             // dispatch(saveCurrentSong(currentSong))
             // dispatch(saveCurrentCoverArt(currentSong.coverArtUrl && currentSong.coverArtUrl)) 
             // handleClickOpenModal()
             // e.stopPropagation()

             dispatch(saveCurrentSong({...currentSong,composedSongIdentifyingId:identifyingId && identifyingId}))
              //dispatch(saveCurrentSong(currentSong))
              dispatch(saveCurrentCoverArt(currentSong.coverArtUrl && currentSong.coverArtUrl)) 
             
              handleClickOpenModal()
              e.stopPropagation()

            }}  
              
                sx={{ 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "space-between", 
                   // background:"#252328", 
                    background:"inherit",
                    //borderBottom:"0.2px solid #060606",
                   width:"100%",
                    /*width:"23.3rem",*/
                    height:"3.3rem",
                   
                    padding: "4px 2px"
                }}
            >



                
                <Box 
                
                onClick={(e)=>{
                    
              dispatch(saveCurrentSong({...currentSong,composedSongIdentifyingId:identifyingId && identifyingId}))
              //dispatch(saveCurrentSong(currentSong))
              dispatch(saveCurrentCoverArt(currentSong.coverArtUrl && currentSong.coverArtUrl)) 
             
              handleClickOpenModal()
              e.stopPropagation()
                }}
                
                sx={{ display: "flex", alignItems: "center" }}>

                   <Box 
                     component="div"
                     sx={{
                       width: 50,
                       height: 40,
                       borderRadius:"0.5rem",
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
                         backgroundImage: `url(${currentSong.coverArtUrl ?currentSong.coverArtUrl:currentSong.coverArtUrl? currentSong.coverArtUrl:Sound})`,
                         backgroundSize: "cover",
                         backgroundRepeat: "no-repeat",
                         backgroundPosition: "center",
                         opacity:/*play && currentSong.uploadId === selectedAudioId? 0.5:*/1, // Adjust transparency of the background image
                         zIndex: 100,
                       },
                     }}
                    />  




                    <Box>
                        <Typography sx={{ fontSize: "12px", fontFamily: "inter", fontWeight: "500" }}>
                        {currentSong.name && currentSong.name.length<maxChars?currentSong.name:currentSong.name && currentSong.name.substring(0,maxChars)+'...'}
                        </Typography>
                        <Typography sx={{ fontSize: "12px", fontFamily: "inter" }}>
                            {"Audiovybez"}
                        </Typography>
                    </Box>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center",opacity:"0",userSelect:"none" }}>
                    <Typography  sx={{ fontSize: "12px", color: "#2DCF5B", fontFamily: "inter", marginRight: "8px" }}>
                        Approved
                    </Typography>
                  
                   
                </Box>
                {<MoreVert onClick={(e)=>{handleClickTop(e) }} />}

            </Box>
        </Box>
              
      
       {songCreatorActiveSong.songId === currentSong.songId && 
       <div style={{marginTop:"-0rem"}} >
       
            {(currentSong && currentSong.mediaUrl || currentSong && currentSong.mediaTemporaryUrl) && currentSong.name && /*(fileToDisplay.includes("mediaTemporaryUrl") ||fileToDisplay.includes("mediaUrl") ) &&*/
        
            
            <div  /*onClick={(e)=>{handleClick(e)}}*/ >

                <span  >
                <ListingComponent handleClick={handleClick}  title={currentSong.name && currentSong.name.length>maxChars?currentSong.name.substring(0,maxChars)+'...':currentSong.name} btn={(currentSong && currentSong.mediaUrl || currentSong && currentSong.mediaTemporaryUrl)?"Main":"Select Version"} fileFullDetails={currentSong} fileToDelete={"mediaTemporaryUrl"} />
                </span>
               
             
                  <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={/*open*/false}
                  onClose={handleClose}
                  MenuListProps={{
                  'aria-labelledby': 'basic-menu',
                  }}
                  sx={{ borderRadius: "6px" }}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  PaperProps={{
                    sx: {
                      ml: -2,
                       mt:1         // Moves the menu 10px left (1.25 * 8px = 10px)
                    }
                  }}
                  >
                  <Box py={0.5} px={0.7} >
                  { 
                  menuOptions.map( (option, i) => (
                  <MenuItem onClick={handleClose}>
                  <Box sx={{ display: "flex", justifyContent: "space-between",width:"100%" }}
                  onClick={ option.title === "Main" ? 
                  ()=>{
                  
                   notifyErrorFxn("File is already set as Main track!")
                    
                   const songInFocus = songCreatorSongs.filter((song)=>(song.songId === currentSong.songId))[0]
                   const updatedSongCreatorSongs = songCreatorSongs.map((song)=>(song.songId ===currentSong.songId?songInFocus:song ))
                  //we are setting the main song as main, for a particular song in song creator songs, so we literally do nothing
                    dispatch(saveSongCreatorSongs([
                      ...updatedSongCreatorSongs,
                    
                    ]))
                   
                   
                    }
                  :
                  option.title === "Instrumental"?
                  ()=>{
                  
                   if(!currentSong.mediaUrl ){
                    notifyErrorFxn("Please make sure you have a main song first!")
                   }
                  else{
                   console.log("MAIN TO INSTRUMENTAL")
                    const songInFocus = songCreatorSongs.filter((song)=>(song.songId === currentSong.songId))[0]

                    const otherMusicFilesHolder = currentSong.otherMusicFiles?[...currentSong.otherMusicFiles]:[]
 
 
                   otherMusicFilesHolder &&  otherMusicFilesHolder.push({
                   
                     mediaTemporaryUrl:songInFocus.mediaTemporaryUrl !== null && songInFocus.mediaTemporaryUrl,
                     mediaUrl:songInFocus.mediaUrl !== null && songInFocus.mediaUrl,
                     size:songInFocus.size,
                     metadata:songInFocus.metadata,
                     type:songInFocus.type,
                     name:songInFocus.name,
                     isMusicFile:true,
                     isTemporary:true,
                     individualId:songInFocus.individualId?songInFocus.individualId:uuidv4()
 
                   })
                   
                     const updatedSongInFocus = { ...songInFocus,
                       otherMusicFiles:[...otherMusicFilesHolder],
                       instrumentalUrl:songInFocus.mediaUrl||songInFocus.mediaTemporaryUrl,
                      mediaTemporaryUrl:null,
                      mediaUrl:null,
                      name:null,
                      instrumentalName:songInFocus.name,
                      instrumentalInformation:{
                        name:songInFocus.name,
                        metadata:songInFocus.metadata,
                        size:songInFocus.metadata,
                      }
                    }

                   const updatedSongCreatorSongs = songCreatorSongs.map((song)=>(song.songId ===currentSong.songId?updatedSongInFocus:song ))
                  
                    dispatch(saveSongCreatorSongs([
                      ...updatedSongCreatorSongs,
                    
                    ]))


                  }
                   
                  dispatch(saveFileToDisplay([...fileToDisplay,"instrumentalTemporaryUrl"]))
                  notifySuccessFxn("File saved as Instrumental")
                 
                  }
                  :
                  
                 
                  option.title === "Other"?
                  ()=>{  

                    const songInFocus = songCreatorSongs.filter((song)=>(song.songId === currentSong.songId))[0]


                   const otherMusicFilesHolder = currentSong.otherMusicFiles?[...currentSong.otherMusicFiles]:[]
 
 
                   otherMusicFilesHolder &&  otherMusicFilesHolder.push({
                    
                     mediaTemporaryUrl:songInFocus.mediaTemporaryUrl !== null && songInFocus.mediaTemporaryUrl,
                     mediaUrl:songInFocus.mediaUrl !== null && songInFocus.mediaUrl,
                     size:songInFocus.size,
                     metadata:songInFocus.metadata,
                     type:songInFocus.type,
                     name:songInFocus.name,
                     isMusicFile:true,
                     isTemporary:true,
                     individualId:songInFocus.individualId?songInFocus.individualId:uuidv4()
 
                   })
 
                   
                     const updatedSongInFocus = { ...songInFocus, otherMusicFiles:[...otherMusicFilesHolder],
                      mediaTemporaryUrl:null,size:null,type:null,name:null}

                   const updatedSongCreatorSongs = songCreatorSongs.map((song)=>(song.songId ===currentSong.songId?updatedSongInFocus:song ))
                    console.log("EXAMPLE OF MAIN TO OTHER-->",updatedSongCreatorSongs)
                    dispatch(saveSongCreatorSongs([
                      ...updatedSongCreatorSongs,
                    
                    ]))

                    dispatch(saveFileToDisplay([...fileToDisplay,"otherMusicFiles"]))
                   dispatch(saveOtherMusicFileIdsToDisplay([...otherMusicFileIdsToDisplay,currentSong.individualId]))

                    notifySuccessFxn("File saved in 'Other' category ")
                   
                  }
                  :
                  console.log("in changing file types, we are doing nothing for now")
                  } 
                  >
                  <Typography sx={{ fontSize: "12px", fontFamily: "inter", fontWeight: "500" }}
                  >{ option.title }</Typography>
                 
                  </Box>
                  </MenuItem>
                  ) )
                  }
                  </Box>
                  </Menu>
              </div>

        
                }


               {(currentSong && currentSong.instrumentalUrl || currentSong && currentSong.instrumentalTemporaryUrl) &&currentSong.instrumentalInformation && currentSong.instrumentalInformation.name && /*(fileToDisplay.includes("instrumentalTemporaryUrl") ||fileToDisplay.includes("instrumentalUrl") ) &&*/
              
              <div>
               
                <span >
                <ListingComponent handleClick={handleClick2}  title={currentSong.InstrumentalInformation && currentSong.InstrumentalInformation.name && currentSong.InstrumentalInformation.name.length>maxChars?currentSong.InstrumentalInformation.name.substring(0,maxChars)+'...':currentSong && currentSong.InstrumentalInformation && currentSong.InstrumentalInformation.name} btn={(currentSong && currentSong.instrumentalUrl || currentSong && currentSong.instrumentalTemporaryUrl) ? "Instrumental":"Select Version"} fileFullDetails={currentSong} fileToDelete={"instrumentalTemporaryUrl"} />
                </span>
                 

                <Menu
                id="basic-menu"
                anchorEl={anchorEl2}
              open={/*open2*/false}
                onClose={handleClose2}
                MenuListProps={{
                'aria-labelledby': 'basic-menu',
                }}
                sx={{ borderRadius: "6px" }}
                >
                <Box py={0.5} px={1}>
                { 
                menuOptions2.map( (option, i) => (
                <MenuItem onClick={handleClose2}>
                <Box sx={{ display: "flex", justifyContent: "space-between",width:"100%" }}
                 onClick={ option.title === "Main" ? 
                 ()=>{
                   

                  const songInFocus = songCreatorSongs.filter((song)=>(song.songId === currentSong.songId))[0]


                  const otherMusicFilesHolder = currentSong.otherMusicFiles?[...currentSong.otherMusicFiles]:[]
 
 
                  otherMusicFilesHolder &&  otherMusicFilesHolder.push({
                    mediaTemporaryUrl:songInFocus.mediaTemporaryUrl !== null && songInFocus.mediaTemporaryUrl,
                    mediaUrl:songInFocus.mediaUrl !== null && songInFocus.mediaUrl,
                    size:songInFocus.size,
                    metadata:songInFocus.metadata,
                    type:songInFocus.type,
                    name:songInFocus.name,
                    isMusicFile:true,
                    isTemporary:true,
                    individualId:songInFocus.individualId

                  })
                   
                  const updatedSongInFocus = { ...songInFocus,
                    otherMusicFiles:[...otherMusicFilesHolder],
                     mediaTemporaryUrl:songInFocus.instrumentalUrl||songInFocus.instrumentalUrl ,
                     mediaUrl:songInFocus.instrumentalUrl||songInFocus.instrumentalUrl ,
                     instrumentalUrl:null,
                     InstrumentalInformation:{}
                   }

                const updatedSongCreatorSongs = songCreatorSongs.map((song)=>(song.songId ===currentSong.songId?updatedSongInFocus:song ))
               //instrumental to main

                  console.log("INSTRUMENTAL TO MAIN")
               
                
               
               dispatch(saveSongCreatorSongs([
                   ...updatedSongCreatorSongs,
                 
                 ]))
                
                
                   notifySuccessFxn("File saved as main track ")
                  
                   }
                 :
                 option.title === "Instrumental"?
                 ()=>{
                 
                  if(!currentSong.mediaUrl){
                   notifyErrorFxn("Please Set a file as your main song first!")
                  }
                 else{
                    
                  const songInFocus = songCreatorSongs.filter((song)=>(song.songId === currentSong.songId))[0]
                  const updatedSongCreatorSongs = songCreatorSongs.map((song)=>(song.songId ===currentSong.songId?songInFocus:song ))
                 console.log("INSTRUMENTAL TO INSTRUMENTAL, SO NOTHING IS BEING DONE")
                   dispatch(saveSongCreatorSongs([
                     ...updatedSongCreatorSongs,
                   
                   ]))
                

                   dispatch(saveFileToDisplay([...fileToDisplay,"instrumentalTemporaryUrl","instrumentalUrl"]));
                   notifySuccessFxn("File saved as instrumental ")
                  }


                
                 }

                 :
                 
                 option.title === "Other"?
                 ()=>{
                
                 // const otherMusicFilesHolder = currentSong.otherMusicFiles?[...currentSong.otherMusicFiles]:[]

                 //
                 // otherMusicFilesHolder && otherMusicFilesHolder.push({
                 //   mediaTemporaryUrl:currentSong.instrumentalTemporaryUrl,
                 //   ...currentSong.instrumentalInformation

                 // })


                 const songInFocus = songCreatorSongs.filter((song)=>(song.songId === currentSong.songId))[0]


                   const otherMusicFilesHolder = currentSong.otherMusicFiles?[...currentSong.otherMusicFiles]:[]
 
                      console.log("INSTRUMENTAL TO OTHER")
                   otherMusicFilesHolder &&  otherMusicFilesHolder.push({
                    mediaTemporaryUrl:currentSong.instrumentalTemporaryUrl,
                    mediaUrl:currentSong.instrumentalUrl,
                       ...currentSong.instrumentalInformation
 
                   })
 
                   
                     const updatedSongInFocus = { 
                      ...songInFocus,
                       otherMusicFiles:[...otherMusicFilesHolder],
                      instrumentalTemporaryUrl:null,
                      instrumentalUrl:null,
                   instrumentalInformation:{ 
                    
                        }}

                   const updatedSongCreatorSongs = songCreatorSongs.map((song)=>(song.songId ===currentSong.songId?updatedSongInFocus:song ))
                 
                    dispatch(saveSongCreatorSongs([
                      ...updatedSongCreatorSongs,
                    
                    ]))

                  dispatch(saveOtherMusicFileIdsToDisplay([...otherMusicFileIdsToDisplay,currentSong.instrumentalInformation.individualId]))
  
                   dispatch(saveFileToDisplay([...fileToDisplay,"otherMusicFiles"]))
                     
                   notifySuccessFxn("File saved in 'Other' category ")
                  
                  }
                    


                 :
                 console.log("in changing file roles, we are doing nothing for now")
                 }  
                >
                <Typography sx={{ fontSize: "12px", fontFamily: "inter", fontWeight: "500" }}
                >{ option.title }</Typography>
               
                </Box>
                </MenuItem>
                ) )
                }
                </Box>
                </Menu>

      </div>
              
              
              }


              {currentSong && currentSong.coverArtUrl && /*(fileToDisplay.includes("coverArtUrl") ) &&*/
                  <div  >   
                     <span>
                     <ListingComponent handleClick={handleClick3}  title={currentSong.coverArtName?
                                                                          
                                                                          currentSong.coverArtName.length>maxChars?currentSong.coverArtName && currentSong.coverArtName.substring(0,maxChars)+'...':currentSong.coverArtName
                                                                          :
                                                                         currentSong.coverArtUrl.split('/').pop().substring(0,maxChars)
                                                                         
                                                                         } btn={currentSong.coverArtName||currentSong.coverArtUrl ?"Other":"Select Version"} fileFullDetails={currentSong} fileToDelete={"coverArtUrl"} />
                     </span>

                     <Menu
                     id="basic-menu"
                     anchorEl={anchorEl3}
                     open={/*open3*/false}
                     onClose={handleClose3}
                     MenuListProps={{
                     'aria-labelledby': 'basic-menu',
                     }}
                     sx={{ borderRadius: "6px" }}
                     >
                     <Box py={0.5} px={1}>
                     { 
                     menuOptions3.map( (option, i) => (
                     <MenuItem onClick={handleClose3}>
                     <Box sx={{ display: "flex", justifyContent: "space-between",width:"100%" }}
                    onClick={ option.title === "Main" ? 
                    ()=>{
                    
                   
                     // dispatch(saveCurrentSong({
                     //   ...currentSong,
                     //   mediaTemporaryUrl:currentSong.mediaTemporaryUrl,
                     //   instrumentalUrl :null
                     // }))
                     
                     
                      }
                    :
                    option.title === "Instrumental"?
                    ()=>{
                    
                   //  if(!currentSong.mediaUrl){
                   //   notifyErrorFxn("Please upload another song to set as your main song first!")
                   //  }
                   // else{
                   //   dispatch(saveCurrentSong({
                   //     ...currentSong,
                   //     // no real change is being made here because we are setting instrumental as instrumental
                   //   }))
                   // }
                   
                    }

                    :
                 
                 option.title === "Other"?
                 ()=>{
                  
               //   const otherMusicFilesHolder = [...currentSong.otherMusicFiles]
//
//
               // otherMusicFilesHolder &&  otherMusicFilesHolder.push({
               //     mediaTemporaryUrl:currentSong.instrumentalTemporaryUrl,
               //     ...currentSong.instrumentalInformation
//
               //   })
//
               //    dispatch(saveCurrentSong({
               //      ...currentSong,
               //      otherMusicFiles:[...otherMusicFilesHolder],
               //      instrumentalTemporaryUrl:null,
               //    instrumentalInformation:{ 
               //     
               //         }
               //    }))
               //   
               //   
               //notifySuccessFxn("File saved in 'Other' category ")
                
                 }


                    :
                    console.log("in changing file types, we are doing nothing for now")
                    } 
                     >
                     <Typography sx={{ fontSize: "12px", fontFamily: "inter", fontWeight: "500" }}
                     >{ option.title }</Typography>
                    
                     </Box>
                     </MenuItem>
                     ) )
                     }
                     </Box>
                     </Menu>
   
            </div>


                     }


        {currentSong &&  /*fileToDisplay && (fileToDisplay.includes("otherMusicFiles") ) && */
       

       currentSong && currentSong.otherMusicFiles && 

       currentSong.otherMusicFiles/*.filter((item)=>(otherMusicFileIdsToDisplay.includes(item.individualId) ))*/.map((item,index)=>(

      <div >
         <span >
         <ListingComponent overArchingSongId={currentSong && currentSong.songId} handleClick={(event) => handleClick4(event, index)}  title={item.name && item.name.length>maxChars?item.name.substring(0,maxChars)+'...':item.name} btn={item.name?"Other":"Select Version"} fileFullDetails={item} fileToDelete={"otherMusicFiles"}  individualId={item.individualId?item.individualId:null}/>
         </span>
         
         <Menu
                    id={`basic-menu-${index}`}
                    anchorEl={anchorEls[index]} // Use unique anchorEl
                   open={false/*openIndex === index*/} // Only open when matched
                    onClose={handleClose4}
                  MenuListProps={{
                  'aria-labelledby': 'basic-menu',
                  }}
                  sx={{ borderRadius: "6px" }}
                  >
                  <Box py={0.5} px={1}>
                  { 
               menuOptions4.map( (option, i) => (
                
                  <MenuItem onClick={handleClose4}>
                  <Box sx={{ display: "flex", justifyContent: "space-between",width:"100%" }}
                 onClick={ 
                 ()=>{
                   
                  if(option.title === "Main" ) {
                  const musicFileToMakeMain = currentSong.otherMusicFiles.filter((file)=>(file.individualId !== item.individualId)).length?  currentSong.otherMusicFiles.filter((file)=>(file.individualId === item.individualId))[0]:null
                  console.log("OTHER TO MAIN-->",item)
                  console.log("CURRENT SONG TO MAIN-->",currentSong)
                 

                  const songInFocus = songCreatorSongs.filter((song)=>(song.songId === currentSong.songId))[0]

                  const otherMusicFilesHolder = [...currentSong.otherMusicFiles]
                    
                  //we push the main song into other so that it doesnt end up getting deleted, in case we want to make it main again
                  otherMusicFilesHolder.push({
                    individualId:uuidv4(),
                    mediaUrl:songInFocus.mediaUrl||songInFocus.mediaTemporaryUrl,
                    mediaTemporaryUrl:songInFocus.mediaUrl||songInFocus.mediaTemporaryUrl,
                    name:songInFocus.name,
                    size:songInFocus.size,
                    type:songInFocus.type,
                    metadata:songInFocus.metadata
                  })
 
                   
                     const updatedSongInFocus = { ...songInFocus,
                      otherMusicFiles:otherMusicFilesHolder.filter((file)=>(file.individualId !== item.individualId)),
                          mediaUrl:musicFileToMakeMain.mediaUrl||musicFileToMakeMain.mediaTemporaryUrl,
                          name:musicFileToMakeMain.name,
                          size:musicFileToMakeMain.size,
                          type:musicFileToMakeMain.type,
                          metadata:musicFileToMakeMain.metadata
                    
                        }

                   const updatedSongCreatorSongs = songCreatorSongs.map((song)=>(song.songId ===currentSong.songId?updatedSongInFocus:song ))
                 
                    dispatch(saveSongCreatorSongs([
                      ...updatedSongCreatorSongs,
                    
                    ]))
                 

                   notifySuccessFxn("File saved as main track ")
                  }
                  else if(option.title === "Instrumental")
                  
                  {
                   if(!currentSong.mediaUrl){
                    notifyErrorFxn("Please upload another song to set as your main song first!")
                   }
                  else{
                   const musicFileToMakeInstrumental = currentSong.otherMusicFiles.filter((file)=>(file.individualId !== item.individualId)).length?  currentSong.otherMusicFiles.filter((file)=>(file.individualId === item.individualId))[0]:null
                   
 
                   const songInFocus = songCreatorSongs.filter((song)=>(song.songId === currentSong.songId))[0]
                   console.log("OTHER TO INSTRUMENTAL-->",item)

                   const otherMusicFilesHolder = [...currentSong.otherMusicFiles]
                    
                   //we push the main song into other so that it doesnt end up getting deleted, in case we want to make it main again
                   otherMusicFilesHolder.push({
                    
                     mediaUrl:songInFocus.instrumentalUrl||songInFocus.instrumentalTemporaryUrl,
                     name:songInFocus.instrumentalInformation && songInFocus.instrumentalInformation.name,
                     size:songInFocus.instrumentalInformation && songInFocus.instrumentalInformation.size,
                     type:songInFocus.instrumentalInformation && songInFocus.instrumentalInformation.type,
                     metadata:songInFocus.instrumentalInformation && songInFocus.instrumentalInformation.metadata,
                     individualId:songInFocus.instrumentalInformation && songInFocus.instrumentalInformation.individualId
                   })
 
  
                    
                      const updatedSongInFocus = { ...songInFocus,
                       otherMusicFiles:currentSong.otherMusicFiles.filter((file)=>(file.individualId !== item.individualId)),
                           instrumentalUrl:musicFileToMakeInstrumental.mediaUrl||musicFileToMakeInstrumental.mediaTemporaryUrl ,
                         instrumentalInformation:{ 
                          ...currentSong.instrumentalInformation,
                           name:musicFileToMakeInstrumental.name,
                           size:musicFileToMakeInstrumental.size,
                           type:musicFileToMakeInstrumental.type,
                           metadata:musicFileToMakeInstrumental.metadata
                     
                         }
                       }
 
                    const updatedSongCreatorSongs = songCreatorSongs.map((song)=>(song.songId ===currentSong.songId?updatedSongInFocus:song ))
                  
                     dispatch(saveSongCreatorSongs([
                       ...updatedSongCreatorSongs,
                     ]))
                  
 
 
                    dispatch(saveFileToDisplay([...fileToDisplay,"instrumentalTemporayUrl","instrumentalUrl"]))
                   
                    notifySuccessFxn("File saved as instrumental ")
                  }
                }
                 
                  else if(option.title === "Other")
                  {
                  
                   notifyErrorFxn("file is already registered as 'Other'")
                   dispatch(saveFileToDisplay([...fileToDisplay,"otherMusicFiles"]))
                   console.log("we are tyring to make other into other so, we are doing nothing for now")
                   const musicFileToMakeInstrumental = currentSong.otherMusicFiles.filter((file)=>(file.individualId !== item.individualId)).length?  currentSong.otherMusicFiles.filter((file)=>(file.individualId === item.individualId))[0]:null
 
               
                 
                  }
 
                  else{
                  console.log("in changing file roles, we are doing nothing for now")
                  }

                   }
              
                 } 
                  >
                  <Typography sx={{ fontSize: "12px", fontFamily: "inter", fontWeight: "500" }}
                  >{ option.title }
                  </Typography>
                 
                  </Box>
                  </MenuItem>
                  ) )
                  }
                  </Box>
                  </Menu>

        </div>





       ))
       }

     
        </div>
        }
            </Box>

        </Box>
    )
}

export default SongCreatorSongWithChildComponent;
