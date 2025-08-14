import React, { useState,useEffect } from "react";

import { styled,InputBase,Box, Typography } from "@mui/material";
import { FilterList } from "@mui/icons-material";
import { Avatar} from "@mui/material";
  import { Search, ArrowDropDown, GroupAdd, Inbox, MoreVert } from "@mui/icons-material"
  import {makeStyles} from "@mui/styles";
import { SearchBarComponent } from "../General";
import SearchMessagesComponent from "./search-messages.component";
import { saveSelectedUserToChat } from "src/redux/reducers/group.slice";
import { useDispatch } from "react-redux";

import {fetchContactsToChat} from 'src/redux/actions/group.action'
import { useSelector } from "react-redux";



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

const MessageListComponent = () => {

   const dispatch = useDispatch()

   const {contactsToChat} = useSelector((state)=>state.group)

   const {user} = useSelector((state)=>state.auth)


   console.log("contacts to chat is now-->",contactsToChat)

  useEffect(()=>{

    dispatch(fetchContactsToChat())

  

  },[])


  

    const [navValue, setNavValue] = useState("all");
  

    const [loading, setLoading] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [openModal, setOpenModal] = React.useState(false);
    const open = Boolean(anchorEl)
  
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
      };
      const handleClose = () => {
      setAnchorEl(null);
      };
      
      
      
      const handleClickOpenModal = () => {
      setOpenModal(true);
      };
      
      const handleCloseModal = () => {
      setOpenModal(false);
      };
   
  
    const menuOptions = [
      { title: "Collaborators", link: "", extra: false },
      { title: "Followers", link: "", extra: false },
      { title: "Following", link: "", extra: false },
      { title: "Invitations", link: "", extra: false },
      
      ]
  

const realChat = 
contactsToChat && contactsToChat.length > 0 &&
[
  ...contactsToChat.filter((item)=>(item.id !== user.id)).map((contact)=>{ //filtering out the logged in user cuz he cant talk to himself!

     const messagesBelongingToThisContact = user.messages && user.messages.filter((message)=>(message.user2 === contact.id))
     console.log("MESSAGES BELONGING TO THIS CONTACT-->",messagesBelongingToThisContact)
    return (
      {
        ...contact,
        messages:[
          ...messagesBelongingToThisContact
        ]
      }
    )

  })
]

