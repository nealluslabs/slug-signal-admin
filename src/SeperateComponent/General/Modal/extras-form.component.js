import { Box, Typography } from "@mui/material";

// Icons
import { Info } from "@mui/icons-material";
import { saveCurrentCollaborator,saveCurrentCoverArt } from "src/redux/reducers/group.slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";


const ExtrasFormComponent = () => {

    const dispatch= useDispatch()
    const { currentCollaborator } = useSelector((state) => state.group);

  //  const formData = [
  //      { label: "Collaborator Tags", placeholder: currentSong && currentSong.paCopyrightDate?currentSong.paCopyrightDate:"DO NOT LEAVE BLANK. Assign your collaborator with appropriate tags", type: "text", active: true },
  //      { label: "Spotify", placeholder: currentSong && currentSong.paCopyrightDate?currentSong.paCopyrightDate:"Enter Number", type: "text", active: true },
  //      { label: "Instagram", placeholder:currentSong && currentSong.paCopyright?currentSong.paCopyright: "Enter As Shown in your PRO", type: "text", active: true },
  //      { label: "Website", placeholder:currentSong && currentSong.iswc?currentSong.iswc: '', type: "text", active: true },
  //      { label: "Sounds Like", placeholder:currentSong && currentSong.iswc?currentSong.iswc: '', type: "text", active: true },
  //      { label: "Artist Bio", placeholder:currentSong && currentSong.iswc?currentSong.iswc: '', type: "text", active: true },
  //  ]


    const formData = [
        { label: "Collaborator Tags", placeholder: currentCollaborator &&  currentCollaborator.collaboratorInfo   &&  currentCollaborator.collaboratorInfo.collaboratorTags?currentCollaborator.collaboratorInfo   && currentCollaborator.collaboratorInfo.collaboratorTags:"", type: "text", active: true },
        { label: "Spotify", placeholder: currentCollaborator &&  currentCollaborator.collaboratorInfo   &&  currentCollaborator.collaboratorInfo.spotify?currentCollaborator.collaboratorInfo   && currentCollaborator.collaboratorInfo.spotify:"", type: "text", active: true },
        { label: "Instagram", placeholder: currentCollaborator &&  currentCollaborator.collaboratorInfo   &&  currentCollaborator.collaboratorInfo.instagram?currentCollaborator.collaboratorInfo   && currentCollaborator.collaboratorInfo.instagram:"", type: "text", active: true },
        { label: "Website", placeholder: currentCollaborator &&  currentCollaborator.collaboratorInfo   &&  currentCollaborator.collaboratorInfo.website?currentCollaborator.collaboratorInfo   && currentCollaborator.collaboratorInfo.website:"", type: "text", active: true },
        { label: "Sounds Like", placeholder: currentCollaborator &&  currentCollaborator.collaboratorInfo   &&  currentCollaborator.collaboratorInfo.soundsLike?currentCollaborator.collaboratorInfo   && currentCollaborator.collaboratorInfo.soundsLike:"", type: "text", active: true },
        { label: "Artist Bio", placeholder: currentCollaborator &&  currentCollaborator.collaboratorInfo   &&  currentCollaborator.collaboratorInfo.artistBio?currentCollaborator.collaboratorInfo   && currentCollaborator.collaboratorInfo.artistBio:"", type: "text", active: true },
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
       
                                  item.label === "Collaborator Tags"?  metadata2["collaboratorTags"] = e.target.value
                                  :
                                  item.label === "Spotify"?  metadata2["spotify"] = e.target.value
                                  
                                  :
                                  item.label === "Instagram"?  metadata2["instagram"] = e.target.value
                                  
                                  :
                                   item.label === "Website"?  metadata2["website"] = e.target.value
                                  
                                  :
                                  item.label === "Sounds Like"?  metadata2["soundsLike"] = e.target.value
                                  
                                  :
                                  metadata2["artistBio"] = e.target.value
       
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

export default ExtrasFormComponent;
