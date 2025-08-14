import React, { useState } from "react";

import { 
    Box, Typography, Dialog
} from "@mui/material";

// Components
import DialogModalOptionsComponent from "./dialog-modal-options.component";
import ModelBottomBtnComponent from "./bottom-btn.component";

import FormSelectorComponent from "./form-selector.component";

const DialogModalComponent = ({ open, handleClose }) => {
    
    const [form, setForm] = useState("song-info");

    return (
         <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            PaperProps={{
                sx: {
                  width: '900px', // Increase as needed
                  maxWidth: '900px', // Optionally restrict maximum width
                  height:'900px'
                },
              }}
           
        >
            <span >
            <Box sx={{ display: "flex",flexDirection:"column", background: "#252328", paddingX: "6px", paddingY: "8px" }}>
                <DialogModalOptionsComponent form={ form } setForm={ setForm } handleClose={handleClose} />
                
                <Box py={2} px={3} sx={{ width: "420px", minHeight: "452px"}}> {/*362*/}
                    <FormSelectorComponent form={ form } />
                </Box>
            </Box>

            <ModelBottomBtnComponent handleClose ={ handleClose} />
            </span>
        </Dialog>
    )
}

export default DialogModalComponent;
