import { Box, Typography,styled,InputBase } from "@mui/material";
import { Search,KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';

// Component
import { SearchBarComponent } from "../General";
//import CreatorSubComponent from "./creator-sub.component";
import { v4 as uuidv4 } from 'uuid'

// Icon
import { Upload } from "@mui/icons-material";

// Images
import OpenBox from '../../assets/images/openBox.png';
import BoxImg from "../../assets/images/box.png";
import Drive from "../../assets/images/drive.png";
import D from "../../assets/images/D.png";
import { useEffect, useState,useRef } from "react";
//import NewMusicComponent from "./new-music.component";

import { fetchAllSongs,fetchAllPlaylists ,uploadMediaFile, fetchAllSongsForOneUser, fetchAllPlaylistsForOneUser } from "src/redux/actions/group.action";
import { useDispatch, useSelector } from "react-redux";
import { notifyErrorFxn } from "src/utils/toast-fxn";
//import { parseBlob } from 'music-metadata';
import axios from "axios";
import { saveNewlyUploadedFiles,saveNewlyUploadedPlaylist ,saveAllSongs,saveAllPlaylists, savePlaylistSearchTerm } from "src/redux/reducers/group.slice";
import PlayableMusicComponent from "../MusicCatalog/playable-music.component";
import { useNavigate } from "react-router-dom";
import FullMusicComponent from "./full-music.component";

//scroller
import { Element, scroller } from 'react-scroll';


const ViewPlaylistComponent = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

    const [list,setList] = useState([
        { title: "Songs", active: true },
        { title: "Playlists", active: false },
        { title: "Albums", active: false },
        { title: "Files", active: false }
    ]);

    const options = [
        { title: "Drive", img: Drive },
        { title: "Box", img: BoxImg },
        { title: "Dropbox", img: OpenBox },
        { title: "DISCO", img: D }
    ]


  // Allowed file types (audio and video formats)
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
    "video/mp4",  // mp4
    "video/ogg",  // ogg
    "video/webm", // webm
  ];


  const SearchBox = styled("div")(({ theme }) => ({
    backgroundColor: "white", // Completely white background
    border: "1px solid #ccc", // Optional: Add a subtle border
    borderRadius: theme.shape.borderRadius,
    width: "100%",
    gap:"5px",
    display: "flex",
    alignItems: "center",
    padding: "5px 10px", // Inner padding
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Optional: Subtle shadow
  }));
  
  const SearchInput = styled('input')(({ theme }) => ({
    flex: 1,
    marginLeft: theme.spacing(1),
    height:"2rem",
    width:"100%",
    border:"0px solid black",
    "&:focus": {
      outline: "none", // Ensures no outline on focus
      boxShadow: "none", // Removes any potential shadow
      border: "none" // Ensures no border appears
    },
    "& .MuiInputBase-input": {
      padding: "5px 0",
      color: "#333", // Dark text for input
    },
  }));
  
  const SearchIconWrapper = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#333", // Icon color
    padding: theme.spacing(0, 1),
  }));

    const {user} = useSelector((state)=> state.auth)
    const { currentPlaylist,newlyUploadedFiles ,newlyUploadedPlaylist,allSongs,allPlaylists,allSongsFromAPlaylist,isPlaylistSongsLoading} = useSelector((state)=> state.group)
   console.log("current playlist is --->",currentPlaylist)
        const [files, setFiles] = useState([]); // State to store selected files
        const [filesFromDb, setFilesFromDb] = useState([]); // State to store selected files
        const [songsFromPlaylist, setSongsFromPlaylist] = useState([]); // State to store sonds from a selected playlist
        const [playlistsFromDb, setPlaylistsFromDb] = useState([]); // State to store selected playlist
        
        const [filestab, setFilestab] = useState(false);
        const [playliststab, setPlayliststab] = useState(false);
        const [playlistSearchTerm, setPlaylistSearchTerm] = useState(null);
        const [songstab, setSongstab] = useState(true);
        const [playlistSongsTab, setPlaylistSongsTab] = useState(false);

        const [sliceStart, setSliceStart] = useState(0);

        const [sliceEnd, setSliceEnd] = useState(6);


        const searchRef = useRef(null);

