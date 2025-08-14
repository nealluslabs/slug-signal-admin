import { 
  Box, Stack, Skeleton, Typography, ImageList, ImageListItem, styled, InputBase, alpha,
  MenuItem,
  Menu,
  Popover,
  Dialog
} from "@mui/material";
import { Search, ArrowDropDown, GroupAdd, Inbox, MoreVert, ChevronRight } from "@mui/icons-material"
import React, { useRef, useState } from "react";
import Post from "./Post";
import Post1 from "./Post1";
import Post2 from "./Post2";
import Post3 from "./Post3";
import Post4 from "./Post4";
import Post5 from "./Post5";
import Post6 from "./Post6";
import Post7 from "./Post7";
import Post8 from "./Post8";

import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import 'react-horizontal-scrolling-menu/dist/styles.css';


import {
  Card,
  CardContent,
 
  Avatar,
  Button,
  
  IconButton
} from "@mui/material"
import { FaRegTimesCircle, FaTimes } from "react-icons/fa"
import { MdOutlinePersonAddAlt1, MdPersonAddAlt1 } from "react-icons/md"


// Feed images
import Laza from '../assets/images/lazarra.jpeg';
import Rea from '../assets/images/reaubeau.jpeg';
import Afri from "../assets/images/Afri.jpeg";
import D1 from '../assets/images/D1.jpeg'
import { DialogModalComponent, SearchBarComponent } from "src/SeperateComponent/General";
import { Element } from "react-scroll";
import SearchCollaboratorsComponent from "./search-collaborators.component";
import AddCollaboratorModalComponent from "src/SeperateComponent/General/Modal/add-collaborator-modal.component";
import FormSelectorComponent from "src/SeperateComponent/General/Modal/form-selector.component";
import ModelBottomBtnComponent from "src/SeperateComponent/General/Modal/bottom-btn.component";
import FormSelectorCollaboratorComponent from "src/SeperateComponent/General/Modal/form-selector-collaborator.component";
import ModelBottomBtnCollaboratorComponent from "src/SeperateComponent/General/Modal/bottom.btn-collaborator.component";

const SearchBox = styled("div")(({ theme }) => ({
  backgroundColor: "white", // Completely white background
  border: "1px solid #ccc", // Optional: Add a subtle border
  borderRadius: theme.shape.borderRadius,
  width: "100%",
  display: "flex",
  alignItems: "center",
  padding: "5px 10px", // Inner padding
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Optional: Subtle shadow
}));

