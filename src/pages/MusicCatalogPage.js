import Sidebar from "../componentsMyNetwork/Sidebar";
import Feed from "../componentsMyNetwork/Feed";
import Rightbar from "../componentsMyNetwork/Rightbar";
import { Box, Container, createTheme, Grid, Stack, ThemeProvider } from "@mui/material";
import Navbar from "../componentsMyNetwork/Navbar";
import Add from "../componentsMyNetwork/Add";
import { useEffect, useRef, useState } from "react";
import { DragDropContext } from 'react-beautiful-dnd';
import {  setSelectedAudioState, setSelectedAudio, setSelectedAudioId,deleteFileFromSong} from 'src/redux/actions/group.action';

// Components
import { MusicCatalogSidebar, MusicCatalogFeedComponent, MusicCatalogRightBarComponent } from "src/SeperateComponent/MusicCatalog";
import { useSelector } from "react-redux";
import { saveAllSongsFromCurrentPlaylistToEdit, saveCurrentSong, saveListOfNewSongsBeingCreated, saveListOfNewSongsBeingComposed,saveNewlyUploadedPlaylist, saveProgressOnSelectedAudio, saveSongCreatorActiveHeaderId,saveSongCreatorActiveSongId, saveSongCreatorSongs, savePlaylistCreatorActivePlaylist } from "src/redux/reducers/group.slice";
import { useDispatch } from "react-redux";

// imported audioplayer
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

// Import custom styles for audio player
import "./CustomAudioPlayer.css"; 
import { useNavigate } from "react-router-dom";
import FileManagerComponent from "src/SeperateComponent/MusicCatalog/file-manager.component";
import { HeadCountComponent } from "src/SeperateComponent/General";
import CatalogOverviewComponent from "src/SeperateComponent/General/catalog-overview.component";

