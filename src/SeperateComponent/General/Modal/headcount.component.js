import { Box, Typography } from "@mui/material";

// Navigation
import { useNavigate } from "react-router-dom";

import LinearProgress from "@mui/material/LinearProgress";

const HeadCountComponent = ({ data, message, text, storage }) => {

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
            background: "#252328", 
            maxWidth: '100%', 
            padding: "24px 14px",
            marginTop: "18px",
            borderRadius: "14px" 
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
                    fontWeight: "500"
                }}
            >{ text }</Typography>
          }
            { data.map( (item) => (
              <Box sx={{ display: "flex", justifyContent: "space-between", margin: "6px 2px" }}>
                <Typography sx={{ fontSize: 12, textAlign: "center", fontFamily: "inter", fontSize: "14px" }}>{ item.title }</Typography>
                <Typography sx={{ fontSize: 12, textAlign: "center", fontFamily: "inter", fontSize: "14px" }}>{ item.number }</Typography>
              </Box>
            ) ) }

            { 
              storage && 
              <Box mb={2} mt={1.5} maxWidth={"68%"}>
                <Typography mb={0.5} sx={{  fontFamily: "inter", }}>Storage</Typography>
                <LinearProgress 
                  variant="determinate"
                  value={30}
                />
                <Typography mt={0.5} sx={{ fontSize: 12, fontFamily: "inter", }}>add more storage</Typography>
              </Box>
            }

            <Typography 
              sx={{ color: "#A01565", cursor: "pointer", fontFamily: "inter", fontSize: 14 }}
              onClick={ moveToPage }
            >
              { message }
            </Typography>
        </Box>
    )
}

export default HeadCountComponent;
