import { Avatar, Box, Button, CardMedia, Menu, MenuItem, Typography } from "@mui/material";

import Sound from "../../../assets/images/sound.png";
import { useDispatch, useSelector } from "react-redux";
import { saveCurrentCollaborator,saveCurrentCollaboratorImg, saveSongCreatorSongs } from "src/redux/reducers/group.slice";
import { useRef, useState } from "react";


import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import 'react-horizontal-scrolling-menu/dist/styles.css';
import { notifyErrorFxn, notifySuccessFxn } from "src/utils/toast-fxn";

const ContactInfoComponent = () => {
   
    const dispatch= useDispatch()
    const { currentCollaborator,currentCollaboratorImg,allFiles,songCreatorSongs } = useSelector((state) => state.group);

    const [previouslyUploadedFiles,setPreviouslyUploadedFiles] = useState(allFiles && allFiles)
    const imageFormats = ["jpg", "jpeg", "png", "gif", "bmp", "webp", "tiff", "svg"];

    console.log("CURRENT COLLABORATOR IS --->",currentCollaborator)

    const customAnchorRef = useRef(null)

    console.log("CURRENT COLLABORATOR IMG--->",currentCollaboratorImg )

    const [file, setFile] = useState(currentCollaboratorImg ? currentCollaboratorImg.file:'')
    const [selectedFile, setSelectedFile] = useState({selectedFile: [], selectedFileName: []})
    const [selectedPic, setSelectedPic] =useState({name:null})
    const handleselectedFile = event => {
        setSelectedFile({
            selectedFile: event.target.files[0],
            selectedFileName: event.target.files[0].name
        })
        setFile(URL.createObjectURL(event.target.files[0]))

        dispatch(saveCurrentCollaboratorImg({
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
        { label: "First Name", value: currentCollaborator && currentCollaborator.firstName?currentCollaborator.firstName :"",placeholder: currentCollaborator && currentCollaborator.firstName?currentCollaborator.firstName :"Enter First Name", type: "text" },
        { label: "Last Name",value:currentCollaborator  && currentCollaborator.lastName?  currentCollaborator.lastName : "" ,placeholder:currentCollaborator &&   currentCollaborator.lastName? currentCollaborator.lastName : "Enter Last Name", type: "text" },
        { label: "Phone Number",value:currentCollaborator  && currentCollaborator.phoneNumber?  currentCollaborator.phoneNumber : "" ,placeholder:currentCollaborator &&  currentCollaborator.phoneNumber? currentCollaborator.phoneNumber : "", type: "text" },
        { label: "Email",value:currentCollaborator  && currentCollaborator.email?  currentCollaborator.email : " " ,placeholder:currentCollaborator &&  currentCollaborator.email?  currentCollaborator.bpm : "example@yahoo.com", type: "text" },
        { label: "Location", value:currentCollaborator  && currentCollaborator.location?  currentCollaborator.location : " ",placeholder:currentCollaborator &&  currentCollaborator.location?  currentCollaborator.location : "Enter song's key signature", type: "text" },
        
    ]

    return (
      <>
      <p ref={customAnchorRef} style={{position:"absolute",left:"-9rem",top:"14rem",color:"transparent",opacity:"0"}}>anchor</p>
        <Box sx={{display:"flex",flexDirection:"row-reverse",width:"50rem",position:"relative"}} >
             
            <Box mb={3} sx={{ cursor: "pointer" ,width:"50%",display:"flex",justifyContent:"center",position:"relative",top:"0.5rem"}}>
               {/* <Box 
                    component="img" src={  currentCollaborator && currentCollaborator.coverArt?currentCollaborator.coverArt :Sound } 
                    sx={{ border: "1px solid grey", margin: "1px auto" }}
               />*/}

               <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center' }}>
                
                 {
                 currentCollaboratorImg && currentCollaboratorImg.file?
                  <CardMedia
                   style={{ border: '4px solid white', backgroundColor: '#fff', width: '200px',height:'200px',borderRadius:"50%" }}
                   component="img"
                   height="100"
                   width="100"
                   image={file ? file :currentCollaborator && currentCollaborator.profileImg?currentCollaborator.profileImg:currentCollaboratorImg?URL.createObjectURL(currentCollaboratorImg.file) :null}
                   alt="IMG"
              />
             :
            <Avatar
              src={file ? file :currentCollaborator && currentCollaborator.profileImg?currentCollaborator.profileImg:currentCollaboratorImg?currentCollaboratorImg.file :null}
              sx={{
                width: 150,
                height: 150,
                border: "4px solid white",
                cursor: "pointer",
              }}
            />
            }


                 <Button component="label" variant="contained"
                // onClick={(e)=>{handleClickTop(e)}} 
                 style={{ minHeight: '45px', minWidth: '145px', backgroundColor:'inherit',color:"white" ,marginTop: '15px' }}>
                   <b>Profile Image</b>
                   <input
                     type="file"
                     style={{ display: 'none' }}
                     onChange={handleselectedFile}
                     
                   />
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
                  
                   dispatch(saveCurrentCollaborator(
                    {
                        ...currentCollaborator,
                        profileImg:item.mediaTemporaryUrl||item.mediaUrl,
                        coverArtName:item.name
                    }
                   ));

                   dispatch(saveSongCreatorSongs(
                    songCreatorSongs.map((song)=>(
                        song.songId === currentCollaborator.songId ?
                        {

                            ...currentCollaborator,
                        profileImg:item.mediaTemporaryUrl||item.mediaUrl,
                        coverArtName:item.name
                        }

                        :
                        song
                    ))
                   ))
                   
                */}} >
                  <Box component="img" src={ item.mediaTemporaryUrl|| item.mediaUrl||item.profileImg } sx={{ height: "200px", width: "200px" }} />
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
                        dispatch(saveCurrentCollaborator(
                            {
                                ...currentCollaborator,
                                profileImg:selectedPic.mediaTemporaryUrl||selectedPic.mediaUrl,
                                coverArtName:selectedPic.name
                            }
                           ))
        
                           dispatch(saveSongCreatorSongs(
                            songCreatorSongs.map((song)=>(
                                song.songId === currentCollaborator.songId ?
                                {
        
                                    ...currentCollaborator,
                                profileImg:selectedPic.mediaTemporaryUrl||selectedPic.mediaUrl,
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
                           
                             let newSongDetails = {...currentCollaborator}
                             let metadata2 =currentCollaborator.metadata?{...currentCollaborator.metadata}:{}

                           item.label === "First Name"?  newSongDetails["firstName"] = e.target.value
                           :
                           item.label === "Last Name"? newSongDetails["lastName"] = e.target.value
                           :
                           item.label === "Phone Number"? newSongDetails["phoneNumber"] = e.target.value
                           :
                           item.label === "Email"? newSongDetails["email"] = e.target.value
                         
                           :
                          newSongDetails["location"] = e.target.value

                            dispatch(saveCurrentCollaborator(
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

export default ContactInfoComponent
