import { Box, Typography } from "@mui/material";

// Image
import Image from "../../assets/images/cryPrincess.jpeg";

const DiscographyComponent = () => {

    return (
        <Box mt={6}>
            <Typography
                sx={{ fontSize: "20px", fontFamily: "inter", fontWeight: "bold" }}
            >Discography</Typography>

            <Box my={2.5}
                sx={{ display: "flex" }}
            >
                <Box
                    sx={{ background: "#A01565", width: "121px", borderRadius: '16px', cursor: "pointer" }}
                    p={1} mr={2}
                >
                    <Typography
                        sx={{ fontSize: "12px", fontFamily: "inter", textAlign: 'center' }}
                    >New Releases</Typography>
                </Box>

                <Box
                    sx={{ border: "1px solid #8D8A8A", width: "121px", borderRadius: '16px', cursor: "pointer" }}
                    p={1} mr={2}
                >
                    <Typography
                        sx={{ fontSize: "12px", fontFamily: "inter", textAlign: 'center' }}
                    >Albums</Typography>
                </Box>

                <Box
                    sx={{ border: "1px solid #8D8A8A", width: "121px", borderRadius: '16px', cursor: "pointer" }}
                    p={1} mr={2}
                >
                    <Typography
                        sx={{ fontSize: "12px", fontFamily: "inter", textAlign: 'center' }}
                    >Playlists</Typography>
                </Box>
            </Box>

            <Box>
                <Box component="img" src={ Image } sx={{ height: "100px" }} />
                <Typography sx={{ fontFamily: "inter", fontWeight: "bold" }}>Painful Euphoria</Typography>
                <Typography>2024 EP</Typography>
            </Box>
        </Box>
    )
}

export default DiscographyComponent;
