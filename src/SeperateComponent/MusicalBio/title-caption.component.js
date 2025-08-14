import { Box, Typography } from "@mui/material";

// React  Icon
import { BsPencil } from "react-icons/bs";

const TitleCaptionComponent = ({ title }) => {

    return (
        <Box
            sx={{ display: "flex" }}
            mb={1}
        >
            <Typography
                sx={{ fontSize: "16px", fontFamily: "inter", fontWeight: "bold" }}
                mr={1}
            >{ title }</Typography>
            <BsPencil style={{ marginTop: "4px", fontSize: "14px" }} />
        </Box>
    )
}

export default TitleCaptionComponent;
