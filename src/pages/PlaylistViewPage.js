import Sidebar from "../componentsMyNetwork/Sidebar";
import Feed from "../componentsMyNetwork/Feed";
import Rightbar from "../componentsMyNetwork/Rightbar";
import { Box, createTheme, Stack, ThemeProvider,Container ,Grid} from "@mui/material";
import Navbar from "../componentsMyNetwork/Navbar";
import Add from "../componentsMyNetwork/Add";
import { useEffect, useRef, useState } from "react";
import {  setSelectedAudioState, setSelectedAudio, setSelectedAudioId} from 'src/redux/actions/group.action';
import {  saveProgressOnSelectedAudio} from 'src/redux/reducers/group.slice';
import { useSelector } from "react-redux";

// Components
import { DashboardSidebar, DashboardFeedComponent, DashboardRightbarComponent } from "src/SeperateComponent/Dashboard";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchSinglePlaylistByPlaylistId, fetchSongsForOnePlaylist } from "src/redux/actions/group.action";
import ViewPlaylistComponent from "src/SeperateComponent/ViewPlaylist/view-playlist.component";
import PlaylistRightbarComponent from "src/SeperateComponent/ViewPlaylist/playlist-right-bar.component";
import PlaylistSidebar from "src/SeperateComponent/ViewPlaylist/playlist-sidebar.component";


// imported audioplayer
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

// Import custom styles for audio player
import "./CustomAudioPlayer.css"; 

//IMPORTED SCROLLER
import { Element, scroller } from 'react-scroll';

