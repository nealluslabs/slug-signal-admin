import React, { useState, useEffect } from "react";

import { Typography, Box,Button } from "@mui/material";

// React icon
import { MdEdit } from "react-icons/md";

import { db } from "src/config/firebase";

// Components
import SimpleFormDialog from "./simpleDialogForm";

const TrendDetails = ({ trendData }) => {

    const [open, setOpen] = useState(false);
    const [signals, setSignals] = useState();
    const [filteredSignal, setFilteredSignal] = useState();

    const { trendName, trendSummary,trendDescription, trendImage } = trendData;

    useEffect(() => {
        const fetchSignals = async () => {
          try {
            const querySnapshot = await db.collection("trends").get();
            const signalData = querySnapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data(),
            }));
            setSignals(signalData);

            const match = signalData.find(signal => signal.trendName === trendName);
            if (match) {
                setFilteredSignal(match);
            }
          } catch (error) {
            console.error("Error fetching signals:", error);
          }
        };
    
        fetchSignals();
    }, []);

    console.log(filteredSignal);

    return (
        <Box mx={12}>
            <Box sx={{ display: "flex" }}>
                <img 
                    src={ trendImage }
                    width={296} height={256} 
                    style={{ borderRadius: "12px" }}
                />

                <Box 
                    ml={2}
                    sx={{ position: "relative" }} 
                >
                    <Box>
                        <Typography  sx={{ color: "black"}} variant="h4">{ trendName }</Typography>
                        <Typography 
                            sx={{ color: "grey", fontSize: "14px" }}
                        >
                            { trendSummary }

                            <Typography
                                sx={{ color: "black", mt: 2, fontSize: "14px" }}
                            > 
                                { filteredSignal && filteredSignal.trendDescription } 
                            </Typography>
                        </Typography>
                    </Box>

                   {/* 
                   <Box
                        sx={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            right: 0,
                            p: 2,
                        }}
                    >
                        <Button 
                            sx={{ 
                                display: "flex", alignItems: "center",justifyContent:"center", cursor: "pointer", borderRadius: "8px", 
                                border: "1px solid gray"
                            }}
                            onClick={() => setOpen(true)}
                        >
                            <MdEdit style={{color:"black"}} />
                            <Typography sx={{ ml: 1,color:"black" }}>Edit</Typography>
                        </Button>
                        </Box>
                        */}
                </Box>
            </Box>

            <Box
                display="flex"
                flexWrap="wrap"
                gap={2}
                justifyContent="space-between"
            >
                {/*data.map((item, index) => (*/
                <>
                    <Box
                    key={"index"}
                    flex="1 1 calc(25% - 16px)"
                    minWidth="200px"
                    p={2}
                    borderRadius="8px"
                    >
                    <Box my={2}>
                        <Typography sx={{ color: "grey", fontSize: 14 }}>{"id"}</Typography>
                        <Typography sx={{ fontSize: 14,color:"black" }}>{trendData.id?trendData.id:"10"}</Typography>
                    </Box>

                    <Box my={2}>
                        <Typography sx={{ color: "grey", fontSize: 14 }}>{"Case Study Example"}</Typography>
                        <Typography sx={{ fontSize: 14,color:"black" }}>{trendData.caseStudyLevel?trendData.caseStudyLevel:trendData.caseStudyExample && trendData.caseStudyExample }</Typography>
                    </Box>

                    <Box my={2}>
                        <Typography sx={{ color: "grey", fontSize: 14 }}>{"Audience"}</Typography>
                        <Typography sx={{ fontSize: 14,color:"black" }}>{trendData.audienceProfile?trendData.audienceProfile:"Millenials,Gen Z,Male Gamers"}</Typography>
                    </Box>
                    </Box>




                    <Box
                    key={"index"}
                    flex="1 1 calc(25% - 16px)"
                    minWidth="200px"
                    p={2}
                    borderRadius="8px"
                    >
                    <Box my={2}>
                        <Typography sx={{ color: "grey", fontSize: 14 }}>{"detected_at"}</Typography>
                        <Typography sx={{ fontSize: 14,color:"black" }}>{trendData.detectedAt}</Typography>
                    </Box>
                    
                    <Box my={2}>
                        <Typography sx={{ color: "grey", fontSize: 14 }}>{"Thought Starters"}</Typography>
                        <Typography sx={{ fontSize: 14,color:"black" }}>{trendData.thoughtStarters}</Typography>
                    </Box>
                    
                    <Box my={2}>
                        <Typography sx={{ color: "grey", fontSize: 14 }}>{"Geographic Hotspots"}</Typography>
                        <Typography sx={{ fontSize: 14,color:"black" }}>{trendData.demographics?trendData.demographics:trendData.geographicHotspots &&  trendData.geographicHotspots}</Typography>
                    </Box>
                    </Box>




                     <Box
                     key={"index"}
                     flex="1 1 calc(25% - 16px)"
                     minWidth="200px"
                     p={2}
                     borderRadius="8px"
                     >
                     <Box my={2}>
                         <Typography sx={{ color: "grey", fontSize: 14 }}>{"Platforms"}</Typography>
                         <Typography sx={{ fontSize: 14,color:"black" }}>{trendData.platforms}</Typography>
                     </Box>
                     
                     <Box my={2}>
                         <Typography sx={{ color: "grey", fontSize: 14 }}>{"Cultural Significance Score"}</Typography>
                         <Typography sx={{ fontSize: 14,color:"black" }}>{trendData.culturalSignificanceScore}</Typography>
                     </Box>
                     
                     <Box my={2}>
                         <Typography sx={{ color: "grey", fontSize: 14 }}>{"Sentiment Impact"}</Typography>
                         <Typography sx={{ fontSize: 14,color:"black" }}>{trendData.brandSentimentImpact}</Typography>
                     </Box>
                     </Box>



                        <Box
                        key={"index"}
                        flex="1 1 calc(25% - 16px)"
                        minWidth="200px"
                        p={2}
                        borderRadius="8px"
                        >
                        <Box my={2}>
                            <Typography sx={{ color: "grey", fontSize: 14 }}>{"Impact Level"}</Typography>
                            <Typography sx={{ fontSize: 14,color:"black" }}>{trendData.impactLevel}</Typography>
                        </Box>
                        
                        <Box my={2}>
                            <Typography sx={{ color: "grey", fontSize: 14 }}>{"Brands On This Trend"}</Typography>
                            <Typography sx={{ fontSize: 14,color:"black" }}>{trendData.brandsOnThisTrend}</Typography>
                        </Box>
                        
                        {/*<Box my={2}>
                            <Typography sx={{ color: "grey", fontSize: 14 }}>{trendData.label3}</Typography>
                            <Typography sx={{ fontSize: 14,color:"black" }}>{trendData.value3}</Typography>
                        </Box>*/}
                        </Box>

                        </>
               /* ))*/
               
               
               }
            </Box>

            <SimpleFormDialog open={open} onClose={() => setOpen(false)} />
        </Box>
    )
}

export default TrendDetails;
