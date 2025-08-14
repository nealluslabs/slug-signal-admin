import { Container,Grid, TextField, Typography, TextareaAutosize, Button, Paper,Divider,Box,Avatar} from '@mui/material';
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import MessageComponent from "./message.component";
import Message2Component from "./message2.component";
import MessageParagraphComponent from "./message-paragraph.component";
import { MessageLeft,MessageRight } from "./message-block.component";
import { Element,scroller } from "react-scroll";
import { useSelector } from "react-redux";
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

import randomWoman from 'src/assets/images/randomwoman.jpeg'
import randomWoman2 from 'src/assets/images/randomwoman2.jpg'
import { useEffect, useState } from 'react';
import { saveSelectedUserToChat } from 'src/redux/reducers/group.slice';
import { useDispatch } from 'react-redux';


const useStyles = makeStyles((theme) =>
    createStyles({
      paper: {
        width: "100vw",
        height: "100vh",
        maxWidth: "500px",
        maxHeight: "700px",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        position: "relative",
        left:"-2rem",
       
        border: '1px solid lightgray',
      },
      paper2: {
        width: "80vw",
        maxWidth: "500px",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        position: "relative",
        
      },
      container: {
        maxWidth:"xs",
        //width: "100vw",
        border:"1px solid lightgray",
        height: "100vh",
        display: "flex",
        flexDirection:"column",
        position:"relative",
        alignItems: "center",
        justifyContent: "center"
      },
      messagesBody: {
        width: "calc( 100% - 20px )",
        margin: 10,
        overflowY: "scroll",
        height: "calc( 100% - 80px )",
        //border: '1px solid lightgray',
      }
    })
  );

