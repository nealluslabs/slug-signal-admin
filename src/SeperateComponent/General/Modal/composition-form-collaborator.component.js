import { Box, Typography } from "@mui/material";

// Icons
import { Info } from "@mui/icons-material";
import { saveCurrentCollaborator,saveCurrentCoverArt } from "src/redux/reducers/group.slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";


const CompositionFormCollaboratorComponent = () => {

    const dispatch= useDispatch()
    const { currentCollaborator } = useSelector((state) => state.group);

    const formData = [
        { label: "Artist Name", placeholder: currentCollaborator &&  currentCollaborator.collaboratorInfo   &&  currentCollaborator.collaboratorInfo.artistName?currentCollaborator.collaboratorInfo   && currentCollaborator.collaboratorInfo.artistName:"", type: "text", active: true },
        { label: "Songwriter/Composer Name", placeholder: currentCollaborator &&  currentCollaborator.collaboratorInfo   &&  currentCollaborator.collaboratorInfo.songwriterName?currentCollaborator.collaboratorInfo   && currentCollaborator.collaboratorInfo.songwriterName:"", type: "text", active: true },
        { label: "PRO Affiliation", placeholder: currentCollaborator &&  currentCollaborator.collaboratorInfo   &&  currentCollaborator.collaboratorInfo.proAffiliation?currentCollaborator.collaboratorInfo   && currentCollaborator.collaboratorInfo.proAffiliation:"", type: "text", active: true },
        { label: "CAE/IPI#", placeholder: currentCollaborator &&  currentCollaborator.collaboratorInfo   &&  currentCollaborator.collaboratorInfo.caeIpi?currentCollaborator.collaboratorInfo   && currentCollaborator.collaboratorInfo.caeIpi:"", type: "text", active: true },
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
                           
                                    let newSongDetails = {...currentCollaborator}
                                    let metadata2 =currentCollaborator.collaboratorInfo?{...currentCollaborator.collaboratorInfo}:{}
       
                                  item.label === "Artist Name"?  metadata2["artistName"] = e.target.value
                                  :
                                  item.label === "Songwriter/Composer Name"?  metadata2["songwriterName"] = e.target.value
                                  :
                                  item.label === "PRO Affiliation"?  metadata2["proAffiliation"] = e.target.value
                                  
                                  
                                  :
                                  metadata2["caeIpi"] = e.target.value
       
                                   dispatch(saveCurrentCollaborator(
                                       {...newSongDetails,
                                         collaboratorInfo:metadata2
                                     }))

                                     console.log("CURRENT COLLABER LOOKS LIKE--->",currentCollaborator)
       
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

export default CompositionFormCollaboratorComponent;
