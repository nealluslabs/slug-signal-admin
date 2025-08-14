import { Box, Typography } from "@mui/material";

// Icons
import { Info } from "@mui/icons-material";
import { saveCurrentSong,saveCurrentCoverArt } from "src/redux/reducers/group.slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";


const CompositionFormComponent = () => {

    const dispatch= useDispatch()
    const { currentSong } = useSelector((state) => state.group);

    const formData = [
        { label: "ISWC#", placeholder:currentSong && currentSong.iswc?currentSong.iswc: 'Refer to you PRO/Put "PENDING"', type: "text", active: true },
        { label: "PA Copyright", placeholder:currentSong && currentSong.paCopyright?currentSong.paCopyright: "Performing Arts Copyright", type: "text", active: true },
        { label: "PA Copyright Date", placeholder: currentSong && currentSong.paCopyrightDate?currentSong.paCopyrightDate:"Enter Number", type: "text", active: true }
    ]

    return (
        <Box style={{width:"50rem"}}>

            {
                formData.map( (item, key) => (
                    <Box my={1} sx={{ display: "flex", alignItems: "center", justifyContent: "space-around" }}>
                        <Typography flex={1} mr={1} sx={{ fontSize: 14, fontFamily: "inter", fontWeight: "bold" }}>
                            { item.label }:
                        </Typography>
                        
                        <Box flex={2} sx={{ display: "flex", alignItems: "center" }}>
                            <input 
                                placeholder={ item.placeholder }
                                style={{ 
                                    padding: "2px 6px", fontSize: "13px", fontFamily: "inter", outline: "none", 
                                    width: "100%" 
                                }}
                                type={ item.type }

                                onChange={(e)=>{
                           
                                    let newSongDetails = {...currentSong}
                                    let metadata2 =currentSong.metadata?{...currentSong.metadata}:{}
       
                                  item.label === "ISWC#"?  metadata2["iswc"] = e.target.value
                                  :
                                  item.label === "PA Copyright"?  metadata2["paCopyright"] = e.target.value
                                  
                                  :
                                  metadata2["paCopyrightDate"] = e.target.value
       
                                   dispatch(saveCurrentSong(
                                       {...newSongDetails,
                                         metadata:metadata2
                                     }))
       
                                 }}
                            />
                            {
                                item.active && <Info sx={{ marginLeft: "2px", width: "18px" }} />
                            }
                        </Box>
                    </Box>
                ) )
            }

        </Box>
    )
}

export default CompositionFormComponent;