const AllMessagesContentComponent = () => {
    const classes = useStyles();
    const {user} = useSelector((state)=>state.auth)
    const {selectedUserToChat,contactsToChat} = useSelector((state)=>state.group)
    const dispatch = useDispatch()


   // const [realChat,setRealChat] = useState(
   //   contactsToChat && contactsToChat.length > 0 &&
   //   [
   //     ...contactsToChat.filter((item)=>(item.id !== user.id)).map((contact)=>{ //filtering out the logged in user cuz he cant talk to himself!
   //   
   //        const messagesBelongingToThisContact = user.messages && user.messages.filter((message)=>(message.user2 === contact.id))
   //        console.log("MESSAGES BELONGING TO THIS CONTACT-->",messagesBelongingToThisContact)
   //       return (
   //         {
   //           ...contact,
   //           messages:[
   //             ...messagesBelongingToThisContact
   //           ]
   //         }
   //       )
   //   
   //     })
   //   ]
   //     )
      
    //  useEffect(()=>{
    //    setRealChat(
    //      contactsToChat && contactsToChat.length > 0 &&
    //      [
    //        ...contactsToChat.filter((item)=>(item.id !== user.id)).map((contact)=>{ //filtering out the logged in user cuz he cant talk to himself!
    //      
    //           const messagesBelongingToThisContact = user.messages && user.messages.filter((message)=>(message.user2 === contact.id))
    //           console.log("MESSAGES BELONGING TO THIS CONTACT-->",messagesBelongingToThisContact)
    //          return (
    //            {
    //              ...contact,
    //              messages:[
    //                ...messagesBelongingToThisContact
    //              ]
    //            }
    //          )
    //      
    //        })
    //      ]
    //    )
    //  },[contactsToChat])
      
      
      useEffect(()=>{
        
        //console.log("SELECTED USER TO CHAT-->",selectedUserToChat)
       // console.log("SELECTED USER TO CHAT OOo!-->",realChat.filter((item)=>(item.id === selectedUserToChat.id))[0])




        let realChat =  contactsToChat && contactsToChat.length > 0 &&
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


        console.log("REAL CHAT IS O AYEE", realChat)

       
    dispatch(saveSelectedUserToChat(
      
       
        realChat && realChat.filter((item)=>(item.id === (selectedUserToChat && selectedUserToChat.id)))[0] && realChat.filter((item)=>(item.id === (selectedUserToChat && selectedUserToChat.id)))[0]
      )
    )

    scroller.scrollTo("scrollContainerBottom", {
      containerId: "scrollContainer",
      duration: 500,
      smooth: "easeInOutQuart",
    });
        
      
      },[contactsToChat,user])


    


    
  const [currentUserToChat,setCurrentUserToChat] = useState(selectedUserToChat)

    useEffect(()=>{
    scroller.scrollTo("scrollContainerBottom", {
      containerId: "scrollContainer",
      duration: 500,
      smooth: "easeInOutQuart",
    });

    },[selectedUserToChat])

  


    return (
        <Box 
            sx={{ 
                borderBottom:"1px solid #606060",
                paddingBottom:"180px",

                scrollbarWidth: "none", // Firefox
                 msOverflowStyle: "none", // IE/Edge
                
                overflow: "scroll",
                 paddingTop: 0.5,
                 paddingBottom:"10px",
                "&::-webkit-scrollbar": {
                    display: "none",
                  },
            }}
        >
             <Element name="scrollContainer"    id="scrollContainer" style={{ overflowY: 'auto', maxHeight:"250px", 
            msOverflowStyle: 'auto'}}>
              {/* THE OLD STATIC STYLE  DONT DELETE THIS JUST YET - DAGOGO - 14TH MAY 2025
              <MessageParagraphComponent/>
              <MessageParagraphComponent/>
              */}


        


{
   selectedUserToChat &&
  selectedUserToChat.messages && selectedUserToChat.messages.length > 0 ? 
    selectedUserToChat.messages.map((item, i) => {
      const selectedDate = new Date(item.time);
      const selectedDateString = selectedDate.toDateString(); // e.g., "Sat May 04 2024"
  
      const prevDateString = i > 0 
        ? new Date(selectedUserToChat.messages[i - 1].time).toDateString()
        : null;
  
      const shouldShowDateHeader = i === 0 || selectedDateString !== prevDateString;
  
      return (
        <div key={i}>
          {shouldShowDateHeader && (
           
  
  <Box sx={{ display: "flex",justifyContent:"flex-start" ,paddingTop:"15px",gap:"5px",width:"max-content",marginBottom:"25px",marginLeft:"15px"}}>
          <Typography
              variant="subtitle2"
              style={{fontSize: 14, fontFamily: "inter",fontWeight:"600" /*textAlign: "center", margin: "1rem 0", color: "#555"*/ }}
            >
              {selectedDate.toLocaleDateString("en-US", {
                weekday: "long",
                day: "2-digit",
                month: "2-digit",
                year: "numeric"
              }).toLocaleUpperCase()
              }
            </Typography>
  
         
  
  
  <div style={{width:"40px",background:"#606060",color:"#606060",height:"0.1px",position:"relative",top:"10px",left:"10px"}}/>
  
  </Box>
          )}
  
          {item.sentBy && item.sentBy === "user2" ? (
            <MessageLeft
              message={item.messageText}
              timestamp={formatDistanceToNow(new Date(item.time), { addSuffix: true })}
              photoURL={selectedUserToChat &&  selectedUserToChat.img ? selectedUserToChat.img : randomWoman2}
              displayName={selectedUserToChat && selectedUserToChat.username?selectedUserToChat.username:(selectedUserToChat &&  selectedUserToChat.firstName) &&  (selectedUserToChat && selectedUserToChat.lastName)?selectedUserToChat.firstName + " " + selectedUserToChat.lastName:"Sender"}
              avatarDisp={false}
            />
          ) : (
            <MessageRight
              message={item.messageText}
              timestamp={formatDistanceToNow(new Date(item.time), { addSuffix: true })}
              photoURL={randomWoman}
              displayName={"You"/*user.firstName && user.lastName?user.firstName + " " + user.lastName:"Andrea Belita"*/ }
              avatarDisp={true}
            />
          )}
        </div>
      )
    })
    :

   /*(
     
    !selectedUserToChat && 
    user.messages && user.messages.length > 0 ? 
      user.messages.map((item, i) => {
        const selectedDate = new Date(item.time);
        const selectedDateString = selectedDate.toDateString(); // e.g., "Sat May 04 2024"
    
        const prevDateString = i > 0 
          ? new Date(user.messages[i - 1].time).toDateString()
          : null;
    
        const shouldShowDateHeader = i === 0 || selectedDateString !== prevDateString;
    
        return (
          <div key={i}>
            {shouldShowDateHeader && (
             
    
    <Box sx={{ display: "flex",justifyContent:"flex-start" ,paddingTop:"15px",gap:"5px",width:"200px",marginBottom:"25px",marginLeft:"15px"}}>
            <Typography
                variant="subtitle2"
                style={{fontSize: 14, fontFamily: "inter",fontWeight:"600"  }}
              >
                {selectedDate.toLocaleDateString("en-US", {
                  weekday: "long",
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric"
                }).toLocaleUpperCase()
                }
              </Typography>
    
           
    
    
    <div style={{width:"40px",background:"#606060",color:"#606060",height:"0.1px",position:"relative",top:"10px",left:"10px"}}/>
    
    </Box>
            )}
    
            {item.sentBy === "user1" ? (
              <MessageLeft
                message={item.messageText}
                timestamp={ formatDistanceToNow(new Date(item.time), { addSuffix: true })}
                photoURL={user.profileImage ? user.profileImage : randomWoman2}
                displayName={item.username?item.username:"Andrea Belita"}
                avatarDisp={false}
              />
            ) : (
              <MessageRight
                message={item.messageText}
            timestamp={formatDistanceToNow(new Date(item.time), { addSuffix: true }) }
                photoURL={randomWoman}
                displayName={"You"}
                avatarDisp={true}
              />
            )}
          </div>
        );
      })
      :*/
      <Typography style={{ color: "white",textAlign: "center", margin: "1rem 1rem",fontSize:"13px",marginTop:"3rem",marginBottom:"1.5rem" }}>
        Click on a contact to begin a conversation...
      </Typography>
    

}

  
  
       

       <Element name="scrollContainerBottom"   className="custom-scroll"/>
      
          </Element>
           { /*<MessageComponent />
            <Message2Component />
            <MessageComponent />
            <Message2Component />*/}
        </Box>
    )
}

export default AllMessagesContentComponent;