console.log("USER MESSAGES-->",user.messages)
console.log("CONTACTS TO CHAT-->",contactsToChat.length > 0 && contactsToChat)

    const placeholderChat = [
      { profileImg: "https://material-ui.com/static/images/avatar/7.jpg", username: "Andrea Belita", role: "Hi how are you?", num:"1" ,
        messages:[
          {
            user1:"oejrjfofoooofjfwf",  //userId
            user2:"oijomcomsodmo",
            messageText:"Hi how are you?",
            time:"2025-10-21T12:06:06.904Z",
            sentBy:"user1"
            },
            {
              user1:"oejrjfofoooofjfwf",  //userId
              user2:"oijomcomsodmo",
              messageText:"I am alright you?",
              time:"2025-10-21T12:06:06.904Z",
              sentBy:"user2"
              }
              
            
        ]
      },
      { profileImg: "https://material-ui.com/static/images/avatar/6.jpg", username: "Famous Kid Brick", role: "I met with Tom Rowe today...", num:"2",
      messages:[
        {
          user1:"oejrjfofoooofjfwf",  //userId
          user2:"oijomcomsodmo",
          messageText:"I met with Tom Rowe today...",
          time:"2025-06-21T12:06:06.904Z",
          sentBy:"user1"
          },
          {
            user1:"oejrjfofoooofjfwf",  //userId
            user2:"oijomcomsodmo",
            messageText:"Oh yeah? what did he say?",
            time:"2025-06-21T12:06:06.904Z",
            sentBy:"user2"
            }
            
          
      ]
       },
      { profileImg: "https://material-ui.com/static/images/avatar/5.jpg", username: "Lee Vasi", role: "How's the song coming along", num:"3",
      messages:[
        {
          user1:"oejrjfofoooofjfwf",  //userId
          user2:"oijomcomsodmo",
          messageText:"How's the song coming along",
          time:"2025-09-21T12:06:06.904Z",
          sentBy:"user1"
          },
          {
            user1:"oejrjfofoooofjfwf",  //userId
            user2:"oijomcomsodmo",
            messageText:"Not gonna lie,I am struggling..",
            time:"2025-09-21T12:06:06.904Z",
            sentBy:"user2"
            }
            
          
      ]
       },
     
    ]
  
    setTimeout(() => {
      setLoading(false);
    }, [3000]);
  

    return (
        <Box  sx={{ marginTop: "0px" ,background:"#302c34",borderRadius:"8px",padding:"24px",height:"590px"}}>

        <Typography variant="h6"  mt={0} mb={2} sx={{ 
          borderBottom: "2px solid #A01565", 
          display: "inline-block", 
          paddingBottom: "2px",
          fontFamily: "inter",
          fontSize: 16,
          fontWeight: "600"
        }}>
          Messages
        </Typography>

       {/* <SearchBox>
          <SearchInput placeholder="Search messages..." />
          <SearchIconWrapper>
            <Search />
    </SearchIconWrapper>
      </SearchBox>*/}

          <div style={{position:"relative",top:"-0.5rem"}}> 
          <SearchMessagesComponent />
          </div>

        <Box sx={{display:"flex", marginTop:"10px",position:"relative",left:"20px",gap:"5px"}}>
    
      <Box py={0.5} px={1} mr={1} sx={{ background: "#49454F", cursor: "pointer", display: "flex",justifyContent:"center",alignItems:"center", borderRadius: "5rem" }}>
      
       <Typography pl={0.5} pr={0.5} sx={{ fontSize: 10, fontFamily: "inter",textAlign:"center",display:"flex",alignItems:"center",justifyContent:"center" }}>Unread</Typography>
       </Box>
     
     <Box py={0.5} px={1} mr={1} sx={{ background: "#49454F", cursor: "pointer", display: "flex",justifyContent:"center",alignItems:"center", borderRadius: "5rem" }}>
     
     <Typography pl={0.5} pr={0.5} sx={{ fontSize: 10, fontFamily: "inter" ,textAlign:"center",display:"flex",alignItems:"center",justifyContent:"center"}}>My Connections</Typography>
     </Box>


     <Box py={0.5} px={1} mr={1} sx={{ background: "#49454F", cursor: "pointer", display: "flex",justifyContent:"center",alignItems:"center", borderRadius: "5rem" }}>
     
     <Typography pl={0.5} pr={0.5} sx={{ fontSize: 10, fontFamily: "inter",textAlign:"center",display:"flex",alignItems:"center",justifyContent:"center" }}>Requests</Typography>
     </Box>

     </Box>
     
     <Box>
     
     {contactsToChat && contactsToChat.length > 0 ?




realChat.map( (item, i) => (
  <Box px={0.5} py={0.5} my={1} 
  onClick={()=>{dispatch(saveSelectedUserToChat(item))}}
  sx={{cursor:"pointer", display: "flex", justifyContent: "space-between", background: "inherit"/*"#252328"*/, alignItems: "center",borderBottom:"1px solid #606060",width:"100%" }}
  >
  <Box sx={{ display: "flex", alignItems: "center" }}>
  {/*<Typography mr={2} sx={{ fontSize: 14, fontFamily: "inter" }}>{ item.num }.</Typography>*/}
  <Box sx={{ display: "flex", alignItems: "center" }}>
  <Avatar
  alt="Trevor Henderson"
  src={ item.profileImg }
  sx={{ width: 44, height: 44 }}
  />
  <Box ml={1}>
  <Typography sx={{ fontSize: 11, fontFamily: "inter" }}>{ item.username? item.username: item.firstName && item.lastName && (item.firstName + ' ' +  item.lastName) }</Typography>
  <Typography sx={{ color:"white" /*"#8D8A8A"*/, fontSize: 11, fontFamily: "inter" }}>{item.messages && item.messages[item.messages.length-1] &&  item.messages[item.messages.length-1].messageText ?(item.messages[item.messages.length-1].messageText>20 ?`${item.messages[item.messages.length-1].messageText.substring(0,20)}...`:`${item.messages[item.messages.length-1].messageText}`):'' }</Typography>
  </Box>
  </Box>
  </Box>
  
  <Box sx={{ display: "flex" }}>
  <Typography sx={{ color: "#8D8A8A", fontFamily: "inter", fontSize: 11 }}>Message</Typography>
  <MoreVert />
  </Box>
  </Box>
) )
     
     
     
     
     
     : placeholderChat.map( (item, i) => (
     <Box px={0.5} py={0.5} my={1} 
     onClick={()=>{dispatch(saveSelectedUserToChat(item))}}
     sx={{cursor:"pointer", display: "flex", justifyContent: "space-between", background: "inherit"/*"#252328"*/, alignItems: "center",borderBottom:"1px solid #606060",width:"100%" }}
     >
     <Box sx={{ display: "flex", alignItems: "center" }}>
     {/*<Typography mr={2} sx={{ fontSize: 14, fontFamily: "inter" }}>{ item.num }.</Typography>*/}
     <Box sx={{ display: "flex", alignItems: "center" }}>
     <Avatar
     alt="Trevor Henderson"
     src={ item.profileImg }
     sx={{ width: 44, height: 44 }}
     />
     <Box ml={1}>
     <Typography sx={{ fontSize: 11, fontFamily: "inter" }}>{ item.username }</Typography>
     <Typography sx={{ color:"white" /*"#8D8A8A"*/, fontSize: 11, fontFamily: "inter" }}>{item.role &&  item.role.length>20 ?`${item.role.substring(0,20)}...`:item.role }</Typography>
     </Box>
     </Box>
     </Box>
     
     <Box sx={{ display: "flex" }}>
     <Typography sx={{ color: "#8D8A8A", fontFamily: "inter", fontSize: 11 }}>Message</Typography>
     <MoreVert />
     </Box>
     </Box>
) ) }

</Box>

</Box>
    )
}

export default MessageListComponent;
