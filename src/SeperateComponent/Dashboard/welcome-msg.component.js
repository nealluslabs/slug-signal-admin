import { Box, Typography } from "@mui/material";

const WelcomeMsgComponent = ({ text }) => {

    return (
        <>
            <Box
                py={4} px={2} my={3}
                sx={{ background: "#A01565", maxWidth: "100%", borderRadius: 2 }}
            >
                <Typography sx={{ fontWeight: "900", fontFamily: "Inter",fontSize:"1rem" }}>{ text }</Typography>

                <Typography sx={{ marginTop:"1rem",fontWeight: "400", fontFamily: "Inter",textDecoration:"underline",fontSize:"10px"}}>Get started | Video Tutorials | Help Center</Typography>

            </Box>
        </>
    )
}

export default WelcomeMsgComponent;
