import { Box, Typography, Avatar } from "@mui/material";

const AvatarListComponent = () => {

    return (
        <Box  sx={{ display: "flex", alignItems: "center" }}>
            <Avatar alt="Not available" src="https://material-ui.com/static/images/avatar/7.jpg" sx={{ width: 21, height: 21, marginLeft: "-7px" }} />
            <Avatar alt="Not available" src="https://material-ui.com/static/images/avatar/3.jpg" sx={{ width: 21, height: 21, marginLeft: "-7px" }} />
            <Avatar alt="Not available" src="https://material-ui.com/static/images/avatar/4.jpg" sx={{ width: 21, height: 21, marginLeft: "-7px" }} />
            <Avatar sx={{ bgcolor: "#F4D7DA", width: 21, height: 21, marginLeft: "-7px" }}>
                <Typography sx={{ color: "#D25B68", fontSize: 12, fontFamily: "inter" }}>+2</Typography>
            </Avatar>
        </Box>
    )
}

export default AvatarListComponent;
