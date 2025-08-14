// RightDrawer.jsx
import { Drawer, IconButton, Box, Button, Typography, TextField, Dialog, DialogTitle, DialogContent, DialogActions,ThemeProvider,createTheme, Grid,Stack } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewTrend, updateCurrentTrend } from "src/redux/actions/group.action";
import Navbar from "src/componentsMyNetwork/Navbar";


export default function UpdateSignalsPage({ open, onClose }) {
  const dispatch = useDispatch()
  const {trendInFocus} = useSelector((state)=> state.group)

  const [mode, setMode] = useState("light");

   console.log("tTREND IN FOCUS--->",trendInFocus)

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


  const [id, setId] = useState(trendInFocus && trendInFocus.id);
  const [trendName, setTrendName] = useState(trendInFocus && trendInFocus.trendName);
  const [trendSummary, setTrendSummary] = useState(trendInFocus && trendInFocus.trendSummary);
  const [detectedAt, setDetectedAt] = useState(trendInFocus && trendInFocus.detectedAt);
  const [status, setStatus] = useState(trendInFocus && trendInFocus.status);
 
  const [platforms, setPlatforms] = useState(trendInFocus && trendInFocus.platforms);
  const [impactLevel, setImpactLevel] = useState(trendInFocus && trendInFocus.impactLevel);
  const [image, setImage] = useState(trendInFocus && trendInFocus.image);
  const [caseStudyExample, setCaseStudyExample] = useState(trendInFocus && trendInFocus.caseStudyExample);
  const [culturalSignificanceScore, setCulturalSignificanceScore] = useState(trendInFocus && trendInFocus.culturalSignificanceScore);
  const [thoughtStarters, setThoughtStarters] = useState(trendInFocus && trendInFocus.thoughtStarters);
  const [trendDescription, setTrendDescription] = useState(trendInFocus && trendInFocus.trendDescription);
  const [brandsOnThisTrend, setBrandsOnThisTrend] = useState(trendInFocus && trendInFocus.brandsOnThisTrend);
  const [audienceProfile, setAudienceProfile] = useState(trendInFocus && trendInFocus.audienceProfile);
  const [geographicHotspots, setGeographicHotspots] = useState(trendInFocus && trendInFocus.geographicHotspots);
  const [brandSentimentImpact, setBrandSentimentImpact] = useState(trendInFocus && trendInFocus.brandSentimentImpact);
  const [trendImage, setTrendImage] = useState(trendInFocus && trendInFocus.trendImage);

  const commonProps = {
    sx: { color: 'black', maxWidth: { xs: '16rem', sm: '100%' } },
    InputLabelProps: { shrink: true },
    InputProps: { style: { height: '3rem', paddingLeft: '1rem', color: 'black' } },
    variant: 'outlined',
    fullWidth: true,
    margin: 'normal',
  };



  const handleselectedFile = event => {
    setImage({
        selectedFile: event.target.files[0],
        selectedFileName: event.target.files[0].name
    });

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
   <Navbar active="all-signals" />

     <Grid item xs={10}style={{width:"900px",display:"flex",alignItems:"flex-end", justifyContent:"flex-start"}}>
          <Typography color="textPrimary" variant="h4" component="p" style={{ color: 'black',position:"relative" }}>
            Update Signal
          </Typography>
      
  </Grid>
    <Box
     sx={{width:"85%",backgroundColor:"white",margin:"0 auto",marginTop:"3rem",marginBottom:"3rem",border:"2px solid #F5F5F5",borderRadius:"1rem"}}
      
    >
   
   <Grid item xs={10}style={{width:"900px",display:"flex",alignItems:"flex-end", justifyContent:"flex-start"}}>
          <Typography color="textPrimary" variant="h6" component="p" style={{ color: 'black',position:"relative",left:"3.5rem",top:"1rem" }}>
            Update Signal
          </Typography>
      
  </Grid>

      <Grid container xs={12} spacing={2} style={{ width: "1100px", display: "flex", alignItems: "center", justifyContent: "center", gap: "4rem" }}>
      <Grid item xs={12} sm={5}>
        <Stack spacing={3} sx={{ position: "relative", top: "2.2rem", gap: "1.3rem", minHeight: "100%", paddingTop: "0rem", display: "flex", alignItems: "flex-start", justifyContent: "flex-start", marginLeft: { xs: "27.5rem", sm: "0rem" } }}>
          <TextField key="Trend Name" label="Trend Name" value={trendName} onChange={(e) => setTrendName(e.target.value)} {...commonProps} />
          <TextField key="Trend Summary" label="Trend Summary" value={trendSummary} onChange={(e) => setTrendSummary(e.target.value)} {...commonProps} />
          <TextField key="Detected At" label="Detected At" value={detectedAt} onChange={(e) => setDetectedAt(e.target.value)} {...commonProps} />
          <TextField key="Status" label="Status" value={status} onChange={(e) => setStatus(e.target.value)} {...commonProps} />
          <TextField key="Platforms" label="Platforms" value={platforms} onChange={(e) => setPlatforms(e.target.value)} {...commonProps} />
          <TextField key="Impact Level" label="Impact Level" value={impactLevel} onChange={(e) => setImpactLevel(e.target.value)} {...commonProps} />
          <TextField key="Trend Image" label="Trend Image" value={trendImage.selectedFileName?trendImage.selectedFileName:trendImage} onChange={(e) => {/*setImage(e.target.value)*/} } {...commonProps} />
          <input type="file" style={{ opacity: 0, display: 'block', backgroundColor: "pink", position: "relative", top: '-6rem', height: "3.5rem", width: "102%" }} onChange={handleselectedFile} />
        </Stack>
      </Grid>

      <Grid item xs={12} sm={5}>
        <Stack spacing={3} sx={{ position: "relative", top: "1.9rem", gap: "1.3rem", minHeight: "100%", paddingTop: "0rem", display: "flex", alignItems: "flex-start", justifyContent: "flex-start", marginLeft: { xs: "27.5rem", sm: "0rem" } }}>
          <TextField key="Case Study Example" label="Case Study Example" value={caseStudyExample} onChange={(e) => setCaseStudyExample(e.target.value)} {...commonProps} />
          <TextField key="Cultural Significance Score" label="Cultural Significance Score" value={culturalSignificanceScore} onChange={(e) => setCulturalSignificanceScore(e.target.value)} {...commonProps} />
          <TextField key="Thought Starters" label="Thought Starters" value={thoughtStarters} onChange={(e) => setThoughtStarters(e.target.value)} {...commonProps} />
          <TextField key="Trend Description" label="Trend Description" value={trendDescription} onChange={(e) => setTrendDescription(e.target.value)} {...commonProps} />
          <TextField key="Brands On This Trend" label="Brands On This Trend" value={brandsOnThisTrend} onChange={(e) => setBrandsOnThisTrend(e.target.value)} {...commonProps} />
          <TextField key="Audience Profile" label="Audience Profile" value={audienceProfile} onChange={(e) => setAudienceProfile(e.target.value)} {...commonProps} />
          <TextField key="Geographic Hotspots" label="Geographic Hotspots" value={geographicHotspots} onChange={(e) => setGeographicHotspots(e.target.value)} {...commonProps} />
          <TextField key="Brand Sentiment Impact" label="Brand Sentiment Impact" value={brandSentimentImpact} onChange={(e) => setBrandSentimentImpact(e.target.value)} {...commonProps} />
        </Stack>
      </Grid>
    </Grid>
      

      <DialogActions sx={{ px: 3, py: 8,justifyContent: 'center',marginTop:"1px solid gray" }}>
       
        <Button  onClick={()=>{dispatch(
          updateCurrentTrend(trendObject,trendInFocus && trendInFocus.id))

        setTimeout(()=>{


        //  setId('')
        //  setTrendName('')
        //   setTrendSummary('')
        //   setDetectedAt('')
        //   setStatus('')
        //   setPlatforms('')
        //   setImpactLevel('')
        //   setImage('')
        //  setCaseStudyExample('')
        //   setCulturalSignificanceScore('')
        //   setThoughtStarters('')
        //  setBrandsOnThisTrend('')
        //   setAudienceProfile('')
        //  setGeographicHotspots('')
        //  setBrandSentimentImpact('')
        // setTrendImage({selectedFile: [], selectedFileName: []})

            
        },1000)
        
        }} variant="contained" sx={{backgroundColor:"#0000FF",color:"white"}} >
          Update
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
