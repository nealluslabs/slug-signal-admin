import { Box, Typography, Avatar } from "@mui/material";
import { Element } from "react-scroll";

const MessageParagraphComponent = () => {

    return (
        <Box my={0} mx={0.5} sx={{ display: "flex",paddingLeft:"10px", paddingRight:"10px",marginBottom:"30px" }}>
            {/*<Avatar 
                alt="Not available" src="https://material-ui.com/static/images/avatar/3.jpg"
                sx={{ width: 32, height: 32, marginRight: "8px", marginTop: "2px" }}
             />*/}

            <Box>
           
                <Box sx={{ display: "flex",justifyContent:"flex-start" ,paddingTop:"15px",gap:"5px",width:"200px",marginBottom:"25px"}}>
                    <Typography sx={{ fontSize: 14, fontFamily: "inter",fontWeight:"600" }}>SATURDAY 4/12/25</Typography>
                    {/*<hr style={{width:"40px",background:"#606060",color:"#606060",height:"0.1px"}}/>*/}

                    <div style={{width:"40px",background:"#606060",color:"#606060",height:"0.1px",position:"relative",top:"10px",left:"10px"}}/>
                    {/*<Typography sx={{ fontSize: 8, color: "grey", fontFamily: "inter", marginLeft: "8px", marginTop: "6px" }}>
                        4:28pm
                    </Typography>*/}
                </Box>

                <Typography sx={{ fontSize: 12, marginTop: 0.5, fontFamily: "inter" }}>
                    Gee, its been good news all day. i met someone special today. she's really pretty. 
                    i’ll like to talk more about it but it has to be tomorrow. she should grab a drink later.
                </Typography>
                
                <Typography sx={{ fontSize: 12, marginTop: 3, fontFamily: "inter" }}>Excited to share that audiovybez has over 40 placements in the upcoming season!</Typography>
           
            </Box>
        </Box>
    )
}

export default MessageParagraphComponent;
