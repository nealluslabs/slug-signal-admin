import { Box, Typography } from "@mui/material";

// Icons
import { KeyboardArrowDown } from "@mui/icons-material";

const DropDownContainerComponent = ({ data }) => {

    return (
        <Box p={2} pb={2.5} my={2} sx={{ background: "#252328", borderRadius: 3 }}>
            <Typography 
                mb={2}
                sx={{
                    borderBottom: "2px solid #A01565", 
                    display: "inline-block", 
                    paddingBottom: "2px",
                    fontFamily: "inter",
                    fontWeight: "500",
                    fontSize: "20px"
                }}
            >Get Started</Typography>

            { data.map( (item, key) => (
                <Box 
                    px={1.5} py={1} my={1}
                    sx={{ display: "flex", justifyContent: "space-between", background: "#49454F", borderRadius: 2, cursor: "pointer" }}
                >
                    <Typography sx={{ fontSize: 12, fontFamily: "inter" }}>{ item.title }</Typography>
                    <KeyboardArrowDown />
                </Box>
            ) ) }
        </Box>
    )
}

export default DropDownContainerComponent;
