import {  Menu, MenuItem, Select, Typography } from "@mui/material";
import { useEffect, useState,useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextField, InputAdornment, Box } from "@mui/material";
import { FaPlus } from "react-icons/fa";

import { saveCurrentSong,saveCurrentCoverArt, saveSongCreatorSongs, saveFileToDisplay,saveOtherMusicFileIdsToDisplay, saveListOfNewSongsBeingComposed, saveSongCreatorActiveSongId, saveListOfNewSongsBeingCreated } from "src/redux/reducers/group.slice";
import ListingComponent from "src/SeperateComponent/MusicCatalog/listing.component";
import { notifyErrorFxn, notifySuccessFxn } from "src/utils/toast-fxn";
import uuidv4 from "src/utils/uuidv4";
import SongFileListingComponent from "src/SeperateComponent/MusicCatalog/song-file-listing.component";
import { Element } from "react-scroll";
import FileCreatorLongComponent from "src/SeperateComponent/MusicCatalog/file-creator-long.component";
import FileCreatorSelectComponent from "src/SeperateComponent/MusicCatalog/file-creator-select.component";

const SongFileFormComponent = () => {

    const dispatch= useDispatch()
   

    const imageFormats = ["jpg", "jpeg", "png", "gif", "bmp", "webp", "tiff", "svg"];
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

   
   const customAnchorRef =useRef(null)
    const { currentSong,songCreatorSongs,allFiles,fileToDisplay,otherMusicFileIdsToDisplay,listOfNewSongsBeingCreated } = useSelector((state) => state.group);
    const identifyingId = currentSong && currentSong.composedSongIdentifyingId ? currentSong.composedSongIdentifyingId:''

    console.log("LIST OF NEW SONGS BEING CREATED--->",listOfNewSongsBeingCreated)

         
    const moveFileToSong = (songInterimHolder,listOfNewSongsBeingCreated,identifyingId ) => {
        //dago stopped here 3
        //YOU ALSO NEED TO UPDATE THE CURRENT SONG ALONG WITH FINDING THE SONGS IN THE LIST OF NEW SONGS BEING COMPOSED
        //YOU NEED TO ALSO GET THE IDENTIFYING ID SOMEHOW
        //dispatch(saveSongCreatorActiveSongId(identifyingId))
        /**CRAZY LOGIC START */

        console.log("OUR IDENTIFYING ID IN MOVE FILE TO SONG IS--->",identifyingId)

        
 
      if(songInterimHolder && songInterimHolder.name &&  imageFormats.some((format) => (songInterimHolder.name.toLowerCase().includes(format)) )){
        
          console.log("I INCLUDE V2!!!")
          if(true/*currentSong*/){ 
  
          if(true/*currentSong && currentSong.otherMusicFiles*/){
           //mar -13 -Dagogo - I removed cover art from being saved in other music files
         //OLD LOGIC FOR GUIDANCE -- dispatch(saveCurrentSong({...currentSong,coverArtName:songInterimHolder.name,coverArtUrl:songInterimHolder.mediaTemporaryUrl/*,otherMusicFiles:[...currentSong.otherMusicFiles,songInterimHolder]*/  }))
        
              dispatch(
              saveCurrentSong({
              ...currentSong,
              coverArtName:songInterimHolder.name,
              coverArtUrl:songInterimHolder.mediaTemporaryUrl
              })
              );


         dispatch(saveListOfNewSongsBeingCreated(listOfNewSongsBeingCreated.map((item)=>(
      
          item.identifyingId === identifyingId?

          {
            ...item,
            //name:songInterimHolder.name,
            song:{
              ...item.song,
              coverArtName:songInterimHolder.name,
              coverArtUrl:songInterimHolder.mediaTemporaryUrl
            }
           
            

          }

          :
         item
        ))))
        
        }
         
        
        }
        
        }
  
        else if(listOfNewSongsBeingCreated.filter((item)=>(item.identifyingId === identifyingId)) &&
         listOfNewSongsBeingCreated.filter((item)=>(item.identifyingId === identifyingId))[0] &&
           listOfNewSongsBeingCreated.filter((item)=>(item.identifyingId === identifyingId))[0].song  &&
           listOfNewSongsBeingCreated.filter((item)=>(item.identifyingId === identifyingId))[0].song.mediaTemporaryUrl &&
            listOfNewSongsBeingCreated.filter((item)=>(item.identifyingId === identifyingId))[0].song.mediaTemporaryUrl !== null ){
          console.log("ARRAY OF OTHER MUSIC FILES IS ABOUT TO BE MODIFIED",songInterimHolder)
          
  
         //OLD LOGIC 4 GUIDANCE dispatch(saveCurrentSong({...currentSong,otherMusicFiles:currentSong.otherMusicFiles && currentSong.otherMusicFiles.length > 0 ?[ ...currentSong.otherMusicFiles,songInterimHolder ]: [songInterimHolder] }))
       
      //saving current song along with the song in list of files being composed
         dispatch(
          saveCurrentSong({
          ...currentSong,
          otherMusicFiles:currentSong.otherMusicFiles && currentSong.otherMusicFiles.length > 0 && 
          //code below is to check if the song or file exists already in the other music files
          currentSong.otherMusicFiles.filter((item)=>(item.individualId === songInterimHolder.individualId)).length === 0
              ?
          [ ...currentSong.otherMusicFiles,songInterimHolder ]
          : 
          
          currentSong.otherMusicFiles && currentSong.otherMusicFiles.length > 0 && 
          //code below is to check if the song or file exists already in the other music files
          currentSong.otherMusicFiles.filter((item)=>(item.individualId === songInterimHolder.individualId)).length > 0
              ?
          [ ...currentSong.otherMusicFiles ]
          
          :
          [songInterimHolder]
          })
          );




          dispatch(saveListOfNewSongsBeingCreated(listOfNewSongsBeingCreated.map((item)=>(
      
            item.identifyingId === identifyingId?
  
            {
              ...item,
             song:{
              ...item.song,
              otherMusicFiles:item.song.otherMusicFiles && item.song.otherMusicFiles.length > 0 && 
              //code below is to check if the song or file exists already in the other music files
              item.song.otherMusicFiles.filter((item)=>(item.individualId === songInterimHolder.individualId)).length === 0
                  ?
              [ ...item.song.otherMusicFiles,songInterimHolder ]
              : 
              
              item.song.otherMusicFiles && item.song.otherMusicFiles.length > 0 && 
              //code below is to check if the song or file exists already in the other music files
              item.song.otherMusicFiles.filter((item)=>(item.individualId === songInterimHolder.individualId)).length > 0
                  ?
              [ ...item.song.otherMusicFiles ]
              
              :
              [songInterimHolder]
             }
             
  
            }
  
            :
           item
          ))))
       
        }
     
        else{

          //saving current song along with list of songs being updated  composed, so the save button can work(be able to update just one song) in the metadata modal
          dispatch(saveCurrentSong(songInterimHolder))

          dispatch(saveListOfNewSongsBeingCreated(listOfNewSongsBeingCreated.map((item)=>(
      
            item.identifyingId === identifyingId?
  
            {
              ...item,
              name:songInterimHolder.name,
              song:songInterimHolder
            
              
  
            }
  
            :
           item
          ))))
        }



      /*CRAZY LOGIC END */
      handleCloseNewList() //hoisting occurs here because function is below
        };


        //const [open,setOpen] = useState(false)
        const [previouslyUploadedFiles,setPreviouslyUploadedFiles] = useState(allFiles)
        const [anchorEl, setAnchorEl] = useState(null);
        const [anchorEl2, setAnchorEl2] = useState(null);
        const [anchorEl3, setAnchorEl3] = useState(null);
        const [anchorEl4, setAnchorEl4] = useState(null);
        const [anchorElNewList, setAnchorElNewList] = useState(null);

        const open = Boolean(anchorEl);
        const open2 = Boolean(anchorEl2);
        const open3 = Boolean(anchorEl3);

        const openNewList = Boolean(anchorElNewList);


        const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        //setAnchorElNewList(customAnchorRef.current);
        //setOpen(true)
        };
        const handleClose = () => {
        setAnchorEl(null);
        };

        const handleCloseNewList = () => {
          setAnchorElNewList(null);
          setAnchorEl(null);
          };

        const handleClickTop = (event) => {
           // event.stopPropagation()
            //setAnchorElNewList(event.currentTarget);
              setAnchorElNewList(customAnchorRef.current);
            
              //dispatch(fetchSongsForOnePlaylist(fileFullDetails && fileFullDetails.playlistId))
          };


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
            // setAnchorEl4(event.currentTarget);
            // //setOpen4(true)
            // };
            
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
            
           
            const handleClose2 = () => {
            setAnchorEl2(null);
            };
            
            const handleClose3 = () => {
            setAnchorEl3(null);
            };
        
        
        const allowedDocumentTypes = [
        "application/svg+xml", // Alternative SVG MIME type
        "application/pdf", // PDF
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // DOCX
        "application/msword", // DOC (older format)
        "application/vnd.ms-excel", // XLS (older Excel format, sometimes used for CSV)
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // XLSX (newer Excel format)
        "application/vnd.ms-excel.sheet.macroEnabled.12", // XLSM (Excel with macros)
        "application/vnd.ms-excel.template.macroEnabled.12", // XLTM (Excel macro-enabled template)
        "application/vnd.openxmlformats-officedocument.spreadsheetml.template", // XLTX (Excel template)
        "application/vnd.oasis.opendocument.spreadsheet", // ODS (OpenDocument Spreadsheet)
        "text/csv", // Standard CSV format
        "application/csv" // Alternative CSV MIME type
        ];

        const allowedTypes = [ //allowedtypes is here because only music files should show select version butotn
        "audio/mpeg", // mp3
        "audio/mp3", // mp3
        "audio/mp4",  // mp4
      ]



    const formData = [
        { label: "Main Master File", placeholder:currentSong && currentSong.metadata &&  currentSong.metadata.mainMasterFile?currentSong.metadata.mainMasterFile : "Select", type: "text" },
        { label: "Document File", placeholder:currentSong && currentSong.metadata &&  currentSong.metadata.documentFile?currentSong.metadata.documentFile.name : "Click To Select", type: "text" },
        { label: "Link to Files", placeholder:currentSong && currentSong.metadata &&  currentSong.metadata.linkToFiles?currentSong.metadata.linkToFiles : "DISCO, Dropbox or Google Drive", type: "text" },
        { label: "Link to Listen", placeholder:currentSong && currentSong.metadata &&  currentSong.metadata.linkToListen?currentSong.metadata.linkToListen : "Enter Spotify link", type: "text" }
    ]

    return (
        <Box style={{width:"50rem",scale:"1",display:"flex",flexDirection:"column",gap:"5px",position:"relative"}}>

{<p ref={customAnchorRef} style={{position:"absolute",left:"10rem",top:"14rem",color:"transparent",opacity:"0",userSelect:"none"}}>anchor</p>}


           <Box /*onClick={(e)=>{handleClickTop(e)}}*/  sx={{ width: "100%", cursor: "pointer" }}>
              <TextField
                fullWidth
                variant="outlined"
                value="Versions"
                onClick={handleClickTop}
                InputProps={{
                  readOnly: true,
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaPlus /*onClick={(e)=>{handleClickTop(e)}}*/ style={{color:/*'white'*/'#A01565',cursor: "pointer",fontSize:"1.1rem" }}/>
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                     <span style={{ color: '#000000',marginRight:"150px", fontSize:"1rem" }}>Type</span>
                   </InputAdornment>
                  ),
                }}
                sx={{
                    backgroundColor:"#FFFFFF",
                    cursor: "pointer" ,
                    color:"#000000",
                    
                  pointerEvents: "none", // prevents internal input events
                  "& .MuiInputBase-root": {
                    pointerEvents: "auto", // re-enable pointer events for the wrapper
                  },
                  "& .MuiInputBase-input": {
                    color: "#000000", // sets input text color
                    //fontSize: "1.1rem", // ⬅️ added this line to set the input text font size
                  },
                  "& .MuiInputAdornment-root": {
                    color: "#000000", // fallback to ensure adornments are also black
                  },
                }}
              />
            </Box>



            <Element  name="scrollContainer" style={{ overflowY: 'auto', maxHeight:"450px", scrollbarWidth: 'none', 
 msOverflowStyle: 'auto'}}>
            <div style={{marginTop:"-0rem"}} >
           
       
       {(currentSong && currentSong.mediaUrl || currentSong && currentSong.mediaTemporaryUrl) && currentSong.name && /*(fileToDisplay.includes("mediaTemporaryUrl") ||fileToDisplay.includes("mediaUrl") ) &&*/
   
       
       <div  /*onClick={(e)=>{handleClick(e)}}*/ >
        

           <span >
           <SongFileListingComponent handleClick={handleClick}  title={currentSong.name && currentSong.name.length>maxChars?currentSong.name.substring(0,maxChars)+'...':currentSong.name} btn={(currentSong && currentSong.mediaUrl || currentSong && currentSong.mediaTemporaryUrl)?"Main":"Select Version"} fileFullDetails={currentSong} fileToDelete={"mediaTemporaryUrl"} />
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
             menuOptions.map( (option, i) => (
             <MenuItem onClick={handleClose}>
             <Box sx={{ display: "flex", justifyContent: "space-between",width:"100%" }}
             onClick={ option.title === "Main" ? 
             ()=>{
             
              notifyErrorFxn("File is already set as Main track!")
               
              const songInFocus = listOfNewSongsBeingCreated.filter((song)=>(song.song.songId === currentSong.songId))[0] && listOfNewSongsBeingCreated.filter((song)=>(song.song.songId === currentSong.songId))[0].song
              //const updatedSongCreatorSongs = listOfNewSongsBeingCreated.map((song)=>(song.song.songId ===currentSong.songId?songInFocus:song ))
             
              const updatedSongCreatorSongs = listOfNewSongsBeingCreated.map((item)=>(item.song.songId ===currentSong.songId?{...item,song:{...songInFocus}}:item ))
             //we are setting the main song as main, for a particular song in song creator songs, so we literally do nothing
               dispatch(saveListOfNewSongsBeingCreated([
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
               const songInFocus = listOfNewSongsBeingCreated.filter((song)=>(song.song.songId === currentSong.songId))[0] && listOfNewSongsBeingCreated.filter((song)=>(song.song.songId === currentSong.songId))[0].song

               const otherMusicFilesHolder = currentSong.otherMusicFiles?[...currentSong.otherMusicFiles]:[]


               if(otherMusicFilesHolder && !otherMusicFilesHolder.some((musicFile)=>(musicFile.individualId === songInFocus.individualId ) )){
                //IF IT'S NOT ALREADY IN OTHER MUSIC FILES, THEN PUSH IT, BUT IF IT IS, DO NOTHING
    
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

            }
              
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
                   size:songInFocus.size,
                 }
               }

              const updatedSongCreatorSongs = listOfNewSongsBeingCreated.map((item)=>(item.song.songId ===currentSong.songId?{...item,song:{...updatedSongInFocus}}:item ))
             
               dispatch(saveListOfNewSongsBeingCreated([
                 ...updatedSongCreatorSongs,
               
               ]))


             }
              
             dispatch(saveFileToDisplay([...fileToDisplay,"instrumentalTemporaryUrl"]))
             notifySuccessFxn("File saved as Instrumental")
            
             }
             :
             
            
             option.title === "Other"?
             ()=>{  

               const songInFocus = listOfNewSongsBeingCreated.filter((song)=>(song.song.songId === currentSong.songId))[0] && listOfNewSongsBeingCreated.filter((song)=>(song.song.songId === currentSong.songId))[0].song


              const otherMusicFilesHolder = currentSong.otherMusicFiles?[...currentSong.otherMusicFiles]:[]

              if(otherMusicFilesHolder && !otherMusicFilesHolder.some((musicFile)=>(musicFile.individualId === songInFocus.individualId ) )){
                //IF IT'S NOT ALREADY IN OTHER MUSIC FILES, THEN PUSH IT, BUT IF IT IS, DO NOTHING
    
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

            }

              
                const updatedSongInFocus = { ...songInFocus, otherMusicFiles:[...otherMusicFilesHolder],
                 mediaTemporaryUrl:null,size:null,type:null,name:null}
                  
              //const updatedSongCreatorSongs = listOfNewSongsBeingCreated.map((song)=>(song.song.songId ===currentSong.songId?updatedSongInFocus:song ))
              const updatedSongCreatorSongs = listOfNewSongsBeingCreated.map((item)=>(item.song.songId ===currentSong.songId?{...item,song:{...updatedSongInFocus}}:item ))
               console.log("EXAMPLE OF MAIN TO OTHER-->",updatedSongCreatorSongs)
               dispatch(saveListOfNewSongsBeingCreated([
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
             <Typography sx={{ fontSize: 14, fontFamily: "inter", fontWeight: "500" }}
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
           <SongFileListingComponent handleClick={handleClick2}  title={currentSong.instrumentalInformation && currentSong.instrumentalInformation.name && currentSong.instrumentalInformation.name.length>maxChars?currentSong.instrumentalInformation.name.substring(0,maxChars)+'...':currentSong && currentSong.instrumentalInformation && currentSong.instrumentalInformation.name} btn={(currentSong && currentSong.instrumentalUrl || currentSong && currentSong.instrumentalTemporaryUrl|| currentSong.instrumentalInformation && currentSong.instrumentalInformation.instrumentalUrl||currentSong.instrumentalInformation && currentSong.instrumentalInformation.instrumentalTemporaryUrl ) ? "Instrumental":"Select Version"} fileFullDetails={currentSong} fileToDelete={"instrumentalTemporaryUrl"} />
           </span>
            

           <Menu
           id="basic-menu"
           anchorEl={anchorEl2}
         open={open2}
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
              

             const songInFocus = listOfNewSongsBeingCreated.filter((song)=>(song.song.songId === currentSong.songId))[0] && listOfNewSongsBeingCreated.filter((song)=>(song.song.songId === currentSong.songId))[0].song


             const otherMusicFilesHolder = currentSong.otherMusicFiles?[...currentSong.otherMusicFiles]:[]

          if(otherMusicFilesHolder && !otherMusicFilesHolder.some((musicFile)=>(musicFile.individualId === songInFocus.individualId ) )){
            //IF IT'S NOT ALREADY IN OTHER MUSIC FILES, THEN PUSH IT, BUT IF IT IS, DO NOTHING


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
            }
              
             const updatedSongInFocus = { ...songInFocus,
               otherMusicFiles:[...otherMusicFilesHolder],
                mediaTemporaryUrl:songInFocus.instrumentalTemporaryUrl|| songInFocus.instrumentalInformation.instrumentalTemporaryUrl ,
                mediaUrl:songInFocus.instrumentalUrl||songInFocus.instrumentalUrl|| songInFocus.instrumentalInformation.instrumentalUrl,
                instrumentalUrl:null,
                instrumentalInformation:{}
              }

           //const updatedSongCreatorSongs = listOfNewSongsBeingCreated.map((song)=>(song.song.songId ===currentSong.songId?updatedSongInFocus:song ))
           const updatedSongCreatorSongs = listOfNewSongsBeingCreated.map((item)=>(item.song.songId ===currentSong.songId?{...item,song:{...updatedSongInFocus}}:item ))
          //instrumental to main

             console.log("INSTRUMENTAL TO MAIN")
          
           
          
          dispatch(saveListOfNewSongsBeingCreated([
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
               
             const songInFocus = listOfNewSongsBeingCreated.filter((song)=>(song.song.songId === currentSong.songId))[0] && listOfNewSongsBeingCreated.filter((song)=>(song.song.songId === currentSong.songId))[0].song
             //const updatedSongCreatorSongs = listOfNewSongsBeingCreated.map((song)=>(song.song.songId ===currentSong.songId?songInFocus:song ))
             const updatedSongCreatorSongs = listOfNewSongsBeingCreated.map((item)=>(item.song.songId ===currentSong.songId?{...item,song:{...songInFocus}}:item ))
            console.log("INSTRUMENTAL TO INSTRUMENTAL, SO NOTHING IS BEING DONE")
              dispatch(saveListOfNewSongsBeingCreated([
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


            const songInFocus = listOfNewSongsBeingCreated.filter((song)=>(song.song.songId === currentSong.songId))[0] && listOfNewSongsBeingCreated.filter((song)=>(song.song.songId === currentSong.songId))[0].song


              const otherMusicFilesHolder = currentSong.otherMusicFiles?[...currentSong.otherMusicFiles]:[]

                 console.log("INSTRUMENTAL TO OTHER")
                 if(otherMusicFilesHolder && !otherMusicFilesHolder.some((musicFile)=>(musicFile.individualId === songInFocus.individualId ) )){
                  //IF IT'S NOT ALREADY IN OTHER MUSIC FILES, THEN PUSH IT, BUT IF IT IS, DO NOTHING
      
              otherMusicFilesHolder &&  otherMusicFilesHolder.push({
               mediaTemporaryUrl:currentSong.instrumentalTemporaryUrl||currentSong.instrumentalUrl||currentSong.instrumentalInformation.instrumentalUrl ||currentSong.instrumentalInformation.instrumentalTemporaryUrl ,
               mediaUrl:currentSong.instrumentalUrl||currentSong.instrumentalInformation.instrumentalUrl ||currentSong.instrumentalInformation.instrumentalTemporaryUrl||currentSong.instrumentalTemporaryUrl,
                  ...currentSong.instrumentalInformation,
                  instrumentalInformation:currentSong.instrumentalInformation,
     
              })
            }
              
                const updatedSongInFocus = { 
                 ...songInFocus,
                  otherMusicFiles:[...otherMusicFilesHolder],
                 instrumentalTemporaryUrl:null,
                 instrumentalUrl:null,
              instrumentalInformation:{ 
               
                   }}

              //const updatedSongCreatorSongs = listOfNewSongsBeingCreated.map((song)=>(song.song.songId ===currentSong.songId?updatedSongInFocus:song ))
              const updatedSongCreatorSongs = listOfNewSongsBeingCreated.map((item)=>(item.song.songId ===currentSong.songId?{...item,song:{...updatedSongInFocus}}:item ))
            
               dispatch(saveListOfNewSongsBeingCreated([
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
           <Typography sx={{ fontSize: 14, fontFamily: "inter", fontWeight: "500" }}
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
                <SongFileListingComponent handleClick={handleClick3}  title={currentSong.coverArtName?
                                                                     
                                                                     currentSong.coverArtName.length>maxChars?currentSong.coverArtName && currentSong.coverArtName.substring(0,maxChars)+'...':currentSong.coverArtName
                                                                     :
                                                                    currentSong.coverArtUrl.split('/').pop().substring(0,maxChars)
                                                                    
                                                                    } btn={currentSong.coverArtName||currentSong.coverArtUrl ?"Other":"Select Version"} fileFullDetails={currentSong} fileToDelete={"coverArtUrl"} />
                </span>

                <Menu
                id="basic-menu"
                anchorEl={anchorEl3}
                open={open3}
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
                <Typography sx={{ fontSize: 14, fontFamily: "inter", fontWeight: "500" }}
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
    <SongFileListingComponent overArchingSongId={currentSong && currentSong.songId} handleClick={(event) => handleClick4(event, index)}  title={item.name && item.name.length>maxChars?item.name.substring(0,maxChars)+'...':item.name} btn={item.name?"Other":"Select Version"} fileFullDetails={item} fileToDelete={"otherMusicFiles"}  individualId={item.individualId?item.individualId:null}/>
    </span>
    
    <Menu
               id={`basic-menu-${index}`}
               anchorEl={anchorEls[index]} // Use unique anchorEl
              open={openIndex === index} // Only open when matched
               onClose={handleClose4}
             MenuListProps={{
             'aria-labelledby': 'basic-menu',
             }}
             sx={{ borderRadius: "6px"}}
             >
             <Box py={0.5} px={1}>
             { 
          menuOptions4.map( (option, i) => (
           
             <MenuItem onClick={handleClose4}>
             <Box sx={{ display: "flex", justifyContent: "space-between",width:"100%" }}
            onClick={ 
            ()=>{
              
             if(option.title === "Main" ) {
             const musicFileToMakeMain = currentSong.otherMusicFiles.filter((file)=>(file.individualId === item.individualId)).length?  currentSong.otherMusicFiles.filter((file)=>(file.individualId === item.individualId))[0]:null
             console.log("OTHER TO MAIN-->",item)
             console.log("CURRENT SONG TO MAIN-->",currentSong)
            

             const songInFocus = listOfNewSongsBeingCreated.filter((song)=>(song.song.songId === currentSong.songId))[0] && listOfNewSongsBeingCreated.filter((song)=>(song.song.songId === currentSong.songId))[0].song

             const otherMusicFilesHolder = [...currentSong.otherMusicFiles]
               
             //we push the main song into other so that it doesnt end up getting deleted, in case we want to make it main again
             //it will get filtered out shortly below
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

              //const updatedSongCreatorSongs = listOfNewSongsBeingCreated.map((song)=>(song.song.songId ===currentSong.songId?updatedSongInFocus:song ))
              const updatedSongCreatorSongs = listOfNewSongsBeingCreated.map((item)=>(item.song.songId ===currentSong.songId?{...item,song:{...updatedSongInFocus}}:item ))
            
               dispatch(saveListOfNewSongsBeingCreated([
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
              const musicFileToMakeInstrumental = currentSong.otherMusicFiles.filter((file)=>(file.individualId === item.individualId)).length?  currentSong.otherMusicFiles.filter((file)=>(file.individualId === item.individualId))[0]:null
              

              const songInFocus = listOfNewSongsBeingCreated.filter((song)=>(song.song.songId === currentSong.songId))[0] && listOfNewSongsBeingCreated.filter((song)=>(song.song.songId === currentSong.songId))[0].song
              console.log("OTHER TO INSTRUMENTAL-->",item)

              const otherMusicFilesHolder = [...currentSong.otherMusicFiles]
               
              //we push the instrumenal file into other so that it doesnt end up getting deleted, in case we want to make it main again
              //dont think we need to push into other, when taking from other, so i commented out the push below,
             // otherMusicFilesHolder.push({
             //  
             //   mediaUrl:songInFocus.instrumentalUrl||songInFocus.instrumentalTemporaryUrl,
             //   name:songInFocus.instrumentalInformation && songInFocus.instrumentalInformation.name,
             //   size:songInFocus.instrumentalInformation && songInFocus.instrumentalInformation.size,
             //   type:songInFocus.instrumentalInformation && songInFocus.instrumentalInformation.type,
             //   metadata:songInFocus.instrumentalInformation && songInFocus.instrumentalInformation.metadata,
             //   individualId:songInFocus.instrumentalInformation && songInFocus.instrumentalInformation.individualId
             // })


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

               //const updatedSongCreatorSongs = listOfNewSongsBeingCreated.map((song)=>(song.song.songId ===currentSong.songId?updatedSongInFocus:song ))
               const updatedSongCreatorSongs = listOfNewSongsBeingCreated.map((item)=>(item.song.songId ===currentSong.songId?{...item,song:{...updatedSongInFocus}}:item ))
             
                dispatch(saveListOfNewSongsBeingCreated([
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
             <Typography sx={{ fontSize: 14, fontFamily: "inter", fontWeight: "500" }}
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
   </Element>   



   {/*previouslyUploadedFiles  && previouslyUploadedFiles.length > 0  && previouslyUploadedFiles.filter((item)=>(item.type !== "audio/aiff"&& item.type !== "audio/x-aiff"&& item.type !== "audio/wav"&& item.type !== "audio/x-wav" )).map((file, index) => (



<FileCreatorSelectComponent show={false} file={file.file} fileFullDetails={file} name={file.name}  uploadStatus={file && file.type ==='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'||
file && file.type ==="application/vnd.ms-excel"  ||
file && file.type ==="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"||
file && file.type ==="application/vnd.ms-excel.sheet.macroEnabled.12"||
file && file.type ==="application/vnd.ms-excel.template.macroEnabled.12"||
file && file.type ==="application/vnd.openxmlformats-officedocument.spreadsheetml.template"||
file && file.type ==="application/vnd.oasis.opendocument.spreadsheet" 
?'application/xlsx':file && file.type ==='application/vnd.openxmlformats-officedocument.wordprocessingml.document'?'application/doc':file && file.type}  indexToBeRemoved={index} fileToDelete={imageFormats.some((format) => (file.name.toLowerCase().includes(format)))?"coverArtUrl":"mediaTemporaryUrl"}/>


))
*/}



                 {/* OLD, RAW LIST MENU ITEM, IN CASE I NEED IT IN FUTURE..
                 <MenuItem onClick={handleClose}>
                 //     <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                 //     <Typography sx={{ fontSize: 14, fontFamily: "inter", fontWeight: "500" }}
                 //     
                 //     onClick={(e) => {
                 //       //let newSongDetails = { ...currentSong };
                 //       //let metadata2 =currentSong.metadata?{...currentSong.metadata}:{}
                 //       //
                 //       //metadata2.documentFile = item; //DAGO STOPPED HERE
                 //       //
                 //       //dispatch(
                 //       //saveCurrentSong({
                 //       //...newSongDetails,
                 //       //metadata:metadata2
                 //       //})
                 //       //);
                 //       //
                 //       //
                 //       //dispatch(saveListOfNewSongsBeingCreated(
                 //       //listOfNewSongsBeingCreated.map((song)=>(
                 //       //song.songId === currentSong.songId ?
                 //       //{
                 //       //...newSongDetails,
                 //       //metadata:metadata2
                 //       //}
                 //       //:
                 //       //song
                 //       //))
                 //       //))
                 //       /*I WAS UPDATING DOCUMENT FILE ABOVE, NOW I'M NOT DOING THAT ANY MORE */

                 //      /**NOW I AM UPDATING CURRENT THE SONG WITH THE FILE CHOSEN FROM THIS LIST --BELOW */

                 //     moveFileToSong(item,listOfNewSongsBeingCreated,currentSong.composedSongIdentifyingId && currentSong.composedSongIdentifyingId )




                 //       }}
                 //     
                 //     >
                 //     { item.name }
                 //     </Typography>
                 //     </Box>
                 //     </MenuItem>
                    }



                  <Menu
                      id="basic-menu"
                      anchorEl={anchorElNewList}
                      open={openNewList}
                      onClose={handleCloseNewList}
                      MenuListProps={{
                      'aria-labelledby': 'basic-button',
                      }}
                      sx={{ borderRadius: "6px",
                      transform: 'translateX(-100px) translateY(180px)',
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
                      transform: ' translateY(120px)',
                      //position:"absolute",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      background: "#252328", // custom background
                      height: "700px", // custom height
                      width: "1220px", // optional width if you want a wide menu
                      }
                      }}
                      >

<Element name="scrollContainer" style={{overflowY:'auto',maxHeight:"450px",scrollbarWidth:'none',msOverflowStyle: 'auto',minWidth:"70rem"}}> 
                      <Box py={0.5} px={0}>

                    
   {previouslyUploadedFiles  && previouslyUploadedFiles.length > 0  && previouslyUploadedFiles.filter((item)=>(allowedTypes.includes(item.type)/*item.type !== "audio/aiff"&& item.type !== "audio/x-aiff"&& item.type !== "audio/wav"&& item.type !== "audio/x-wav" */)).map((file, index) => (
      
  
<MenuItem onClick={()=>{moveFileToSong(file,listOfNewSongsBeingCreated,currentSong.composedSongIdentifyingId && currentSong.composedSongIdentifyingId )}}>
<FileCreatorSelectComponent show={false} file={file.file} fileFullDetails={file} name={file.name}  uploadStatus={file && file.type ==='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'||
file && file.type ==="application/vnd.ms-excel"  ||
file && file.type ==="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"||
file && file.type ==="application/vnd.ms-excel.sheet.macroEnabled.12"||
file && file.type ==="application/vnd.ms-excel.template.macroEnabled.12"||
file && file.type ==="application/vnd.openxmlformats-officedocument.spreadsheetml.template"||
file && file.type ==="application/vnd.oasis.opendocument.spreadsheet" 
?'application/xlsx':file && file.type ==='application/vnd.openxmlformats-officedocument.wordprocessingml.document'?'application/doc':file && file.type}  indexToBeRemoved={index} fileToDelete={imageFormats.some((format) => (file.name.toLowerCase().includes(format)))?"coverArtUrl":"mediaTemporaryUrl"}/>

</MenuItem>
))
}

                      </Box>
                      </Element>
                      </Menu> 

                      




            {/*THE OLD STYLE IS BELOW I DIDNT DELETE IN CASE WE NEED TO REVERT - APR -10 2025 DAGOGO */}
            {/*
                formData.map( (item, key) => (
                    <Box my={1} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <Typography mr={1} sx={{ fontSize: 14, fontFamily: "inter", fontWeight: "bold" }}>
                            { item.label }:
                        </Typography>

                  { item.label=== "Document File"?

                  
                    <>
                    

                    <input 
                            placeholder={ item.placeholder }
                            readOnly
                            style={{ 
                                padding: "2px 6px", fontSize: "13px", fontFamily: "inter", outline: "none", 
                                width: "64%" ,cursor:"pointer"
                            }}
                            type={ item.type }
                            onClick={(e)=>{handleClickTop(e)}} 
                        />
                    
                    
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
                      { previouslyUploadedFiles && previouslyUploadedFiles.length > 0 && 
                      previouslyUploadedFiles && previouslyUploadedFiles.length > 0 && 
                      previouslyUploadedFiles.filter((file)=>(allowedDocumentTypes.some((format) => (file.type.includes(format)))) ).map( (item, i) => (
                      <MenuItem onClick={handleClose}>
                      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                      <Typography sx={{ fontSize: 14, fontFamily: "inter", fontWeight: "500" }}
                      
                      onClick={(e) => {
                        let newSongDetails = { ...currentSong };
                        let metadata2 =currentSong.metadata?{...currentSong.metadata}:{}
                        
                        metadata2.documentFile = item; //DAGO STOPPED HERE
                        
                        dispatch(
                        saveCurrentSong({
                        ...newSongDetails,
                        metadata:metadata2
                        })
                        );
                        
                        
                        dispatch(saveListOfNewSongsBeingCreated(
                        listOfNewSongsBeingCreated.map((song)=>(
                        song.songId === currentSong.songId ?
                        {
                        ...newSongDetails,
                        metadata:metadata2
                        }
                        :
                        song
                        ))
                        ))
                        }}
                      
                      >
                      { item.name }
                      </Typography>
                      </Box>
                      </MenuItem>
                      ) )
                      }
                      </Box>
                      </Menu> 

                    </>
                  :
                 
                        <input 
                            placeholder={ item.placeholder }
                            style={{ 
                                padding: "2px 6px", fontSize: "13px", fontFamily: "inter", outline: "none", 
                                width: "64%" 
                            }}
                            type={ item.type }

                            onChange={(e)=>{
                           
                                let newSongDetails = {...currentSong}
                                let metadata2 =currentSong.metadata?{...currentSong.metadata}:{}
   
                              item.label === "Main Master File"?  metadata2["mainMasterFile"] = e.target.value
                              :
                            
                              item.label === "Link to Files"?  metadata2["linkToFiles"] = e.target.value
                              : 
                              metadata2["linkToListen"] = e.target.value
   
                               dispatch(saveCurrentSong(
                                   {...newSongDetails,
                                    metadata:metadata2
                                     
                                 }))
   
                             }}
                        />
                    
                        
                        }
                    </Box>
                ) )
            */}
        
        {/*
            <Typography mt={2} sx={{ fontSize: "14px", fontFamily: "inter" }}>
                To add song files, go to 
                <span style={{ marginRight: "9px", fontSize: "14px", fontFamily: "inter", fontWeight: "bold" }}> file manager</span>
            </Typography>
        */}

        </Box>
    )
}

export default SongFileFormComponent;
