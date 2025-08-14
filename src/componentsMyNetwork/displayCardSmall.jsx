
import { useNavigate } from "react-router-dom";
import { Typography, Box } from "@mui/material";

const DisplayCardSmall = ({ title, subtitle, link, image }) => {

    const navigate = useNavigate();

    return (
        <Box
            sx={{ 
                cursor: "pointer", width: 260, borderRadius: "12px",
                "&:hover": {
                    backgroundColor: "#D3D3D325"
                },
            }}
            onClick={ () => navigate(link) }
        >
            <img 
                src={ image }
                alt="Image display cart"
                width={150} height={130}
                style={{ borderRadius: "12px" }}
            />
            
            <Box px={1} py={0.5}>
                <Typography mt={0.5} sx={{color: "black",}}>{ title }</Typography>
                <Typography sx={{ color: "grey", fontSize: "14px" }}>
                    { subtitle }
                </Typography>
            </Box>
        </Box>
    )
}

export default DisplayCardSmall;
