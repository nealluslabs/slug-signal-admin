import { Box, Typography } from "@mui/material";

// Navigation
import { useNavigate } from "react-router-dom";

// Images || Icon
import Image from "../../assets/images/Side/happening.png";
import StarIcon from "../../assets/images/Side/stars.png"

const TryPremiumComponent = ({ more }) => {

    const navigate = useNavigate();

    return (
        <>
            <Box
                mt={2}
                sx={{
                    maxWidth: '100%',
                    height: '209px',
                    backgroundImage: `url(${Image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    padding: "24px 8px",
                    borderRadius: "14px"
                }} 
                onClick={ () => navigate('/try-audiovybez') } 
            >
                <Box
                sx={{ display: "flex", justifyContent: "center", marginBottom: "10px", marginTop: "24px" }}
                >
                <img src={ StarIcon } width={24} height={24} style={{ marginRight: "12px", marginTop: "4px" }} />
                <Typography sx={{ textAlign: "center", fontWeight: 700, fontFamily: "inter", fontSize: 20 }}>Try Audiovybez PRO for $0</Typography>
                </Box>
    
                <Typography sx={{ fontSize: "12px", textAlign: "center", fontFamily: "inter", fontSize: "12px" }}>
                    Unlock advanced AI cataloging  features, discounted pricing on events and more!
                </Typography>

                <Box mx={3.5} mt={2} sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography sx={{ fontFamily: "inter", fontSize: 12, color: "#A01565", cursor: "pointer" }}>Current Plan</Typography>
                    <Typography sx={{ fontFamily: "inter", fontSize: 12, cursor: "pointer" }}>Free</Typography>
                </Box>
            </Box>
        </>
    )
}

export default TryPremiumComponent;