function MusicCatalogPage() {
  const [mode, setMode] = useState("dark");


  const user = useSelector((state)=> state.auth)
const navigate = useNavigate()
  useEffect(()=>{

  //INITIAL LOGIN PAGE
    if(user && !user.user){
      navigate('/login')
    }

  },[])



  const data3 = [
    { title: "Total Files", number: "50" },
    { title: "Total Songs", number: "25" },
    { title: "Approved Songs", number: "10" },
    { title: "Draft Songs", number: "10" },
    { title: "Playlists", number: "4" },
    { title: "Albums", number: "8" },
    { title: "Brief Submissions", number: "8" }
  ]


  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const {selectedAudioId,selectedAudio,
          selectedAudioState,newPlaylistBeingCreated,
         arrayStartingIndex,arrayEndingIndex,
         newlyUploadedFiles,newlyUploadedFullSong,
         newlyUploadedPlaylist,allSongs,
         allPlaylists,lastDraggedFileType,
         allSongsFromCurrentPlaylistToEdit,
         songInterimHolder,
         currentSong,songCreatorSongs,
         listOfNewSongsBeingCreated,listOfNewSongsBeingComposed,
         allSongsFromAPlaylist,isPlaylistSongsLoading,
         fileManagerActive,
        } 
        = useSelector((state)=> state.group)
  
  const [targetList, setTargetList] = useState([ ...newlyUploadedPlaylist]);
  const [editingCurrentList, setEditingCurrentList] = useState([ ...allSongsFromCurrentPlaylistToEdit]);
  const [sourceList, setSourceList] = useState([...allSongs]);
 
  const [targetIdList,setTargetIdList] = useState(newPlaylistBeingCreated && newPlaylistBeingCreated.length? newPlaylistBeingCreated.map((item)=>(item.playlistId)):[] )


useEffect(()=>{

  setTargetIdList(newPlaylistBeingCreated && newPlaylistBeingCreated.length? newPlaylistBeingCreated.map((item)=>(item.playlistId)):[])
   
},[newPlaylistBeingCreated])


  const  [showPlayer,setShowPlayer] = useState(false)
  const audioRef = useRef(null)

  const dispatch = useDispatch()



  useEffect(()=>{
    console.log("current song AFTER REPLACEMENT is now--->",currentSong)
  },[])


 useEffect(()=>{
  console.log("ALL SONGS FOR MONITORING is now--->",allSongs)
    setSourceList(allSongs )
   setEditingCurrentList(allSongsFromCurrentPlaylistToEdit)
    
 },[allSongs,arrayStartingIndex,arrayEndingIndex,allSongsFromCurrentPlaylistToEdit])


 useEffect(()=>{
  setTargetList(newlyUploadedPlaylist)


 return () => {
   dispatch(setSelectedAudioId(null))
   dispatch(setSelectedAudio(null))
   dispatch(setSelectedAudioState(false))
   };
  
},[newlyUploadedPlaylist])

/**AUDIO CONTROLS */
useEffect(()=>{



  if(selectedAudioState === false)  {
    pauseAudio()
    }else if(selectedAudioState === true){
      //setShowPlayer(false)
      playAudio(selectedAudio)
    }
  
    //return () => {
    //  dispatch(setSelectedAudioId(null))
    //  dispatch(setSelectedAudio(null))
    //  dispatch(setSelectedAudioState(false))
  //
    //  };
   
  
  },[selectedAudio,selectedAudioId,selectedAudioState])
  
  const playAudio = (audio) => {
    if( audioRef.current && audioRef.current.audio){
    audioRef.current.audio.current.play();
    }
    console.log("AUDIO REF IS-->",audioRef.current)

       console.log("selectedAudio, selectedAudioId, selectedAudioState--->",selectedAudio,selectedAudioId,selectedAudioState)
};


const pauseAudio = audio => {
   
  if( audioRef.current && audioRef.current.audio){
  audioRef.current.audio.current.pause();
  }
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

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const moveItem = (sourceList, setSourceList, targetList, setTargetList) => {
    const sourceClone = Array.from(sourceList);
      let targetClone = Array.from(targetList);
      const [removedItem] = sourceClone.splice(source.index, 1);
      console.log("REMOVED ITEM IS -->",removedItem)
      
      targetClone.splice(destination.index, 0, removedItem);
   
        //targetClone = [...targetClone,removedItem]

     setSourceList(allSongs);
     setTargetList(targetClone);
     //YOU STOPPED HERE DAGOGO - JAN 19 1AM

     console.log("SOURCE CLONE IS, LOOK HERE -->",sourceClone)
     console.log("TARGET CLONE IS, LOOK HERE -->",targetClone)

     dispatch(saveNewlyUploadedPlaylist(targetClone))
     console.log("DESTINATION IS -->",destination)
    };


    const moveItemToSpecificPlaylist = (sourceList, setSourceList, targetList, setTargetList,newPlaylistId) => {
      //YOU WILL DO DUPLICATE LOGIC PREVENTION HERE, BUT YOU NEED A LIST OF SONGS INSIDE A PLAYLIST
      //, AND NOT JUST A FILTER FOR ALL SONGS
      //
      const sourceClone = Array.from(sourceList);
        let targetClone = Array.from(targetList);
        const [removedItem] = sourceClone.splice(source.index, 1);
        console.log("REMOVED ITEM IS -->",removedItem)

        dispatch(savePlaylistCreatorActivePlaylist(newPlaylistId))

        const idsArrayCopy = removedItem.playlistIdsArray && removedItem.playlistIdsArray.length >0 ?[...removedItem.playlistIdsArray]:[]
       
                                         //is it composed or created
        const songAlreadyExistsInPlaylist = newlyUploadedPlaylist.filter((item)=>(item && item.playlistIdsArray.includes(newPlaylistId))) && newlyUploadedPlaylist.filter((item)=>(item && item.playlistIdsArray.includes(newPlaylistId))).filter((item)=>(item.songId ===removedItem.songId)) ? newlyUploadedPlaylist.filter((item)=>(item && item.playlistIdsArray.includes(newPlaylistId))).filter((item)=>(item.songId ===removedItem.songId))   :null

     console.log("SONG ALREADY EXISTS IN PLAYLIST-->",songAlreadyExistsInPlaylist)


  if(songAlreadyExistsInPlaylist.length === 0){
     console.log("IDENTIFYING IDS AVOIDING DUPLICATES--->",idsArrayCopy)
     if(idsArrayCopy.length > 0 ) { 
     targetClone.splice(destination.index, 0, {...removedItem,playlistIdsArray:[...idsArrayCopy,newPlaylistId]});
     }
    else{
     targetClone.splice(destination.index, 0, {...removedItem,playlistIdsArray:[removedItem.playlistId,newPlaylistId]});
    }
          //targetClone = [...targetClone,removedItem]
    }
       setSourceList(allSongs);
       setTargetList(targetClone);
      
  
       console.log("SOURCE CLONE IS, LOOK HERE -->",sourceClone)
       console.log("TARGET CLONE IS, LOOK HERE -->",targetClone)
  
       dispatch(saveNewlyUploadedPlaylist(targetClone))
       console.log("DESTINATION IS -->",destination)
      };


      const moveSongToPlaylistHeader = (songInterimHolder,listOfNewSongsBeingCreated,identifyingId ) => {
     
        dispatch(saveSongCreatorActiveHeaderId(identifyingId))

     
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
        

        };


        const moveFileToSongHeader = (songInterimHolder,listOfNewSongsBeingCreated,identifyingId ) => {
     
          dispatch(saveSongCreatorActiveSongId(identifyingId))
          /**CRAZY LOGIC START */
   
        if(songInterimHolder && songInterimHolder.name &&  imageFormats.some((format) => (songInterimHolder.name.toLowerCase().includes(format)) )){
          
            console.log("I INCLUDE V2!!!")
            if(true/*currentSong*/){ 
    
            if(true/*currentSong && currentSong.otherMusicFiles*/){
             //mar -13 -Dagogo - I removed cover art from being saved in other music files
           //OLD LOGIC FOR GUIDANCE -- dispatch(saveCurrentSong({...currentSong,coverArtName:songInterimHolder.name,coverArtUrl:songInterimHolder.mediaTemporaryUrl/*,otherMusicFiles:[...currentSong.otherMusicFiles,songInterimHolder]*/  }))
          
            

           dispatch(saveListOfNewSongsBeingComposed(listOfNewSongsBeingComposed.map((item)=>(
        
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
           else{
              //mar -13 - Dagogo- I removed cover art from being saved in other music files
            dispatch(saveCurrentSong({...currentSong,coverArtName:songInterimHolder.name,coverArtUrl:songInterimHolder.mediaTemporaryUrl/*,otherMusicFiles:[songInterimHolder]*/}))
           
          
            dispatch(saveListOfNewSongsBeingComposed(listOfNewSongsBeingComposed.map((item)=>(
        
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
          
          }else{
            dispatch(saveCurrentSong({coverArtName:songInterimHolder.name,userId:songInterimHolder.userId,coverArtUrl:songInterimHolder.mediaTemporaryUrl,otherMusicFiles:[songInterimHolder]}))
           
            dispatch(saveListOfNewSongsBeingComposed(listOfNewSongsBeingComposed.map((item)=>(
        
              item.identifyingId === identifyingId?
    
              {
                ...item,
                //name:songInterimHolder.name,
                /*song:songInterimHolder
                YOU GOTTA DO SOME CRAZY LOGIC HERE
                */
    
              }
    
              :
             item
            ))))
          
          
          }
          
          }
    
          else if(listOfNewSongsBeingComposed.filter((item)=>(item.identifyingId === identifyingId)) &&
           listOfNewSongsBeingComposed.filter((item)=>(item.identifyingId === identifyingId))[0] &&
             listOfNewSongsBeingComposed.filter((item)=>(item.identifyingId === identifyingId))[0].song  &&
             listOfNewSongsBeingComposed.filter((item)=>(item.identifyingId === identifyingId))[0].song.mediaTemporaryUrl &&
              listOfNewSongsBeingComposed.filter((item)=>(item.identifyingId === identifyingId))[0].song.mediaTemporaryUrl !== null ){
            console.log("ARRAY OF OTHER MUSIC FILES IS ABOUT TO BE MODIFIED",songInterimHolder)
            
    
           //OLD LOGIC 4 GUIDANCE dispatch(saveCurrentSong({...currentSong,otherMusicFiles:currentSong.otherMusicFiles && currentSong.otherMusicFiles.length > 0 ?[ ...currentSong.otherMusicFiles,songInterimHolder ]: [songInterimHolder] }))
         
            dispatch(saveListOfNewSongsBeingComposed(listOfNewSongsBeingComposed.map((item)=>(
        
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
            //dispatch(saveCurrentSong(songInterimHolder))



            dispatch(saveListOfNewSongsBeingComposed(listOfNewSongsBeingComposed.map((item)=>(
        
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
          };
  


    const moveItemEditing = (sourceList, setSourceList, editingCurrentList, setEditingCurrentList) => {
    const sourceClone = Array.from(sourceList);
      let editingCurrentClone = Array.from(editingCurrentList);
      const [removedItem] = sourceClone.splice(source.index, 1);
      console.log("REMOVED ITEM IS -->",removedItem)
      
      editingCurrentClone.splice(destination.index, 0, removedItem);
   
        //editingCurrentClone = [...editingCurrentClone,removedItem]

     setSourceList(allSongs);
     setEditingCurrentList(editingCurrentClone);
     //YOU STOPPED HERE DAGOGO - JAN 19 1AM

     console.log("SOURCE CLONE IS, LOOK HERE -->",sourceClone)
     console.log("EDITING CURRENT CLONE -->",editingCurrentClone)
     dispatch(saveAllSongsFromCurrentPlaylistToEdit(editingCurrentClone))
     console.log("DESTINATION FOR EDITING CURRENT LIST IS -->",destination)
    };

    const imageFormats = ["jpg", "jpeg", "png", "gif", "bmp", "webp", "tiff", "svg"];

    const allowedImageTypes = [
      "image/png",  // png
      "image/jpeg", // jpeg
      "image/jpg",  // jpg
      "image/webp", // webp
      "image/gif",  // gif
      "image/bmp",  // bmp
      "image/tiff", // tiff
    ];

    const reorder = (list, startIndex, endIndex) => {
      const result = Array.from(list);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      //dispatch(saveNewlyUploadedPlaylist(result))
      return result;
    };
    

    const moveToEditor = (sourceList, setSourceList, editingCurrentList, setEditingCurrentList) => {
      const sourceClone = Array.from(sourceList);
      let editingCurrentClone = Array.from(editingCurrentList);
      const [removedItem] = sourceClone.splice(source.index, 1);
      console.log("REMOVED ITEM IS -->",removedItem)
      
      editingCurrentClone.splice(destination.index, 0, removedItem);
   
        //editingCurrentClone = [...editingCurrentClone,removedItem]

     setSourceList(allSongs);
     setEditingCurrentList(editingCurrentClone);
     //YOU STOPPED HERE DAGOGO - JAN 19 1AM

     console.log("SOURCE CLONE IS, LOOK HERE -->",sourceClone)
     console.log("WHILE SOURCE IS, LOOK HERE -->",source)
     dispatch(saveAllSongsFromCurrentPlaylistToEdit(editingCurrentClone))
     console.log("DESTINATION FOR EDITING CURRENT LIST IS -->",destination)
    
    
    };


    if (source.droppableId === 'sourceList' && destination.droppableId === 'targetList') {
      moveItem(sourceList, setSourceList, targetList, setTargetList);
    } 
   else if (source.droppableId === 'sourceList' && targetIdList.includes(destination.droppableId)) {
    console.log("MAPPING OF IDS WORKS")
      moveItemToSpecificPlaylist(sourceList, setSourceList, targetList, setTargetList,destination.droppableId);
    } 
    else if (source.droppableId === 'sourceList' && destination.droppableId.includes('songHeader-')) {
      console.log("MAPPING OF PLAYLIST HEADERS WORKS",destination.droppableId.substring(11,destination.droppableId.length))
        //do not comment out 11, 11 is where the ID starts after the phrase - dagogo -mar-20 2025
        moveSongToPlaylistHeader(songInterimHolder,listOfNewSongsBeingCreated,destination.droppableId.substring(11,destination.droppableId.length));
      } 
      else if (source.droppableId === 'uploadList' && destination.droppableId.includes('fileHeader-')) {
        console.log("MAPPING OF SONG HEADERS WORKS- NEW ADDITION",destination.droppableId.substring(11,destination.droppableId.length))
          //do not comment out 11, 11 is where the ID starts after the phrase - dagogo -mar-22 2025
          moveFileToSongHeader(songInterimHolder,listOfNewSongsBeingComposed,destination.droppableId.substring(11,destination.droppableId.length));
        } 

   else  if (result.source.droppableId === "targetList" && result.destination.droppableId === "targetList") {
      const reorderedFiles = reorder(newlyUploadedPlaylist, result.source.index, result.destination.index);
      dispatch(saveNewlyUploadedPlaylist(reorderedFiles));
    }
  

    else  if (result.source.droppableId ===  result.destination.droppableId) {
      console.log("REORDERING WITHIN MAPPED IDS WORKS")
      const reorderedFiles = reorder(newlyUploadedPlaylist, result.source.index, result.destination.index);
      dispatch(saveNewlyUploadedPlaylist(reorderedFiles));
    }
    
    else if (source.droppableId === 'sourceList' && destination.droppableId === 'EditingCurrentList') {
      moveItemEditing(sourceList, setSourceList, editingCurrentList, setEditingCurrentList);
      console.log("move item editing has been triggered! --->")
    }
    else if(source.droppableId === 'sourceList' && destination.droppableId === 'EditingCurrentSongTwo'){
       
      //dispatch(saveCurrentSong(songInterimHolder))
      console.log("SONG CREATOR SONGS TOTAL IS --->",songCreatorSongs)
       dispatch(saveSongCreatorSongs([...songCreatorSongs,songInterimHolder]))  
      
    }
    else if(source.droppableId === 'uploadList' && destination.droppableId === 'EditingCurrentSong'){
     
   
    if(songInterimHolder && songInterimHolder.name &&  imageFormats.some((format) => (songInterimHolder.name.toLowerCase().includes(format)) )){
      
        console.log("I INCLUDE !!!")
        if(currentSong){ 

       if(currentSong && currentSong.otherMusicFiles){
         //mar -13 -Dagogo - I removed cover art from being saved in other music files
       dispatch(saveCurrentSong({...currentSong,coverArtName:songInterimHolder.name,coverArtUrl:songInterimHolder.mediaTemporaryUrl/*,otherMusicFiles:[...currentSong.otherMusicFiles,songInterimHolder]*/  }))
       }
       else{
          //mar -13 - Dagogo- I removed cover art from being saved in other music files
        dispatch(saveCurrentSong({...currentSong,coverArtName:songInterimHolder.name,coverArtUrl:songInterimHolder.mediaTemporaryUrl/*,otherMusicFiles:[songInterimHolder]*/}))
       }
      
      }else{
        dispatch(saveCurrentSong({coverArtName:songInterimHolder.name,userId:songInterimHolder.userId,coverArtUrl:songInterimHolder.mediaTemporaryUrl,otherMusicFiles:[songInterimHolder]}))
       }
      
      }

      else if(currentSong && currentSong.mediaTemporaryUrl &&  currentSong.mediaTemporaryUrl !== null ){
        console.log("ARRAY OF OTHER MUSIC FILES IS ABOUT TO BE MODIFIED",songInterimHolder)
        

        dispatch(saveCurrentSong({...currentSong,otherMusicFiles:currentSong.otherMusicFiles && currentSong.otherMusicFiles.length > 0 ?[ ...currentSong.otherMusicFiles,songInterimHolder ]: [songInterimHolder] }))
      }
   
      else{
        dispatch(saveCurrentSong(songInterimHolder))
      }


   //DELETION OF SONGS FROM THE FILE UPLOAD SECTION - feb 19 2025 - DAGOGO - we are not deleting files anymore on dropping them in the song editor
   //     if(lastDraggedFileType && lastDraggedFileType === 'mediaTemporaryUrl'){
   //      
   //       dispatch(deleteFileFromSong(newlyUploadedFullSong.songId,newlyUploadedFullSong && newlyUploadedFullSong.uploadId,'mediaTemporaryUrl',newlyUploadedFullSong.otherMusicFiles && newlyUploadedFullSong.otherMusicFiles))
   //      }
  //
  //
   //      if(lastDraggedFileType && lastDraggedFileType === 'instrumentalTemporaryUrl'){
   //      
   //       dispatch(deleteFileFromSong(newlyUploadedFullSong.songId,newlyUploadedFullSong && newlyUploadedFullSong.uploadId,'instrumentalTemporaryUrl',newlyUploadedFullSong.otherMusicFiles && newlyUploadedFullSong.otherMusicFiles))
   //      }
  //
  //
   //      if(lastDraggedFileType && lastDraggedFileType === 'otherMusicFiles'){
   //     
   //       dispatch(deleteFileFromSong(newlyUploadedFullSong.songId,newlyUploadedFullSong && newlyUploadedFullSong.uploadId,'otherMusicFiles',newlyUploadedFullSong.otherMusicFiles && newlyUploadedFullSong.otherMusicFiles))
   //      }
 //DELETION OF SONGS FROM THE FILE UPLOAD SECTION - END
       
        }
  

     
  };

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

       <DragDropContext onDragEnd={onDragEnd}>
          <Box bgcolor={"background.default"} color={"text.primary"} >
            <Navbar active="music-catalog" />


         <Box sx={{color:"white",width:"100%",background:'linear-gradient(45deg, #A01565, #3E256E)',margin:"0 auto",marginTop:"10px",marginBottom:"12px",padding:"30px",paddingY:"20px",fontFamily:"inter",fontSize:"0.7rem",scale:"0.99"}}>
         PLEASE NOTE: Ensure that you update ALL required metadata for any tracks that you pitch. 
         Tracks in draft status which do not follow the submission format will not be considered.
          Only pitch music you own 100% of the master recording and publishing or you know who 
          controls these rights. Do not pitch music made with samples or leased beats.
           ALL SUBMISSIONS MUST HAVE MATCHING INSTRUMENTAL. BE READY TO PROVIDE WAV/AIFF FILES & STEMS IF NEEDED.
         </Box>

            <Stack direction="row" spacing={4} justifyContent="space-between" alignItems="center" sx={{position:"fixed",width:"92%",margin:"0 auto",height:"70vh",left:"5%",scale:"0.99"}} >
             
             {!fileManagerActive &&
               <span style={{flex:"1.1"}} >
              <MusicCatalogSidebar setMode={setMode} mode={mode}/>
              
              </span>
             }

          {!fileManagerActive &&
           <span style={{flex:"1.5"}} >
              <MusicCatalogFeedComponent />
              </span> 
          }
             

            {fileManagerActive &&
              <span style={{flex:"1.1",position:"relative",top:"0.5rem"}} >
             <CatalogOverviewComponent data={ data3 } text="Catalog Overview" message="Manage Catalog" storage={true} />
              </span>
           }
           
          
           {fileManagerActive &&
            <span style={{flex:"1.5"}} >
              <FileManagerComponent />
              
              
              </span>
           } 
              
            

              <span style={{flex:"1"}} >
                <MusicCatalogRightBarComponent />
              </span> 

            </Stack>
            {/* <Add /> */}

            <Container maxWidth="xs" >

            <Grid item xs={12} >
         <center style={{position:"relative"}}>


           <div  style={{position:"fixed",bottom:"0%",left:"0%",marginLeft:"1rem",width: "100vw", display: "flex", justifyContent: "center", padding: "10px 0",zIndex:"1000"}}>
           
           {/*
             <div onClick={()=>{setShowPlayer(false)}} style={{position:"absolute",right:"0.5rem",bottom:"1rem", zIndex:"1",color:"red"}} >
             x
            </div> 
            */}
           
           
           
           
           {selectedAudioId && 
            <AudioPlayer 
            style={{
             position:"absolute",
             backgroundColor: "black",
             left:"-0.5%",
             top:"-300%",
            
             width: "99%", // Make the audio player occupy the full width
             maxWidth: "99%", // Ensure it doesn't exceed the container width
             outline: "none", // Remove focus outline
             zIndex:"1000"
           }}
           
           
                controls={true}  
                onPlay={handlePlay}
                onLoadedMetaData={handleLoadedMetadata}
                //onListen={handleListen}
                //listenInterval={1000}
                onPause={handlePause}
                showSkipControls={true} // Enable skip controls
                showJumpControls={false} // Disable jump controls (optional)
                //onClickNext={handleNext} // Custom handler for the next button
                //onClickPrevious={handlePrevious} // Custom handler for the previous button
                //onEnded={handleNext}
                  controlsList="nodownload" ref={audioRef} src={selectedAudio} type="audio/mp3"/>
            }
           
           </div>
           
             </center>
         </Grid>
              
            </Container>


          </Box>
      </DragDropContext>
    </ThemeProvider>
  );
}

export default MusicCatalogPage;
