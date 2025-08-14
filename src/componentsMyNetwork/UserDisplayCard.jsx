
import { Typography, Box } from "@mui/material";

// React icons
import { BsThreeDots } from "react-icons/bs";

// Nvaigation
import {  useNavigate } from "react-router-dom";

const UserDisplayCard = () => {

    const navigate = useNavigate();

    return (
        <Box 
            onClick={ () => navigate('/users/details') }
            sx={{ 
            cursor: 'pointer', 
            borderRadius: "12px",
            "&:hover": {
                backgroundColor: "#D3D3D325"
            },
            "&:hover .hover-icon": {
                display: "flex", // Show on hover
            },
            }}
        >
            <Box
            sx={{
                height: "200px",
                backgroundImage: "url('https://res.cloudinary.com/glide/image/fetch/f_auto,w_500,c_limit/https%3A%2F%2Flh3.googleusercontent.com%2Fa%2FACg8ocIH8mtMYoT_PqQ8daTa4f7Y_we2GjnU1y_3taHUy3ZLG07xgA%3Ds96-c')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                borderRadius: "8px",
                position: "relative",
            }}
            >
            <Box 
                className="hover-icon" mr={2} mt={1}
                sx={{ 
                display: "none", // Initially hidden
                position: "absolute",
                top: 0,
                right: 0,
                p: 1,
                background: "#FFFFFF40",
                borderRadius: "4px",
                }}
            >
                <BsThreeDots />
            </Box>
            </Box>
        
            <Box px={1} py={0.5}>
            <Typography mt={0.5}>Kelvin Gumbo</Typography>
            </Box>
        </Box>
      
    )
}

export default UserDisplayCard;
