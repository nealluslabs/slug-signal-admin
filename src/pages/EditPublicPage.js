import Sidebar from "../componentsMyNetwork/Sidebar";
import Feed from "../componentsMyNetwork/Feed";
import Rightbar from "../componentsMyNetwork/Rightbar";
import { Box, createTheme, Stack, ThemeProvider } from "@mui/material";
import Navbar from "../componentsMyNetwork/Navbar";
import Add from "../componentsMyNetwork/Add";
import { useState } from "react";

// Components
import { MusicalBioFeedComponent, MusicalBioRightBarComponent, MusicalBioSideBarComponent } from "src/SeperateComponent/MusicalBio";
import { EditPublicProfileRightBar } from "src/SeperateComponent/EditPublicProfile";
import SidebarUpdated from "src/SeperateComponent/MusicalBio/side-bar-updated.component";
import SongFullDetailComponent from "src/SeperateComponent/EditPublicProfile/song-full-detail.component";

function EditPublicPage() {
  const [mode, setMode] = useState("dark");

  const darkTheme = createTheme({
    palette: {
      mode: mode,
      background: {
        default: '#000000',   // Page background
        
      },
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <Box bgcolor={"background.default"} color={"text.primary"} st>
        <Navbar />
        <Stack direction="row" spacing={4} justifyContent="space-between" sx={{scale:"0.95",marginTop:"18px"}}>
         {/* <MusicalBioSideBarComponent setMode={setMode} mode={mode}
            titleOne="Writer/Composer Name: DAVIES LILLIAN" 
            titleTwo="Publisher Name:  DAVIES LILLIAN" 
            optionTop="SOCAN" optionBottom="01066029864"
          />*/}

          <SidebarUpdated/>
          <MusicalBioFeedComponent />
          <SongFullDetailComponent/>
          {/*<EditPublicProfileRightBar />*/}
        </Stack>
      </Box>
    </ThemeProvider>
  );
}

export default EditPublicPage;
