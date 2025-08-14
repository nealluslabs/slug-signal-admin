import { Box, Typography } from "@mui/material";

// React icons
import { IoMdSearch } from "react-icons/io";
import { FaCaretDown } from "react-icons/fa";
import { MdOutlineClear } from "react-icons/md";

// Components
import CreatorSubComponent from "../MusicCatalog/creator-sub.component";
import DiscographyComponent from "./discography.component";

const FeaturedSongsComponent = () => {

    return (
        <Box mt={6}>
            <Typography
                sx={{ fontSize: "19px", fontFamily: "inter", fontWeight: "bold" }}
            >Featured Songs</Typography>

            <Box
                sx={{ background: "#CCCCCC", color: "#8D8A8A", borderRadius: "6px" }}
                my={1} py={0.5} px={1}
            >
                <IoMdSearch 
                    style={{ fontSize: "21px", marginBottom: "-6px", marginRight: "6px" }}
                />

                <input 
                    type="text" placeholder="Add featured track" 
                    style={{ 
                        width: "80%", outline: "none", border: "none", 
                        background: "transparent", fontFamily: "inter",
                        fontSize: "14px"
                    }}
                />

                <MdOutlineClear style={{ fontSize: "21px", marginBottom: "-6px", marginRight: "8px", marginLeft: "6px", cursor: "pointer" }} />
                <FaCaretDown style={{ fontSize: "21px", marginBottom: "-6px", marginRight: "2px", cursor: "pointer" }} />
            </Box>

            {
                [1,2,3,4].map( (item) => (
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography mr={1}>{ item }.</Typography>
                        <CreatorSubComponent show={ true } people={ true } />
                    </Box>
                ) )
            }

            <Typography
                sx={{ fontFamily: "inter", fontSize: "14px", cursor: "pointer", fontWeight: "bold" }}
                my={1}
            >See More</Typography>

            <DiscographyComponent />

        </Box>
    )
}

export default FeaturedSongsComponent;
