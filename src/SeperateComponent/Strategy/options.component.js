import { Box, Typography } from "@mui/material";

// Icons
import { Check } from "@mui/icons-material";

const OptionsComponent = ({ data }) => {

    return (
        <Box sx={{ display: "flex" }}>
            { data.map( (item, key) => (
                <Box 
                    my={0.7} py={0.5} px={1} mr={1} 
                    sx={{ 
                        display: "flex", 
                        background: `${ item.active ? "#2C2C2C" : "white" }`, 
                        color: `${ item.active ? "white" : "black" }`, 
                        borderRadius: "6px",
                        cursor: "pointer"
                    }}
                >
                    { item.active && <Check sx={{ width: 18, height: 18, marginRight: "2px" }} /> }
                    <Typography sx={{ fontFamily: "inter", fontSize: 12 }}>{ item.title }</Typography>
                </Box>
            ) ) }
        </Box>
    )
}

export default OptionsComponent;
