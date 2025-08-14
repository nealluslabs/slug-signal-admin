import { Box, Typography } from "@mui/material";

// React Icon
import { FaCreditCard } from "react-icons/fa";

const EnterCardPaymentComponent = () => {

    return (
        <>
            <Box mt={6} mb={3}>
                <Typography
                    sx={{ fontFamily: "inter", fontSize: "14px", textAlign: 'center' }}
                    mb={2}
                >Start your 7-day free trial</Typography>

                <Box
                    sx={{ display: "flex", background: "#49454F", color: "#757575", width: "340px", margin: "8px auto" }}
                    px={1.5} py={1}
                >
                    <FaCreditCard style={{ marginRight: "6px", fontSize: "32px" }} />
                    <input 
                        type="number" placeholder="Credit Card Number" 
                        style={{ background: "transparent", width: "60%", outline: "none", border: "none", fontFamily: "inter", fontSize: "14px" }} 
                    />
                    <input 
                        type="number" placeholder="MM/YY" 
                        style={{ background: "transparent", width: "20%", outline: "none", border: "none", fontFamily: "inter", fontSize: "14px" }} 
                    />
                    <input 
                        type="number" placeholder="CVC" 
                        style={{ background: "transparent", width: "20%", outline: "none", border: "none", fontFamily: "inter", fontSize: "14px" }} 
                    />
                </Box>

                <Box
                    sx={{ margin: "12px auto", background: "#A01565", width: "164px", borderRadius: "8px", cursor: "pointer" }}
                    py={1} 
                >
                    <Typography
                        sx={{ textAlign: "center", fontFamily: "inter", fontSize: "14px", fontWeight: "bold" }}
                    >Start free trial</Typography>
                </Box>

                <Typography
                    mt={4}
                    sx={{ textAlign: "center", margin: "2px auto", fontFamily: "inter", fontSize: "12px", width: "420px" }}
                >
                    You won’t be charged until your free trial ends. 
                    If you do not cancel your free trial by 09/11/2024 
                    you will be charged based on the plan you select.  
                    You can cancel your free trial at any time in your account settings. 
                    You accept our terms.
                </Typography>
            </Box>
        </>
    )
}

export default EnterCardPaymentComponent;
