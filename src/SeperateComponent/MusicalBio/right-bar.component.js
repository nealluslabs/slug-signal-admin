import { Box, Typography, LinearProgress } from "@mui/material";

// Components
import AddMusicBioDetails from "./add-details.component";
import ConnectAccountComponent from "./connect-account.component";

const MusicalBioRightBarComponent = () => {

    return (
        <Box  flex={2} p={2} sx={{ display: { xs: "none", sm: "block" } }}>

            <Box>
                <Typography 
                    sx={{ fontFamily: "inter", fontSize: "12px" }}
                    mb={1}
                >Profile</Typography>
                <LinearProgress variant="determinate" value={ 70 } sx={{ width: "360px", height: "16px" }} />
            </Box>

            <AddMusicBioDetails title="Add your genres" option="EDM" btnTxt="Add Genres" />

            <AddMusicBioDetails title="Add your locations" option="Los Angeles" btnTxt="Where do you rep" />

            <ConnectAccountComponent 
                title="Connect Accounts"
                btnList={ ["Spotify", "TikTok", "YouTube", "Instagram"] }
            />
        </Box>
    )
}

export default MusicalBioRightBarComponent;
