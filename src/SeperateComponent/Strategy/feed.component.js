import { Avatar, Box, Card, IconButton, Typography ,Button} from "@mui/material";

// Component
import BookSessionComponent from "./book-session.component";
import { SearchBarComponent } from "../General";
import OptionsComponent from "./options.component";
import CardComponent from "./card.component";

import { FaRegTimesCircle } from "react-icons/fa";

import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import 'react-horizontal-scrolling-menu/dist/styles.css';
import { MdOutlinePersonAddAlt1 } from "react-icons/md";

import Laza from 'src/assets/images/lazarra.jpeg';
import Rea from 'src/assets/images/natalie-circle.jpg';
import Afri from "src/assets/images/paul-circle.jpg";
import D1 from 'src/assets/images/lava-circle.jpg'


import SearchExpertComponent from "../General/search-expert.component";


const StrategyFeedComponent = () => {

    const menu = [
        { title: "New", active: true },
        { title: "Price ascending", active: false },
        { title: "Price descending", active: false },
        { title: "Ratings", active: false }
    ]


    const data = [
        { img: Afri, name: "Paul Stewart",shortTitle:"Music Supervisor",fullTitle:"Music Supervisor/Film & TV Producer"  },
        { img: Rea, name: "Natalie Jacobs",shortTitle:"Founder/CEO",fullTitle:"Metadata Specialist and founder of Equalizer Consulting"  },
        { img: D1, name: "Lava Hong",shortTitle:"Music Supervisor",fullTitle:"Trailer Music Supervisor @trailerparkgroup" },
       /* { img: Laza, name: "La Zarra" }*/
      ];


    return (
        <Box flex={3} p={{ xs: 0, md: 2,}}>
            
            <BookSessionComponent />
            <Box my={1.5} mt={3}>
               

                {/*<OptionsComponent data={ menu } />*/}

                 {/* ml={{md:2,lg:4,xl:0}} mr={{lg:-2,xl:0}}*/}

               
               
               
   <Box sx={{display:"flex",justifyContent:"flex-start",alignItems:"flex-start",flexDirection:"column"}}>
      <Typography fontWeight={100} mt={2} mb={0.5} sx={{ 
          borderBottom: "2px solid #A01565", 
          display: "inline-block", 
          paddingBottom: "2px",
          fontFamily: "inter",
          fontSize: 16,
          fontWeight: "700"
        }}>
          Meet the Experts

       </Typography>

       <Typography fontWeight={100} mt={0} mb={3} sx={{ 
         // borderBottom: "2px solid #A01565", 
          display: "inline-block", 
          paddingTop: "2px",
          fontFamily: "inter",
          fontSize: 12,
          width:"100%",
          fontWeight: "400"
        }}>
         
          <SearchExpertComponent />

       </Typography>

     </Box>

    
       <ScrollMenu  wrapperClassName={"scrollMenu-network"} itemClassName="scrollMenu-network-item"  scrollContainerClassName={"scrollContainer"}>
   
          
       { data.map( (item, index) => (


    <Card
    itemId={item.name} 
    sx={{
      //backgroundColor: 'rgba(0, 0, 0, 0.4)',
      background:"#302c34",
      borderRadius: '10px',
      border: '1px solid #606060',
      height: 280,
      width:200,
      padding: 2,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff',
      position: 'relative',
    }}
    >
    <Box
      sx={{
        textAlign: 'center',
      }}
    >
      <Box sx={{ position: 'relative', display: 'inline-block' }}>
        <Avatar
          src={item.img}
          alt={item.name}
          sx={{
            width: 76,
            height: 76,
            borderRadius: '50%',
            margin: '0 auto',
          }}
        />
        <IconButton
          size="small"
          sx={{
            position: 'absolute',
            top: 7,
            right: -25,
            backgroundColor: 'transparent',
            borderColor:"white",
            color: '#fff',
            padding: '2px',
            width: 22,
            height: 22,
            fontSize: '17px',
            zIndex: 2,
          }}
        >
         
          <FaRegTimesCircle color="#fff" fontSize={17} style={{fontWeight:"200"}}/>
        </IconButton>
      </Box>
    
      <Typography sx={{ fontWeight: 'bold', fontSize: '14px', marginTop: 1 }}>
        {item.name}
      </Typography>
      <Typography sx={{ fontSize: '12px', color: '#fff' }}>
        {item.shortTitle}
      </Typography>
    
      <Box sx={{ marginTop: "1rem" }}>
        {/*<Typography sx={{ fontSize: '12px', color: '#fff' }}>
          Founder @audiovybez
        </Typography>*/}
        <Typography sx={{ fontSize: '12px', color: '#fff' }}>
          {item.fullTitle}
        </Typography>
      </Box>
    
      <Button
        variant="contained"
        /*startIcon={<MdOutlinePersonAddAlt1 />}*/
        sx={{
          marginTop: 2,
          borderRadius: '5rem',
          paddingX: 3,
          background: "linear-gradient(to right, #A01565, #3E256E)",
          color: '#fff',
          textTransform: 'none',
          fontSize: '12px',
        }}
      >
        Book Session
      </Button>
    </Box>
    </Card>



          ) ) }

        </ScrollMenu>
               
               
               
               
               
               {/* <Box my={1} mt={3} ml={{md:2,lg:4,xl:0}} mr={{lg:-2,xl:0}}
                    sx={{ 
                        display: "flex", flexDirection: "row", overflowX: "scroll",
                      
                        maxWidth: "100%",
                        
                        "&::-webkit-scrollbar": {
                            display: "none",
                          },
                    }}
                >
                    <CardComponent />
                    <CardComponent />
                   
                </Box>
                */}
            </Box>
            
        </Box>
    )
}

export default StrategyFeedComponent;
