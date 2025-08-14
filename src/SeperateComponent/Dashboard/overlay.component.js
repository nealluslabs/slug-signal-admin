import { Box, Typography } from "@mui/material";

// Navigation
import { useNavigate } from "react-router-dom";

// Smoke Image
import Smoke from '../../assets/images/smoke.jpeg';
import MusicBox from '../../assets/images/music-box.jpeg';

const OverlayComponent = ({ type }) => {

    const navigate = useNavigate();

    return (
        <>
            <Box 
                sx={{
                    maxWidth: '100%',
                    height: '169px',
                    backgroundImage: `url(${type ? MusicBox : Smoke})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    borderRadius: "14px",
                    position: 'relative',
                }}
                onClick={ () => navigate("/edit-public") }
            >
                <Box
                    px={3}
                    py={1}
                    sx={{
                        position: "absolute",
                        zIndex: 2,
                        color: 'white',
                        background: "rgba(0,0,0,0.3)",
                        height: "100%",
                        width: "100%"
                    }}
                >
                    {
                        type ?
                        <>
                            <Typography
                                sx={{ fontSize: "18px", fontWeight: "medium", fontFamily: "inter" }}
                                mt={12}
                            >Lilyisthatyou - FMRN (Official Music Video)</Typography>
                        </>
                        :
                        <>
                            <Typography 
                                variant="h6"
                                mt={4}
                                mb={1}
                                sx={{ fontWeight: "900", fontFamily: "inter" }}
                            >Lilyisthatyou</Typography>
                            <Typography sx={{ fontSize: 14, fontFamily: "inter" }}>Los Angeles, C.A</Typography>
                            <Typography sx={{ fontSize: 14, textDecoration: "underline", cursor: "pointer", fontFamily: "inter" }}>
                                Pitch Page
                            </Typography>
                        </>
                    }
                </Box>
            </Box>
        </>
    )
}

export default OverlayComponent;
