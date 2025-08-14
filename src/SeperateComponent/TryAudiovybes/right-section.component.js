import { Box, Typography } from "@mui/material";

// React Icon
import { ImCheckmark } from "react-icons/im";

// Components
import PaymentCardComponent from "./payment-card.component";
import EnterCardPaymentComponent from "./enter-card-payment.component";

const RightSectionComponent = () => {

    const lists = [
        { item: "Keep 100% of your sync fees and royalties" },
        { item: "Inner circle access to Audiovybez members" },
        { item: "Robust suite of AI music organizational tools" },
        { item: "Book 1 on 1 strategy sessions with Music Supervisors" },
        { item: "Personalized pitch page to promote your sync catalog" },
        { item: "Live Q&As and listening sessions with Music Supervisors" },
        { item: "10 GB storage for all file types" }
    ]

    return (
        <Box flex={1.5} pt={3.5} pr={16}>
            <Typography
                sx={{
                    fontFamily: "inter", 
                    fontSize: "21px", 
                    fontWeight: "bold",
                    textAlign: "center"
                }}
                mb={3}
            >
                Upgrade to an Audiovybez Pro Membership
            </Typography>

            <Box
                sx={{
                    background: "#252328",
                    // maxWidth: '58px',
                    borderRadius: "12px"
                }}
                py={2} px={2} mb={3}
            >

                {
                    lists.map((item) => (
                        <Box sx={{ display: "flex" }} my={0.7}>
                            <ImCheckmark style={{ color: "#2DCF5B", marginTop: "4px", marginRight: "8px", fontSize: "15px" }} />
                            <Typography
                                sx={{
                                    fontFamily: "inter",
                                    fontSize: "14px"
                                }}
                            >
                                { item.item }
                            </Typography>
                        </Box>
                    ) )
                }
                

                <Typography
                    mt={1}
                    sx={{ color: "#A01565", fontFamily: "inter", fontSize: "14px", cursor: "pointer" }}
                >View full breakdown of plan details and compare</Typography>
            </Box>

            <Typography
                sx={{
                    fontFamily: "inter", 
                    fontSize: "24px", 
                    fontWeight: "bold",
                    textAlign: "center"
                }}
            >
                Choose a plan to continue
            </Typography>

            <Typography
                sx={{ fontFamily: "inter", fontSize: "13px", fontWeight: "medium", textAlign: "center" }}
            >
                Take your music to the next level with one of our subscription plans
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <PaymentCardComponent type="annual" fee={ 41 } />
                <PaymentCardComponent type="monthly" fee={ 47 } />
            </Box>

            <EnterCardPaymentComponent />
        </Box>
    )
}

export default RightSectionComponent;
