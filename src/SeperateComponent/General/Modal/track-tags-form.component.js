import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { saveCurrentSong,saveCurrentCoverArt } from "src/redux/reducers/group.slice";
const TrackTagsFormComponent = () => {

    const dispatch= useDispatch()
    const { currentSong } = useSelector((state) => state.group);

    const formData = [
        { label: "Genre", value:currentSong && currentSong.metadata &&  currentSong.metadata.genre?currentSong.metadata.genre : " ",placeholder:currentSong && currentSong.metadata &&  currentSong.metadata.genre?currentSong.metadata.genre : "Select", type: "text" },
        { label: "Tempo", value:currentSong && currentSong.metadata &&  currentSong.metadata.tempo?currentSong.metadata.tempo : " ",placeholder:currentSong && currentSong.metadata &&  currentSong.metadata.tempo?currentSong.metadata.tempo : "Select", type: "text" },
        { label: "Vocals",value:currentSong && currentSong.metadata &&  currentSong.metadata.vocals?currentSong.metadata.vocals : " ", placeholder:currentSong && currentSong.metadata &&  currentSong.metadata.vocals?currentSong.metadata.vocals : "Select", type: "text" },
        { label: "Instruments",value:currentSong && currentSong.metadata &&  currentSong.metadata.instruments?currentSong.metadata.instruments : " ", placeholder:currentSong && currentSong.metadata &&  currentSong.metadata.instruments?currentSong.metadata.instruments : "Select", type: "text" },
        { label: "Mood/Feel", value:currentSong && currentSong.metadata &&  currentSong.metadata.moodFeel?currentSong.metadata.moodFeel : " ",placeholder:currentSong && currentSong.metadata &&  currentSong.metadata.moodFeel?currentSong.metadata.moodFeel : "Select", type: "text" },
        { label: "Type",value:currentSong && currentSong.metadata &&  currentSong.metadata.typeOfTrack?currentSong.metadata.typeOfTrack : " ", placeholder:currentSong && currentSong.metadata &&  currentSong.metadata.typeOfTrack?currentSong.metadata.typeOfTrack : "Select", type: "text" },
        { label: "Lyric Themes",value:currentSong && currentSong.metadata &&  currentSong.metadata.lyricThemes?currentSong.metadata.lyricThemes : " ", placeholder:currentSong && currentSong.metadata &&  currentSong.metadata.lyricThemes?currentSong.metadata.lyricThemes : "Select", type: "text" }
    ]

    return (
        <Box style={{width:"45rem"}}>

            {
                formData.map( (item, key) => (
                    <Box my={1} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <Typography mr={1} sx={{ fontSize: 14, fontFamily: "inter", fontWeight: "bold" }}>
                            { item.label }:
                        </Typography>
                        <input 
                            value={item.value}
                            placeholder={ item.placeholder }
                            style={{ 
                                padding: "2px 6px", fontSize: "13px", fontFamily: "inter", outline: "none", 
                                width: "64%" 
                            }}
                            type={ item.type }

                            onChange={(e)=>{
                           
                                let newSongDetails = {...currentSong}
                                let metadata2 =currentSong.metadata?{...currentSong.metadata}:{}
   
                              item.label === "Genre"?  metadata2["genre"] = e.target.value
                              :
                              item.label === "Tempo"?  metadata2["tempo"] = e.target.value
                              :
                              item.label === "Vocals"?  metadata2["vocals"] = e.target.value
                              :
                              item.label === "Instruments"?  metadata2["instruments"] = e.target.value
                              :
                              item.label === "Mood/Feel"?  metadata2["moodFeel"] = e.target.value
                              :
                              item.label === "Type"?  metadata2["typeOfTrack"] = e.target.value
                              : 
                              metadata2["lyricThemes"] = e.target.value
   
                               dispatch(saveCurrentSong(
                                   {...newSongDetails,
                                     metadata:metadata2
                                 }))
   
                             }}
                        />
                    </Box>
                ) )
            }

        </Box>
    )
}

export default TrackTagsFormComponent;
