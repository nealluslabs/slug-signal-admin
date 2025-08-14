import { Box, Typography } from "@mui/material";

// Components
import TitleCaptionComponent from "./title-caption.component";
import ItemLittleBoxComponent from "./item-little-box.component";
import { OverlayComponent } from "../Dashboard";
import { TryPremiumComponent } from "../General";

const MusicalBioSideBarComponent = ({ titleOne, titleTwo, optionTop, optionBottom }) => {

    return (
        <Box flex={1.5} p={2} sx={{ display: { xs: "none", sm: "block", marginTop: 119 } }}>
            
            <Box pl={2}>
                <TitleCaptionComponent title="Bio" />
                <Typography
                    sx={{ fontFamily: "inter", fontSize: "12px", cursor: "pointer", textAlign: "justify" }}
                >
                    The stage name of singer and songwriter Lily Davies, 
                    Lilyisthatyou is known for her irreverent brand of empowered, 
                    tongue-in-cheek pop, blending indie rock with hip-hop and dance influences. 
                    She broke through in 2020 with her sex-positive anthem "F.M.R.N.," 
                    which went viral and led to the release of her debut 2022 EP, The Character. 
                </Typography>
                <Typography 
                    sx={{ color: "#A01565", fontFamily: "inter", fontSize: "12px", cursor: "pointer" }}
                >
                    Read full biography
                </Typography>
            </Box>

            <Box pl={2} mt={2}>
                <TitleCaptionComponent title="PRO Affiliation" />
                <Typography my={1.5}
                    sx={{ fontFamily: "inter", fontSize: "12px" }}
                >{ titleOne ? titleOne : "Writer/Composer Name: Lily Davis" }</Typography>

                <Box sx={{ display: "flex" }}>
                    <ItemLittleBoxComponent 
                        topTxt="PRO Affiliation" 
                        bottomTxt={ optionTop ? optionTop : "BMI" } 
                        fake={ optionTop }
                    />
                    <ItemLittleBoxComponent 
                        topTxt="IPI #" 
                        bottomTxt={ optionBottom ? optionBottom : "71862812" } 
                        fake={ optionBottom }
                    />
                </Box>

                <Typography my={1.5}
                    sx={{ fontFamily: "inter", fontSize: "12px" }}
                >{ titleTwo ? titleTwo : "Publisher Name: Lily Davis" }</Typography>

                <Box sx={{ display: "flex" }}>
                    <ItemLittleBoxComponent 
                        topTxt="PRO Affiliation" 
                        bottomTxt={ optionTop ? optionTop : "BMI" } 
                        fake={ optionTop }
                    />
                    <ItemLittleBoxComponent 
                        topTxt="IPI #" 
                        bottomTxt={ optionBottom ? optionBottom : "71862812" } 
                        fake={ optionBottom }
                    />
                </Box>

                <Box>
                    <Typography
                        sx={{ color: "#A01565", fontFamily: "inter", fontSize: "12px", cursor: "pointer" }}
                        my={1.5}
                    >Self Published</Typography>
                    
                    <Typography sx={{ fontFamily: "inter", fontSize: "12px" }}>Publisher Contact</Typography>
                    <Typography sx={{ fontFamily: "inter", fontSize: "12px" }}>Jason Grant</Typography>
                    <Typography sx={{ fontFamily: "inter", fontSize: "12px" }}>jason@audiovybez.com</Typography>
                </Box>
            </Box>

            <Box my={2}>
                <OverlayComponent type="music" />
            </Box>

            {
                !titleOne && <TryPremiumComponent more={ false } />
            }
            

        </Box>
    )
}

export default MusicalBioSideBarComponent;
