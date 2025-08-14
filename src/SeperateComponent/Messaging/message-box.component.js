import { Box, Typography, TextField } from "@mui/material";

import { SentimentVerySatisfied, Mic, AttachFile, Send,GifBox,Gif,CameraAlt } from "@mui/icons-material";
import { PiGifFill } from "react-icons/pi";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addNewMessage } from "src/redux/actions/group.action";
import { useEffect, useState } from "react";
import { saveSelectedUserToChat } from "src/redux/reducers/group.slice";

const MessageBoxComponent = () => {

  const dispatch = useDispatch()

  const {user} = useSelector((state)=>state.auth)
  const {selectedUserToChat,contactsToChat} = useSelector((state)=>state.group)

  const [messageText,setMessageText] = useState('')
  const sentFromUser =user &&  user.id
  const sentToUser = selectedUserToChat && selectedUserToChat.id
  const time = new Date().toISOString()


  const [realChat,setRealChat] = useState(
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
  )

//useEffect(()=>{
//  setRealChat(
//    contactsToChat && contactsToChat.length > 0 &&
//    [
//      ...contactsToChat.filter((item)=>(item.id !== user.id)).map((contact)=>{ //filtering out the logged in user cuz he cant talk to himself!
//    
//         const messagesBelongingToThisContact = user.messages && user.messages.filter((message)=>(message.user2 === contact.id))
//         console.log("MESSAGES BELONGING TO THIS CONTACT-->",messagesBelongingToThisContact)
//        return (
//          {
//            ...contact,
//            messages:[
//              ...messagesBelongingToThisContact
//            ]
//          }
//        )
//    
//      })
//    ]
//  )
//},[contactsToChat])


//useEffect(()=>{
//  
//  //console.log("SELECTED USER TO CHAT-->",selectedUserToChat)
//  console.log("SELECTED USER TO CHAT OOo!-->",realChat.filter((item)=>(item.id ===  selectedUserToChat && selectedUserToChat.id))[0])
//  if(messageText === ''){
//saveSelectedUserToChat(
//
// 
//  realChat && realChat.filter((item)=>(item.id === selectedUserToChat && selectedUserToChat.id))[0] && realChat.filter((item)=>(item.id ===selectedUserToChat && selectedUserToChat.id))[0]
//)
//  }
//
//},[messageText])


    return (
        <Box
        px={1}
        py={1.7}
        sx={{
          background: "#302c34",
          borderRadius: "12px",
          margin: "4px",
        }}
      >
        {/* Text Area */}
        <TextField
          placeholder="Write a message..."
          size="small"
          fullWidth
          multiline
          minRows={6}
          value={messageText}
          onChange={(e)=>{setMessageText(e.target.value)}}
          InputProps={{
            style:{fontSize:"14px"}
          }}
          sx={{
            outline: "none",
            border: "none",
            background: "#252328",
            borderRadius:"1rem",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                border: "none",
              },
              "&:hover fieldset": {
                border: "none",
              },
              "&.Mui-focused fieldset": {
                border: "none",
              },
              "& .MuiInputBase-input::placeholder": {
                fontStyle: "italic", // ⬅️ italicize the placeholder
                fontSize:"0.6rem"
              },
            },
          }}
        />
      
        {/* Icon Row */}
        <Box
          mt={1}
          sx={{
            display: "flex",
            alignItems: "center",
            gap:"10px",
            justifyContent: "flex-start", // left-align the icons
          }}
        >
          <SentimentVerySatisfied
            sx={{ width: 17, height: 17, padding: "0px 1px", cursor: "pointer",color:"grey" }}
          />
          <CameraAlt
            sx={{ width: 17, height: 17, padding: "0px 1px", cursor: "pointer",color:"grey" }}
          />
          <Gif
            sx={{ width: 32, height: 32, padding: "0px 1px", cursor: "pointer",color:"grey",padding:"0px" }}
          />
      
      {/*<PiGifFill sx={{ fontSize:"17px", padding: "0px 1px", cursor: "pointer",backgroundColor:"grey",color:"grey" }}  />*/}
         
      
          <Box
            p={0.5}
            sx={{
              //background: "#684D4D",
              borderRadius: "50%",
              height: 27,
              width: 27,
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
              cursor: "pointer",
              color:"grey"
            }}
          >
            <Send
            onClick={()=>{dispatch(addNewMessage(
          messageText,sentFromUser,sentToUser,time,user
          ))

            setMessageText('')
            }
          }
              sx={{
                width: 17,
                height: 17,
              }}
            />
          </Box>
        </Box>
      </Box>
    )
}

export default MessageBoxComponent;