useEffect(() => {
  if (searchRef.current) {
    searchRef.current.focus();
  }
}, [playlistSearchTerm]); // Re-focus whenever playlistSearchTerm changes



      const  handleSearch = (term) => {
         setPlaylistSearchTerm(term)
        }

          
        const handleActiveTab = (tabname) => {
          
          if(tabname === "Songs"){
            setSongstab(true)
            setFilestab(false)
            setPlayliststab(false)
            setPlaylistSongsTab(false)
            setSliceStart(0)
            setSliceEnd(6)

            setList([
              { title: "Songs", active: true },
              { title: "Playlists", active: false },
              { title: "Albums", active: false },
              { title: "Files", active: false }
          ])


            //go to lists array and set the active options to true, then set all others to false
          }
          else if(tabname === "Files"){
            setSongstab(false)
            setFilestab(true)
            setPlayliststab(false)
            setPlaylistSongsTab(false)
            setSliceStart(0)
            setSliceEnd(6)

            setList ([
              { title: "Songs", active: false },
              { title: "Playlists", active: false },
              { title: "Albums", active: false },
              { title: "Files", active: true }
          ])

            //go to lists array and set the active options to true, then set all others to false
          }

          else if(tabname === "Playlists"){
            setSongstab(false)
            setFilestab(false)
            setPlayliststab(true)
            setPlaylistSongsTab(false)
            setSliceStart(0)
            setSliceEnd(6)

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
        const handleFiles = (newFiles) => {
          const validFiles = [];
          const invalidFiles = [];
      
          Array.from(newFiles).forEach((file) => {
            if (allowedTypes.includes(file.type)) {
              validFiles.push(
                {
                  file,
                  name:file.name,
                  lastModified:file.lastModified,
                  size:file.size,
                  type:file.type,
                  isUploaded:false,
                  uploadId:uuidv4()
 
              }
              
              ); // Add valid file to the list
            } else {
              invalidFiles.push(file.name); // Log invalid file name
            }
          });
      
          // Log invalid file names to the console
          if (invalidFiles.length > 0) {
            notifyErrorFxn(`The following are invalid files:${invalidFiles.join(", ")},  Please re-upload music files`, );
          }
      
          // Update state with valid files
          setFiles((prevFiles) => [...prevFiles, ...validFiles]);
         dispatch(saveNewlyUploadedFiles([...newlyUploadedFiles,...validFiles]))

         //dispatch(saveNewlyUploadedPlaylist([...newlyUploadedPlaylist,...validFiles]))
          /*PUT UPLOADING LOGIC HERE - IT HAS BEEN MOVED TO USE EFFECT */

        };

        const removeFile = (indexToRemove) => {
          setFiles((prevFiles) => prevFiles.filter((_, index) => index !== indexToRemove));
        };


        const handleExpandIndex = (indexToRemove) => {
          //logic for hiding other indexes when this one is clicked!
          //will do so shortly
        };
      
        // Handle file input change
        const handleInputChange = async(e) => {
           
          
            
           handleFiles(e.target.files);
            
            try {
            //  // Create a FormData object to send the file
            //  const formData = new FormData();
            //  formData.append("file", file);
        //
            //  // Make the POST request using axios
            //  const response = await axios.post("http://localhost:5008/api/migrate/music-metadata", formData, {
            //    headers: {
            //      "Content-Type": "multipart/form-data", // Required for file uploads
            //    },
            //  });
        //
            //  // Log the response from the server
            //  console.log("METADATA RAW INFO--->", response.data);

              
           // (async () => {
           //   const fileInput = document.querySelector('input[type="file"]');
           //   const file = fileInput.files[0];
           //   
           //   try {
           //     const metadata = await parseBlob(file);
           //     console.log("METADATA IS ---->",metadata);
           //   } catch (error) {
           //     console.error('Error parsing metadata:', error.message);
           //   }
           // })();

                     
             //   if(files.length){
          //
             //     files.forEach((file,index)=>{
             //       if(!file.metadata){
             //     console.log("FILE TO VIEW--->",file)
             //       dispatch(uploadMediaFile(file))
             //       }
             //     
             //     })
             //      
             //     //setFiles([]);
             //      }
            } catch (error) {
              // Log any errors encountered during the request
              console.error("Error fetching metadata:", error.message);
            }
          

          

   
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

     //  useEffect(()=>{
//
     //   console.log("VIEW FILES FOR SONG ID HERE -->",files)
     //      
     //  if(files.some((item)=>(!item.metadata))){
     //   files.forEach((file,index)=>{
     //     if(!file.metadata){
     //    //check for metadata and if it doesnt exist then upload it!
//
     //   
     //   
     //   dispatch(uploadMediaFile(file,files,setFiles))
     //   
     //   
     //   
     //   }
     //   })
//
     //  }
//
     //  },[files])

     useEffect(()=>{
      //RESET THE PLAYSIT SEARCH JUST IN CASE
          //dispatch(savePlaylistSearchTerm(null))
          setPlaylistSearchTerm(null)
           },[])

     useEffect(()=>{
      //FETCH ALL SONGS FROM FIREBASE
          dispatch(fetchAllPlaylistsForOneUser(user.id))
           },[])

           useEffect(()=>{
            //USE SONGS FROM FIREBASE TO PRESENT TO SCREEN
                   setPlaylistsFromDb(allPlaylists)
                   console.log("ALL Playlists HERE --->",allPlaylists)
                     },[allPlaylists])

          
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
       setFilesFromDb(allSongs)
       console.log("ALL SONGS HERE --->",allSongs)
         },[allSongs])

       useEffect(()=>{

      setFiles(newlyUploadedFiles)
      console.log("NEWLY UPLOADED FILES -->",newlyUploadedFiles )
 
       },[newlyUploadedFiles])

    return (
        <Box flex={2} p={2} sx={{ display: {  sm: "block"}  }}>
            
            <Box mt={2}>
                <Typography 
                    mb={2}
                    sx={{
                        borderBottom: "2px solid #A01565", 
                        display: "inline-block", 
                        paddingBottom: "2px",
                        fontFamily: "inter",
                        fontWeight: "500",
                        width:"max-content"
                    }}
                >{currentPlaylist && currentPlaylist.playlistName ?currentPlaylist.playlistName:"Browse Playlist"}
                </Typography>

               {/* <SearchBarComponent />*/}

                {/*<Box my={1.5} sx={{ display: "flex", justifyContent: "space-evenly" }}>
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
                            { item.title === "Files"? `${item.title} (${files.filter((item)=>(!item.metadata)).length})` :item.title }
                        </Typography>
                    ) ) }
                  </Box>*/}

               
               
  {/*songstab &&

    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                      

                      <div style={{ marginTop: "20px",width:"100%"}}>
      
      <ul>
        {filesFromDb && filesFromDb.filter((item)=>(item.metadata)).slice(sliceStart,sliceEnd).map((file, index) => (
       
        file.metadata && 
        <PlayableMusicComponent show={true} file={file.file} fileFullDetails={file} name={file.name} uploadStatus={"Audiovybez"} handleExpandIndex={handleExpandIndex} indexToBeExpanded={index}/>
        
        ))}

       { filesFromDb && filesFromDb.length > 0 && 

                 <div
                 style={{
                   width: '100%',
                   display: 'flex',
                   justifyContent: 'space-between',
                   alignItems: 'center', // Optional: centers icons vertically
                 }}
                 >
                 <KeyboardArrowLeft onClick={()=>{
                   if(sliceStart > 0 ){
                    setSliceStart(sliceStart - 4)
                    setSliceEnd(sliceEnd - 4)
                   }

                 }}
                 style={{ cursor: 'pointer' }} />
                
                

                 <KeyboardArrowRight
                 
                 onClick={()=>{
                  if(sliceEnd < filesFromDb.length-1){
                  setSliceStart(sliceStart + 4)
                   setSliceEnd(sliceEnd + 4)
                  }

                }}
                 
                 style={{ cursor: 'pointer' }} />
                 </div>


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
      </ul>
    </div>
                </Box>
    */}    



{

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

    {/*songsFromPlaylist &&
    
    

      <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center', 
        cursor: 'pointer',
        color:"#A01565",
        marginBottom:"20px"
      }}

      onClick={()=>{
        
        navigate('/music-catalogue')
     
       }}
      
      >
      <KeyboardArrowLeft/>
     
     

     Back To Playlists
      </div>


    */}

        <div style={{display:"flex",gap:"10px",alignItems:"center",justifyContent:"center"}}>
        <div style={{flex:9}}>
        <SearchBox  >
          <SearchInput ref={searchRef}  value={playlistSearchTerm?playlistSearchTerm:null} onChange={(e)=>{handleSearch(e.target.value)}}  placeholder="Search for a Song..." />
          <SearchIconWrapper >
            <Search />
          </SearchIconWrapper>

          
        </SearchBox>
        </div>

        <div style={{flex:1}}>
        <Box px={1} py={0.5}   mr={3} onClick={()=>{}}
          sx={{display:"flex",justifyContent:"center",
                  alignItems:"center",height:"2.8rem",
                  width:"100%", background: "#A01565",
                   borderRadius: "4px", cursor: "pointer",
                    textAlign: "center" }}>
                    <Typography sx={{ color: "white", fontFamily: "inter", fontSize: "15px" }}>{"DOWNLOAD"}</Typography>

                   
        </Box>
        </div>


        </div>

        <Element name="scrollContainer" style={{ overflowY: 'auto', maxHeight: '60vh',zIndex:"-1", scrollbarWidth: 'none', /* For Firefox */
    msOverflowStyle: 'none' /* For IE/Edge */ }}>
  {
   
   playlistSearchTerm !== null ?
    
    songsFromPlaylist && songsFromPlaylist.filter((item)=>(item.name && item.name.toLowerCase().includes(playlistSearchTerm.toLowerCase()))).filter((item)=>(!item.mediaTemporaryUrl)).map((file, index) => (
     
      file.metadata && 
      <FullMusicComponent show={true} file={file.file} fileFullDetails={file} name={file.name} uploadStatus={"Kendrick Lamar"} handleExpandIndex={handleExpandIndex} indexToBeExpanded={index}/>
      
     
      ))
       

    :
   
    songsFromPlaylist && songsFromPlaylist.filter((item)=>(!item.mediaTemporaryUrl)).map((file, index) => (
   
    file.metadata && 
    <FullMusicComponent show={true} file={file.file} fileFullDetails={file} name={file.name} uploadStatus={"Kendrick Lamar"} handleExpandIndex={handleExpandIndex} indexToBeExpanded={index}/>
    
    ))
   
     }
    </Element>

   {/* songsFromPlaylist && songsFromPlaylist.length > 0 && 

             <div
             style={{
               width: '100%',
               display: 'flex',
               justifyContent: 'space-between',
               alignItems: 'center', // Optional: centers icons vertically
             }}
             >
             <KeyboardArrowLeft onClick={()=>{
               if(sliceStart > 0 ){
                setSliceStart(sliceStart - 6)
                setSliceEnd(sliceEnd - 6)
               }

             }}
             style={{ cursor: 'pointer' }} />
            
            

             <KeyboardArrowRight
             
             onClick={()=>{
              if(sliceEnd < songsFromPlaylist.length-1){
              setSliceStart(sliceStart + 6)
               setSliceEnd(sliceEnd + 6)
              }

            }}
             
             style={{ cursor: 'pointer' }} />
             </div>


          */}


    {songsFromPlaylist && songsFromPlaylist.filter((item)=>(item.metadata)).length === 0 && !isPlaylistSongsLoading &&
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
}    





{playliststab &&

<Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                  

                  <div style={{ marginTop: "20px",width:"100%"}}>
  
  <ul>
    {/*playlistsFromDb && playlistsFromDb.slice(sliceStart,sliceEnd).map((file, index) => (
   
    
    <PlaylistBoxComponent 
    
     setFilestab={setFilestab}
     setSongstab={setSongstab}
     setPlayliststab={setPlayliststab}
     setPlaylistSongsTab={setPlaylistSongsTab}
     setList={setList}
     setSliceStart={setSliceStart}
     setSliceEnd={setSliceEnd}

    show={true} file={file.file} fileFullDetails={file} name={file.playlistName} uploadStatus={"Click to view"} handleExpandIndex={handleExpandIndex} indexToBeExpanded={index}/>
    
    ))*/}

   {/* playlistsFromDb && playlistsFromDb.length > 0 && 

             <div
             style={{
               width: '100%',
               display: 'flex',
               justifyContent: 'space-between',
               alignItems: 'center', // Optional: centers icons vertically
             }}
             >
             <KeyboardArrowLeft onClick={()=>{
               if(sliceStart > 0 ){
                setSliceStart(sliceStart - 4)
                setSliceEnd(sliceEnd - 4)
               }

             }}
             style={{ cursor: 'pointer' }} />
            
            

             <KeyboardArrowRight
             
             onClick={()=>{
              if(sliceEnd < playlistsFromDb.length-1){
              setSliceStart(sliceStart + 4)
               setSliceEnd(sliceEnd + 4)
              }

            }}
             
             style={{ cursor: 'pointer' }} />
             </div>


          */}


    {/*playlistsFromDb && playlistsFromDb.length == 0 && 
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
                   No Playlists Saved
                  </label>
      </p>
                  */}
  </ul>
</div>
            </Box>
}    




   

  </Box>

        </Box>
    )
}

export default ViewPlaylistComponent;
