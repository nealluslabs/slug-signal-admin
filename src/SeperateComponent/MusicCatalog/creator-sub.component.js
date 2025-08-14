import { Box, Typography, Avatar } from "@mui/material";

// Icon
import { DragHandle, MoreVert } from "@mui/icons-material";

// Image
import Image from "../../assets/images/cryPrincess.jpeg";

// Component
import { AvatarListComponent } from "../General";

const CreatorSubComponent = ({ show, people }) => {

    return (
        <Box my={1} sx={{ display: "flex", alignItems: "center", width: "100%" }}>
            {
                !show && <DragHandle />
            }

            <Box 
                sx={{ 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "space-between", 
                    background: "#252328", 
                    width: "100%",
                    padding: "4px 2px"
                }}
            >
                
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box component="img" src={ Image } sx={{ width: 40, height: 40, marginRight: "4px" }} />
                    <Box>
                        <Typography sx={{ fontSize: 12, fontFamily: "inter", fontWeight: "900" }}>
                            Painful Euphoria
                        </Typography>
                        <Typography sx={{ fontSize: 10, fontFamily: "inter" }}>
                            Lilyisthatyou
                        </Typography>
                    </Box>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography  sx={{ fontSize: 12, color: "#2DCF5B", fontFamily: "inter", marginRight: "8px" }}>
                        Approved
                    </Typography>
                    { !people && <AvatarListComponent /> }
                    <MoreVert />
                </Box>

            </Box>
        </Box>
    )
}

export default CreatorSubComponent;
