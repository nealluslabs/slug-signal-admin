import { Box, Typography } from "@mui/material";

// Icons
import { FiberNew, Check, ReportProblem } from "@mui/icons-material";

import PlayImg from "src/assets/images/playpic.png";
import Sound from "src/assets/images/audiowaves.jpeg"
import { useDispatch } from "react-redux";
import {  setSelectedAudioState, setSelectedAudio, setSelectedAudioId,deleteFileFromSong} from 'src/redux/actions/group.action';
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { FaCaretSquareLeft, FaCaretSquareRight } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { LiaCaretSquareLeftSolid } from "react-icons/lia";
import { LiaCaretSquareRight } from "react-icons/lia";
import { PiCaretRightBold,PiCaretLeftBold } from "react-icons/pi";


const DialogModalOptionsComponent = ({ form, setForm,handleClose }) => {

    const dispatch = useDispatch()
//console.log("TYPE OF HANDLE CLOSE-->",handleClose)
console.log("WHAT IS THE SECOND HANDLE CLOSE COMPONENT-->",handleClose)
    const {selectedAudioId,
        selectedAudioState,
        currentSong} = useSelector((state)=> state.group)

    const options = [
        { title: "Song Info", icon: <Check />, active: "song-info" },
        { title: "Lyrics", icon: <Check />, active: "lyrics" },
        { title: "Ownership", icon: <ReportProblem sx={{ color: "#FBC756" }} />, active: "ownership" },
        { title: "Composition", icon: <Check />, active: "composition" },
        { title: "Recording", icon: <Check />, active: "recording" },
        { title: "Track Tags", icon: <Check />, active: "track-tags" },
        { title: "Song Files", icon: <Check />, active: "song-files" },
        { title: "Smart Contracts", icon: <FiberNew />, active: "smart-contracts" }
    ]


    const [play,setPlay] = useState(false)
const [loadingSubmit,setLoadingSubmit] = useState(false) 


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


    const playAudio = (e) => {
        e.stopPropagation()
        setPlay(!play)

        console.log("COMPARE!",currentSong,selectedAudioId)
        
        /*if(play === true){*/
        /*pressing pause on a current song */
        if(currentSong.individualId === selectedAudioId ){
            console.log("ITS TRUE OOO!")
            dispatch(setSelectedAudioState(!selectedAudioState))
        }
        /**changing to a new song */
        if(currentSong.individualId !== selectedAudioId ){ 
        dispatch(setSelectedAudioId(currentSong && currentSong.individualId))
        dispatch(setSelectedAudio(currentSong && currentSong.mediaUrl?currentSong.mediaUrl:currentSong && currentSong.mediaTemporaryUrl ))
        dispatch(setSelectedAudioState(true))
        }
      /*  }*/
        
        };

        const handleFormPrevious= ()=>{

            const options = [
                { title: "Song Info", icon: <Check />, active: "song-info" },
                { title: "Lyrics", icon: <Check />, active: "lyrics" },
                { title: "Ownership", icon: <ReportProblem sx={{ color: "#FBC756" }} />, active: "ownership" },
                { title: "Composition", icon: <Check />, active: "composition" },
                { title: "Recording", icon: <Check />, active: "recording" },
                { title: "Track Tags", icon: <Check />, active: "track-tags" },
                { title: "Song Files", icon: <Check />, active: "song-files" },
                { title: "Smart Contracts", icon: <FiberNew />, active: "smart-contracts" }
            ]

        
    const currentIndex = options.findIndex(item => item.active === form);

    if (currentIndex > 0) {
        const previousForm = options[currentIndex - 1].active;
        setForm(previousForm);  // Assuming setForm is defined in your scope
    }

    console.log("FORM IS NOW--->", form);
            console.log("FORM IS NOW--->",form)
        }

        const handleFormNext = ()=>{

            const options = [
                { title: "Song Info", icon: <Check />, active: "song-info" },
                { title: "Lyrics", icon: <Check />, active: "lyrics" },
                { title: "Ownership", icon: <ReportProblem sx={{ color: "#FBC756" }} />, active: "ownership" },
                { title: "Composition", icon: <Check />, active: "composition" },
                { title: "Recording", icon: <Check />, active: "recording" },
                { title: "Track Tags", icon: <Check />, active: "track-tags" },
                { title: "Song Files", icon: <Check />, active: "song-files" },
                { title: "Smart Contracts", icon: <FiberNew />, active: "smart-contracts" }
            ]

           
  

    
    const currentIndex = options.findIndex(item => item.active === form);

    if (currentIndex > -1 && currentIndex < options.length - 1) {
        const nextForm = options[currentIndex + 1].active;
        setForm(nextForm);  // Assuming setForm is in scope
    }

    console.log("FORM IS NOW--->", form);
        }
        

    return (
        <>
  
       <Box sx={{ display: "flex", alignItems: "center",justifyContent:"space-between" }}>
       {/* <Box component="img" src={ play?currentSong.coverArtUrl && currentSong.coverArtUrl:currentSong.coverArtUrl? currentSong.coverArtUrl:Sound } onClick={()=>{setPlay(!play)}} sx={{ width: 60, height: 50, marginRight: "14px" }} /> */}
      
       <Box sx={{ display: "flex", alignItems: "center",justifyContent:"flex-start" }}>
         <Box onClick={(e)=>{playAudio(e)}}
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
         opacity:play && currentSong.uploadId === selectedAudioId? 0.5:1, // Adjust transparency of the background image
         zIndex: 100,
         },
         }}
         /> 
         
         
         
         <Box>
         <Typography sx={{ fontSize: "11px", fontFamily: "inter", fontWeight: "500" }}>
         {currentSong.name && currentSong.name.length<maxChars?currentSong.name:currentSong && currentSong.name && currentSong.name.substring(0,maxChars)+'...'}
         </Typography>
         <Typography sx={{ fontSize: "11px", fontFamily: "inter" }}>
         {loadingSubmit?"Deleting...":"Audiovybez"}
         </Typography>
         </Box>
    </Box>

        
         <Box sx={{display:"flex",justifyContent:"space-between",alignItems:"center",width:"8rem",position:"relative"}}>
            <span sx={{display:"flex",justifyContent:"center",alignItems:"center",marginRight:"2rem"}}>
         <PiCaretLeftBold   onClick={ () => {handleFormPrevious()} } style={{borderRadius:"0.1rem",cursor:"pointer",fontSize:"1.5rem",color:"white", backgroundColor:"#A01565",position:"relative",top:"0.2rem",marginRight:"1.2rem"}}/>
         <PiCaretRightBold  onClick={ () => {handleFormNext()} } style={{borderRadius:"0.1rem",cursor:"pointer",fontSize:"1.5rem",color:"white", backgroundColor:"#A01565",position:"relative",top:"0.2rem",}} />
         {/*<LiaCaretSquareLeftSolid />*/}
        
         </span>

         <IoClose onClick={handleClose} style={{cursor:"pointer",fontSize:"2.3rem", color:"#A01565"}} />
         </Box>

         </Box>


        <Box  sx={{ 
            display: "flex",flexDirection:"row", justifyContent: "space-between",/* background: "#49454F",*/ borderRadius: "6px", marginTop:"1rem",
           width:"100%"
        }} >

       
        
         <Box sx={{ display: "flex",flexDirection:"row", justifyContent: "space-between"}}>
            {
                options.map( (item, key) => (
                    <Box 
                        p={1} my={1} 
                        sx={{ 
                            display: "flex", justifyContent: "space-between",/* background: "#49454F",*/ borderRadius: "6px", 
                            alignItems: "center", cursor: "pointer"
                        }}
                        onClick={ () => setForm(item.active) }
                    >
                        <Typography sx={{ fontSize: "14px", color: `${form == item.active && "#A01565"}`, borderBottom: `${form == item.active && " 2px solid #A01565"}` }}>
                            { item.title }
                        </Typography>
                        {/* item.icon */}
                    </Box>
                ) )
            }
         </Box>

        </Box>
    </>
    )
}

export default DialogModalOptionsComponent;
