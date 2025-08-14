// RightDrawer.jsx
import { Drawer, IconButton, Box, Button, Typography, TextField, Dialog, DialogTitle, DialogContent, DialogActions,ThemeProvider,createTheme } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewTrend } from "src/redux/actions/group.action";


export default function CreateSignalsPage2({ open, onClose }) {
  const dispatch = useDispatch()


  const [mode, setMode] = useState("light");


  const darkTheme = createTheme({
    backgroundColor:"#FFF",
    palette: {
      mode: mode,
      background: {
        default: '#FFF',   // Page background
        
      },
      backgroundColor:"#FFF"
    },
  });

  const [selectedFile, setSelectedFile] = useState({selectedFile: [], selectedFileName: []});
  const [file, setFile] = useState();


  const [id, setId] = useState('');
  const [trendName, setTrendName] = useState('');
  const [trendSummary, setTrendSummary] = useState('');
  const [detectedAt, setDetectedAt] = useState('');
  const [status, setStatus] = useState('');
 
  const [platforms, setPlatforms] = useState('');
  const [impactLevel, setImpactLevel] = useState('');
  const [image, setImage] = useState('');
  const [caseStudyExample, setCaseStudyExample] = useState('');
  const [culturalSignificanceScore, setCulturalSignificanceScore] = useState('');
  const [thoughtStarters, setThoughtStarters] = useState('');
  const [brandsOnThisTrend, setBrandsOnThisTrend] = useState('');
  const [audienceProfile, setAudienceProfile] = useState('');
  const [geographicHotspots, setGeographicHotspots] = useState('');
  const [brandSentimentImpact, setBrandSentimentImpact] = useState('');
  const [trendImage, setTrendImage] = useState({selectedFile: [], selectedFileName: []});




  const handleselectedFile = event => {
    setTrendImage({
        selectedFile: event.target.files[0],
        selectedFileName: event.target.files[0].name
    });
    setFile(URL.createObjectURL(event.target.files[0]));
   
};


const trendObject = {
  id,
  trendName,
  trendSummary,
  detectedAt,
 status,
  platforms,
  impactLevel,
  image,
  caseStudyExample,
  culturalSignificanceScore,
  thoughtStarters,
  brandsOnThisTrend,
  audienceProfile,
  geographicHotspots,
  brandSentimentImpact,
  status,
  trendImage:trendImage,

}


  return (
    <ThemeProvider theme={darkTheme} >
   <Box bgcolor={"background.default"}  sx={{marginTop:"-3rem"}}>
    <Box
     sx={{width:"55%",backgroundColor:"white",margin:"0 auto",marginTop:"3rem",marginBottom:"3rem",border:"2px solid #F5F5F5",borderRadius:"1rem"}}
      
    >
   
      <DialogTitle style={{color:"black",fontSize:"0.8rem",fontWeight:"400"}}>
        Fill in The fields below and click submit to add a new signal
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 20,
            top: 35,
            color:"black"
          }}
        >
       
        </IconButton>
      </DialogTitle>

      
        <Box display="flex" flexDirection="column" gap={3} mt={1}>
       
       
        <div>
        <Typography sx={{ color: 'black', mb: 0.2,ml:1.5 }}>id</Typography> 
                <TextField
               value={id}
               onChange={(e)=>{setId(e.target.value)}}
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
                  value={trendName}
                  onChange={(e)=>{setTrendName(e.target.value)}}
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
                value={trendSummary}
                onChange={(e)=>{setTrendSummary(e.target.value)}}
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
                value={detectedAt}
                onChange={(e)=>{setDetectedAt(e.target.value)}}
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
               value={platforms}
               onChange={(e)=>{setPlatforms(e.target.value)}}
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
               value={impactLevel}
               onChange={(e)=>{setImpactLevel(e.target.value)}}
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
                 value={image}
                 onChange={(e)=>{setImage(e.target.value)}}
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
        <Typography sx={{ color: 'black', mb: 0.2,ml:1.5 }}>case_study_example</Typography> 
                <TextField
               value={caseStudyExample}
               onChange={(e)=>{setCaseStudyExample(e.target.value)}}
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
               value={culturalSignificanceScore}
               onChange={(e)=>{setCulturalSignificanceScore(e.target.value)}}
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
              value={thoughtStarters}
              onChange={(e)=>{setThoughtStarters(e.target.value)}}
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
               value={brandsOnThisTrend}
               onChange={(e)=>{setBrandsOnThisTrend(e.target.value)}}
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
                value={audienceProfile}
                onChange={(e)=>{setAudienceProfile(e.target.value)}}
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
                 value={geographicHotspots}
                 onChange={(e)=>{setGeographicHotspots(e.target.value)}}
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
             value={brandSentimentImpact}
             onChange={(e)=>{setBrandSentimentImpact(e.target.value)}}
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
        <Typography sx={{ color: 'black', mb: 0.2,ml:1.5 }}>Status</Typography> 
                <TextField
             value={status}
             onChange={(e)=>{setStatus(e.target.value)}}
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
        <Typography sx={{ color: 'black', mb: 0.2,ml:1.5 }}>Trend Image</Typography> 
                <TextField
               value={trendImage && trendImage.selectedFileName}
               onChange={(e)=>{setTrendImage(e.target.value)}}
          fullWidth
          sx={{
            backgroundColor: "#F6F6F6",
            borderRadius: "10px",
            color: "black",
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


               <input
                  type="file"
                  style={{ opacity:0,display: 'block',backgroundColor:"transparent",position:"relative",top:'-2rem',height:"2rem",width:"102%" }}
                  onChange={handleselectedFile}
                />
      </div>
         
        </Box>
      

      <DialogActions sx={{ px: 3, py: 2,justifyContent: 'center',marginTop:"1px solid gray" }}>
       
        <Button  onClick={()=>{dispatch(
          addNewTrend(trendObject))

        setTimeout(()=>{


          setId('')
          setTrendName('')
           setTrendSummary('')
           setDetectedAt('')
           setStatus('')
           setPlatforms('')
           setImpactLevel('')
           setImage('')
          setCaseStudyExample('')
           setCulturalSignificanceScore('')
           setThoughtStarters('')
          setBrandsOnThisTrend('')
           setAudienceProfile('')
          setGeographicHotspots('')
          setBrandSentimentImpact('')
         setTrendImage({selectedFile: [], selectedFileName: []})

            
        },1000)
        
        }} variant="contained" sx={{backgroundColor:"#0000FF",color:"white"}} >
          Submit
        </Button>

        <Button onClick={onClose} sx={{border:"0.5px solid #F5F5F5",color:"black"}} >
          Cancel
        </Button>

      </DialogActions>
    
      </Box>
    </Box>
    </ThemeProvider>
  );
}
