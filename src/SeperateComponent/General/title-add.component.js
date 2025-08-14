import { Box, Typography } from "@mui/material";

// Icons
import { AddCircleOutline } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import {saveCurrentlyEditingPlaylistName, saveNewPlaylistBeingCreated,saveListOfNewSongsBeingCreated,saveListOfNewSongsBeingComposed,savePlaylistCreatorPlaylists,saveSongCreatorActive} from 'src/redux/reducers/group.slice'
import { useSelector } from "react-redux";
import uuidv4 from "src/utils/uuidv4";

const TitleAddComponent = ({ title }) => {
const dispatch = useDispatch()
const {playlistCreatorPlaylists,newPlaylistBeingCreated,listOfNewSongsBeingCreated,listOfNewSongsBeingComposed,fileUploaderActive,songCreatorActive,songEditorActive} = useSelector((state)=>state.group)
console.log("NEW PLAYLIST BEING CREATED--->",newPlaylistBeingCreated)

const copy = newPlaylistBeingCreated && newPlaylistBeingCreated.length >0?[...newPlaylistBeingCreated]:[]
const copy2 = listOfNewSongsBeingCreated && listOfNewSongsBeingCreated.length >0?[...listOfNewSongsBeingCreated]:[]
const copy3 = listOfNewSongsBeingComposed && listOfNewSongsBeingComposed.length >0?[...listOfNewSongsBeingComposed]:[]
    return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography 
                mb={2}
                sx={{
                    borderBottom: "2px solid #A01565", 
                    display: "inline-block", 
                    paddingBottom: "2px",
                    fontFamily: "inter",
                    fontWeight: "600",
                    fontSize:"16px"
                }}
            >{ title }</Typography>
            <AddCircleOutline 
            onClick={()=>{if(title==="Playlist Creator"){dispatch(saveNewPlaylistBeingCreated([...copy,{playlistName:"Untitled Playlist",playlistId:uuidv4()} ]));
                                                         //dispatch(saveCurrentlyEditingPlaylistName(null))  dont need this anymore
                                                         //dispatch(savePlaylistCreatorPlaylists([...playlistCreatorPlaylists,{playlistName:"Untitled Playlist",playlistId:uuidv4()}]))
                                                        }
                          else if(title==="Song Creator"||"File Creator"){ 
                            dispatch(saveSongCreatorActive(true)); 
                                                        if(/*songCreatorActive &&*/ songEditorActive/*i.e if it's not the first time this button was clicked */){
                                                          dispatch(saveListOfNewSongsBeingCreated([...copy2,{name:"Untitled Song",identifyingId:uuidv4(),song:{}}]))
                                                       console.log("LIST OF NEW SONGS BEING CREATED--->",listOfNewSongsBeingCreated)
                                                        }
                                                        else if(/*songCreatorActive && */fileUploaderActive){
                                                            dispatch(saveListOfNewSongsBeingComposed([...copy3,{name:"Untitled Song",identifyingId:uuidv4(),song:{}}]))
                                                       console.log("LIST OF NEW SONGS BEING COMPOSED--->",listOfNewSongsBeingComposed)
                                                        }
                        
                        }
                         }}
                sx={{ marginBottom: "7px", paddingBottom: "5px", color: 'white'/*"#A01565"*/, marginLeft: "6px", cursor: "pointer" }} 
            />
        </Box>
    )
}

export default TitleAddComponent;
