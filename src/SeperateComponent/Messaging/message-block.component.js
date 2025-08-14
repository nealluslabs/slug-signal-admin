import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { deepOrange } from "@material-ui/core/colors";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) =>
  createStyles({
    messageRow: {
      display: "flex"
    },
    messageRowRight: {
      display: "flex",
      justifyContent: "flex-end",
     
    },

    messageRowCenter: {
      display: "flex",
      justifyContent: "center",
     
    },

    messageBlue: {
      position: "relative",
      marginLeft: "15px",
      marginTop: "5px",
      marginBottom: "10px",

      borderRadius: "10px",
      padding: "10px",
      backgroundColor: "#252328"/*"#A8DDFD"*/,
      width: "max-content",
      maxWidth:"18rem",
      //height: "50px",
      textAlign: "left",
      font: "400 12px 'inter', sans-serif",
     // border: "1px solid #0c53b7",/* #97C6E3*/
      //borderRadius: "10px",
     // "&:after": {
     //   content: "''",
     //   position: "absolute",
     //   width: "0",
     //   height: "0",
     //   borderTop: "15px solid  #0c53b7 ",/**#A8DDFD */
     //   borderLeft: "15px solid transparent",
     //   borderRight: "15px solid transparent",
     //   top: "0",
     //   left: "-15px"
     // },
      //"&:before": {
      //  content: "''",
      //  position: "absolute",
      //  width: "0",
      //  height: "0",
      //  borderTop: "17px solid  #0c53b7 ", /*#97C6E3*/
      //  borderLeft: "16px solid transparent",
      //  borderRight: "16px solid transparent",
      //  top: "-1px",
      //  left: "-14px"
      //}
    },
    messageOrange: {
      position: "relative",
      marginRight: "40px",
      marginBottom: "10px",
      marginTop: "35px",
      padding: "10px",
      backgroundColor: /*"#f8e896"*/"gray",
      width: "max-content",
      maxWidth:"18rem",
      //height: "50px",
      textAlign: "left",
      font: "400 12px 'inter', sans-serif",
     // font: "400 .9em 'Open Sans', sans-serif",
     // border: "1px solid gray",/** #dfd087 */
      borderRadius: "10px",
     // "&:after": {
     //   content: "''",
     //   position: "absolute",
     //   width: "0",
     //   height: "0",
     //   borderTop: "15px solid gray", /*#dfd087*/  /*#f8e896 */
     //   borderLeft: "15px solid transparent",
     //   borderRight: "15px solid transparent",
     //   top: "0",
     //   right: "-15px"
     // },
     // "&:before": {
     //   content: "''",
     //   position: "absolute",
     //   width: "0",
     //   height: "0",
     //   borderTop: "17px solid  gray ",/*#dfd087 */
     //   borderLeft: "16px solid transparent",
     //   borderRight: "16px solid transparent",
     //   top: "-2px",
     //   right: "-17px"
     // }
    },


    messageCenterOrange:{
      position: "relative",
      marginRight: "40px",
      marginBottom: "10px",
      marginTop: "35px",
      padding: "30px",
      backgroundColor: /*"#f8e896"*/"gray",
      width: "80%",
      //height: "50px",
      textAlign: "left",
      font: "400 12px 'inter', sans-serif",
      //font: "400 .9em 'Open Sans', sans-serif",
      border: "1px solid gray",/** #dfd087 */
      borderRadius: "10px",
     
    },

    messageContent: {
      paddingBottom:"15px",
      color:"white",
      margin: 0
    },
    messageTimeStampRight: {
      position: "absolute",
      fontSize: ".85em",
      fontWeight: "300",
      color:"white",
      marginTop: "10px",
      bottom: "-1px",
      right: "5px"
    },

    orange: {
      color:/* theme.palette.getContrastText(deepOrange[500])*/"gray",
      backgroundColor: /*deepOrange[500]*/"gray",
      width: theme.spacing(4),
      height: theme.spacing(4)
    },
    avatarNothing: {
      color: "transparent",
      backgroundColor: "transparent",
      width: theme.spacing(4),
      height: theme.spacing(4)
    },
    displayName: {
      marginLeft: "20px",
      font: "400 12px 'inter', sans-serif",
    }
  })
);

