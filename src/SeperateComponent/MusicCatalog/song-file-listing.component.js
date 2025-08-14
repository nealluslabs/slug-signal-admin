import { Delete,Close } from "@mui/icons-material";
import { Box, Chip, Typography } from "@mui/material";
import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteFileFromSong } from "src/redux/actions/group.action";
import { saveCurrentSong, saveListOfNewSongsBeingComposed } from "src/redux/reducers/group.slice";

const SongFileListingComponent = ({ title, btn,fileFullDetails,fileToDelete,individualId=null,handleClick,overArchingSongId }) => {
   const dispatch = useDispatch()

    const {newlyUploadedPlaylist,currentSong,newlyUploadedFullSong,
        newlyUploadedFiles,currentCoverArt,fileUploaderActive,songEditorActive,
        allPlaylists,selectedAudio,selectedAudioId,songCreatorSongs,songCreatorActiveSongId,
        selectedAudioState,listOfNewSongsBeingComposed

      } = useSelector((state)=> state.group)

        const allowedTypes = [ //allowedtypes is here because only music files should show select version butotn
          "audio/mpeg", // mp3
          "audio/mp3", // mp3
          "audio/mp4",  // mp4
        ]
        console.log("FILE FULL DETAILS TYPE AA",fileToDelete)

useEffect(()=>{

  console.log("CURRENT SONG AFTER AMMENDMENT IS NOW --->",currentSong)

},[currentSong])

         const deleteFileWithinListOfSongsBeingComposed = (currentSong,uploadId,fileToBeDeleted,musicFilesArray) => {
 
            try {
              if(fileToBeDeleted === "mediaTemporaryUrl"){
                console.log("LOOKING FOR IF THERES ONE ITEM LEFT-->",currentSong)
                if(currentSong.mediaTemporaryUrl){

                  if((currentSong.instrumentalUrl ===null||currentSong.instrumentalTemporaryUrl ===null ||!currentSong.instrumentalTemporaryUrl) && (currentSong.coverArtUrl && currentSong.coverArtUrl===null ||!currentSong.coverArtUrl ) && (!currentSong.otherMusicFiles||currentSong.otherMusicFiles && currentSong.otherMusicFiles.length === 0)){
                    //dispatch(saveCurrentSong({}))

                    dispatch(saveListOfNewSongsBeingComposed(listOfNewSongsBeingComposed.filter((item)=>(
        
                      item.identifyingId !== overArchingSongId
            
                    ))))

                  }
                  else{
                  //dispatch(saveCurrentSong({...currentSong,mediaTemporaryUrl:null}))

                  dispatch(saveListOfNewSongsBeingComposed(listOfNewSongsBeingComposed.map((item)=>(
        
                    item.identifyingId === overArchingSongId?
          
                    {
                      ...item,
                      name:"Untitled Song",
                     song:{
                      ...item.song,
                      mediaTemporaryUrl:null
                     }
                     
          
                    }
          
                    :
                   item
                  ))))

                  }
                }
              else if(currentSong.mediaUrl){
                //dispatch(saveCurrentSong({...currentSong,mediaUrl:null}))
                
                dispatch(saveListOfNewSongsBeingComposed(listOfNewSongsBeingComposed.map((item)=>(
        
                  item.identifyingId === overArchingSongId?
        
                  {
                    ...item,
                    name:"Untitled Song",
                   song:{
                    ...item.song,
                    mediaUrl:null
                   }
                   
        
                  }
        
                  :
                 item
                ))))


              }

            }else if(fileToBeDeleted === "instrumentalTemporaryUrl"){
             
              console.log("LOOKING FOR IF THERES ONE ITEM LEFT-->",currentSong)
                if(currentSong.instrumentalTemporaryUrl){

                  if((currentSong.mediaUrl===null ||currentSong.mediaTemporaryUrl===null|| !currentSong.mediaTemporaryUrl ) && (currentSong.coverArtUrl && currentSong.coverArtUrl===null ||!currentSong.coverArtUrl ) && (!currentSong.otherMusicFiles||currentSong.otherMusicFiles && currentSong.otherMusicFiles.length === 0)){
                    //dispatch(saveCurrentSong({}))

                    dispatch(saveListOfNewSongsBeingComposed(listOfNewSongsBeingComposed.filter((item)=>(
        
                      item.identifyingId !== overArchingSongId
            
                    ))))

                  }
                 else {
                    //dispatch(saveCurrentSong({...currentSong,instrumentalTemporaryUrl:null}))

                    dispatch(saveListOfNewSongsBeingComposed(listOfNewSongsBeingComposed.map((item)=>(
        
                      item.identifyingId === overArchingSongId?
            
                      {
                        ...item,
                
                       song:{
                        ...item.song,
                        instrumentalTemporaryUrl:null
                       }
                       
            
                      }
            
                      :
                     item
                    ))))


                  }  
                  
                  
                  }
                    else if(currentSong.instrumentalUrl){
                      //dispatch(saveCurrentSong({...currentSong,instrumentalUrl:null}))

                      dispatch(saveListOfNewSongsBeingComposed(listOfNewSongsBeingComposed.map((item)=>(
        
                        item.identifyingId === overArchingSongId?
              
                        {
                          ...item,
                  
                         song:{
                          ...item.song,
                          instrumentalUrl:null
                         }
                         
              
                        }
              
                        :
                       item
                      ))))
                    }
    

            }else if(fileToBeDeleted === "coverArtUrl"){

              console.log("LOOKING FOR IF THERES ONE ITEM LEFT-->",currentSong)
    
              if((currentSong.mediaUrl===null ||currentSong.mediaTemporaryUrl===null ||!currentSong.mediaTemporaryUrl ) /*&& (currentSong.instrumentalTemporaryUrl && currentSong.instrumentalTemporaryUrl===null ||!currentSong.instrumentalTemporaryUrl )*/  && (!currentSong.otherMusicFiles||currentSong.otherMusicFiles && currentSong.otherMusicFiles.length === 0)){
               // dispatch(saveCurrentSong({}))

                dispatch(saveListOfNewSongsBeingComposed(listOfNewSongsBeingComposed.filter((item)=>(
        
                  item.identifyingId !== overArchingSongId
        
                ))))

              }   
 
               else{
                //dispatch(saveCurrentSong({...currentSong,coverArtUrl:null,coverArtName:null}))
                  

                dispatch(saveListOfNewSongsBeingComposed(listOfNewSongsBeingComposed.map((item)=>(
        
                  item.identifyingId === overArchingSongId?
        
                  {
                    ...item,
            
                   song:{
                    ...item.song,
                    coverArtUrl:null,
                    coverArtName:null
                   }
                   
        
                  }
        
                  :
                 item
                ))))

               }
            }else if(fileToBeDeleted === "otherMusicFiles"){

              console.log("LOOKING FOR IF THERES ONE ITEM LEFT-->",currentSong)    
              console.log(" OUR UN-FILTERED OTHER MUSIC FILES-->",currentSong.otherMusicFiles) 
              
              const otherMusicFilesForThisSong = listOfNewSongsBeingComposed.filter((item)=>( item.identifyingId === overArchingSongId)) &&
              listOfNewSongsBeingComposed.filter((item)=>( item.identifyingId === overArchingSongId))[0] && 
              listOfNewSongsBeingComposed.filter((item)=>( item.identifyingId === overArchingSongId))[0].song &&
              listOfNewSongsBeingComposed.filter((item)=>( item.identifyingId === overArchingSongId))[0].song.otherMusicFiles ?

              listOfNewSongsBeingComposed.filter((item)=>( item.identifyingId === overArchingSongId))[0].song.otherMusicFiles
      
                :[]
              
             const filteredOtherMusicFiles =otherMusicFilesForThisSong && otherMusicFilesForThisSong.length > 0 ?otherMusicFilesForThisSong.filter((item)=>(item.individualId !== individualId)) :[]
             console.log(" OUR FILTERED OTHER MUSIC FILES-->",currentSong.otherMusicFiles)   
           
             if((currentSong.mediaUrl===null ||currentSong.mediaTemporaryUrl===null ) && (currentSong.coverArtUrl && currentSong.coverArtUrl===null ||!currentSong.coverArtUrl ) && (currentSong.instrumentalTemporaryUrl && currentSong.instrumentalTemporaryUrl===null ||!currentSong.instrumentalTemporaryUrl )  && (!currentSong.otherMusicFiles||currentSong.otherMusicFiles && currentSong.otherMusicFiles.length === 1)){
              //dispatch(saveCurrentSong({}))

              dispatch(saveListOfNewSongsBeingComposed(listOfNewSongsBeingComposed.filter((item)=>(
        
                item.identifyingId !== overArchingSongId
      
              ))))

            } 
             else{
             //dispatch(saveCurrentSong({...currentSong,otherMusicFiles:filteredOtherMusicFiles}))
             
             dispatch(saveListOfNewSongsBeingComposed(listOfNewSongsBeingComposed.map((item)=>(
        
              item.identifyingId === overArchingSongId?
    
              {
                ...item,
        
               song:{
                ...item.song,
               otherMusicFiles:filteredOtherMusicFiles
               }
               
    
              }
    
              :
             item
            ))))

            }
            
            }
       
           
            } catch (error) {
              console.error("Error deleting file from song: ", error);
              //notifyErrorFxn("Error Deleting file, please try again.")
            }
          }



          const  deleteFileFromCurrentReduxSongNotDb  = (currentSong,uploadId,fileToBeDeleted,musicFilesArray) => {
 
            try {
              if(fileToBeDeleted === "mediaTemporaryUrl"){
                console.log("LOOKING FOR IF THERES ONE ITEM LEFT-->",currentSong)
                if(currentSong.mediaTemporaryUrl){

                  if((currentSong.instrumentalUrl ===null||currentSong.instrumentalTemporaryUrl ===null ||!currentSong.instrumentalTemporaryUrl) && (currentSong.coverArtUrl && currentSong.coverArtUrl===null ||!currentSong.coverArtUrl ) && (!currentSong.otherMusicFiles||currentSong.otherMusicFiles && currentSong.otherMusicFiles.length === 0)){
                    dispatch(saveCurrentSong({}))
                  }
                  else{
                  dispatch(saveCurrentSong({...currentSong,mediaTemporaryUrl:null}))
                  }
                }
              else if(currentSong.mediaUrl){
                dispatch(saveCurrentSong({...currentSong,mediaUrl:null}))
              }

            }else if(fileToBeDeleted === "instrumentalTemporaryUrl"){
             
              console.log("LOOKING FOR IF THERES ONE ITEM LEFT-->",currentSong)
                if(currentSong.instrumentalTemporaryUrl){

                  if((currentSong.mediaUrl===null ||currentSong.mediaTemporaryUrl===null|| !currentSong.mediaTemporaryUrl ) && (currentSong.coverArtUrl && currentSong.coverArtUrl===null ||!currentSong.coverArtUrl ) && (!currentSong.otherMusicFiles||currentSong.otherMusicFiles && currentSong.otherMusicFiles.length === 0)){
                    dispatch(saveCurrentSong({}))
                  }
                 else {
                    dispatch(saveCurrentSong({...currentSong,intrumentalTemporaryUrl:null}))
                  }  
                  
                  
                  }
                    else if(currentSong.instrumentalUrl){
                      dispatch(saveCurrentSong({...currentSong,instrumentalUrl:null}))
                    }
    

            }else if(fileToBeDeleted === "coverArtUrl"){

              console.log("LOOKING FOR IF THERES ONE ITEM LEFT-->",currentSong)
    
              if((currentSong.mediaUrl===null ||currentSong.mediaTemporaryUrl===null ||!currentSong.mediaTemporaryUrl ) /*&& (currentSong.instrumentalTemporaryUrl && currentSong.instrumentalTemporaryUrl===null ||!currentSong.instrumentalTemporaryUrl )*/  && (!currentSong.otherMusicFiles||currentSong.otherMusicFiles && currentSong.otherMusicFiles.length === 0)){
                dispatch(saveCurrentSong({}))
              }   
 
               else{
                dispatch(saveCurrentSong({...currentSong,coverArtUrl:null,coverArtName:null}))
               }
            }else if(fileToBeDeleted === "otherMusicFiles"){

              console.log("LOOKING FOR IF THERES ONE ITEM LEFT-->",currentSong) 
              console.log(" OUR UNFILTERED OTHER MUSIC FILES-->",currentSong.otherMusicFiles)                                                                            
             const filteredOtherMusicFiles =musicFilesArray && musicFilesArray.length > 0 ?musicFilesArray.filter((item)=>(item.individualId !== individualId)) :[]
             
             console.log(" OUR FILTERED OTHER MUSIC FILES-->",currentSong.otherMusicFiles)   
           
             if((currentSong.mediaUrl===null ||currentSong.mediaTemporaryUrl===null ) && (currentSong.coverArtUrl && currentSong.coverArtUrl===null ||!currentSong.coverArtUrl ) && (currentSong.instrumentalTemporaryUrl && currentSong.instrumentalTemporaryUrl===null ||!currentSong.instrumentalTemporaryUrl )  && (!currentSong.otherMusicFiles||currentSong.otherMusicFiles && currentSong.otherMusicFiles.length === 1)){
              dispatch(saveCurrentSong({}))
            } 
             else{
             dispatch(saveCurrentSong({...currentSong,otherMusicFiles:filteredOtherMusicFiles}))
            }
            
            }
       
           
            } catch (error) {
              console.error("Error deleting file from song: ", error);
              //notifyErrorFxn("Error Deleting file, please try again.")
            }
          }


  
        const deleteFileHandler=(fileUploadId)=>{
          dispatch(deleteFileFromSong(newlyUploadedFullSong.songId,fileUploadId,fileToDelete,newlyUploadedFullSong.otherMusicFiles && newlyUploadedFullSong.otherMusicFiles))
        }

    return (
        <Box my={0} sx={{ display: "flex", alignItems: "center", justifyContent: "flex-start",width:"101%", fontSize:"1rem", }}>
           <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-start",gap:"10px",cursor:"pointer", width: "100%",maxWidth:"100%",height:"2.2rem", gap:"2px" }} >
              
               <Box
               sx={{
                 backgroundColor: "#FFFFFF",
                 width: "98%",
                 padding: "8px 12px",
                 borderRadius: "2px",
                 height:"2.5rem",
                 display: "flex",
                 alignItems: "center",
                 background:"#d0cccc"
               }}
             >

               <Chip
                 label={
                  <Box sx={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
                  
                  <Close
                    sx={{
                     
                      color:"white",
                      fontSize: '1.4rem',
                     
                    }}
                  />
                  <Box sx={{ marginLeft: '0.2rem' }}>
                    {title} - {btn}
                  </Box>
                </Box>
                
                }
                 
                 sx={{
                   backgroundColor: "#A01565",
                   color: "#FFFFFF",
                   fontFamily: "Inter",
                   borderRadius:"0.2rem",
                   fontSize:"1rem",
                 }}
               />
             </Box>

           
            </Box>

           {/*(fileToDelete.trim() !== "coverArtUrl" && fileToDelete.trim() !== "otherMusicFiles" ||
           (fileToDelete.trim() === "otherMusicFiles" && allowedTypes.includes(fileFullDetails.type))
          
           )

           &&*/
           
           <Box px={2} py={0.5} sx={{ width:"30%",maxWidth:"30%" ,height:"2.5rem"/*,background: "#FFF"*//*"#49454F"*/,background:"#d0cccc", borderRadius: "2px", cursor: "pointer", display:"flex",alignItems:"center",justifyConent:"center"}}>
                <Typography sx={{ /*fontSize: 14,*/ fontSize:"1rem", color: "black", fontFamily: "inter" }} onClick={handleClick}>{ btn }</Typography>
            </Box>
           }

              <span onClick={()=>{
              console.log("is file uploader active?---->",fileUploaderActive)
              fileUploaderActive?(
               /* overArchingSongId === songCreatorActiveSongId? YOU DONT NEED TO DIFFERENTIATE FOR NOW
              deleteFileFromCurrentReduxSongNotDb(currentSong,fileFullDetails && fileFullDetails.uploadId,fileToDelete,currentSong.otherMusicFiles && currentSong.otherMusicFiles) 
              :*/
              deleteFileWithinListOfSongsBeingComposed(fileFullDetails,fileFullDetails && fileFullDetails.uploadId,fileToDelete,currentSong.otherMusicFiles && currentSong.otherMusicFiles) //YOU STOPPED HERE DAGOGO MAR 22- 2024
            
            )
              :
              dispatch(deleteFileFromSong(overArchingSongId,fileFullDetails.individualId,fileToDelete,fileFullDetails.otherMusicFiles?fileFullDetails.otherMusicFiles:[],songCreatorSongs)) 
            }}
            >
            <Close sx={{marginLeft:"2px",color:"#A01565",height:"3rem",width:"3rem"}}  />
            </span>
        </Box>
    )
}

export default SongFileListingComponent;
