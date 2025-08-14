import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  TextField,
  Button,
  Box,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const SimpleFormDialog = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm"  PaperProps={{
      sx: {
        backgroundColor: 'white', // or any other color you want
      },
    }}>
      <DialogTitle style={{color:"black",fontSize:"0.8rem",fontWeight:"400",backgroundColor:"white"}}>
        Edit
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 20,
            top: 0,
            color:"black"
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers style={{backgroundColor:"white"}}>
        <Box display="flex" flexDirection="column" gap={3} mt={1} style={{backgroundColor:"white"}} >
       
       
        <div>
        <Typography sx={{ color: 'black', mb: 0.2,ml:1.5 }}>id</Typography> 
                <TextField
          
          fullWidth
          sx={{
            backgroundColor: "#F6F6F6",
            borderRadius: "10px",
            "& .MuiOutlinedInput-root": {
              height: "1.8rem",
              color: "black",
              "& fieldset": {
              
                borderRadius: "10px",
              },
            },
            "& .MuiInputLabel-root": {
              color: "black",
              borderRadius: "10px",
            },
            "& .MuiOutlinedInput-input": {
              height: "1rem",
              padding: "0 8px",
              borderRadius: "10px",
            },
          }}
         />
      </div>

         <div>
        <Typography sx={{ color: 'black', mb: 0.2,ml:1.5 }}>trend_name</Typography> 
                <TextField
          
          fullWidth
          sx={{
            backgroundColor: "#F6F6F6",
            borderRadius: "10px",
            "& .MuiOutlinedInput-root": {
              height: "1.8rem",
              color: "black",
              "& fieldset": {
              
                borderRadius: "10px",
              },
            },
            "& .MuiInputLabel-root": {
              color: "black",
              borderRadius: "10px",
            },
            "& .MuiOutlinedInput-input": {
              height: "1rem",
              padding: "0 8px",
              borderRadius: "10px",
            },
          }}
         />
      </div>
      <div>
        <Typography sx={{ color: 'black', mb: 0.2,ml:1.5 }}>trend_summary</Typography> 
                <TextField
          
          fullWidth
          sx={{
            backgroundColor: "#F6F6F6",
            borderRadius: "10px",
            "& .MuiOutlinedInput-root": {
              height: "1.8rem",
              color: "black",
              "& fieldset": {
              
                borderRadius: "10px",
              },
            },
            "& .MuiInputLabel-root": {
              color: "black",
              borderRadius: "10px",
            },
            "& .MuiOutlinedInput-input": {
              height: "1rem",
              padding: "0 8px",
              borderRadius: "10px",
            },
          }}
         />
      </div>
      <div>
        <Typography sx={{ color: 'black', mb: 0.2,ml:1.5 }}>detected_at</Typography> 
                <TextField
          
          fullWidth
          sx={{
            backgroundColor: "#F6F6F6",
            borderRadius: "10px",
            "& .MuiOutlinedInput-root": {
              height: "1.8rem",
              color: "black",
              "& fieldset": {
              
                borderRadius: "10px",
              },
            },
            "& .MuiInputLabel-root": {
              color: "black",
              borderRadius: "10px",
            },
            "& .MuiOutlinedInput-input": {
              height: "1rem",
              padding: "0 8px",
              borderRadius: "10px",
            },
          }}
         />
      </div>
      <div>
        <Typography sx={{ color: 'black', mb: 0.2,ml:1.5 }}>platforms</Typography> 
                <TextField
          
          fullWidth
          sx={{
            backgroundColor: "#F6F6F6",
            borderRadius: "10px",
            "& .MuiOutlinedInput-root": {
              height: "1.8rem",
              color: "black",
              "& fieldset": {
              
                borderRadius: "10px",
              },
            },
            "& .MuiInputLabel-root": {
              color: "black",
              borderRadius: "10px",
            },
            "& .MuiOutlinedInput-input": {
              height: "1rem",
              padding: "0 8px",
              borderRadius: "10px",
            },
          }}
         />
      </div>
      <div>
        <Typography sx={{ color: 'black', mb: 0.2,ml:1.5 }}>impact_level</Typography> 
                <TextField
          
          fullWidth
          sx={{
            backgroundColor: "#F6F6F6",
            borderRadius: "10px",
            "& .MuiOutlinedInput-root": {
              height: "1.8rem",
              color: "black",
              "& fieldset": {
              
                borderRadius: "10px",
              },
            },
            "& .MuiInputLabel-root": {
              color: "black",
              borderRadius: "10px",
            },
            "& .MuiOutlinedInput-input": {
              height: "1rem",
              padding: "0 8px",
              borderRadius: "10px",
            },
          }}
         />
      </div>
          
      <div>
        <Typography sx={{ color: 'black', mb: 0.2,ml:1.5 }}>image_url</Typography> 
                <TextField
          
          fullWidth
          sx={{
            backgroundColor: "#F6F6F6",
            borderRadius: "10px",
            "& .MuiOutlinedInput-root": {
              height: "1.8rem",
              color: "black",
              "& fieldset": {
              
                borderRadius: "10px",
              },
            },
            "& .MuiInputLabel-root": {
              color: "black",
              borderRadius: "10px",
            },
            "& .MuiOutlinedInput-input": {
              height: "1rem",
              padding: "0 8px",
              borderRadius: "10px",
            },
          }}
         />
      </div>

      {/*   
      <div>
        <Typography sx={{ color: 'black', mb: 0.2,ml:1.5 }}>case_study_example</Typography> 
                <TextField
          
          fullWidth
          sx={{
            backgroundColor: "#F6F6F6",
            borderRadius: "10px",
            "& .MuiOutlinedInput-root": {
              height: "1.8rem",
              color: "black",
              "& fieldset": {
              
                borderRadius: "10px",
              },
            },
            "& .MuiInputLabel-root": {
              color: "black",
              borderRadius: "10px",
            },
            "& .MuiOutlinedInput-input": {
              height: "1rem",
              padding: "0 8px",
              borderRadius: "10px",
            },
          }}
         />
      </div>

      <div>
        <Typography sx={{ color: 'black', mb: 0.2,ml:1.5 }}>cultural_significance_score</Typography> 
                <TextField
          
          fullWidth
          sx={{
            backgroundColor: "#F6F6F6",
            borderRadius: "10px",
            "& .MuiOutlinedInput-root": {
              height: "1.8rem",
              color: "black",
              "& fieldset": {
              
                borderRadius: "10px",
              },
            },
            "& .MuiInputLabel-root": {
              color: "black",
              borderRadius: "10px",
            },
            "& .MuiOutlinedInput-input": {
              height: "1rem",
              padding: "0 8px",
              borderRadius: "10px",
            },
          }}
         />
      </div>


          <div>
        <Typography sx={{ color: 'black', mb: 0.2,ml:1.5 }}>thought_starters</Typography> 
                <TextField
          
          fullWidth
          sx={{
            backgroundColor: "#F6F6F6",
            borderRadius: "10px",
            "& .MuiOutlinedInput-root": {
              height: "1.8rem",
              color: "black",
              "& fieldset": {
                
                borderRadius: "10px",
              },
            },
            "& .MuiInputLabel-root": {
              color: "black",
              borderRadius: "10px",
            },
            "& .MuiOutlinedInput-input": {
              height: "1rem",
              padding: "0 8px",
              borderRadius: "10px",
            },
          }}
         />
      </div>


       


           <div>
        <Typography sx={{ color: 'black', mb: 0.2,ml:1.5 }}>brands_on_this_trend</Typography> 
                <TextField
          
          fullWidth
          sx={{
            backgroundColor: "#F6F6F6",
            borderRadius: "10px",
            "& .MuiOutlinedInput-root": {
              height: "1.8rem",
              color: "black",
              "& fieldset": {
               
                borderRadius: "10px",
              },
            },
            "& .MuiInputLabel-root": {
              color: "black",
              borderRadius: "10px",
            },
            "& .MuiOutlinedInput-input": {
              height: "1rem",
              padding: "0 8px",
              borderRadius: "10px",
            },
          }}
         />
      </div>


          <div>
        <Typography sx={{ color: 'black', mb: 0.2,ml:1.5 }}>Audience Profile</Typography> 
                <TextField
          
          fullWidth
          sx={{
            backgroundColor: "#F6F6F6",
            borderRadius: "10px",
            "& .MuiOutlinedInput-root": {
              height: "1.8rem",
              color: "black",
              "& fieldset": {
              
                borderRadius: "10px",
              },
            },
            "& .MuiInputLabel-root": {
              color: "black",
              borderRadius: "10px",
            },
            "& .MuiOutlinedInput-input": {
              height: "1rem",
              padding: "0 8px",
              borderRadius: "10px",
            },
          }}
         />
      </div>


         <div>
        <Typography sx={{ color: 'black', mb: 0.2,ml:1.5 }}>Geographic Hotspots</Typography> 
                <TextField
          
          fullWidth
          sx={{
            backgroundColor: "#F6F6F6",
            borderRadius: "10px",
            "& .MuiOutlinedInput-root": {
              height: "1.8rem",
              color: "black",
              "& fieldset": {
              
                borderRadius: "10px",
              },
            },
            "& .MuiInputLabel-root": {
              color: "black",
              borderRadius: "10px",
            },
            "& .MuiOutlinedInput-input": {
              height: "1rem",
              padding: "0 8px",
              borderRadius: "10px",
            },
          }}
         />
      </div>


      <div>
        <Typography sx={{ color: 'black', mb: 0.2,ml:1.5 }}>Brand Sentiment Impact</Typography> 
                <TextField
          
          fullWidth
          sx={{
            backgroundColor: "#F6F6F6",
            borderRadius: "10px",
            "& .MuiOutlinedInput-root": {
              height: "1.8rem",
              color: "black",
              "& fieldset": {
              
                borderRadius: "10px",
              },
            },
            "& .MuiInputLabel-root": {
              color: "black",
              borderRadius: "10px",
            },
            "& .MuiOutlinedInput-input": {
              height: "1rem",
              padding: "0 8px",
              borderRadius: "10px",
            },
          }}
         />
      </div>
      */} 
         
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2,justifyContent: 'flex-start',marginTop:"1px solid gray" }}>
       
        <Button variant="contained" sx={{backgroundColor:"#0000FF",color:"white"}} >
          Submit
        </Button>

        <Button onClick={onClose} sx={{border:"0.5px solid #F5F5F5",color:"black"}} >
          Cancel
        </Button>

      </DialogActions>
    </Dialog>
  );
};

export default SimpleFormDialog;
