import { Box, Menu, MenuItem, Typography } from "@mui/material";
import {useState,useEffect} from 'react';
// Component
import { DialogModalComponent, TitleAddComponent } from "../General";
import SongCreatorHeadComponent from "./song-creator-head.component";
import ListingComponent from "./listing.component";
import { useSelector } from "react-redux";
import { Droppable } from "react-beautiful-dnd";

import { saveCurrentCoverArt, saveCurrentSong, saveFileToDisplay, saveOtherMusicFileIdsToDisplay, saveSongCreatorActive } from 'src/redux/reducers/group.slice';
import { useDispatch } from "react-redux";
import { notifyErrorFxn, notifySuccessFxn } from "src/utils/toast-fxn";
import SongHeaderComponent from "./song-header.component";

const CreateNewSongComponent = ({idForFileUploadAreaPerSong,nsc}) => {
     const dispatch = useDispatch()
     const {songCreatorActive,fileToDisplay,otherMusicFileIdsToDisplay,listOfNewSongsBeingComposed,songCreatorActiveSongId} = useSelector((state)=> state.group)
   
     const [currentSong,setCurrentSong]  = useState(listOfNewSongsBeingComposed && listOfNewSongsBeingComposed.filter((item)=>(item.identifyingId === idForFileUploadAreaPerSong) && listOfNewSongsBeingComposed.filter((item)=>(item.identifyingId === idForFileUploadAreaPerSong))[0].song ))

 
     useEffect(()=>{

    setCurrentSong(listOfNewSongsBeingComposed && listOfNewSongsBeingComposed.filter((item)=>(item.identifyingId === idForFileUploadAreaPerSong)) && listOfNewSongsBeingComposed.filter((item)=>(item.identifyingId === idForFileUploadAreaPerSong))[0].song )

   },[listOfNewSongsBeingComposed])

   console.log('CURRENT SONG USE STATE--->',currentSong)

     console.log('ID FOR FILE UPLOAD AREA PER SONG--->',idForFileUploadAreaPerSong)
     //NOTE THAT CURRENT SONG DOES NOT HAVE THE FILE DATA, LIKE THE ACTUAL SONG, ONLY INFO ABOUT IT
     
     // FROM THE RIGHT HAND MENU, INTO THIS COLUMN
     //, THAT INVOLVES , ADDING A MORE VERT ICON BESIDE EACH CLOSE ICON OF EACH SONG,
     // OR JUST ACTIVATING IT ON CLICK OF THE BAR

  
   //  console.log("CURRENT SONG OTHER MUSIC FILES",currentSong.otherMusicFiles)
    // console.log("FILE TO DISPLAY",fileToDisplay)

     const menuOptions = [
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
      const [anchorEl2, setAnchorEl2] = useState(null);
      const [anchorEl3, setAnchorEl3] = useState(null);
      const [anchorEl4, setAnchorEl4] = useState(null);

      const open = Boolean(anchorEl);
      const [open2,setOpen2] = useState(false)
      const [open3,setOpen3] = useState(false)
      const [open4,setOpen4] = useState(false)

     
      
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


          const handleClick4 = (event) => {
      
            setAnchorEl4(event.currentTarget);
            //setOpen4(true)
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

      const handleClose4 = () => {
      
         setAnchorEl4(null);
        };
      
      const [openModal, setOpenModal] = useState(false);
     
      

      


    return (
        <Box flex={2} p={{ xs: 0, md: 2, /*height: "100vh"*/ }} sx={{maxWidth:"28rem",marginTop:"0rem",marginBottom:"0rem",background:'inherit',borderBottom:'0.5px solid grey' }}>
            
            <Box mt={0} >
              
      
       {/*idForFileUploadAreaPerSong === songCreatorActiveSongId &&*/
       <div >
         <Droppable droppableId={`fileHeader-${idForFileUploadAreaPerSong}`/*"EditingCurrentSong"*/} >
             {(provided) => (
               <div
                 {...provided.droppableProps}
                 ref={provided.innerRef}
                
               >

<SongHeaderComponent edit={ true } songBeingMappedName={nsc.name||nsc.song.name} playlist={nsc} />  

                {idForFileUploadAreaPerSong === songCreatorActiveSongId &&
                
                (currentSong && currentSong.mediaUrl || currentSong && currentSong.mediaTemporaryUrl) && /*(fileToDisplay.includes("mediaTemporaryUrl") ||fileToDisplay.includes("mediaUrl") ) &&*/
        
            
        <div  /*onClick={(e)=>{handleClick(e)}}*/ >

                <span  >
                <ListingComponent handleClick={handleClick}  title={currentSong.name.length>maxChars?currentSong.name.substring(0,maxChars)+'...':currentSong.name} btn="Select Version" fileFullDetails={currentSong} fileToDelete={"mediaTemporaryUrl"} overArchingSongId={idForFileUploadAreaPerSong} />
                </span>
               
             
                  <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
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
                  menuOptions.map( (item, i) => (
                  <MenuItem onClick={handleClose}>
                  <Box sx={{ display: "flex", justifyContent: "space-between",width:"100%" }}
                  onClick={ item.title === "Main" ? 
                  ()=>{
                  
                   notifySuccessFxn("File set as Main track")
                    dispatch(saveCurrentSong({
                      ...currentSong,
                     // instrumentalUrl:currentSong.mediaTemporaryUrl,
                     // mediaTemporaryUrl:null  do nothing  here, cuz we are already in the place that says current
                    }))
                   
                   
                    }
                  :
                  item.title === "Instrumental"?
                  ()=>{
                  
                   if(!currentSong.mediaTemporaryUrl){
                    notifyErrorFxn("Please upload another song to set as your main song first!")
                   }
                  else{
                    dispatch(saveCurrentSong({
                      ...currentSong,
                      instrumentalUrl:currentSong.mediaTemporaryUrl,
                      mediaTemporaryUrl:null
                    }))
                  }
                   
                  dispatch(saveFileToDisplay([...fileToDisplay,"instrumentalTemporaryUrl"]))
                  notifySuccessFxn("File saved as Instrumental")
                 
                  }
                  :
                  
                 
                  item.title === "Other"?
                  ()=>{
                 
                   const otherMusicFilesHolder = currentSong.otherMusicFiles?currentSong.otherMusicFiles:[]
 
 
                   otherMusicFilesHolder.push({
                     mediaTemporaryUrl:currentSong.mediaTemporaryUrl,
                     size:currentSong.size,
                     metadata:currentSong.metadata,
                     type:currentSong.type,
                     name:currentSong.name,
                     isMusicFile:true,
                     isTemporary:true,
                     individualId:currentSong.individualId
 
                   })
 
                    dispatch(saveCurrentSong({
                      ...currentSong,
                      otherMusicFiles:[...otherMusicFilesHolder],
                      mediaTemporaryUrl:null,
                      size:null,
                    // metadata:currentSong.metadata,
                     type:null,
                     name:null,
                     
                    
                    }))
                    dispatch(saveFileToDisplay([...fileToDisplay,"otherMusicFiles"]))
                   dispatch(saveOtherMusicFileIdsToDisplay([...otherMusicFileIdsToDisplay,currentSong.individualId]))

                    notifySuccessFxn("File saved in 'Other' category ")
                   
                  }
                  :
                  console.log("in changing file types, we are doing nothing for now")
                  } 
                  >
                  <Typography sx={{ fontSize: "12px", fontFamily: "inter", fontWeight: "500" }}
                  >{ item.title }</Typography>
                 
                  </Box>
                  </MenuItem>
                  ) )
                  }
                  </Box>
                  </Menu>
              </div>

        
                }


               {idForFileUploadAreaPerSong === songCreatorActiveSongId &&
               (currentSong && currentSong.instrumentalUrl || currentSong && currentSong.instrumentalTemporaryUrl) && /*(fileToDisplay.includes("instrumentalTemporaryUrl") ||fileToDisplay.includes("instrumentalUrl") ) &&*/
              
              <div>
               
                <span >
                <ListingComponent handleClick={handleClick}  title={currentSong.name.length>maxChars?'INSTRUMENTAL-'+ currentSong.name.substring(0,maxChars)+'...':'INSTRUMENTAL-' + currentSong.name} btn="Select Version" fileFullDetails={currentSong} fileToDelete={"instrumentalTemporaryUrl"} overArchingSongId={idForFileUploadAreaPerSong} />
                </span>
                 

                <Menu
                id="basic-menu2"
                anchorEl={anchorEl2}
                open={open2}
                onClose={handleClose2}
                MenuListProps={{
                'aria-labelledby': 'basic-menu2',
                }}
                sx={{ borderRadius: "6px" }}
                >
                <Box py={0.5} px={1}>
                { 
                menuOptions.map( (item, i) => (
                <MenuItem onClick={handleClose}>
                <Box sx={{ display: "flex", justifyContent: "space-between",width:"100%" }}
                 onClick={ item.title === "Main" ? 
                 ()=>{
                 
                
                   dispatch(saveCurrentSong({
                     ...currentSong,
                     mediaTemporaryUrl:currentSong.mediaTemporaryUrl,
                     instrumentalUrl :null
                   }))
                  

                   notifySuccessFxn("File saved as main track ")
                  
                   }
                 :
                 item.title === "Instrumental"?
                 ()=>{
                 
                  if(!currentSong.mediaTemporaryUrl){
                   notifyErrorFxn("Please upload another song to set as your main song first!")
                  }
                 else{
                   dispatch(saveCurrentSong({
                     ...currentSong,
                     // no real change is being made here because we are setting instrumental as instrumental
                   }))
                

                   dispatch(saveFileToDisplay([...fileToDisplay,"instrumentalTemporaryUrl","instrumentalUrl"]));
                   notifySuccessFxn("File saved as instrumental ")
                  }


                
                 }

                 :
                 
                 item.title === "Other"?
                 ()=>{
                
                  const otherMusicFilesHolder = currentSong.otherMusicFiles?currentSong.otherMusicFiles:[]

                 
                  otherMusicFilesHolder.push({
                    mediaTemporaryUrl:currentSong.instrumentalTemporaryUrl,
                    ...currentSong.instrumentalInformation

                  })

                  dispatch(saveOtherMusicFileIdsToDisplay([...otherMusicFileIdsToDisplay,currentSong.instrumentalInformation.individualId]))
  
                   dispatch(saveCurrentSong({
                     ...currentSong,
                     otherMusicFiles:[...otherMusicFilesHolder],
                     instrumentalTemporaryUrl:null,
                   instrumentalInformation:{ 
                    
                        }
                   }))

                   dispatch(saveFileToDisplay([...fileToDisplay,"otherMusicFiles"]))
                     
                   notifySuccessFxn("File saved in 'Other' category ")
                  
                  }
                    


                 :
                 console.log("in changing file roles, we are doing nothing for now")
                 }  
                >
                <Typography sx={{ fontSize: "12px", fontFamily: "inter", fontWeight: "500" }}
                >{ item.title }</Typography>
               
                </Box>
                </MenuItem>
                ) )
                }
                </Box>
                </Menu>

      </div>
              
              
              }


              { idForFileUploadAreaPerSong === songCreatorActiveSongId &&
              
              currentSong && currentSong.coverArtUrl && /*(fileToDisplay.includes("coverArtUrl") ) &&*/
                  <div  >   
                     <span>
                     <ListingComponent handleClick={handleClick}  title={currentSong.coverArtName?
                                                                          
                                                                          currentSong.coverArtName.length>maxChars?currentSong.coverArtName.substring(0,maxChars)+'...':currentSong.coverArtName
                                                                          :
                                                                         currentSong.coverArtUrl.split('/').pop().substring(0,maxChars)
                                                                         
                                                                         } btn="Select Version" fileFullDetails={currentSong} fileToDelete={"coverArtUrl"} overArchingSongId={idForFileUploadAreaPerSong} />
                     </span>

                     <Menu
                     id="basic-menu3"
                     anchorEl={anchorEl3}
                     open={open3}
                     onClose={handleClose3}
                     MenuListProps={{
                     'aria-labelledby': 'basic-menu3',
                     }}
                     sx={{ borderRadius: "6px" }}
                     >
                     <Box py={0.5} px={1}>
                     { 
                     menuOptions.map( (item, i) => (
                     <MenuItem onClick={handleClose}>
                     <Box sx={{ display: "flex", justifyContent: "space-between",width:"100%" }}
                    onClick={ item.title === "Main" ? 
                    ()=>{
                    
                   
                     // dispatch(saveCurrentSong({
                     //   ...currentSong,
                     //   mediaTemporaryUrl:currentSong.mediaTemporaryUrl,
                     //   instrumentalUrl :null
                     // }))
                     
                     
                      }
                    :
                    item.title === "Instrumental"?
                    ()=>{
                    
                   //  if(!currentSong.mediaTemporaryUrl){
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
                 
                 item.title === "Other"?
                 ()=>{
                  
               //   const otherMusicFilesHolder = currentSong.otherMusicFiles
//
//
               //   otherMusicFilesHolder.push({
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
                     >{ item.title }</Typography>
                    
                     </Box>
                     </MenuItem>
                     ) )
                     }
                     </Box>
                     </Menu>
   
            </div>


                     }


        {idForFileUploadAreaPerSong === songCreatorActiveSongId &&
        
        currentSong &&  /*fileToDisplay && (fileToDisplay.includes("otherMusicFiles") ) && */
       

       currentSong && currentSong.otherMusicFiles && 

       currentSong.otherMusicFiles.map((item)=>(

      <div >
         <span >
         <ListingComponent handleClick={handleClick}  title={item.name.length>maxChars?item.name.substring(0,maxChars)+'...':item.name} btn="Select Version" fileFullDetails={item} fileToDelete={"otherMusicFiles"}  individualId={item.individualId?item.individualId:null} overArchingSongId={idForFileUploadAreaPerSong} />
         </span>
         
         <Menu
                  id="basic-menu4"
                  anchorEl={anchorEl4}
                  open={open4}
                  onClose={handleClose4}
                  MenuListProps={{
                  'aria-labelledby': 'basic-menu4',
                  }}
                  sx={{ borderRadius: "6px" }}
                  >
                  <Box py={0.5} px={1}>
                  { 
                  menuOptions.map( (option, i) => (
                  <MenuItem onClick={handleClose}>
                  <Box sx={{ display: "flex", justifyContent: "space-between",width:"100%" }}
                 onClick={ option.title === "Main" ? 
                 ()=>{
                   
                  const musicFileToMakeMain = currentSong.otherMusicFiles.filter((file)=>(file.individualId !== item.individualId)).length?  currentSong.otherMusicFiles.filter((file)=>(file.individualId === item.individualId))[0]:null
                  
                   dispatch(saveCurrentSong({
                     ...currentSong,
                     otherMusicFiles:currentSong.otherMusicFiles.filter((file)=>(file.individualId !== item.individualId)),
                     mediaTemporaryUrl:musicFileToMakeMain.mediaTemporaryUrl,
                     name:musicFileToMakeMain.name,
                     size:musicFileToMakeMain.size,
                     type:musicFileToMakeMain.type,
                     metadata:musicFileToMakeMain.metadata
                   }))
                  
                   notifySuccessFxn("File saved as main track ")
                   }
                 :
                 item.title === "Instrumental"?
                 ()=>{
                 
                  if(!currentSong.mediaTemporaryUrl){
                   notifyErrorFxn("Please upload another song to set as your main song first!")
                  }
                 else{
                  const musicFileToMakeInstrumental = currentSong.otherMusicFiles.filter((file)=>(file.individualId !== item.individualId)).length?  currentSong.otherMusicFiles.filter((file)=>(file.individualId === item.individualId))[0]:null
                  
                   dispatch(saveCurrentSong({
                     ...currentSong,
                     otherMusicFiles:currentSong.otherMusicFiles.filter((file)=>(file.individualId !== item.individualId)),
                     instrumentalTemporaryUrl:musicFileToMakeInstrumental.mediaTemporaryUrl,
                   instrumentalInformation:{ 
                    ...currentSong.instrumentalInformation,
                     name:musicFileToMakeInstrumental.name,
                     size:musicFileToMakeInstrumental.size,
                     type:musicFileToMakeInstrumental.type,
                     metadata:musicFileToMakeInstrumental.metadata
                        }
                   }))

                   dispatch(saveFileToDisplay([...fileToDisplay,"instrumentalTemporayUrl","instrumentalUrl"]))
                  
                   notifySuccessFxn("File saved as instrumental ")
                 }
                
                 }
                 :
                 
                 item.title === "Other"?
                 ()=>{
                 
                  notifyErrorFxn("file is already registered as 'Other'")
                  dispatch(saveFileToDisplay([...fileToDisplay,"otherMusicFiles"]))
                  console.log("we are tyring to make other into other so, we are doing nothing for now")
                  const musicFileToMakeInstrumental = currentSong.otherMusicFiles.filter((file)=>(file.individualId !== item.individualId)).length?  currentSong.otherMusicFiles.filter((file)=>(file.individualId === item.individualId))[0]:null
                  
                 //  dispatch(saveCurrentSong({
                 //    ...currentSong,
                 //    otherMusicFiles:currentSong.otherMusicFiles.filter((file)=>(file.individualId !== item.individualId)),
                 //    instrumentalTemporaryUrl:musicFileToMakeInstrumental.mediaTemporaryUrl,
                 //  instrumentalInformation:{ 
                 //   ...currentSong.instrumentalInformation,
                 //    name:musicFileToMakeInstrumental.name,
                 //    size:musicFileToMakeInstrumental.size,
                 //    type:musicFileToMakeInstrumental.type,
                 //    metadata:musicFileToMakeInstrumental.metadata
                 //       }
                 //  }))
                  
                  
               
                
                 }


                 :
                 console.log("in changing file roles, we are doing nothing for now")
                 } 
                  >
                  <Typography sx={{ fontSize: "12px", fontFamily: "inter", fontWeight: "500" }}
                  >{ item.title }</Typography>
                 
                  </Box>
                  </MenuItem>
                  ) )
                  }
                  </Box>
                  </Menu>

        </div>





       ))
       }

                
                {/*<SongCreatorHeadComponent type="sound" pos={"bottom"} />*/}

         </div>
         )}
        </Droppable>
        </div>
        }
            </Box>

        </Box>
    )
}

export default CreateNewSongComponent;