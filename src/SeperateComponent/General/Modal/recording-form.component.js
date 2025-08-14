import { Box, Typography } from "@mui/material";

// Icons
import { Info } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { saveCurrentSong } from "src/redux/reducers/group.slice";

const RecordingComponent = () => {

    const { currentSong } = useSelector((state) => state.group);
    const dispatch = useDispatch()

    const formData = [
        { value:currentSong && currentSong.metadata &&  currentSong.metadata.songUnreleased?currentSong.songUnreleased: "", label: "Is this song unrealeased", placeholder:currentSong && currentSong.metadata &&  currentSong.metadata.songUnreleased?currentSong.songUnreleased: "Select", type: "text", active: false },
        { value:currentSong && currentSong.metadata &&  currentSong.metadata.albumName?currentSong.albumName: " ", label: "Album Name", placeholder:currentSong && currentSong.metadata &&  currentSong.metadata.albumName?currentSong.metadata.albumName: "Enter title", type: "text", active: false },
        { value:currentSong && currentSong.metadata &&  currentSong.metadata.trackNumber?currentSong.trackNumber: " ", label: "Track Number", placeholder:currentSong && currentSong.metadata &&  currentSong.metadata.trackNumber?currentSong.metadata.trackNumber: "Enter Number", type: "text", active: false },
        { value:currentSong && currentSong.metadata &&  currentSong.metadata.releaseDate?currentSong.releaseDate:" ", label: "Release Date", placeholder: currentSong && currentSong.metadata &&  currentSong.metadata.releaseDate?currentSong.metadata.releaseDate:"Select", type: "text", active: false },
        { value:currentSong && currentSong.metadata &&  currentSong.metadata.srCopyRight?currentSong.srCopyRight: " ", label: "SR Copyright#", placeholder:currentSong && currentSong.metadata &&  currentSong.metadata.srCopyRight?currentSong.metadata.srCopyRight: "Sound Recording Copyright", type: "text", active: true },
        { value:currentSong && currentSong.metadata &&  currentSong.metadata.srCopyRightDate?currentSong.srCopyRightDate: " ", label: "SR Copyright Date#", placeholder:currentSong && currentSong.metadata &&  currentSong.metadata.srCopyRightDate?currentSong.metadata.srCopyRightDate: "Select", type: "text", active: true },
        { value:currentSong && currentSong.metadata &&  currentSong.metadata.isrc?currentSong.isrc: "#ISRC", label: "ISRC", placeholder:currentSong && currentSong.metadata &&  currentSong.isrc?currentSong.metadata.isrc: "#ISRC", type: "text", active: true },
        { value:currentSong && currentSong.metadata &&  currentSong.metadata.distributor?currentSong.distributor: " ", label: "Distributor", placeholder:currentSong && currentSong.metadata &&  currentSong.distributor?currentSong.metadata.distributor: "Enter your distributor", type: "text", active: false },
        { value:currentSong && currentSong.metadata &&  currentSong.metadata.upcBarcode?currentSong.upcBarcode: " ", label: "UPC Barcode", placeholder:currentSong && currentSong.metadata &&  currentSong.metadata.upcBarcode?currentSong.metadata.upcBarcode: "Refer to your UPC", type: "text", active: true },
        { value:currentSong && currentSong.metadata &&  currentSong.metadata.recordNumber?currentSong.recordNumber: " ", label: "Record Number", placeholder:currentSong && currentSong.metadata &&  currentSong.metadata.recordNumber?currentSong.metadata.recordNumber: "Enter legal name or record label", type: "text", active: false }
    ]

    return (
        <Box style={{width:"45rem"}}>

            {
                formData.map( (item, key) => (
                    <Box my={1} sx={{ display: "flex", alignItems: "center", justifyContent: "space-around" }}>
                        <Typography flex={1} mr={1} sx={{ fontSize: 14, fontFamily: "inter", fontWeight: "bold" }}>
                            { item.label }:
                        </Typography>
                        
                        <Box flex={2} sx={{ display: "flex", alignItems: "center" }}>
                            <input 
                            value={item.value}
                                placeholder={ item.placeholder }
                                style={{ 
                                    padding: "2px 6px", fontSize: "13px", fontFamily: "inter", outline: "none", 
                                    width: "100%" 
                                }}
                                type={ item.type }

                                onChange={(e)=>{
                           
                                    let newSongDetails = {...currentSong}
                                    let metadata2 =currentSong.metadata?{...currentSong.metadata}:{}
       
                                  item.label === "Is this song unrealeased"?  metadata2["songUnreleased"] = e.target.value
                                  :
                                  item.label === "Album Name"?  metadata2["albumName"] = e.target.value
                                  :
                                  item.label === "Track Number"?  metadata2["trackNumber"] = e.target.value
                                  :
                                  item.label === "Release Date"?  metadata2["releaseDate"] = e.target.value
                                  :
                                  item.label === "SR Copyright#"?  metadata2["srCopyRight"] = e.target.value
                                  :
                                  item.label === "SR Copyright Date#"?  metadata2["srCopyRightDate"] = e.target.value
                                  :
                                  item.label === "ISRC#"?  metadata2["isrc"] = e.target.value
                                  :
                                  item.label === "Distributor"?  metadata2["distributor"] = e.target.value
                                  :
                                  item.label === "UPC Barcode"?  metadata2["upcBarcode"] = e.target.value
                                  :
                                  metadata2["recordNumber"] = e.target.value
       
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

export default RecordingComponent;
