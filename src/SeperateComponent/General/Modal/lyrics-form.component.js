import { Box, Typography, TextField, Select, MenuItem } from "@mui/material";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { saveCurrentSong } from "src/redux/reducers/group.slice";

const LyricsFormComponent = () => {


    const { currentSong } = useSelector((state) => state.group);
    const dispatch = useDispatch()

    const formData = [
        { label: "Is this a cover song?", placeholder:currentSong && currentSong.isCoverSong?currentSong.isCoverSong: "Select", type: "text" },
        { label: "Is this an instrumental?", placeholder:currentSong && currentSong.isInstrumental?currentSong.isInstrumental: "Select", type: "text" }
    ]

    return (
        <Box style={{width:"50rem"}}>


           <Box my={1} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                       {/* <Typography mr={1} sx={{ fontSize: 14, fontFamily: "inter", fontWeight: "bold" }}>
                            { "Lyrics" }:
                        </Typography> */}
            <TextField
                //label="Lyrics"
                multiline
                rows={4} // Number of visible rows
                placeholder={"type song lyrics here"}
                fullWidth
                value={currentSong && currentSong.songLyrics}
                onChange={(e)=>{
                           
                  let newSongDetails = {...currentSong}

                  newSongDetails["songLyrics"] = e.target.value

                   dispatch(saveCurrentSong(
                       {...newSongDetails
                         
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

            {
                formData.map( (item, key) => (
                    <Box my={1} sx={{ display: "flex", alignItems: "center", justifyContent: "flex-start",gap:"2rem" }}>
                        <Typography mr={1} sx={{ fontSize: 14, fontFamily: "inter", fontWeight: "bold" }}>
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
                           
                                let newSongDetails = {...currentSong}
   
                              item.label === "Is this a cover song?"?  newSongDetails["isCoverSong"] = e.target.value
                              :
                              newSongDetails["isInstrumental"] = e.target.value
   
                               dispatch(saveCurrentSong(
                                   {...newSongDetails,
                                     
                                 }))
   
   
                             }}
                        />*/}



                    <Select
                            value={item.label === "Is this a cover song?" ? (currentSong.metadata && currentSong.metadata.isCoverSong ) : (currentSong.metadata && currentSong.metadata.isInstrumental )}
                            onChange={(e) => {
                              let newSongDetails = { ...currentSong };
                              let metadata2 =currentSong.metadata?{...currentSong.metadata}:{}
                    
                              if (item.label === "Is this a cover song?") {
                                metadata2["isCoverSong"] = e.target.value;
                              } else {
                                metadata2["isInstrumental"] = e.target.value;
                              }
                    
                              dispatch(
                                saveCurrentSong({
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
                          </Select>
                         

                         
                    </Box>
                ) )
            }

        </Box>
    )
}

export default LyricsFormComponent;