//avatar
/*export const MessageLeft = (props) => {
  const message = props.message ? props.message : "no message";
  const timestamp = props.timestamp ? props.timestamp : "";
  const photoURL = props.photoURL ? props.photoURL : "dummy.js";
  const displayName = props.displayName ? props.displayName : "User 1";
  const classes = useStyles();
  //const { themeColor } = useSelector((state) => state.settings);
  const {school } = useSelector((state) => state.auth);

  return (
    <>
      <div className={classes.messageRow}>
        {<Avatar
          alt={displayName}
          className={classes.orange}
          src={photoURL}
  ></Avatar>}
        <div>
         {<div className={classes.displayName}>{displayName}</div>}
          <div className={classes.messageBlue} style={{backgroundColor:"#4A454F"}}>
            <div>
              <p className={classes.messageContent}>{message}</p>
            </div>
            {<div className={classes.messageTimeStampRight}>{timestamp}</div>}
          </div>
        </div>
      </div>
    </>
  );
};*/
//avatar


export const MessageLeft = (props) => {
  const message = props.message || "no message";
  const displayName = props.displayName || "User 1";

  return (
    <div style={{ display: "flex" }}>
      <div>
        <div style={{
          marginLeft: "20px",
          font: "400 12px 'inter', sans-serif"
        }}>
          {displayName}
        </div>
        <div style={{
          position: "relative",
          marginLeft: "15px",
          marginTop: "5px",
          marginBottom: "10px",
          borderRadius: "10px",
          padding: "10px",
          backgroundColor: "#4A454F",
          width: "max-content",
          maxWidth: "18rem",
          textAlign: "left",
          font: "400 12px 'inter', sans-serif"
        }}>
          <div>
            <p style={{
              paddingBottom: "15px",
              color: "white",
              margin: 0
            }}>
              {message}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

/*export const MessageRight = (props) => {
  const classes = useStyles();
  const message = props.message ? props.message : "no message";
  const timestamp = props.timestamp ? props.timestamp : "";
  const photoURL = props.photoURL ? props.photoURL : "dummy.js";
  const displayName = props.displayName ? props.displayName : "You";
  return (

    <div className={classes.messageRowRight} style={{position:"relative"}}>
     
       <div style={{display:"flex",gap:"10px",position:"relative",left:"67%"}}>
      
        {<Avatar
            alt={displayName}
            className={classes.orange}
            src={photoURL}
  ></Avatar>}
      </div>

       <div className={classes.messageOrange} style={{backgroundColor:"#4A454F"}}>
        <p className={classes.messageContent}>{message}</p>
        {<div className={classes.messageTimeStampRight}>{timestamp}</div>}
      </div>


      <div style={{width:"2rem",position:"absolute",top:"10%",right:"10%",height:"1.2rem" }} className={classes.displayName}>
            {displayName}
            </div>

    
  
   </div>
  );
};*/

export const MessageRight = (props) => {
  const message = props.message || "no message";
  const displayName = props.displayName || "You";

  return (
    <div style={{
      display: "flex",
      justifyContent: "flex-end",
      position: "relative"
    }}>
      <div style={{
        display: "flex",
        gap: "10px",
        position: "relative",
        left: "67%"
      }}>
        {/* Avatar here if needed */}
      </div>

      <div style={{
        position: "relative",
        marginRight: "40px",
        marginBottom: "10px",
        marginTop: "35px",
        padding: "10px",
        backgroundColor: "#4A454F",
        width: "max-content",
        maxWidth: "18rem",
        textAlign: "left",
        font: "400 12px 'inter', sans-serif",
        borderRadius: "10px"
      }}>
        <p style={{
          paddingBottom: "15px",
          color: "white",
          margin: 0
        }}>
          {message}
        </p>
      </div>

      <div style={{
        width: "2rem",
        position: "absolute",
        top: "10%",
        right: "10%",
        height: "1.2rem",
        marginLeft: "20px",
        font: "400 12px 'inter', sans-serif"
      }}>
        {displayName}
      </div>
    </div>
  );
};



export const MessageCenter = (props) => {
  const classes = useStyles();
  const message = props.message ? props.message : "no message";
  const timestamp = props.timestamp ? props.timestamp : "";
  const photoURL = props.photoURL ? props.photoURL : "dummy.js";
  const displayName = props.displayName ? props.displayName : "名無しさん";
  return (

    <div className={classes.messageRowCenter}>
     
       <div style={{display:"flex",gap:"10px",position:"relative",left:"67%"}}>
      
      {/* <div style={{width:"max-content",position:"relative",top:"10%" }} className={classes.displayName}>
            {displayName}
            </div>
         */} 

       {/*
        <Avatar
            alt={displayName}
            className={classes.orange}
            src={photoURL}
          >

          </Avatar>
      */}
      </div>

       <div className={classes.messageCenterOrange} style={{backgroundColor:"gray"}}>
        <p className={classes.messageContent}>{message}</p>
        <div className={classes.messageTimeStampRight}>{timestamp}</div>
      </div>

    
  
   </div>
  );
};