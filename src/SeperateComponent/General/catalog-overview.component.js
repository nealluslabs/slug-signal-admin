import { Box, Typography } from "@mui/material";

// Navigation
import { useNavigate } from "react-router-dom";

import LinearProgress from "@mui/material/LinearProgress";

const CatalogOverviewComponent = ({ data, message, text, storage }) => {

  const navigate = useNavigate();

  const moveToPage = () => {
    if(message == "Edit Page"){
      navigate("/musical-bio")
    }
    else if(message == "View Messages") {
      navigate("/message")
    }
  }

    return (
        <Box sx={{ 
           // background: "#252328", 
           background:"#302c34",
           
            padding: "24px 14px",
            //marginTop: "18px", //this isnt doing anything
            position:"relative",
            top:"0.5rem",
            borderRadius: "14px",
            height:"28rem",
           /* width:"24.95rem",*/
            //flex:"3.53"  
        }}>
          {
            text &&
            <Typography 
                mb={2}
                sx={{
                    borderBottom: "2px solid #A01565", 
                    display: "inline-block", 
                    paddingBottom: "2px",
                    fontFamily: "inter",
                    fontWeight: "600",
                    fontSize:"16px",
                }}
            >{ text }</Typography>
          }
            { data.map( (item) => (
              <Box sx={{ display: "flex", justifyContent: "space-between", margin: "6px 0px",paddingRight:"20px" }}>
                <Typography sx={{ fontSize: 12, textAlign: "center", fontFamily: "inter", fontSize: "12px" }}>{ item.title }</Typography>
                <Typography sx={{ fontSize: 12, textAlign: "center", fontFamily: "inter", fontSize: "12px" }}>{ item.number }</Typography>
              </Box>
            ) ) }

            { 
              storage && 
              <Box mb={2} mt={1.5} maxWidth={"95%"}>
                
               
                <div style={{display:"flex",justifyContent:"space-between",marginTop:"0.5rem",alignItems:"center"}}>
                <Typography mb={0.5} sx={{  fontFamily: "inter",marginTop:"0.5rem",fontSize:"12px" }}>Storage</Typography>
                <Typography mb={0.5} sx={{  fontFamily: "inter",fontSize:"12px" }}>27 of 100GB used (27%)</Typography>
                </div>

                <LinearProgress 
                  variant="determinate"
                  value={30}
                  sx={{
                    height: 8,
                    backgroundColor: 'gray', // Track color
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: '#A01565', // Fill color
                    },
                  }}
                />
                <Typography mt={0.5} sx={{ fontSize: 10, fontFamily: "inter", color:"gray"}}>add more storage</Typography>
              </Box>
            }



            

           {/* <Typography 
              sx={{ color: "#A01565", cursor: "pointer", fontFamily: "inter", fontSize: 12 }}
              onClick={ moveToPage }
            >
              { message }
          </Typography>*/}
        </Box>
    )
}

export default CatalogOverviewComponent;
