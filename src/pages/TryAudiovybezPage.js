import Sidebar from "../componentsMyNetwork/Sidebar";
import Feed from "../componentsMyNetwork/Feed";
import Rightbar from "../componentsMyNetwork/Rightbar";
import { Box, createTheme, Stack, ThemeProvider } from "@mui/material";
import Navbar from "../componentsMyNetwork/Navbar";
import Add from "../componentsMyNetwork/Add";
import { useState } from "react";

// Components
import { LeftSectionComponent, RightSectionComponent } from "src/SeperateComponent/TryAudiovybes";

function TryAudioVybezPage() {
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
      <Box bgcolor={"background.default"} color={"text.primary"} style={{scale:"0.95"}}>
        <Navbar />
        <Stack direction="row" spacing={2} justifyContent="space-between"
            sx={{ height: "100%" }}
        >
            <LeftSectionComponent />
            <RightSectionComponent />
        </Stack>
      </Box>
    </ThemeProvider>
  );
}

export default TryAudioVybezPage;
