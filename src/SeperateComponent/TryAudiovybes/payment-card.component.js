import { Box, Typography } from "@mui/material";

const PaymentCardComponent = ({ type, fee }) => {

    return (
        <>
            <Box
                mt={3.5}
                sx={{ 
                    border: `${ type == "annual" && "2px solid #A01565" }`, 
                    borderRadius: "12px", 
                    width: "240px", 
                    marginRight: `${ type == "annual" && "14px" }` 
                }}
            >
                <Box
                    sx={{ 
                        background: `${ type == "annual" ? "linear-gradient(to bottom, #A01565, rgba(0, 0, 0, 0))" : "#8D8A8A" }`,
                        height: "48px",
                        borderTopLeftRadius: "10px",
                        borderTopRightRadius: "10px"
                    }}
                >
                    <Typography
                        pt={1}
                        sx={{ textAlign: "center", fontFamily: "inter", fontSize: "14px", fontWeight: "bold" }}
                    >
                        Annual Save { type == "annual" && "12%" }
                    </Typography>
                </Box>

                <Box
                    py={3.5}
                >
                    <Box
                        sx={{ textAlign: "center", display: "flex", justifyContent: "center" }}
                    >
                        <Typography 
                            sx={{ fontFamily: "inter", fontSize: "32px", fontWeight: "bold" }}
                        >${ fee }</Typography>
                        <Typography 
                            pt={2}
                            sx={{ fontFamily: "inter", fontSize: "14px" }}
                        >/month</Typography>
                    </Box>

                    <Typography 
                        sx={{ textAlign: "center", fontFamily: "inter", fontSize: "14px" }}
                    >billed { type == "annual" ? "annually" : "monthly" }</Typography>
                </Box>
            </Box>
        </>
    )
}

export default PaymentCardComponent;
