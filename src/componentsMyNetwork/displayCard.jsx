
import { useNavigate } from "react-router-dom";
import { Typography, Box } from "@mui/material";
import { saveTrendInFocus } from "src/redux/reducers/group.slice";
import { useDispatch } from "react-redux";

const DisplayCard = ({ title, subtitle, link, image,data,page }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate();

    return (
        <Box
            sx={{ 
                cursor: "pointer", width: 260, borderRadius: "12px",
                "&:hover": {
                    backgroundColor: "#D3D3D325"
                },
            }}
            onClick={ () => {dispatch(saveTrendInFocus(data)); setTimeout(()=>{navigate(`/home/details`)},700)   } }
        >
            <img 
                src={ image }
                alt="Image display cart"
                width={260} height={220}
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

export default DisplayCard;
