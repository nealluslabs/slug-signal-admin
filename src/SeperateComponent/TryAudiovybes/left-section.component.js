import { Box } from "@mui/material";

// Image
import TrialImage from '../../assets/images/try-audiovybez.png';
import ProLogo from '../../assets/images/pro-logo.png';

const LeftSectionComponent = () => {

    return (
        <Box flex={2} pt={2} pl={8} pr={3}>
            <Box
                sx={{
                    width: "85%",
                    height: "89%",
                    backgroundImage: `url(${TrialImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                }}
            >
                <Box 
                    component="img" 
                    src={ ProLogo } 
                    sx={{ width: "87%" }}
                    pt={32}
                    pl={10}
                />
            </Box>
        </Box>
    )
}

export default LeftSectionComponent;
