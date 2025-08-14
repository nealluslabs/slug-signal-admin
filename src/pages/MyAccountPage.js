import React, { useState } from "react";
import { Box, Avatar, IconButton, styled,ThemeProvider,createTheme,Typography, TextField,Button } from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import Navbar from "src/componentsMyNetwork/Navbar";
import AddIcon from "@mui/icons-material/Add";
import { useSelector } from "react-redux";
;


// Styled component for clickable area
const UploadButton = styled(IconButton)({
  position: "absolute",
  background: "rgba(0, 0, 0, 0.5)",
  color: "white",
  "&:hover": {
    background: "rgba(0, 0, 0, 0.7)",
  },
});

const MyAccountPage = () => {
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [mode, setMode] = useState("dark");
  const [activeSection, setActiveSection] = useState(" ");

  const {user} = useSelector((state) => state.auth)
  console.log("user in nealluslabs@gmail.com--->",user)

  // State for form fields of different sections
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [location, setLocation] = useState("");
  const [dob, setDob] = useState("");

  const [accountType, setAccountType] = useState("");
  const [agreementStatus, setAgreementStatus] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  const darkTheme = createTheme({
    palette: {
      mode: mode,
      background: {
        default: '#000000',   // Page background
        
      },
    },
  });

  

  // Handle file uploads
  const handleUpload = (event, setPhoto) => {
    const file = event.target.files[0];
    if (file) {
      setPhoto(URL.createObjectURL(file));
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Box style={{scale:"0.95"}} >
    <Navbar active="my-account" />
   
    <Box sx={{ width: "100%", maxWidth: 1050, margin: "auto", textAlign: "center",marginTop:"3rem",position:"relative",marginBottom:"6rem",fontFamily:"inter" }}>
      {/* Cover Photo Section */}
      <Box
        sx={{
          width: "100%",
          height: 200,
          backgroundColor: "#ccc",
          backgroundImage: coverPhoto ? `url(${coverPhoto})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          borderRadius: "8px",
        }}
      >
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleUpload(e, setCoverPhoto)}
          style={{ display: "none" }}
          id="cover-upload"
        />
        <label htmlFor="cover-upload">
          <UploadButton component="span" sx={{ top: 8, right: 8 }}>
            <CameraAltIcon />
          </UploadButton>
        </label>
      </Box>

      <Box sx={{ position: "absolute", top: "150px", left: "3rem" }}>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleUpload(e, setProfilePhoto)}
            style={{ display: "none" }}
            id="profile-upload"
          />
          <label htmlFor="profile-upload">
            <Avatar
              src={profilePhoto}
              sx={{
                width: 150,
                height: 150,
                border: "4px solid white",
                cursor: "pointer",
              }}
            />
          </label>

        </Box>



           {/* New Name & Email Section Below Profile Picture */}
           <Box sx={{ 
            width: 140, // Slightly wider than Avatar
            display: "flex", 
            flexDirection: "column", 
            alignItems: "flex-start", 
            marginTop: "8rem",
            position:"relative",
            left:"3.5rem",
            color:"white"
          }}>
            <Typography variant="h5" sx={{ fontWeight: "bold",color:"white",fontSize:18.5 }}>{user && user.firstName && user.lastName?user.firstName + " " +  user.lastName:user && user.firstName?user.firstName  :"Neallus Labs"}</Typography>
            <Typography variant="h6" sx={{ color: "white",fontSize:17 }}>{user && user.email? user.email:"nealluslabs@gmail.com"}</Typography>
          </Box>




           {/* New Navigation Section with Expandable Content */}
           <Box sx={{ mt: 2, display: "flex", flexDirection: "row", alignItems: "center", gap: 1,width:"90%",justifyContent:"space-between", position:"relative",left:"3.5rem" }}>
            {/* Personal Info */}
            <Box sx={{display:"flex",flexDirection:"column"}}>  
            <Typography
              variant="body1"
              sx={{
                cursor: "pointer",
                fontSize:"1.1rem",
                color: activeSection === "Personal Info" ? "#E61484" : "white",
                fontWeight: activeSection === "Personal Info" ? "bold" : "normal",
                transition: "color 0.3s ease-in-out",
              }}
              onClick={() => activeSection === "Personal Info"?setActiveSection(""): setActiveSection("Personal Info")}
            >
              Personal Info
            </Typography>
           
            </Box>

            {/* Security */}
            <Box sx={{display:"flex",flexDirection:"column"}}>  
            <Typography
              variant="body1"
              sx={{
                cursor: "pointer",
                fontSize:"1.1rem",
                color: activeSection === "Security" ? "#E61484" : "white",
                fontWeight: activeSection === "Security" ? "bold" : "normal",
                transition: "color 0.3s ease-in-out",
              }}
              onClick={() => activeSection === "Security"?setActiveSection(""): setActiveSection("Security")}
            >
              Security
            </Typography>
          
            </Box>
             
            <Box sx={{display:"flex",flexDirection:"column"}}>  
            {/* My Collaborator Profile */}
            <Typography
              variant="body1"
              sx={{
                cursor: "pointer",
                fontSize:"1.1rem",
                color: activeSection === "My Collaborator Profile" ? "#E61484" : "white",
                fontWeight: activeSection === "My Collaborator Profile" ? "bold" : "normal",
                transition: "color 0.3s ease-in-out",
              }}
              onClick={() => activeSection === "My Collaborator Profile"?setActiveSection(""): setActiveSection("My Collaborator Profile")}
            >
              My Collaborator Profile
            </Typography>
           
            </Box>

            {/* My Account */}
            <Box sx={{display:"flex",flexDirection:"column"}}>  
            <Typography
              variant="body1"
              sx={{
                cursor: "pointer",
                fontSize:"1.1rem",
                color: activeSection === "My Account" ? "#E61484" : "white",
                fontWeight: activeSection === "My Account" ? "bold" : "normal",
                transition: "color 0.3s ease-in-out",
              }}
              onClick={() => activeSection === "My Account"?setActiveSection(""): setActiveSection("My Account")}
            >
              My Account
            </Typography>
           

          </Box>
    </Box>  



      {/* Content Section */}
      <Box sx={{ mt: 3, p: 2, borderRadius: "8px", textAlign: "left", color: "white",position:"relative",left:"3.5rem" }}>
        {activeSection === "Personal Info" && (
          
            <Box style={{marginBottom:"6rem"}}>
              <Typography variant="h6" sx={{fontSize:17}}>Personal Information for Neallus</Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2,width:"60%" }}>
                {/* First Name */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Typography  sx={{ width: "33%" ,fontSize:14}}>First Name</Typography>
                  <TextField
                    fullWidth
                    sx={{ width: "67%",backgroundColor:"white",borderRadius:"0.2rem" }}
                    InputProps={{
                      style: { height: "2.2rem", color: "black" },
                    }}
                    variant="outlined"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Box>
  
                {/* Last Name */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Typography  sx={{ width: "33%" ,fontSize:14}}>Last Name</Typography>
                  <TextField
                    fullWidth
                    sx={{ width: "67%",backgroundColor:"white",borderRadius:"0.2rem"  }}
                    variant="outlined"
                    InputProps={{
                      style: { height: "2.2rem", color: "black" },
                    }}
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Box>
  
                {/* Email */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Typography  sx={{ width: "33%" ,fontSize:14}}>Email</Typography>
                  <TextField
                     InputProps={{
                      style: { height: "2.2rem", color: "black" },
                    }}
                    fullWidth
                    sx={{ width: "67%",backgroundColor:"white",borderRadius:"0.2rem"  }}
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Box>
  
                {/* Phone Number */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Typography  sx={{ width: "33%" ,fontSize:14}}>Phone Number</Typography>
                  <TextField
                    fullWidth
                    InputProps={{
                      style: { height: "2.2rem", color: "black" },
                    }}
                    sx={{ width: "67%" ,backgroundColor:"white",borderRadius:"0.2rem" }}
                    variant="outlined"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </Box>
  
                {/* Location */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Typography  sx={{ width: "33%" ,fontSize:14}}>Location</Typography>
                  <TextField
                    fullWidth
                    InputProps={{
                      style: { height: "2.2rem", color: "black" },
                    }}
                    sx={{ width: "67%",backgroundColor:"white",borderRadius:"0.2rem"  }}
                    variant="outlined"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </Box>
  
                {/* Date of Birth */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Typography  sx={{ width: "33%" ,fontSize:14}}>Date of Birth</Typography>
                  <TextField
                    fullWidth
                    InputProps={{
                      style: { height: "2.2rem", color: "black" },
                    }}
                    sx={{ width: "67%",backgroundColor:"white",borderRadius:"0.2rem"  }}
                    variant="outlined"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                  />
                </Box>
              </Box>

                 
              <Button
                    sx={{
                      backgroundColor: "#E61484",
                      color: "white",
                      height: "2.5rem",
                      position:"relative",
                       left:"30%",
                      width:"12rem",
                      marginTop:"2rem",
                      "&:hover": {
                        backgroundColor: "#C50E6E", // Slightly darker shade on hover
                      },
                    }}
                  >
                    Update Profile
                  </Button>
    
            </Box>
        )}

        {activeSection === "Security" && (
          <Box style={{marginBottom:"6rem"}}>
            <Typography variant="h6" sx={{fontSize:17}}>Security Settings</Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2,width:"60%" }}>
                {/* current password */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Typography  sx={{ width: "33%" ,fontSize:14}}>Current Password</Typography>
                  <TextField
                    fullWidth
                    InputProps={{
                      style: { height: "2.2rem", color: "black" },
                    }}
                    sx={{ width: "67%",backgroundColor:"white",borderRadius:"0.2rem" }}
                    variant="outlined"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                </Box>
  
                {/* new password */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Typography  sx={{ width: "33%" ,fontSize:14}}>New Password</Typography>
                  <TextField
                    fullWidth
                    InputProps={{
                      style: { height: "2.2rem", color: "black" },
                    }}
                    sx={{ width: "67%",backgroundColor:"white",borderRadius:"0.2rem"  }}
                    variant="outlined"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </Box>


                  {/* confirm password */}
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Typography  sx={{ width: "33%" ,fontSize:14}}>Confirm Password</Typography>
                  <TextField
                    fullWidth
                    InputProps={{
                      style: { height: "2.2rem", color: "black" },
                    }}
                    sx={{ width: "67%",backgroundColor:"white",borderRadius:"0.2rem"  }}
                    variant="outlined"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </Box>


              
        </Box>  

        <Button
                    sx={{
                      backgroundColor: "#E61484",
                      color: "white",
                      height: "2.5rem",
                      position:"relative",
                       left:"30%",
                      width:"12rem",
                      marginTop:"2rem",
                      "&:hover": {
                        backgroundColor: "#C50E6E", // Slightly darker shade on hover
                      },
                    }}
                  >
                    Update Password
                  </Button>
                
           
          </Box>



           
        )}

        {activeSection === "My Collaborator Profile" && (
          <Box>
            <Typography variant="h6" sx={{fontSize:17}}>My Collaborator Profile</Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {/* Edit Profile Button */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, cursor: "pointer", color: "#E61484" }}>
              <IconButton sx={{ color: "#E61484" }}>
                <AddIcon />
              </IconButton>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Edit My Collaborator Profile
              </Typography>
            </Box>

            {/* Collaborator Profile Box */}
            <Box
              sx={{
                backgroundColor: "#49454F",
                width: "90%",
                display: "flex",
                alignItems: "center",
                padding: "8px 12px",
                height:"3.5rem",
                borderRadius: "4px",
                marginBottom:"6rem",
                transition: "background-color 0.3s ease-in-out",
                "&:hover": {
                  backgroundColor: "#625D69",
                },
              }}
            >
              {/* Small Avatar */}
              <Avatar sx={{ width: 20, height: 20, backgroundColor: "#E61484", marginRight: "8px" }} />

              {/* Collaborator Name */}
              <Typography variant="body1" sx={{ fontWeight: "bold",fontSize:"1.1rem" }}>
                Neallus Labs
              </Typography>
            </Box>
          </Box>
            
          </Box>
        )}

        {activeSection === "My Account" && (
          <Box style={{marginBottom:"6rem"}}>
            <Typography variant="h6" sx={{fontSize:17}}>My Account</Typography>


            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2,width:"60%" }}>
                {/* First Name */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Typography  sx={{ width: "33%" ,fontSize:14}}>My Account</Typography>
                  <TextField
                    fullWidth
                    InputProps={{
                      style: { height: "2.2rem", color: "black" },
                    }}
                    sx={{ width: "67%",backgroundColor:"white",borderRadius:"0.2rem" }}
                    variant="outlined"
                    value={accountType}
                    onChange={(e) => setAccountType(e.target.value)}
                  />
                </Box>
  
                {/* Last Name */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Typography  sx={{ width: "33%" ,fontSize:14}}>Agreement Status</Typography>
                  <TextField
                    fullWidth
                    InputProps={{
                      style: { height: "2.2rem", color: "black" },
                    }}
                    sx={{ width: "67%",backgroundColor:"white",borderRadius:"0.2rem"  }}
                    variant="outlined"
                    value={agreementStatus}
                    onChange={(e) => setAgreementStatus(e.target.value)}
                  />
                </Box>
        </Box>
           
          </Box>
        )}
      </Box>


    </Box>
    </Box>
</ThemeProvider>
  );
};

export default MyAccountPage;
