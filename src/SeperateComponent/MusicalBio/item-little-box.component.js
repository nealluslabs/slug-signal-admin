import { Box, Typography } from "@mui/material";

const ItemLittleBoxComponent = ({ topTxt, bottomTxt, fake }) => {

    return (
        <Box
            sx={{ background: `${ fake ? "#252328" : "#8D8A8A" }`, width: "132px" }}
            py={1} px={2} mr={2}
        >
            <Typography
                sx={{ textAlign: "center", fontFamily: "inter", fontSize: "14px" }}
            >{ topTxt }</Typography>
            <Typography
                sx={{ textAlign: "center", fontFamily: "inter", fontSize: "14px" }}
            >{ bottomTxt }</Typography>
        </Box>
    )
}

export default ItemLittleBoxComponent