function PlaylistViewPage() {
  const [mode, setMode] = useState("dark");
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const { playlistId } = useParams();
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const  [showPlayer,setShowPlayer] = useState(false)
  const audioRef = useRef(null)


  const {selectedAudioId,selectedAudio,selectedAudioState,allSongsFromAPlaylist} = useSelector((state)=> state.group)
  
  console.log("all songs from a playlist-->",allSongsFromAPlaylist)
  //GET SELECTED AUDIO ID, LOOK FOR IT , FIND INDEX OF SONG WITH THAT ID, THEN DO INDEX +1 , AS LONG AS THAT INDEX IS NOT GREATER THAN THE LENGTH OF ALL SONGS FROM A PLAYLIST

  useEffect(()=>{

if(!playlistId){
  navigate('/')
}else
{
  dispatch(fetchSongsForOnePlaylist(playlistId));
 dispatch(fetchSinglePlaylistByPlaylistId(playlistId));

}

  },[playlistId])


  useEffect(()=>{
  //ONCE THE SONGS ARE LOADED, SET CURRENT SONG TO THE FIRST SONG BUT DONT PLAY,
  // SO THAT WHEN THE USER CLICKS PLAY BUTTON,THE PLAYLIST PLAYS THE FIRST SONG

  dispatch(setSelectedAudio(allSongsFromAPlaylist &&allSongsFromAPlaylist[0] && allSongsFromAPlaylist[0].mediaUrl));
  dispatch(setSelectedAudioId(allSongsFromAPlaylist && allSongsFromAPlaylist[0] &&  allSongsFromAPlaylist[0].uploadId));
  dispatch(setSelectedAudioState(false));
  },[allSongsFromAPlaylist])


  /**AUDIO CONTROLS */
useEffect(()=>{



  if(selectedAudioState === false)  {
    pauseAudio()
    }else if(selectedAudioState === true){
      setShowPlayer(false)
      playAudio(selectedAudio)
    }
  
   // return () => {
   //   dispatch(setSelectedAudioId(null))
   //   dispatch(setSelectedAudio(null))
   //   dispatch(setSelectedAudioState(false))
   //   };
   
  
  },[selectedAudio,selectedAudioId,selectedAudioState])
  
    const playAudio = (audio) => {
     
      audioRef.current.audio.current.play();
      console.log("AUDIO REF IS-->",audioRef.current)

         console.log("selectedAudio, selectedAudioId, selectedAudioState--->",selectedAudio,selectedAudioId,selectedAudioState)
  };
  
  
  const pauseAudio = audio => {
     
    audioRef.current.audio.current.pause();
  
  };


  const handleListen = (currentTime) => {
    if (duration > 0) {
      console.log("PROGRESS LISTENER IS CURRENT TIME-->",(audioRef.current.audio.current.currentTime))
      console.log("PROGRESS LISTENER DURATION-->",(duration))
      setProgress((audioRef.current.audio.current.currentTime / duration) * 100); // Convert to percentage
      dispatch(saveProgressOnSelectedAudio((audioRef.current.audio.current.currentTime / duration) * 100))
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current?.audio?.current) {
      setDuration(audioRef.current.audio.current.duration);
    }
  };


  const handlePlay = () => {
  
      dispatch(setSelectedAudioState(true));

  }

  const handlePause = () => {
  
    dispatch(setSelectedAudioState(false));

}


  const handleNext = () => {
    const index = allSongsFromAPlaylist.findIndex(
      (item) => item.uploadId === selectedAudioId
    );

    if (index !== -1 && index + 1 < allSongsFromAPlaylist.length) {
      const nextSong = allSongsFromAPlaylist[index + 1];
      dispatch(setSelectedAudio(nextSong.mediaUrl));
      dispatch(setSelectedAudioId(nextSong.uploadId));
      dispatch(setSelectedAudioState(true));

    }
  };

  const handlePrevious = () => {
    const index = allSongsFromAPlaylist.findIndex(
      (item) => item.uploadId === selectedAudioId
    );

    if (index > 0) {
      const previousSong = allSongsFromAPlaylist[index - 1];
      dispatch(setSelectedAudio(previousSong.mediaUrl));
      dispatch(setSelectedAudioId(previousSong.uploadId));
      dispatch(setSelectedAudioState(true));
    }
  };
  /*AUDIO CONTROLS END */




  const darkTheme = createTheme({
    palette: {
      mode: mode,
      background: {
        default: '#000000',   // Page background
        
      },
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <Box bgcolor={"background.default"} color={"text.primary"} >
        {/* <Navbar active="dashboard" /> */}
        <Stack direction="row" spacing={2} justifyContent="flex-start" >
          {/*<PlaylistSidebar setMode={setMode} mode={mode}/>*/}
          <div style={{width:"85%", paddingLeft:"10rem",height:"100vh"}}>
          <ViewPlaylistComponent />
          </div>
          {/*<PlaylistRightbarComponent />*/}
        </Stack>
        {/* <Add /> */}


        <Container maxWidth="xs">

<Grid item xs={12}>
  <center style={{position:"relative"}}>


<div  style={{position:"fixed",bottom:"0%",left:"0%",marginLeft:"1rem",width: "100vw", display: "flex", justifyContent: "center", padding: "10px 0"}}>

{/*
  <div onClick={()=>{setShowPlayer(false)}} style={{position:"absolute",right:"0.5rem",bottom:"1rem", zIndex:"1",color:"red"}} >
  x
 </div> 
 */}




{ <AudioPlayer 
 style={{
  position:"absolute",
  backgroundColor: "black",
  left:"-0.5%",
  top:"-300%",
  width: "99%", // Make the audio player occupy the full width
  maxWidth: "99%", // Ensure it doesn't exceed the container width
  outline: "none", // Remove focus outline
}}


     controls={true}  
     onPlay={handlePlay}
     onLoadedMetaData={handleLoadedMetadata}
     onListen={handleListen}
     listenInterval={1000}
     onPause={handlePause}
     showSkipControls={true} // Enable skip controls
     showJumpControls={false} // Disable jump controls (optional)
     onClickNext={handleNext} // Custom handler for the next button
     onClickPrevious={handlePrevious} // Custom handler for the previous button
     onEnded={handleNext}
       controlsList="nodownload" ref={audioRef} src={selectedAudio} type="audio/mp3"/>
 }

</div>

  </center>
</Grid>

</Container>


      </Box>
    </ThemeProvider>
  );
}

export default PlaylistViewPage;
