import { Box, Typography } from "@mui/material";

// Icons
import { Info } from "@mui/icons-material";
import { saveCurrentCollaborator,saveCurrentCoverArt } from "src/redux/reducers/group.slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";


const PublishingFormComponent = () => {

    const dispatch= useDispatch()
    const { currentCollaborator } = useSelector((state) => state.group);

  


    const formData = [
        { label: "Publisher Name", placeholder: currentCollaborator &&  currentCollaborator.collaboratorInfo   &&  currentCollaborator.collaboratorInfo.publisherName?currentCollaborator.collaboratorInfo   && currentCollaborator.collaboratorInfo.publisherName:"", type: "text", active: true },
        { label: "Publisher PRO Affiliation", placeholder: currentCollaborator &&  currentCollaborator.collaboratorInfo   &&  currentCollaborator.collaboratorInfo.publisherProAffiliation?currentCollaborator.collaboratorInfo   && currentCollaborator.collaboratorInfo.publisherProAffiliation:"", type: "text", active: true },
        { label: "Publisher CAE/IPI#", placeholder: currentCollaborator &&  currentCollaborator.collaboratorInfo   &&  currentCollaborator.collaboratorInfo.publisherCaeIpi?currentCollaborator.collaboratorInfo   && currentCollaborator.collaboratorInfo.publisherCaeIpi:"", type: "text", active: true },
        { label: "Publisher Contact Info", placeholder: currentCollaborator &&  currentCollaborator.collaboratorInfo   &&  currentCollaborator.collaboratorInfo.publisherContactInfo?currentCollaborator.collaboratorInfo   && currentCollaborator.collaboratorInfo.publisherContactInfo:"", type: "text", active: true },
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
       
                                  item.label === "Publisher Name"?  metadata2["publisherName"] = e.target.value
                                  :
                                  item.label === "Publisher PRO Affiliation"?  metadata2["publisherProAffiliation"] = e.target.value
                                  :
                                  item.label === "Publisher CAE/IPI#"?  metadata2["publisherCaeIpi"] = e.target.value
                                  :
                                  metadata2["publisherContactInfo"] = e.target.value
       
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

export default PublishingFormComponent;
