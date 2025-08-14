import React, { useEffect, useState } from "react";

import { 
    Box, Typography, Dialog,
    TextField
} from "@mui/material";



// Components
import DialogModalOptionsComponent from "./dialog-modal-options.component";
import ModelBottomBtnComponent from "./bottom-btn.component";

import FormSelectorComponent from "./form-selector.component";
import { Element } from "react-scroll";
import FileCreatorComponent from "src/SeperateComponent/MusicCatalog/file-creator.component";
import { fetchAllSongs,fetchAllPlaylists ,uploadMediaFileTemporary, fetchAllSongsForOneUser, fetchAllPlaylistsForOneUser,fetchAllFilesForOneUser, uploadAllMediaFilesTemporaryForOneSong, updateFileName } from "src/redux/actions/group.action";
import { useSelector } from "react-redux";
import FileViewerComponent from "src/SeperateComponent/MusicCatalog/file-viewer.component copy";
import RawViewerComponent from "src/SeperateComponent/MusicCatalog/raw-viewer.component";
import { useDispatch } from "react-redux";

const DialogModalFileCreatorComponent = ({ open, handleClose }) => {

    const dispatch = useDispatch()

    const [form, setForm] = useState("song-info");

    
    const [audioExtension, setAudioExtension] = useState("");

    const imageFormats = ["jpg", "jpeg", "png", "gif", "bmp", "webp", "tiff", "svg"];

    function removeAudioExtension(filename) {


        const lowerFilename = filename.toLowerCase();
        
        const extensions = ['.mp3', '.wav', '.aiff'];
        for (let ext of extensions) {
          if (lowerFilename.endsWith(ext)) {
            const extension = filename.slice(-ext.length); // Preserves original casing
            setAudioExtension(extension);
            
          }
        }



        return filename.replace(/\.(mp3|wav|aiff)$/i, '');

      
    }

    const { user} = useSelector((state)=> state.auth)

    const { arrayStartingIndex,
        currentFileToEdit,
        } = useSelector((state)=> state.group)


        const [fileName, setFileName] = useState(currentFileToEdit && currentFileToEdit.name ? currentFileToEdit.name:"");

        useEffect(()=>{

      setFileName(currentFileToEdit && currentFileToEdit.name ? currentFileToEdit.name:"")

        },[currentFileToEdit])

        console.log("CURRENT FILE TO EDIT-->",currentFileToEdit)

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <Box sx={{ display: "flex",justifyContent:"center",alignItems:"center", background: "#252328",width:"35rem", paddingX: "6px", paddingY: "8px" }}>
           
            {
   <Element name="scrollContainer" style={{ overflowY: 'auto', maxHeight:"250px", scrollbarWidth: 'none', 
   msOverflowStyle: 'auto'}}>
    <div style={{display:"flex",justifyContent:"center",alignItems:"center",width:"25rem"}}>
             <Typography 
                    mb={2}
                    sx={{
                        borderBottom: "2px solid #A01565", 
                        display: "inline-block", 
                        paddingBottom: "2px",
                        fontFamily: "inter",
                        fontWeight: "500",
                         width:"6rem",
                         display:"flex",
                         justifyContent:"center",
                         

                    }}
                >Edit Files</Typography>
    </div>



    <div style={{display:"flex",justifyContent:"center",alignItems:"center",width:"25rem",marginBottom:"4rem"}}>
            {/* <Typography 
                    mb={2}
                          
                    sx={{
                        //borderBottom: "2px solid #A01565", 
                        display: "inline-block", 
                        paddingBottom: "2px",
                        fontFamily: "inter",
                        fontWeight: "500",
                         width:"max-content",
                         display:"flex",
                         justifyContent:"center",
                         

                    }}
                >
                    {currentFileToEdit && currentFileToEdit.name &&  removeAudioExtension(currentFileToEdit.name)}
                </Typography>
                */}


                    <TextField
                     
                          variant="standard"
                          placeholder="Type here..."
                          value={/*currentFileToEdit && currentFileToEdit.name ? removeAudioExtension(currentFileToEdit.name):""*/
                            fileName? fileName: ""
                        }
                          
                          onChange={(e)=>{
                            setFileName(`${e.target.value}` )
                            dispatch(updateFileName(`${e.target.value}${audioExtension}`,currentFileToEdit.songId,user.id))
                          
                          }}
                          InputProps={{
                            disableUnderline: true, // Removes the underline
                            style: {
                              color: 'white', // Text color
                              background: 'transparent', // Transparent background
                              padding: 0, // No vertical padding
                              fontFamily: "inter",
                            },
                          }}
                          sx={{
                           
                            position:"relative",
                            left:"8rem",
                            width:"100%",
                            '& .MuiInputBase-root': {
                              fontSize: '14px', // Adjust text size
                              fontFamily: "inter",
                               fontWeight: "900",
                               width:"18rem",
                               backgroundColor:"white",
                               position:"absolute",
                               
                            },
                          }}
                        />
    </div>
{




<RawViewerComponent show={false} file={currentFileToEdit && currentFileToEdit.file} fileFullDetails={currentFileToEdit && currentFileToEdit} name={currentFileToEdit && currentFileToEdit.name}  uploadStatus={currentFileToEdit && currentFileToEdit.type ==='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'||
currentFileToEdit && currentFileToEdit.type ==="application/vnd.ms-excel"  ||
currentFileToEdit && currentFileToEdit.type ==="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"||
currentFileToEdit && currentFileToEdit.type ==="application/vnd.ms-excel.sheet.macroEnabled.12"||
currentFileToEdit && currentFileToEdit.type ==="application/vnd.ms-excel.template.macroEnabled.12"||
currentFileToEdit && currentFileToEdit.type ==="application/vnd.openxmlformats-officedocument.spreadsheetml.template"||
currentFileToEdit && currentFileToEdit.type ==="application/vnd.oasis.opendocument.spreadsheet" 
?'application/xlsx':currentFileToEdit && currentFileToEdit.type ==='application/vnd.openxmlformats-officedocument.wordprocessingml.document'?'application/doc':currentFileToEdit && currentFileToEdit.type}  indexToBeRemoved={1} fileToDelete={imageFormats.some((format) => (currentFileToEdit && currentFileToEdit.name && currentFileToEdit.name.toLowerCase().includes(format)))?"coverArtUrl":"mediaTemporaryUrl"}/>

}



{currentFileToEdit.otherMusicFiles  && currentFileToEdit.otherMusicFiles.length > 0  && currentFileToEdit.otherMusicFiles.map((file, index) => (


/* !file.metadata &&  NOW I HAVE CHANGES FILES TO DELETE AFTER EACH UPLOAD, IT SHOULDNT MATTER WHETHER THEY HAVE METADATA OR NOT*/

<RawViewerComponent show={false} file={file && file.file} fileFullDetails={file && file} name={file && file.name}  uploadStatus={file && file.type ==='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'||
file && file.type ==="application/vnd.ms-excel"  ||
file && file.type ==="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"||
file && file.type ==="application/vnd.ms-excel.sheet.macroEnabled.12"||
file && file.type ==="application/vnd.ms-excel.template.macroEnabled.12"||
file && file.type ==="application/vnd.openxmlformats-officedocument.spreadsheetml.template"||
file && file.type ==="application/vnd.oasis.opendocument.spreadsheet" 
?'application/xlsx':file && file.type ==='application/vnd.openxmlformats-officedocument.wordprocessingml.document'?'application/doc':file && file.type}  indexToBeRemoved={1} fileToDelete={imageFormats.some((format) => (file && file.name && file.name.toLowerCase().includes(format)))?"coverArtUrl":"mediaTemporaryUrl"}/>
))
}


</Element>
}
            </Box>

            {/*<ModelBottomBtnComponent handleClose ={ handleClose} />*/}
        </Dialog>
    )
}

export default DialogModalFileCreatorComponent;
