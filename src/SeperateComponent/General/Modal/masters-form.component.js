import { Box, Typography, TextField, Select, MenuItem } from "@mui/material";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { saveCurrentCollaborator } from "src/redux/reducers/group.slice";

const MastersFormComponent = () => {


    const { currentCollaborator } = useSelector((state) => state.group);
    const dispatch = useDispatch()

    const formData = [
        { label: "Record Label", placeholder:currentCollaborator &&  currentCollaborator.colllaboratorInfo && currentCollaborator.collaboratorInfo.recordLabel?currentCollaborator.colllaboratorInfo && currentCollaborator.collaboratorInfo.recordLabel: "DO NOT LEAVE BLANK. Enter legal name if no record label", type: "text" },
       
    ]

    return (
        <Box style={{width:"50rem"}}>


           
            {
                formData.map( (item, key) => (
                    <Box my={1} sx={{ display: "flex", alignItems: "center", justifyContent: "flex-start",gap:"0rem",marginBottom:"1.2rem" }}>
                        <Typography mr={0} sx={{ fontSize: 14, fontFamily: "inter", fontWeight: "bold",width:"20%" }}>
                            { item.label }:
                        </Typography>
                        {/*<input 
                            placeholder={ item.placeholder }
                            style={{ 
                                padding: "2px 6px", fontSize: "13px", fontFamily: "inter", outline: "none", 
                                width: "64%" 
                            }}
                            type={ item.type }
                            onChange={(e)=>{
                           
                                let newSongDetails = {...currentCollaborator}
   
                              item.label === "Is this a cover song?"?  newSongDetails["isCoverSong"] = e.target.value
                              :
                              newSongDetails["isInstrumental"] = e.target.value
   
                               dispatch(savecurrentCollaborator(
                                   {...newSongDetails,
                                     
                                 }))
   
   
                             }}
                        />*/}



                    {/*<Select
                            value={item.label === "Is this a cover song?" ? (currentCollaborator.metadata && currentCollaborator.metadata.isCoverSong ) : (currentCollaborator.metadata && currentCollaborator.metadata.isInstrumental )}
                            onChange={(e) => {
                              let newSongDetails = { ...currentCollaborator };
                              let metadata2 =currentCollaborator.metadata?{...currentCollaborator.metadata}:{}
                    
                              if (item.label === "Is this a cover song?") {
                                metadata2["isCoverSong"] = e.target.value;
                              } else {
                                metadata2["isInstrumental"] = e.target.value;
                              }
                    
                              dispatch(
                                saveCurrentCollaborator({
                                  ...newSongDetails,
                                  metadata:metadata2
                                })
                              );
                            }}
                            sx={{
                              width: "20%",
                              height:"2rem",
                              fontSize: "13px",
                              fontFamily: "inter",
                              background: "white",
                              position:"relative",
                              left:item.label === "Is this a cover song?"?"1.2rem":"0rem"
                            }}
                          >
                            <MenuItem value={true}>Yes</MenuItem>
                            <MenuItem value={false}>No</MenuItem>
                          </Select>*/}


                          <input 
                                placeholder={ item.placeholder }
                                style={{ 
                                    padding: "2px 6px", fontSize: "13px", fontFamily: "inter", outline: "none", 
                                    width: "100%" 
                                }}
                                type={ item.type }

                                onChange={(e)=>{
                           
                                    let newSongDetails = {...currentCollaborator}
                                    let metadata2 =currentCollaborator.collaboratorInfo?{...currentCollaborator.collaboratorInfo}:{}
       
                                  item.label === "Record Label"?  metadata2["recordLabel"] = e.target.value
                                  :
                                  item.label === "PA Copyright"?  metadata2["paCopyright"] = e.target.value
                                  
                                  :
                                  metadata2["paCopyrightDate"] = e.target.value
       
                                   dispatch(saveCurrentCollaborator(
                                       {...newSongDetails,
                                         collaboratorInfo:metadata2
                                     }))
                                     console.log("CURRENT COLLABER LOOKS LIKE--->",currentCollaborator)
                                 }}
                            />
                         

                         
                    </Box>
                ) )
            }


<Typography mr={1} sx={{ fontSize: 14, fontFamily: "inter", fontWeight: "bold" }}>
                            { "Label Contact Info" }
                        </Typography> 
<Box my={1} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                     
            <TextField
                //label="Lyrics"
                multiline
                rows={4} // Number of visible rows
                placeholder={""}
                fullWidth
                value={currentCollaborator && currentCollaborator.collaboratorInfo && currentCollaborator.collaboratorInfo.labelContactInfo}
                onChange={(e)=>{
                           
                  let newSongDetails = {...currentCollaborator}
                  let metadata2 =currentCollaborator.metadata?{...currentCollaborator.metadata}:{}

                  metadata2["labelContactInfo"] = e.target.value

                  dispatch(saveCurrentCollaborator(
                    {...newSongDetails,
                      collaboratorInfo:metadata2
                  }))


                 }}
                sx={{
                  width:"100%",
                    '& .MuiOutlinedInput-root': {
                        background: "white",
                        color: 'black',
                       
                        marginBottom: "4px",
                        fontFamily: "inter", fontSize:14
                    },
                    '& .MuiInputLabel-root': {
                      color: 'black',
                      transform: 'translate(14px, 16px) scale(1)', // Adjust initial position
                    },
                    '& .MuiInputLabel-shrink': {
                      transform: 'translate(14px, 0px) scale(0.5) !important', // Moves only half as high
                    }
                  }}
            />

            </Box>


        </Box>
    )
}

export default MastersFormComponent;