const SearchInput = styled(InputBase)(({ theme }) => ({
  flex: 1,
  marginLeft: theme.spacing(1),
  "& .MuiInputBase-input": {
    padding: "5px 0",
    color: "#333", // Dark text for input
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#333", // Icon color
  padding: theme.spacing(0, 1),
}));

const Feed = () => {
  const [loading, setLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElCollab, setAnchorElCollab] = useState(null);
  const [openModal, setOpenModal] = React.useState(false);

  const [form,setForm] = useState('contact-info')
  const open = Boolean(anchorEl)
  const customAnchorRef = useRef(null);

  const handleClick = (event) => {
    //setAnchorEl(event.currentTarget);
    setAnchorEl(customAnchorRef.current);
    };
    const handleClose = () => {
    setAnchorEl(null);
    };
    
    const handleCloseCollab = () => {
      setAnchorElCollab(null);
      };
    
    
    const handleClickOpenModal = () => {
    setOpenModal(true);
    };
    
    const handleCloseModal = () => {
    setOpenModal(false);
    };
    

  const data = [
    { img: Afri, name: "Africaine" },
    { img: D1, name: "D1WAV" },
    { img: Rea, name: "Reau Beau" },
    { img: Laza, name: "La Zarra" }
  ];

  const menuOptions = [
    { title: "Collaborators", link: "", extra: false },
    { title: "Followers", link: "", extra: false },
    { title: "Following", link: "", extra: false },
    { title: "Invitations", link: "", extra: false },
    
    ]

  const chat = [
    { img: "https://material-ui.com/static/images/avatar/7.jpg", username: "Andrea Belita", role: "Artist", num:"1" },
    { img: "https://material-ui.com/static/images/avatar/6.jpg", username: "Andrea Belita", role: "Artist", num:"2" },
    { img: "https://material-ui.com/static/images/avatar/5.jpg", username: "Andrea Belita", role: "Artist", num:"3" },
    { img: "https://material-ui.com/static/images/avatar/4.jpg", username: "Andrea Belita", role: "Artist", num:"4" },
    { img: "https://material-ui.com/static/images/avatar/3.jpg", username: "Andrea Belita", role: "Artist", num:"5" },
    { img: "https://material-ui.com/static/images/avatar/7.jpg", username: "Andrea Belita", role: "Artist", num:"6" },
    { img: "https://material-ui.com/static/images/avatar/6.jpg", username: "Andrea Belita", role: "Artist", num:"7" },
    { img: "https://material-ui.com/static/images/avatar/5.jpg", username: "Andrea Belita", role: "Artist", num:"8" },
    { img: "https://material-ui.com/static/images/avatar/4.jpg", username: "Andrea Belita", role: "Artist", num:"9" },
    { img: "https://material-ui.com/static/images/avatar/3.jpg", username: "Andrea Belita", role: "Artist", num:"10" }
  ]

  setTimeout(() => {
    setLoading(false);
  }, [3000]);

  return (
    <Box flex={3} p={{ xs: 0, md: 2 }} sx={{position:"relative"}} >

      <div   ref={customAnchorRef} style={{position:"absolute",color:"transparent",useSelect:"none",opacity:"0",left:"-7rem"}}>
        anchor
      </div>

<Element name="scrollContainer" style={{ overflowY: 'auto', maxHeight: '150vh', scrollbarWidth: 'none', 
    msOverflowStyle: 'auto' }}>

   <Box sx={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
      <Typography fontWeight={100} mt={2} mb={2} sx={{ 
          borderBottom: "2px solid #A01565", 
          display: "inline-block", 
          paddingBottom: "2px",
          fontFamily: "inter",
          fontSize: 16,
          fontWeight: "600"
         
        }}
       
        >
          Grow Your Network

       </Typography>

       <Typography 
        onClick={ handleClick }
       fontWeight={100} mt={2} mb={2} sx={{ 
         // borderBottom: "2px solid #A01565", 
          display: "inline-block", 
          paddingTop: "2px",
          fontFamily: "inter",
          fontSize: 12,
          fontWeight: "400",
          cursor:"pointer"
        }}>
          View All

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
        Musician/Band
      </Typography>
    
      <Box sx={{ marginTop: "1rem" }}>
        <Typography sx={{ fontSize: '12px', color: '#fff' }}>
          Founder @audiovybez
        </Typography>
        <Typography sx={{ fontSize: '12px', color: '#fff' }}>
          Co-Founder @beagirlconnected
        </Typography>
      </Box>
    
      <Button
        variant="contained"
        startIcon={<MdOutlinePersonAddAlt1 />}
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
        Connect
      </Button>
    </Box>
    </Card>



          ) ) }

        </ScrollMenu>

      <Box sx={{ marginTop: "0px" ,background:"#302c34",borderRadius:"16px",padding:"24px",paddingTop:"14px"}}>
        <Typography variant="h6" fontWeight={100} mt={0} mb={2} sx={{ 
          borderBottom: "2px solid #A01565", 
          display: "inline-block", 
          paddingBottom: "2px",
          fontFamily: "inter",
          fontSize: 18,
          fontWeight: "500"
        }}>
          Collaborators
        </Typography>

        {/*<SearchBox>
          <SearchInput placeholder="search or filter collaborators..." />
          <SearchIconWrapper>
            <Search />
          </SearchIconWrapper>
      </SearchBox>*/}

        {/*<SearchCollaboratorsComponent/>*/}
       


        <Dialog
            open={openModal}
            onClose={handleCloseModal}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            PaperProps={{
                sx: {
                  width: '900px', // Increase as needed
                  maxWidth: '900px', // Optionally restrict maximum width
                  height:'600px'
                },
              }}
           
        >
            <span >
            <Box sx={{ display: "flex",flexDirection:"column", background: "#252328", paddingX: "6px", paddingY: "8px" }}>
            <AddCollaboratorModalComponent  form={ form } setForm={ setForm } handleClose={ handleCloseModal }/>
                
                <Box py={2} px={3} sx={{ width: "420px", minHeight: "399px"}}> {/*362*/}
                    <FormSelectorCollaboratorComponent form={ form } />
                </Box>
            </Box>

            <ModelBottomBtnCollaboratorComponent handleClose ={ handleCloseModal} />
            </span>
        </Dialog>
       
       

        <Box my={2} sx={{ display: "flex" }}>
       
          
        
               <Popover
                 id="basic-menu"
                 anchorEl={anchorEl}
                 open={open}
                 onClose={handleClose}
                 MenuListProps={{
                 'aria-labelledby': 'basic-button',
                 }}
                 sx={{ borderRadius: "6px", background:"transparent" }}
                 >
                 <Box py={5} px={7} sx={{ borderRadius: "6px", background:"#302c34" }} >
                   <Typography fontWeight={100} mt={0} mb={0} sx={{ 
                      borderBottom: "2px solid #A01565", 
                      display: "inline-block", 
                      paddingBottom: "2px",
                      fontFamily: "inter",
                      fontSize: 16,
                      fontWeight: "600"
                    }}
                   
                    >
                      Grow Your Network
            
                   </Typography>

                 <ScrollMenu  wrapperClassName={"scrollMenu-network-modal"} itemClassName="scrollMenu-network-modal-item"  scrollContainerClassName={"scrollContainer"}>
                       
                              
                           { data.map( (item, index) => (
                    
                    
                        <Card
                        itemId={item.name} 
                        sx={{
                          //backgroundColor: 'rgba(0, 0, 0, 0.4)',
                          background:"#302c34",
                          borderRadius: '10px',
                          border: '0.5px solid #404040',
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
                            Musician/Band
                          </Typography>
                        
                          <Box sx={{ marginTop: "1rem" }}>
                            <Typography sx={{ fontSize: '12px', color: '#fff' }}>
                              Founder @audiovybez
                            </Typography>
                            <Typography sx={{ fontSize: '12px', color: '#fff' }}>
                              Co-Founder @beagirlconnected
                            </Typography>
                          </Box>
                        
                          <Button
                            variant="contained"
                            startIcon={<MdOutlinePersonAddAlt1 />}
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
                            Connect
                          </Button>
                        </Box>
                        </Card>
                    
                    
                    
                              ) ) }
                    
                            </ScrollMenu>
                                     </Box>
              </Popover>
         
         
          

          <Box onClick={handleClickOpenModal} py={1} px={1} mr={1} sx={{ background: "#49454F", cursor: "pointer", display: "flex",justifyContent:"center",alignItems:"center", borderRadius: "5rem" }}>
            <GroupAdd/>
            <Typography  ml={1} sx={{ fontSize: 12, fontFamily: "inter",cursor:"pointer" }}>Create New</Typography>
          </Box>

          <Box py={1} px={1} mr={1} sx={{ background: "#49454F", cursor: "pointer", display: "flex",justifyContent:"center",alignItems:"center", borderRadius: "5rem" }}>
            <Inbox />
            <Typography ml={1} sx={{ fontSize: 12, fontFamily: "inter" }}>Invite</Typography>
          </Box>
        </Box>

        <Box>

          { chat.map( (item, i) => (
            <Box px={2} py={1} my={1} 
              sx={{ display: "flex", justifyContent: "space-between", background: "inherit"/*"#252328"*/, alignItems: "center",borderBottom:"1px solid #606060" }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                {/*<Typography mr={2} sx={{ fontSize: 14, fontFamily: "inter" }}>{ item.num }.</Typography>*/}
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Avatar
                    alt="Trevor Henderson"
                    src={ item.img }
                    sx={{ width: 44, height: 44 }}
                  />
                  <Box ml={1}>
                    <Typography sx={{ fontSize: 12, fontFamily: "inter" }}>{ item.username }</Typography>
                    <Typography sx={{ color: 'white'/*"#8D8A8A"*/, fontSize: 12, fontFamily: "inter" }}>{ item.role }</Typography>
                  </Box>
                </Box>
              </Box>

              <Box sx={{ display: "flex" }}>
                <Typography sx={{ color: "#8D8A8A", fontFamily: "inter", fontSize: 12 }}>Message</Typography>
                <MoreVert />
              </Box>
            </Box>
          ) ) }

        </Box>

      </Box>

      {/* {loading ? (
        <Stack spacing={1}>
          <Skeleton variant="text" height={100} />
          <Skeleton variant="text" height={20} />
          <Skeleton variant="text" height={20} />
          <Skeleton variant="rectangular" height={300} />
        </Stack>
      ) : (
        <>
          <Post />
          <Post1 />
          <Post2 />
          <Post3 />
          <Post4 />
          <Post5 />
          <Post6 />
          <Post7 />
          <Post8 />
        </>
      )} */}
      </Element>
    </Box>
  );
};

export default Feed;
