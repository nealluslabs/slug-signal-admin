import { Box, Typography, Avatar } from "@mui/material";
import { FaInstagram } from "react-icons/fa";
import { Element } from "react-scroll";

const AboutMusicianComponent = () => {

    return (
        <Box my={3} mx={0.5} sx={{ display: "flex",flexDirection:"column",paddingLeft:"10px", paddingRight:"10px",paddingBottom:"30px",backgroundColor:"#252328",borderRadius:"5px" }}>
           
           
             <Box sx={{ display: "flex",justifyContent:"flex-start" ,alignItems:"center",gap:"0.5rem",position:"relative",top:"1rem"}}>
            {<Avatar 
                alt="Not available" src="https://material-ui.com/static/images/avatar/3.jpg"
                sx={{ width: 80, height: 80, marginRight: "8px", marginTop: "2px" }}
             />}

               <Typography sx={{ fontSize: 14, marginTop: 0.5, fontFamily: "inter",fontWeight:"600" }}>
                About
                </Typography>

                <Box
                        mt={0.5}
                    >
                        <FaInstagram style={{ marginLeft: "7px", fontSize: "15px", cursor: "pointer",position:"relative", top:"0.1rem" }} />
                      
                    </Box>
                
             
            </Box>



            <Box>
           
                <Box sx={{ display: "flex",justifyContent:"flex-start" ,paddingTop:"15px",gap:"5px",width:"200px",marginBottom:"25px"}}>
                    {/*<Typography sx={{ fontSize: 14, fontFamily: "inter",fontWeight:"600" }}>SATURDAY 4/12/25</Typography>*/}
                    {/*<hr style={{width:"40px",background:"#606060",color:"#606060",height:"0.1px"}}/>*/}

                    {/*<div style={{width:"40px",background:"#606060",color:"#606060",height:"0.1px",position:"relative",top:"10px",left:"10px"}}/>*/}
                    {/*<Typography sx={{ fontSize: 8, color: "grey", fontFamily: "inter", marginLeft: "8px", marginTop: "6px" }}>
                        4:28pm
                    </Typography>*/}
                </Box>

                <Typography sx={{ fontSize: 12, marginTop: 0.5, fontFamily: "inter" }}>
                Lilyisthatyou, whose real name is Lily Davies, is a Canadian pop artist from Toronto known for blending pop, dance, and punk styles.  
                </Typography>
                
                <Typography sx={{ fontSize: 12, marginTop: 3, fontFamily: "inter" }}>
                She began writing songs at 13 and later released her debut EP, The Character, on Warner Records. Her music often explores themes like battling demons, climate change, and societal pressures on women. She is also known for her candid and charismatic personality, as well as her ability to help fans express themselves. 
                    </Typography>
           
            </Box>
        </Box>
    )
}

export default AboutMusicianComponent;
