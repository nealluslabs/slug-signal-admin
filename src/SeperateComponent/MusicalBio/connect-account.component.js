import { Box, Typography } from "@mui/material";

const ConnectAccountComponent = ({ title, btnList }) => {

    return (
        <>
            <Box my={2}>
                <Typography
                    sx={{ fontSize: "16px", fontFamily: "inter", fontWeight: "bold" }}
                    mb={1}
                >{ title }</Typography>

                <Box
                    sx={{ background: "#252328", borderRadius: "14px" }}
                    py={3} px={2.5}
                >
                    {
                        btnList.map( item => (
                            <Box 
                                sx={{ display: "flex", justifyContent: "center", background: "#C4C4C4", borderRadius: "6px", color: "#161419", cursor: "pointer" }}
                                mt={1.5} p={1}
                            >
                                <Typography
                                    sx={{ fontFamily: "inter", fontSize: "14px" }}
                                >{ item }</Typography>
                            </Box>
                        ) )
                    }

                    <Box sx={{ textAlign: "center", width: "280px", margin: "0px auto", marginTop: "21px" }}>
                        <Typography
                            sx={{ fontFamily: "inter", fontSize: "18px", fontWeight: "bold" }}
                        >Why add this information?</Typography>

                        <Typography
                            sx={{ fontFamily: "inter", fontSize: "12px" }}
                        >
                            Adding this helps us to better recommend suitable members, 
                            music briefs and pitching you for opportunities.
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default ConnectAccountComponent;
