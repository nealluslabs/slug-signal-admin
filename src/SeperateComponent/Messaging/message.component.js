import { Box, Typography, Avatar } from "@mui/material";

const MessageComponent = () => {

    return (
        <Box my={1} mx={0.5} sx={{ display: "flex" }}>
            <Avatar 
                alt="Not available" src="https://material-ui.com/static/images/avatar/3.jpg"
                sx={{ width: 32, height: 32, marginRight: "8px", marginTop: "2px" }}
            />

            <Box>
                <Box sx={{ display: "flex" }}>
                    <Typography sx={{ fontSize: 14, fontFamily: "inter" }}>Ope</Typography>
                    <Typography sx={{ fontSize: 8, color: "grey", fontFamily: "inter", marginLeft: "8px", marginTop: "6px" }}>
                        4:28pm
                    </Typography>
                </Box>

                <Typography sx={{ fontSize: 12, marginTop: .5, fontFamily: "inter" }}>
                    Gee, its been good news all day. i met someone special today. she's really pretty. 
                    i’ll like to talk more about it but it has to be tomorrow. she should grab a drink later.
                </Typography>
                <Typography sx={{ fontSize: 12, marginTop: 1, fontFamily: "inter" }}>Call me if you get this okay.</Typography>
            </Box>
        </Box>
    )
}

export default MessageComponent;
