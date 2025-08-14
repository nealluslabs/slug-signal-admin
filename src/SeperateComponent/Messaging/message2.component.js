import { Box, Typography, Avatar } from "@mui/material";

const Message2Component = () => {

    return (
        <Box my={1} mx={0.5} sx={{ display: "flex" }}>
            <Avatar 
                alt="Not available" src="https://material-ui.com/static/images/avatar/4.jpg"
                sx={{ width: 32, height: 32, marginRight: "8px", marginTop: "2px" }}
            />

            <Box>
                <Box sx={{ display: "flex" }}>
                    <Typography sx={{ fontSize: 14, fontFamily: "inter" }}>Me</Typography>
                    <Typography sx={{ fontSize: 8, color: "grey", marginLeft: "8px", marginTop: "6px", fontFamily: "inter" }}>
                        4:28pm
                    </Typography>
                </Box>

                <Typography sx={{ fontSize: 12, marginTop: .5, fontFamily: "inter" }}>
                    Lorem ipsum dolor sit amet consectetur. Dictum sociis fermentum sodales nisl interdum id eget. Eget libero viverra tristique massa fringilla sit.
                </Typography>
                <Typography sx={{ fontSize: 12, marginTop: 1, fontFamily: "inter" }}>
                    Lorem ipsum dolor sit amet consectetur. Integer amet sed ultrices ut. Sit lectus egestas viverra auctor.
                </Typography>
                <Typography sx={{ fontSize: 12, marginTop: 1, fontFamily: "inter" }}>
                    Lorem ipsum dolor sit amet consectetur. Pellentesque sagittis sed dictum lorem. Neque eget faucibus dolor r
                </Typography>
            </Box>
        </Box>
    )
}

export default Message2Component;
