import { Box, Typography } from "@mui/material";
import { AddCircleOutline, KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';

// Component
import { SearchBarComponent } from "../General";
import { SearchBarFilesComponent } from "../General";
import CreatorSubComponent from "./creator-sub.component";
import { v4 as uuidv4 } from 'uuid'

// Icon
import { Upload } from "@mui/icons-material";

// Images
import OpenBox from '../../assets/images/openBox.png';
import BoxImg from "../../assets/images/box.png";
import Drive from "../../assets/images/drive.png";
import D from "../../assets/images/D.png";
import { useEffect, useState } from "react";
import NewMusicComponent from "./new-music.component";
import PlayableMusicComponent from "./playable-music.component";
import FileCreatorComponent from "./file-creator.component";
import { fetchAllSongs,fetchAllPlaylists ,uploadMediaFileTemporary, fetchAllSongsForOneUser, fetchAllPlaylistsForOneUser,fetchAllFilesForOneUser, uploadAllMediaFilesTemporaryForOneSong } from "src/redux/actions/group.action";
import { useDispatch, useSelector } from "react-redux";
import { notifyErrorFxn } from "src/utils/toast-fxn";
import { parseBlob } from 'music-metadata';
import axios from "axios";
import { saveNewlyUploadedFiles,saveNewlyUploadedPlaylist ,saveAllSongs,saveAllPlaylists,saveArrayEndingIndex,saveArrayStartingIndex, saveAllSongsFromCurrentPlaylistToEdit, saveCurrentlyEditingPlaylistName, saveSongSearchInFocus,saveFileSearchInFocus ,savePlaylistSearchInFocus, saveNewlyUploadedFullSong,saveCurrentSongUploadId, saveFileUploaderActive, saveSongEditorActive, saveCurrentSong } from "src/redux/reducers/group.slice";
import PlaylistBoxComponent from "./playlist-box.component";
import { Droppable, Draggable } from 'react-beautiful-dnd';

import { Element, scroller } from 'react-scroll';
import PlayableInstrumentalComponent from "./playable-instrumental.component";
import CoverArtComponent from "./cover-art.component";

//aiff conversion tools
//import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import { FFmpeg } from "@ffmpeg/ffmpeg"; // Updated import
import { FaBullseye } from "react-icons/fa";
import DialogModalFileCreatorComponent from "../General/Modal/DialogModalFileCreator.component";
import FileCreatorLongComponent from "./file-creator-long.component";



const FileManagerComponent = () => {
  const dispatch = useDispatch()
  //const ffmpeg = createFFmpeg({ log: true });
  const imageFormats = ["jpg", "jpeg", "png", "gif", "bmp", "webp", "tiff", "svg"];

  const [openModal, setOpenModal] = useState(false);

const handleCloseModal = () => {
    setOpenModal(false);
};
  
  const ffmpeg = new FFmpeg();

    const [list,setList] = useState([
        { title: "Songs", active: false },
        { title: "Playlists", active: false },
        { title: "Albums", active: false },
        { title: "Files", active: true }
    ]);

    const options = [
        { title: "Drive", img: Drive },
        { title: "Box", img: BoxImg },
        { title: "Dropbox", img: OpenBox },
        { title: "DISCO", img: D }
    ]

    useEffect(() => {
      const loadFFmpeg = async () => {
        if (!ffmpeg.loaded) {
          await ffmpeg.load({
            coreURL: "https://unpkg.com/@ffmpeg/core@0.12.10/dist/umd/ffmpeg-core.js",
          });
        }
      };
      loadFFmpeg();
    }, []);


    const processValidFiles = async (validFiles) => {
      console.log("VIEW FILES FOR SONG ID HERE -->", files);
            
      
      if(!validFiles){
        
        return
            }


      validFiles.forEach(async(file,index)=> {

          if (file/*!file.mediaTemporaryUrl*/) {
           //   if (file.type === "audio/aiff" || file.type === "audio/x-aiff") {
           //       try {
           //           const convertedFile = await handleAiffToMp3(file.file,file);  // ✅ Await conversion
           //          


           //         //PLEASE NOTE THE NOTE BELOW - DAGOGO - FEB 11 -2025
           //         //THE AIFF FILE LOADS WAY SLOWER THAN MP3 FILE INTO THE DB,
           //           // SO IT'S NEARLY IMPOSSIBLE TO STOP THE UPLOADING BY REMOVING FROM THE FILES 
           //           //ARRAY, IMMEDIATELY AFTER ONE UPLOAD
           //           //WE HAVE TO WAIT UNTIL WE SEE IT IN THE OTHER MUSIC FILES ARRAY
           //           //HENCE THE IF STATEMENT BELOW

           //           if(newlyUploadedFullSong &&newlyUploadedFullSong.name && newlyUploadedFullSong.name === file.name || newlyUploadedFullSong &&newlyUploadedFullSong.otherMusicFiles && newlyUploadedFullSong.otherMusicFiles.some(item => item.name === file.name)){
           //            //if we can at least find .aiff name in otherMusicFiles array, stop the uploading
           //          
           //             const filesCopy = [...files] //to have a copy of files state to splice
           //            console.log("WHAT IS FILES COPY--->",filesCopy)
           //            setFiles([...filesCopy.splice(index,1)])
           //         

           //            dispatch(saveNewlyUploadedFiles([...files.filter(obj => (obj.individualId !== file.individualId ))] ))
           //             

           //           }
           //           else{
           //           dispatch(uploadMediaFileTemporary(file, files, setFiles, setLoadingSubmit,user && user.id)).then(()=>{
           //          
           //             dispatch(uploadMediaFileTemporary(convertedFile, files, setFiles, setLoadingSubmit,user && user.id))
           //           })
           //           }
           //        
           //       } catch (error) {
           //           console.error("Error converting AIFF to MP3:", error);
           //       }
           //   }
                    
           console.log("ALL PREVIOUSLY UPLOADDED FILES ARE --->",allFiles)
           console.log("AND THEN CURRENT FILES ARE --->",files)

              if(file.type === "audio/wav" || file.type === "audio/x-wav"){
                    try {
                      const convertedFile = await handleWavToMp3(file.file,file);  // ✅ Await conversion
                     


                    //PLEASE NOTE THE NOTE BELOW - DAGOGO - FEB 11 -2025
                    //THE AIFF FILE LOADS WAY SLOWER THAN MP3 FILE INTO THE DB,
                      // SO IT'S NEARLY IMPOSSIBLE TO STOP THE UPLOADING BY REMOVING FROM THE FILES 
                      //ARRAY, IMMEDIATELY AFTER ONE UPLOAD
                      //WE HAVE TO WAIT UNTIL WE SEE IT IN THE OTHER MUSIC FILES ARRAY
                      //HENCE THE IF STATEMENT BELOW

                     
                        
                      if( allFiles && allFiles.some((item) => (item.name === file.name) ) ){
                       //if we can at least find .wav name in otherMusicFiles array, stop the uploading
                     
                     //   const filesCopy = [...files] //to have a copy of files state to splice
                     //  console.log("WHAT IS FILES COPY--->",filesCopy)
                     //  setFiles([...filesCopy.splice(index,1)])
                    

                       //dispatch(saveNewlyUploadedFiles([...files.filter(obj => (obj.individualId !== file.individualId ))] ))
                        

                      }
                      else{
                      dispatch(uploadMediaFileTemporary(file, files, setFiles, setLoadingSubmit,user && user.id)).then(()=>{
                              
                        dispatch(uploadMediaFileTemporary(convertedFile, files, setFiles, setLoadingSubmit,user && user.id))
                      })
                      }
                   
                  } catch (error) {
                      console.error("Error converting AIFF to MP3:", error);
                  }
              }
              
              
             else {

                if( allFiles && allFiles.some(item => item.name === file.name)){
                 // dispatch(saveNewlyUploadedFiles([...files.filter(obj => (obj.individualId !== file.individualId ))] ))
                 //  const filesCopy = [...files] //to have a copy of files state to splice
                 //  console.log("WHAT IS FILES COPY--->",filesCopy)
                 //  setFiles([...filesCopy.splice(index,1)])

                }  
                else if(allFiles && allFiles.some((item) => (item.coverArtUrl && (new URL(item.coverArtUrl).pathname.split('/').pop()) === file.name) )){
                 
                  //dispatch(saveNewlyUploadedFiles([...files.filter(obj => (obj.name !== new URL(file.name).pathname.split('/').pop() ))] )) //POSSIBLY DELETE THIS LINE IF IT'S CAUSING ERRORS

                  //  const filesCopy = [...files] //to have a copy of files state to splice
                  //  
                  //  setFiles([...filesCopy.splice(index,1)])
                   }


                else{ 
                  
                  dispatch(uploadMediaFileTemporary(file, files, setFiles, setLoadingSubmit,user && user.id)).then(()=>{
                   
                       //THEN DO NOTHING!, i MAY NEED THIS .THEN IN FUTURE SO I LEFT IT HERE -- DAGOGO - FEB 21 2025

                   })
                  
                }
                 
              }

      
          }
      })
    
  };

  


  const allowedTypes = [
    "audio/mpeg", // mp3
    "audio/mp4",  // mp4
    "audio/ogg",  // ogg
    "audio/ape",  // ape
    "audio/amr",  // amr
    "audio/wav",  // wav
    "audio/x-flac", // flac
    "audio/aac",  // aac
    "audio/aif",  // aif
    "audio/aiff",  // aiff
    "audio/x-aiff", // x-aiff
    "video/mp4",  // mp4
    "video/ogg",  // ogg
    "video/webm", // webm
    "image/png",  // png
    "image/jpeg", // jpeg
    "image/jpg",  // jpg
    "image/webp", // webp
    "image/gif",  // gif
    "image/bmp",  // bmp
    "image/tiff", // tiff
    "image/svg+xml", // svg
    "image/svg", // Another common SVG MIME type
    "application/svg+xml", // Alternative SVG MIME type
    "application/pdf",  // PDF
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // DOCX
    "application/msword",  // DOC (older format)
    "application/vnd.ms-excel",  // XLS (older Excel format, sometimes used for CSV)
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // XLSX (newer Excel format)
    "application/vnd.ms-excel.sheet.macroEnabled.12", // XLSM (Excel with macros)
    "application/vnd.ms-excel.template.macroEnabled.12", // XLTM (Excel macro-enabled template)
    "application/vnd.openxmlformats-officedocument.spreadsheetml.template", // XLTX (Excel template)
    "application/vnd.oasis.opendocument.spreadsheet", // ODS (OpenDocument Spreadsheet)
    "text/csv", // Standard CSV format
    "application/csv" // Alternative CSV MIME type
];



  const {user} = useSelector((state)=> state.auth)
 
 

    const { arrayStartingIndex,
            arrayEdningIndex,
            newlyUploadedFiles,
            newlyUploadedFullSong,
            newlyUploadedPlaylist,
            allSongs,
            allPlaylists,
            allFiles,
            filesTabActive,
            selectedAudioId,
            selectedAudioState,
            selectedAudio,
            songCreatorActive,
            fileUploaderActive,
            songSearchTerm,
            fileSearchTerm,
            playlistSearchTerm,
            playlistSearchInFocus,
            songSearchInFocus,
            fileSearchInFocus,
            allSongsFromAPlaylist,
            currentSongUploadId,
            isPlaylistSongsLoading} = useSelector((state)=> state.group)
    


   console.log("ALL FILES FILTERED AIFF-->",allFiles.filter((item)=>(item.type !== "audio/aiff"&& item.type !== "audio/x-aiff"&& item.type !== "audio/wav"&& item.type !== "audio/x-wav" )))

        const [setLoadingSubmit, setsetLoadingSubmit] = useState(false);
        const [files, setFiles] = useState([]); // State to store selected files
        const [previouslyUploadedFiles, setPreviouslyUploadedFiles] = useState([]); // State to store selected files
        const [filesFromDb, setFilesFromDb] = useState([]); // State to store selected files 
        const [songsFromPlaylist, setSongsFromPlaylist] = useState([]); // State to store sonds from a selected playlist
        const [playlistsFromDb, setPlaylistsFromDb] = useState([]); // State to store selected playlists
        
        const [filestab, setFilestab] = useState(true);
        const [playliststab, setPlayliststab] = useState(false);
        const [songstab, setSongstab] = useState(false);
        const [playlistSongsTab, setPlaylistSongsTab] = useState(false);

        const [sliceStart, setSliceStart] = useState(0);

        const [sliceEnd, setSliceEnd] = useState(4);

        const [loading, setLoading] = useState(false);
     const [aiffConvertedFile, setAiffConvertedFile] = useState(null);



    
    


        const handleAiffToMp3 = async (file,fileInfo) => {
          //const file = event.target.files[0];
          const validFiles =[]
          const invalidFiles =[]

          
          const arrayBuffer = await file.arrayBuffer();
          const uint8Array = new Uint8Array(arrayBuffer);
          if (!file) {
            console.log("1st ISSUE LIES HERE-->")
            return
          };
        
          setLoading(true);
        if (!ffmpeg.loaded/*!ffmpeg.isLoaded()*/) {
           
          await ffmpeg.load();
          }
          console.log("FFMPEG IS ABOUT TO WRITE FILE-->")
          ffmpeg.writeFile("input.aiff",uint8Array);
       

          
          console.log("FFMPEG HAS WRITTEN FILE AND IS ABOUT TO EXECUTE-->")
          // Run the conversion (AIFF to MP3)
          await ffmpeg.exec(["-i", "input.aiff", "-b:a", "192k", "output.mp3"]);
         
       
      
      
          // Read the converted MP3 file
      
          console.log("FFMPEG HAS EXECUTED AND IS ABOUT TO READ-->")
          const data = await ffmpeg.readFile("output.mp3");

          console.log("FFMPEG HAS READ AND IS ABOUT TO MAKE BLOB-->")
          // Create a downloadable URL
          const mp3Blob = new Blob([data.buffer], { type: "audio/mp3" });
          //const mp3Url = URL.createObjectURL(mp3Blob);
   
          console.log("FFMPEG HAS MADE BLOB AND CONVERTED FILE LOOKS LIKE-->",new File([mp3Blob],`${file.name.split('.aiff')[0]}.mp3`,{ type:"audio/mp3" } ))
        
          console.log("WHAT IS THE FILE UPLOAD ID FROM HANDLE AIFF TO MP3--->",file.uploadId)
         
          return  {
             file:new File([mp3Blob],`${file.name.split('.aiff')[0]}.mp3`,{ type:"audio/mp3" } ),
              name:`${file.name.split('.aiff')[0]}.mp3`,
              lastModified:file.lastModified,
              size:(new File([mp3Blob],`${file.name.split('.aiff')[0]}.mp3`,{ type:"audio/mp3" } )).size,
              type:"audio/mp3",
              isUploaded:false,
              uploadId:fileInfo.uploadId,
              individualId:fileInfo.individualId
             
          }
        };



        const handleWavToMp3 = async (file, fileInfo) => {
          const validFiles = [];
          const invalidFiles = [];
          if (!file) {
              console.log("1st ISSUE LIES HERE--> No file provided");
              return null;
          }
          try {
              console.log("Step 1: Reading the file as an array buffer...");
              const arrayBuffer = await file.arrayBuffer();
              const uint8Array = new Uint8Array(arrayBuffer);
              console.log("Step 2: Checking FFmpeg load status...");
            
              //wait for ffmpeg website to load
              if (!ffmpeg.loaded) {
          console.log("FFmpeg is not loaded. Loading FFmpeg...");
          await ffmpeg.load();
          console.log("FFmpeg loaded successfully.");
             }
              console.log("Step 3: Writing the .wav file to FFmpeg's virtual file system...");
             await ffmpeg.writeFile( "input.wav", uint8Array);
              console.log("Step 4: Executing FFmpeg command to convert .wav to .mp3...");
                await ffmpeg.exec(["-i", "input.wav", "-b:a", "192k", "output.mp3"]);
              console.log("Step 5: Reading the converted .mp3 file from FFmpeg's file system...");
              const data = await ffmpeg.readFile( "output.mp3");
              console.log("Step 6: Creating a Blob from the converted file...");
              const mp3Blob = new Blob([data.buffer], { type: "audio/mp3" });
              console.log("Step 7: Generating a new File object...");
              const convertedFile = new File(
                  [mp3Blob],
                  `${file.name.split(".wav")[0]}.mp3`,
                  { type: "audio/mp3" }
              );
              console.log("Conversion successful! File:", convertedFile);
              // Returning the result object
              return { 
                  file: convertedFile,
                  name: `${file.name.split(".wav")[0]}.mp3`,
                  lastModified: file.lastModified,
                  size: convertedFile.size,
                  type: "audio/mp3",
                  isUploaded: false,
                  uploadId: fileInfo.uploadId,
                  individualId:fileInfo.individualId,
              };
          } catch (error) {
              console.error("Error during conversion process:", error);
              //invalidFiles.push(file);
              return null; // Handle the error case
          } 
      };



      const handleWavToMp3Promise = (file, fileInfo) => {
        return new Promise(async (resolve, reject) => {
          if (!file) {
            console.log("1st ISSUE LIES HERE--> No file provided");
            reject(new Error("No file provided"));
            return;
          }
      
          try {
            console.log("Step 1: Reading the file as an array buffer...");
            const arrayBuffer = await file.arrayBuffer();
            const uint8Array = new Uint8Array(arrayBuffer);
      
            console.log("Step 2: Checking FFmpeg load status...");
            if (!ffmpeg.loaded) {
              console.log("FFmpeg is not loaded. Loading FFmpeg...");
              await ffmpeg.load();
              console.log("FFmpeg loaded successfully.");
            }
      
            console.log("Step 3: Writing the .wav file to FFmpeg's virtual file system...");
            await ffmpeg.writeFile("input.wav", uint8Array);
      
            console.log("Step 4: Executing FFmpeg command to convert .wav to .mp3...");
            await ffmpeg.exec(["-i", "input.wav", "-b:a", "192k", "output.mp3"]);
      
            console.log("Step 5: Reading the converted .mp3 file from FFmpeg's file system...");
            const data = await ffmpeg.readFile("output.mp3");
      
            console.log("Step 6: Creating a Blob from the converted file...");
            const mp3Blob = new Blob([data.buffer], { type: "audio/mp3" });
      
            console.log("Step 7: Generating a new File object...");
            const convertedFile = new File(
              [mp3Blob],
              `${file.name.split(".wav")[0]}.mp3`,
              { type: "audio/mp3" }
            );
      
            console.log("Conversion successful! File:", convertedFile);
      
            // Resolve the promise with the converted file object
            resolve({ 
              file: convertedFile,
              name: `${file.name.split(".wav")[0]}.mp3`,
              lastModified: file.lastModified,
              size: convertedFile.size,
              type: "audio/mp3",
              isUploaded: false,
              uploadId: uuidv4(),
              individualId: uuidv4(),
            });
          } catch (error) {
            console.error("Error during conversion process:", error);
            reject(error); // Reject the promise on error
          }
        });
      };



      const handleAiffToMp3Promise = (file, fileInfo) => {
        return new Promise(async (resolve, reject) => {
          if (!file) {
            console.log("1st ISSUE LIES HERE--> No file provided");
            reject(new Error("No file provided"));
            return;
          }
      
          try {
            console.log("Step 1: Reading the file as an array buffer...");
            const arrayBuffer = await file.arrayBuffer();
            const uint8Array = new Uint8Array(arrayBuffer);
      
            console.log("Step 2: Checking FFmpeg load status...");
            if (!ffmpeg.loaded) {
              console.log("FFmpeg is not loaded. Loading FFmpeg...");
              await ffmpeg.load();
              console.log("FFmpeg loaded successfully.");
            }
      

            console.log("Step 3: Writing the .wav file to FFmpeg's virtual file system...");
            ffmpeg.writeFile("input.aiff",uint8Array);
   
            console.log("Step 4: Executing FFmpeg command to convert .wav to .mp3...");
            await ffmpeg.exec(["-i", "input.aiff", "-b:a", "192k", "output.mp3"]);

            console.log("Step 5: Reading the converted .mp3 file from FFmpeg's file system...");
            const data = await ffmpeg.readFile("output.mp3");
      
            console.log("Step 6: Creating a Blob from the converted file...");
            const mp3Blob = new Blob([data.buffer], { type: "audio/mp3" });
      
            console.log("Step 7: Generating a new File object...");
            const convertedFile = new File(
              [mp3Blob],
              `${file.name.split(".aiff")[0]}.mp3`,
              { type: "audio/mp3" }
            );
      
            console.log("Conversion successful! File:", convertedFile);
      
            // Resolve the promise with the converted file object
            resolve({ 
              file: convertedFile,
              name: `${file.name.split(".aiff")[0]}.mp3`,
              lastModified: file.lastModified,
              size: convertedFile.size,
              type: "audio/mp3",
              isUploaded: false,
              uploadId: uuidv4(),
              individualId: uuidv4(),
            });
          } catch (error) {
            console.error("Error during conversion process:", error);
            reject(error); // Reject the promise on error
          }
        });
      };
      



          
        const handleActiveTab = (tabname) => {
          
          if(tabname === "Songs"){
              /*REMOVE THE PLAYLIST BEING EDITED TAB */
              dispatch(saveSongSearchInFocus(true))
              dispatch(savePlaylistSearchInFocus(false))
              dispatch(saveFileSearchInFocus(false))
           // dispatch(saveAllSongsFromCurrentPlaylistToEdit([ ]))
           // dispatch(saveCurrentlyEditingPlaylistName(null)) we want the playlist to persist so we canadd songs to it

               /*REMOVE THE PLAYLIST BEING EDITED TAB - END */

            setSongstab(true)
            setFilestab(false)
            setPlayliststab(false)
            setPlaylistSongsTab(false)
            
            dispatch(saveFileUploaderActive(false))
            dispatch(saveSongEditorActive(true))
            
            /*NOT USING FOR NOW - I SAVE STARTING AND ENDING INDEX SO THAT THE DRAGGABLE WRAPPER WILL BR UP TO DATE IN WHAT IT DRAGS*/
            dispatch(saveArrayStartingIndex(0))
            dispatch(saveArrayEndingIndex(4))
            setSliceStart(0)
            setSliceEnd(4)

            setList([
              { title: "Songs", active: true },
              { title: "Playlists", active: false },
              { title: "Albums", active: false },
              { title: "Files", active: false }
          ])


            //go to lists array and set the active options to true, then set all others to false
          }
          else if(tabname === "Files"){

              /*REMOVE THE PLAYLIST BEING EDITED TAB */
             // dispatch(saveAllSongsFromCurrentPlaylistToEdit([ ]))
             // dispatch(saveCurrentlyEditingPlaylistName(null)) we want playlist being edited to persist, so we can add songs to it
                 /*REMOVE THE PLAYLIST BEING EDITED TAB - END */
   
                 dispatch(saveSongSearchInFocus(false))
                 dispatch(savePlaylistSearchInFocus(false))
                 dispatch(saveFileSearchInFocus(true))      

            
            setSongstab(false)
            setFilestab(true)
            setPlayliststab(false)
            setPlaylistSongsTab(false)
            setSliceStart(0)
            setSliceEnd(4)

           dispatch(saveCurrentSong({}))
            dispatch(saveFileUploaderActive(true))
            dispatch(saveSongEditorActive(false))

            setList ([
              { title: "Songs", active: false },
              { title: "Playlists", active: false },
              { title: "Albums", active: false },
              { title: "Files", active: true }
          ])

            //go to lists array and set the active options to true, then set all others to false
          }

          else if(tabname === "Playlists"){
            dispatch(saveSongSearchInFocus(false))
            dispatch(savePlaylistSearchInFocus(true))
            dispatch(saveFileSearchInFocus(false))
             /*REMOVE THE PLAYLIST BEING EDITED TAB */
             // dispatch(saveAllSongsFromCurrentPlaylistToEdit([ ]))
             //dispatch(saveCurrentlyEditingPlaylistName(null)) we want playlist being edited to persist, so we can add songs to it
                /*REMOVE THE PLAYLIST BEING EDITED TAB - END */

            setSongstab(false)
            setFilestab(false)
            setPlayliststab(true)
            setPlaylistSongsTab(false)
            setSliceStart(0)
            setSliceEnd(4)

            setList ([
              { title: "Songs", active: false },
              { title: "Playlists", active: true },
              { title: "Albums", active: false },
              { title: "Files", active: false }
          ])

            //go to lists array and set the active options to true, then set all others to false
          }
        }


        // Handle files from input or drag-and-drop
        const handleFiles = async (newFiles) => {
          const validFiles = [];
          const invalidFiles = [];
        
          const newSongUploadId = uuidv4();
        
          for (const file of newFiles) {
            console.log("FILE TYPE CAN BE FOUND HERE--->", file);
            console.log("CURRENT SONG UPLOAD ID CAN BE FOUND HERE--->", newSongUploadId);
        
            if (allowedTypes.includes(file.type)) {
              let convertedFile = null;
        
              try {
                if (file.type === "audio/wav" || file.type === "audio/x-wav") {
                  convertedFile = await handleWavToMp3Promise(file, file)
                  .then((returnedFile)=>{
                      console.log("RETURNED FILE IS-->",returnedFile)
                    validFiles.push({
                      file: returnedFile.file,
                      name: returnedFile.name,
                      lastModified: returnedFile.lastModified,
                      size: returnedFile.size,
                      type: returnedFile.type,
                      isUploaded: false,
                      uploadId: uuidv4(),
                      individualId: uuidv4(),
                      createdAt:new Date()
                    });




                    validFiles.push({
                      file: file,
                      name: file.name,
                      lastModified: file.lastModified,
                      size: file.size,
                      type: file.type,
                      isRawFile:true,
                      isUploaded: false,
                      uploadId: uuidv4(),
                      individualId: uuidv4(),
                      createdAt:new Date()
                    });
            
                        
                })
                  .catch((error) => {
                    console.error("Error converting WAV to MP3 USING PROMISE:", error);
                  });
                
                
                }
                
                else if (file.type === "audio/aiff" || file.type === "audio/x-aiff") {
                  convertedFile = await handleAiffToMp3Promise(file, file)
                  .then((returnedFile)=>{
                      console.log("RETURNED FILE IS-->",returnedFile)
                    validFiles.push({
                      file: returnedFile.file,
                      name: returnedFile.name,
                      lastModified: returnedFile.lastModified,
                      size: returnedFile.size,
                      type: returnedFile.type,
                      isUploaded: false,
                      uploadId: uuidv4(),
                      individualId: uuidv4(),
                      createdAt:new Date()
                    });




                    validFiles.push({
                      file: file,
                      name: file.name,
                      lastModified: file.lastModified,
                      size: file.size,
                      type: file.type,
                      isUploaded: false,
                      uploadId: uuidv4(),
                      isRawFile:true,
                      individualId: uuidv4(),
                      createdAt:new Date()
                    });
            
                        
                })
                  .catch((error) => {
                    console.error("Error converting AIFF to MP3 USING PROMISE:", error);
                  });
                
                
                }
                
                
                else{



                      // Push original file to valid files list
                validFiles.push({
                  file: file,
                  name: file.name,
                  lastModified: file.lastModified,
                  size: file.size,
                  type: file.type,
                  isRawFile:true,
                  isUploaded: false,
                  uploadId: uuidv4(),
                  individualId: uuidv4(),
                  createdAt:new Date()
                });
        


                }
        
             
            
            
            
            }
              
              
              
              
              
              
              
              catch (error) {
                console.error("Error converting WAV to MP3:", error);
              }
            } else {
              invalidFiles.push(file.name); // Log invalid file name
            }
          }
        
          // Log invalid file names
          if (invalidFiles.length > 0) {
            notifyErrorFxn(`The following are invalid files: ${invalidFiles.join(", ")}, Please re-upload music files`);
          }
        
          // Update state with valid files
          setFiles((prevFiles) => [...prevFiles, ...validFiles]);
          dispatch(saveNewlyUploadedFiles([...newlyUploadedFiles, ...validFiles]));
        };
        

        const removeFile = (indexToRemove,individualId) => {
          //FILES WILL NOW BE AN OBJECT O FILES FOR ONE SONG ONLY , SO THIS REMOVE WILL COUNT FOR FILES THAT HAVENT BEEN ADDED AS OUR SINGLE SONG FILES
          //setFiles((prevFiles) => prevFiles.filter((_, index) => index !== indexToRemove));
           setFiles((prevFiles) => prevFiles.filter((item) => item.individualId !== individualId));
          dispatch(saveNewlyUploadedFiles([...newlyUploadedFiles.filter((item)=>(item.individualId !== individualId))] ))
        };


        const handleExpandIndex = (indexToRemove) => {
          //logic for hiding other indexes when this one is clicked!
          //will do so shortly
        };
      
        // Handle file input change
        const handleInputChange = async(e) => {
           
           handleFiles(e.target.files);
   
        };
      


        // Handle drag-and-drop
        const handleDrop = (e) => {
          e.preventDefault();
          handleFiles(e.dataTransfer.files);
        };
      
        // Prevent default drag behaviors
        const handleDragOver = (e) => {
          e.preventDefault();
        };







     //   useEffect(()=>{
    //   NOT USING THIS AS IT PERTAINED TO WHEN ALL FILES BELONGED TO ONE SONG
     //    files.forEach((file,index)=>{ 
     //     if(newlyUploadedFullSong &&newlyUploadedFullSong.name && newlyUploadedFullSong.name === file.name || newlyUploadedFullSong &&newlyUploadedFullSong.otherMusicFiles && newlyUploadedFullSong.otherMusicFiles.some(item => item.name === file.name)){
     //       //if we can at least find .aiff name in otherMusicFiles array, stop the uploading
     //     
     //        const filesCopy = [...files] //to have a copy of files state to splice
     //       console.log("WHAT IS FILES COPY--->",filesCopy)
     //       setFiles([...filesCopy.splice(index,1)])
     //    

     //       //dispatch(saveNewlyUploadedFiles([...files.filter(obj => (obj.individualId !== file.individualId ))] ))
     //        

     //      }

     //      if(newlyUploadedFullSong &&newlyUploadedFullSong.coverArtUrl && (new URL(newlyUploadedFullSong.coverArtUrl).pathname.split('/').pop()) === file.name){

     //       const filesCopy = [...files] //to have a copy of files state to splice
     //       console.log("WHAT IS COVER URL PATHNAME FROM AWS--->",new URL(newlyUploadedFullSong.coverArtUrl).pathname.split('/').pop())
     //       setFiles([...filesCopy.splice(index,1)])
     //      }



     //     })

     //   },[newlyUploadedFullSong,newlyUploadedFiles])


     useEffect(()=>{
    //DELETE THIS IF IT CAUSES YOU ANY ISSUES IN FILE DUPLICAITON
     setFiles(newlyUploadedFiles)

     },[newlyUploadedFiles])


    //    useEffect(()=>{
    //       //DELETE THIS IF IT CAUSES YOU ANY ISSUES IN FILE DUPLICAITON
    //      //CLEARING OUR FILES ARRAY SO WE DONT HAVE TWO OF THE SAME UPLOAD - 21ST FEB 2025
//
    //     files.forEach((file,index)=>{ 
    //      if(allFiles && allFiles.some((item) => (item.name === file.name)) ){
    //        
    //      
    //        const filesCopy = [...files] //to have a copy of files state to splice
    //        console.log("WHAT IS FILES COPY--->",filesCopy)
    //        setFiles([...filesCopy.splice(index,1)])
  //
//
    //       }
//
    //       if(allFiles && allFiles.some((item) => (item.coverArtUrl && (new URL(item.coverArtUrl).pathname.split('/').pop()) === file.name) ) ){
//
    //        const filesCopy = [...files] //to have a copy of files state to splice
    //        console.log("WHAT IS COVER URL PATHNAME FROM AWS--->",new URL(newlyUploadedFullSong.coverArtUrl).pathname.split('/').pop())
    //        setFiles([...filesCopy.splice(index,1)])
    //       }
//
//
//
    //      })
//
    //    },[newlyUploadedFiles])

    useEffect(() => {
      if(files.length >0){
        files.forEach(async(file,index)=> {
    
      //if we can at least find .wav name in otherMusicFiles array, stop the uploading
    if(file.isUploaded){
       const filesCopy = [...files] //to have a copy of files state to splice
      console.log("WHAT IS FILES COPY--->",filesCopy)
      setFiles([...filesCopy.splice(index,1)])
   
         }
     
       
        }
      )
      }
     
    },[files,newlyUploadedFiles])

   //    useEffect(() => {
   //     if(files.length >0){
//
   //     const processFiles = async () => {
   //         console.log("VIEW FILES FOR SONG ID HERE -->", files);
   //   
   //         files.forEach(async(file,index)=> {
  //
   //             if (file && !file.isUploaded/*!file.mediaTemporaryUrl*/) {
   //              //   if (file.type === "audio/aiff" || file.type === "audio/x-aiff") {
   //              //       try {
   //              //           const convertedFile = await handleAiffToMp3(file.file,file);  // ✅ Await conversion
   //              //          
//
//
   //              //         //PLEASE NOTE THE NOTE BELOW - DAGOGO - FEB 11 -2025
   //              //         //THE AIFF FILE LOADS WAY SLOWER THAN MP3 FILE INTO THE DB,
   //              //           // SO IT'S NEARLY IMPOSSIBLE TO STOP THE UPLOADING BY REMOVING FROM THE FILES 
   //              //           //ARRAY, IMMEDIATELY AFTER ONE UPLOAD
   //              //           //WE HAVE TO WAIT UNTIL WE SEE IT IN THE OTHER MUSIC FILES ARRAY
   //              //           //HENCE THE IF STATEMENT BELOW
//
   //              //           if(newlyUploadedFullSong &&newlyUploadedFullSong.name && newlyUploadedFullSong.name === file.name || newlyUploadedFullSong &&newlyUploadedFullSong.otherMusicFiles && newlyUploadedFullSong.otherMusicFiles.some(item => item.name === file.name)){
   //              //            //if we can at least find .aiff name in otherMusicFiles array, stop the uploading
   //              //          
   //              //             const filesCopy = [...files] //to have a copy of files state to splice
   //              //            console.log("WHAT IS FILES COPY--->",filesCopy)
   //              //            setFiles([...filesCopy.splice(index,1)])
   //              //         
//
   //              //            dispatch(saveNewlyUploadedFiles([...files.filter(obj => (obj.individualId !== file.individualId ))] ))
   //              //             
//
   //              //           }
   //              //           else{
   //              //           dispatch(uploadMediaFileTemporary(file, files, setFiles, setLoadingSubmit,user && user.id)).then(()=>{
   //              //          
   //              //             dispatch(uploadMediaFileTemporary(convertedFile, files, setFiles, setLoadingSubmit,user && user.id))
   //              //           })
   //              //           }
   //              //        
   //              //       } catch (error) {
   //              //           console.error("Error converting AIFF to MP3:", error);
   //              //       }
   //              //   }
   //                       
   //              console.log("ALL PREVIOUSLY UPLOADDED FILES ARE --->",allFiles)
   //              console.log("AND THEN CURRENT FILES ARE --->",files)
//
   //                 if(file.type === "audio/wav" || file.type === "audio/x-wav"){
   //                       try {
   //                         const convertedFile = await handleWavToMp3(file.file,file);  // ✅ Await conversion
   //                        
//
//
   //                       //PLEASE NOTE THE NOTE BELOW - DAGOGO - FEB 11 -2025
   //                       //THE AIFF FILE LOADS WAY SLOWER THAN MP3 FILE INTO THE DB,
   //                         // SO IT'S NEARLY IMPOSSIBLE TO STOP THE UPLOADING BY REMOVING FROM THE FILES 
   //                         //ARRAY, IMMEDIATELY AFTER ONE UPLOAD
   //                         //WE HAVE TO WAIT UNTIL WE SEE IT IN THE OTHER MUSIC FILES ARRAY
   //                         //HENCE THE IF STATEMENT BELOW
//
   //                        
   //                           
   //                         if( allFiles && allFiles.some((item) => (item.name === file.name) ) ){
   //                          //if we can at least find .wav name in otherMusicFiles array, stop the uploading
   //                        
   //                           const filesCopy = [...files] //to have a copy of files state to splice
   //                          console.log("WHAT IS FILES COPY--->",filesCopy)
   //                          setFiles([...filesCopy.splice(index,1)])
   //                       
//
   //                          dispatch(saveNewlyUploadedFiles([...files.filter(obj => (obj.individualId !== file.individualId ))] ))
   //                           
//
   //                         }
   //                         else{
   //                         dispatch(uploadMediaFileTemporary(file, files, setFiles, setLoadingSubmit,user && user.id)).then(()=>{
   //                                 
   //                           dispatch(uploadMediaFileTemporary(convertedFile, files, setFiles, setLoadingSubmit,user && user.id))
   //                         })
   //                         }
   //                      
   //                     } catch (error) {
   //                         console.error("Error converting AIFF to MP3:", error);
   //                     }
   //                 }
   //                 
   //                 
   //                else {
//
   //                   if( allFiles && allFiles.some(item => item.name === file.name)){
   //                     dispatch(saveNewlyUploadedFiles([...files.filter(obj => (obj.individualId !== file.individualId ))] ))
   //                      const filesCopy = [...files] //to have a copy of files state to splice
   //                      console.log("WHAT IS FILES COPY--->",filesCopy)
   //                      setFiles([...filesCopy.splice(index,1)])
//
   //                   }  
   //                   else if(allFiles && allFiles.some((item) => (item.coverArtUrl && (new URL(item.coverArtUrl).pathname.split('/').pop()) === file.name) )){
   //                    
   //                     dispatch(saveNewlyUploadedFiles([...files.filter(obj => (obj.name !== new URL(file.name).pathname.split('/').pop() ))] )) //POSSIBLY DELETE THIS LINE IF IT'S CAUSING ERRORS
//
   //                       const filesCopy = [...files] //to have a copy of files state to splice
   //                       
   //                       setFiles([...filesCopy.splice(index,1)])
   //                      }
//
//
   //                   else{ 
   //                     
   //                     dispatch(uploadMediaFileTemporary(file, files, setFiles, setLoadingSubmit,user && user.id)).then(()=>{
   //                      
   //                          //THEN DO NOTHING!, i MAY NEED THIS .THEN IN FUTURE SO I LEFT IT HERE -- DAGOGO - FEB 21 2025
//
   //                      })
   //                     
   //                   }
   //                    
   //                 }
//
   //         
   //             }
   //         })
   //       
   //     };
   // 
   //     processFiles(); // ✅ Execute async function
   //   }
//
   // }, [files]);


   /*PROCESS FOR UPLOADING FILES TO FIREBASE ONE BY ONE, TO AVOID DUPLICAITON*/
   const [fileBeingProcessed,setFileBeingProcessed] = useState([])  //empty array that should only have one file at a time

     useEffect(()=>{
    //DELETE THIS IF IT CAUSES YOU ANY ISSUES IN FILE DUPLICAITON
    
    console.log("file being processed LOOK HERE--->",fileBeingProcessed)

  if(fileBeingProcessed.length < 1 && files.length){
     setFileBeingProcessed(files[0])
     
  const filesCopy = [...files]

     const removedItem = filesCopy.shift(); 

     console.log("FILES COPY SHIFTED IS --->",filesCopy)
         
     setFiles(filesCopy); 
     dispatch(saveNewlyUploadedFiles(filesCopy))

    setFileBeingProcessed([removedItem])
    

    }

     },[files,fileBeingProcessed])




     useEffect(()=>{
      //DELETE THIS IF IT CAUSES YOU ANY ISSUES IN FILE DUPLICAITON
      
    if( fileBeingProcessed.length > 0 && fileBeingProcessed.length < 2 ){
     
      dispatch(uploadMediaFileTemporary(fileBeingProcessed[0], files, setFileBeingProcessed, setLoadingSubmit,user && user.id))
      
  
      }
  
       },[fileBeingProcessed])
  







      /*PROCESS FOR UPLOADING FILES TO FIREBASE ONE BY ONE, TO AVOID DUPLICAITON END*/

     useEffect(()=>{
      //FETCH ALL SONGS FROM FIREBASE
          dispatch(fetchAllPlaylistsForOneUser(user && user.id))
          dispatch(fetchAllFilesForOneUser(user && user.id))
           },[])


  
           useEffect(()=>{
            //USE PLAYLISTS FROM FIREBASE TO PRESENT TO SCREEN
                     if(playlistSearchTerm && playlistSearchInFocus){
                      setPlaylistsFromDb(allPlaylists.filter((item)=>(item.playlistName.toLowerCase().includes(playlistSearchTerm.toLowerCase() ))))
                     }
                     else{
                         setPlaylistsFromDb(allPlaylists)
                     }  
                     },[allPlaylists,playlistSearchTerm,playlistSearchInFocus])

          useEffect(()=>{
           //USE PREVIOUSLY UPLOADED FILES FROM FIREBASE TO PRESENT TO SCREEN
           console.log("ALL FILES FROM PREVIOUS SESH ARE --->",allFiles)
                     setPreviouslyUploadedFiles(allFiles.filter((item)=>(item.type !== "audio/aiff"&& item.type !== "audio/x-aiff"&& item.type !== "audio/wav"&& item.type !== "audio/x-wav" )))
                    },[allFiles])


          
                     useEffect(()=>{
                      //USE SONGS FROM A PARTICULAR PLAYLIST TO PRESENT TO SCREEN
                             setSongsFromPlaylist(allSongsFromAPlaylist)
                             console.log("ALL SONGS FROM A Playlist HERE --->",allSongsFromAPlaylist)
                               },[allSongsFromAPlaylist])
          


     useEffect(()=>{
  //FETCH ALL SONGS FROM FIREBASE
      dispatch(fetchAllSongsForOneUser(user && user.id))
       },[])
       

       useEffect(()=>{
//USE SONGS FROM FIREBASE TO PRESENT TO SCREEN
         if(songSearchTerm && songSearchInFocus){
          setFilesFromDb(allSongs.filter((item)=>(item.name && item.name.toLowerCase().includes(songSearchTerm.toLowerCase()))))
         }
         else{
             setFilesFromDb(allSongs)
         }  
         },[allSongs,songSearchTerm,songSearchInFocus])

         useEffect(()=>{
          //USE SONGS FROM FIREBASE TO PRESENT TO SCREEN
                   if(fileSearchTerm && fileSearchInFocus){
                    setPreviouslyUploadedFiles(allFiles.filter((item)=>(item.type !== "audio/aiff"&& item.type !== "audio/x-aiff"&& item.type !== "audio/wav"&& item.type !== "audio/x-wav" )).filter((item)=>(item.name && item.name.toLowerCase().includes(fileSearchTerm.toLowerCase()))))
                   }
                   else{
                       setPreviouslyUploadedFiles(allFiles.filter((item)=>(item.type !== "audio/aiff"&& item.type !== "audio/x-aiff"&& item.type !== "audio/wav"&& item.type !== "audio/x-wav" )))
                   }  
                   },[allFiles,fileSearchTerm,fileSearchInFocus])

  
    return (
        <Box /*flex={3.5}*/ p={2} sx={{ display: { xs: "none", sm: "block" }/*,maxWidth:"100%",*/, background:"#302c34",position:"relative",top:"1rem",borderRadius:"1rem",height:"28rem"/*, width:"29.35rem"*//*width:"28rem"*/, }}>

       <DialogModalFileCreatorComponent open={ openModal } handleClose={ handleCloseModal }  />
            
            <Box mt={2}>
                <Typography 
                    mb={2}
                    sx={{
                        borderBottom: "2px solid #A01565", 
                        display: "inline-block", 
                        paddingBottom: "2px",
                        fontFamily: "inter",
                        fontWeight: "600",
                        fontSize:"16px",
                        position:"relative",
                        top:"-0.5rem"

                    }}
                >File Manager</Typography>

              {/*
                 <SearchBarComponent />
               

                <Box my={1.5} sx={{ display: "flex", justifyContent: "space-evenly" }}>
                    { list.map( (item, key) => (
                        <Typography 
                        onClick ={()=>{handleActiveTab(item.title)}}
                            sx={{ 
                                fontFamily: "inter", 
                                fontSize: "16px", 
                                color: `${ item.active === true ? "#A01565" : "white" }`,
                                cursor: "pointer"
                            }}
                        >
                            { item.title === "Files"? `${item.title} (${
                              //files.filter((item)=>(!item.mediaUrl)).length
                              //(newlyUploadedFullSong && newlyUploadedFullSong.otherMusicFiles&& newlyUploadedFullSong.otherMusicFiles.length?newlyUploadedFullSong.otherMusicFiles.length:0) +
                              // (newlyUploadedFullSong && newlyUploadedFullSong.mediaTemporaryUrl?1:0) +
                              // (newlyUploadedFullSong && newlyUploadedFullSong.coverArtUrl?1:0 ) +
                              //(newlyUploadedFullSong && newlyUploadedFullSong.instrumentalTemporaryUrl?1:0 )
                                allFiles && files && (allFiles.filter((item)=>(item.type !== "audio/aiff"&& item.type !== "audio/x-aiff"&& item.type !== "audio/wav"&& item.type !== "audio/x-wav" )).length + files.length)                 

                            })` :item.title }
                        </Typography>
                    ) ) }
                </Box>
                  */}
               
               
  {/*songstab &&

    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                      

                      <div style={{ marginTop: "20px",width:"100%"}}>
      
      <ul>
      <Droppable droppableId="sourceList">
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          style={{
          
          }}
        >

   {    
    <Element name="scrollContainer" style={{ overflowY: 'auto', maxHeight: '330px', scrollbarWidth: 'none', 
    msOverflowStyle: 'auto' }}>
      {filesFromDb &&
        filesFromDb
          .filter((item) => item.metadata && item.mediaUrl)
          .map((file, index) => (
            <Draggable key={file.songId} draggableId={file.songId || file.uploadId} index={index}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  style={{
                    ...provided.draggableProps.style,
                    background: snapshot.isDragging ? 'inherit' : 'inherit',
                    borderRadius: '4px',
                    boxShadow: snapshot.isDragging
                      ? '0 4px 8px rgba(0, 0, 0, 0.2)'
                      : 'none',
                  }}
                >
                  {file.metadata && (
                    <PlayableMusicComponent
                      show={true}
                      file={file.file}
                      fileFullDetails={file}
                      name={file.name}
                      uploadStatus={"Audiovybez"}
                      handleExpandIndex={handleExpandIndex}
                      indexToBeExpanded={index}
                    />
                  )}
                </div>
              )}
            </Draggable>
          ))}
    </Element> 
      }
             




       



        {filesFromDb && filesFromDb.filter((item)=>(item.metadata)).length == 0 && 
          <p>
              <label
                        
                       
                        style={{
                          border: "0px dashed #ccc",
                         
                          width:"30rem",
                          padding: "20px",
                          paddingLeft:"10rem",
                          textAlign: "center",
                          cursor: "pointer",
                          paddingTop:"20px",
                          
                          
                        }}
                      >
                       No Songs Uploaded 
                      </label>
          </p>
        }


        </div>
         )}
        </Droppable>
      </ul>
    </div>
                </Box>
    */}    



{/*playlistSongsTab &&

<Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                  

                  <div style={{ marginTop: "0px",width:"100%"}}>
  
  <ul>

      {isPlaylistSongsLoading && 
        <p>
        <label
                  
                 
                  style={{
                    border: "0px dashed #ccc",
                   
                    width:"30rem",
                    padding: "20px",
                    paddingLeft:"10rem",
                    textAlign: "center",
                    cursor: "pointer",
                    paddingTop:"20px",
                    
                    
                  }}
                >
                 Loading... 
                </label>
      </p>
      }

    {songsFromPlaylist &&
    
    

      <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center', // Optional: centers icons vertically
        cursor: 'pointer',
        color:"#A01565"
      }}

      onClick={()=>{
        
        setSongstab(false)
        setFilestab(false)
        setPlayliststab(true)
        setPlaylistSongsTab(false)
        setSliceStart(0)
        setSliceEnd(4)

        
         dispatch(saveArrayStartingIndex(0))
         dispatch(saveArrayEndingIndex(4))

        setList ([
          { title: "Songs", active: false },
          { title: "Playlists", active: true },
          { title: "Albums", active: false },
          { title: "Files", active: false }
      ])

    
      }}
      
      >
      <KeyboardArrowLeft
      />
     
     

     Back To Playlists
      </div>



    
    }

   <Element name="scrollContainer" style={{ overflowY: 'auto', maxHeight: '330px', scrollbarWidth: 'none',
    msOverflowStyle: 'auto'  }}>
    {songsFromPlaylist && songsFromPlaylist.filter((item)=>(item.metadata && item.mediaUrl)).slice(sliceStart,sliceEnd).map((file, index) => (
   
    file.metadata && 
    <PlayableMusicComponent show={true} file={file.file} fileFullDetails={file} name={file.name} uploadStatus={"Audiovybez"} handleExpandIndex={handleExpandIndex} indexToBeExpanded={index}/>
    
    ))}
    </Element>

   


    {
    songsFromPlaylist && songsFromPlaylist.filter((item)=>(item.metadata)).length === 0 && !isPlaylistSongsLoading &&
      <p>
          <label
                    
                   
                    style={{
                      border: "0px dashed #ccc",
                     
                      width:"30rem",
                      padding: "20px",
                      paddingLeft:"10rem",
                      textAlign: "center",
                      cursor: "pointer",
                      paddingTop:"20px",
                      
                      
                    }}
                  >
                   No Songs In This Playlist 
                  </label>
      </p>
    }
  </ul>
</div>
            </Box>
*/}    





{/*playliststab &&

<Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                  

 <div style={{ marginTop: "20px",width:"100%"}}>
  
  <ul>
    {

 <Element name="scrollContainer" style={{ overflowY: 'auto', maxHeight: '470px', scrollbarWidth: 'none',
msOverflowStyle: 'auto' }}>
    {
    playlistsFromDb && playlistsFromDb.map((file, index) => (
   
    
    <PlaylistBoxComponent 
    
     setFilestab={setFilestab}
     setSongstab={setSongstab}
     setPlayliststab={setPlayliststab}
     setPlaylistSongsTab={setPlaylistSongsTab}
     setList={setList}
     setSliceStart={setSliceStart}
     setSliceEnd={setSliceEnd}

    show={true} file={file.file} fileFullDetails={file} name={file.playlistName} uploadStatus={"Click to view"} handleExpandIndex={handleExpandIndex} indexToBeExpanded={index}/>
    
    ))
    }
  </Element>
    }


    {playlistsFromDb && playlistsFromDb.length == 0 && 
      <p>
          <label
                    
                   
                    style={{
                      border: "0px dashed #ccc",
                     
                     
                      padding: "20px",
                      paddingLeft:"10rem",
                      textAlign: "center",
                      cursor: "pointer",
                      paddingTop:"20px",
                      
                      
                    }}
                  >
                   No Playlists Saved
                  </label>
      </p>
    }
  </ul>
</div>
            </Box>
  */}    




    {filestab &&

    <>
    {/*
       <Box  onClick={()=>{dispatch(saveNewlyUploadedFullSong(null));dispatch(saveNewlyUploadedFiles([]));dispatch(saveCurrentSongUploadId(null))  }}
       sx={{ display: "flex", alignItems: "center",justifyContent:"flex-end" }}>
            <Typography 
                mb={2}
                sx={{
                    //borderBottom: "2px solid #A01565", 
                    display: "inline-block", 
                    cursor:"pointer",
                   // paddingBottom: "2px",
                    fontFamily: "inter",
                    fontWeight: "500"
                }}
            >Create New Song</Typography>
            <AddCircleOutline 
           
                sx={{ marginBottom: "7px", paddingBottom: "5px", color: "#A01565", marginLeft: "6px", cursor: "pointer" }} 
            />
        </Box>
              */}

    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center",flexDirection:"column" }}>

   {/* <div style={{height:"8rem",backgroundColor:"#1C1C1E",paddingLeft:"2.1rem",paddingRight:"2rem",cursor: "pointer"}}  onDrop={handleDrop} onDragOver={handleDragOver}>
         
          <div style={{marginTop:"2.3rem",position:"relative"}}>
                      
                      <input
                        type="file"
                        multiple
                        onChange={handleInputChange}
                        style={{ display: "none",height:"8rem",width:"20rem",position:"absolute",top:"-2.3rem",left:"-2rem"}}
                        id="fileInput"
                      />
                
                      
                      <label
                        htmlFor="fileInput"
                       // onDrop={handleDrop}
                       // onDragOver={handleDragOver}
                        style={{
                          border: "0px dashed #ccc",
                          borderBottom:"2px solid #ccc",
                          
                          padding: "20px",
                          textAlign: "center",
                          cursor: "pointer",
                          paddingTop:"20px",
                         
                          
                        }}
                      >
                       Drag files here, or click to import 
                      </label>
                
                    </div>        

                      </div>   
      */}        


   
    <div style={{ marginTop: "-20px",width:"100%", marginBottom: "72px"}}>
      
      <ul>

      <Droppable droppableId="uploadList">
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          style={{
          
          }}
        > 


     
        {/*I AM FILTERING FOR MEDIA URL CUZ EVEN THOUGH YOU CAN HAVE TEMPORARY FILES WITH METADATA, THE PERMANENT FILES HAVE MEDIA URL, WHICH SHOULDN'T APPEAR IN FILES */}
        {/*P.S EACH ITEM BEING MAPPED IS DRAGGABLE!, HENCE DRAGGABLE IS INSIDE THE .MAP */}
        {/*files && files.filter((item)=>(!item.mediaUrl)).map((file, index) => (

           <Draggable key={file.songId} draggableId={file.songId?file.songId:file.uploadId} index={index}>
           {(provided, snapshot) => (
             <div
             ref={provided.innerRef}
             {...provided.draggableProps}
             {...provided.dragHandleProps}
             style={{
               ...provided.draggableProps.style,
               //padding: '10px',
               //margin: '8px 0',
               background: snapshot.isDragging ? 'inherit' : 'inherit',
               borderRadius: '4px',
               boxShadow: snapshot.isDragging
                 ? '0 4px 8px rgba(0, 0, 0, 0.2)'
                 : 'none',
             }}
             >
       
       {
      
          <NewMusicComponent show={true} file={file.file} fileFullDetails={file} name={file.name} uploadStatus={"Raw"} removeFile={removeFile} indexToBeRemoved={index}/>
       
      
       }
        
                </div>
              )}
        </Draggable>
       
       ))*/}


{/**PREVIOUSLY UPLOADED FILES SHOULD GO AFTER NEW FILES AND NEW UPLOADS -- HENCE THEY ARE HERE */}

 

{
   <Element name="scrollContainer" style={{ overflowY: 'auto', maxHeight:"350px", scrollbarWidth: 'none', 
   msOverflowStyle: 'auto'}}>

{previouslyUploadedFiles  && previouslyUploadedFiles.length > 0  && previouslyUploadedFiles.filter((item)=>(item.type !== "audio/aiff"&& item.type !== "audio/x-aiff"&& item.type !== "audio/wav"&& item.type !== "audio/x-wav" )).map((file, index) => (

<Draggable key={file.songId} draggableId={file.songId?file.songId:file.uploadId} index={index}>
{(provided, snapshot) => {

if (snapshot.isDragging) {
  const offset = { x: 70, y: 150 }          // your fixed container left/top position
  const x = provided.draggableProps.style.left - offset.x;
  const y = provided.draggableProps.style.top - offset.y;
  provided.draggableProps.style.left = x;
  provided.draggableProps.style.top = y;
}

(
  <div
  ref={provided.innerRef}
  {...provided.draggableProps}
  {...provided.dragHandleProps}
  style={{
    ...provided.draggableProps.style,
    //padding: '10px',
    //margin: '8px 0',
    background: snapshot.isDragging ? 'inherit' : 'inherit',
    borderRadius: '4px',
    marginBottom:"8px",
    boxShadow: snapshot.isDragging
      ? '0 4px 8px rgba(0, 0, 0, 0.2)'
      : 'none',
  }}
  >

{/* !file.metadata &&  NOW I HAVE CHANGES FILES TO DELETE AFTER EACH UPLOAD, IT SHOULDNT MATTER WHETHER THEY HAVE METADATA OR NOT*/

<FileCreatorLongComponent show={false} file={file.file} fileFullDetails={file} name={file.name}  uploadStatus={file && file.type ==='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'||
file && file.type ==="application/vnd.ms-excel"  ||
file && file.type ==="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"||
file && file.type ==="application/vnd.ms-excel.sheet.macroEnabled.12"||
file && file.type ==="application/vnd.ms-excel.template.macroEnabled.12"||
file && file.type ==="application/vnd.openxmlformats-officedocument.spreadsheetml.template"||
file && file.type ==="application/vnd.oasis.opendocument.spreadsheet" 
?'application/xlsx':file && file.type ==='application/vnd.openxmlformats-officedocument.wordprocessingml.document'?'application/doc':file && file.type} handleExpandIndex={handleExpandIndex} removeFile={removeFile} indexToBeRemoved={index} fileToDelete={imageFormats.some((format) => (file.name.toLowerCase().includes(format)))?"coverArtUrl":"mediaTemporaryUrl"}/>
/*:
<PlayableMusicComponent show={false} file={file.file} fileFullDetails={file} name={file.name}  uploadStatus={"Audiovybez"} handleExpandIndex={handleExpandIndex} removeFile={removeFile} indexToBeRemoved={index}/>*/
}

     </div>
   )}
   }
</Draggable>

))
}
</Element>
}


       



        </div>
           )}
          </Droppable>
      </ul>
    </div>
        




              



             {/*
               <>
                <Typography 
                        mt={0} 
                        sx={{ fontSize: 16, fontFamily: "inter", textAlign: "center" }}
                    >
                        Upload from:
                    </Typography>


                    <Box>
                   
                    <Box my={2} sx={{ display: "flex", justifyContent: "space-evenly",scale:"0.8" }}>

                        {
                            options.map( (item, key) => (
                                <Box 
                                    px={3} py={1} 
                                    sx={{ background: "#1C1C1E", textAlign: "center", borderRadius: "7px", width: "99px" }}
                                >
                                    <Box component="img" src={ item.img } sx={{ justifySelf: "center" }} />
                                    <Typography pb={0.5}>{ item.title }</Typography>
                                </Box>
                            ) )
                        }
                        
                    </Box>

               </Box>
               </>
                     */}

       
   </Box>
   </>
    } 
               
            
                

  </Box>

        </Box>
    )
}

export default FileManagerComponent;
