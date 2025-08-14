import React, { useState } from "react";

import { Typography, Box,Button } from "@mui/material";

// React icon
import { MdEdit } from "react-icons/md";

// Components
import SimpleFormDialog from "./simpleDialogForm";

const UserDetails = () => {

    const [open, setOpen] = React.useState(false);

    return (
        <Box mx={12}>
            <Box sx={{ display: "flex" }}>
                <img 
                    src="https://res.cloudinary.com/glide/image/fetch/f_auto,w_500,c_limit/https%3A%2F%2Flh3.googleusercontent.com%2Fa%2FACg8ocIH8mtMYoT_PqQ8daTa4f7Y_we2GjnU1y_3taHUy3ZLG07xgA%3Ds96-c" 
                    width={296} height={256} 
                    style={{ borderRadius: "12px" }}
                />

                <Box 
                    ml={2}
                    sx={{ position: "relative" }} 
                >
                    <Typography variant="h4">Kelvin Gumbo</Typography>

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
                                display: "flex", alignItems: "center", cursor: "pointer", borderRadius: "8px", 
                                border: "1px solid grey"
                            }}
                            onClick={() => setOpen(true)}
                        >
                            <MdEdit />
                            <Typography sx={{ ml: 1,color:"black", }}>Edit</Typography>
                        </Button>
                    </Box>
                </Box>
            </Box>

            <Box mt={1} px={1}>
                <Typography sx={{ color: "grey", fontSize: "16px" }}>Email</Typography>
                <Typography sx={{ fontSize: "14px", color: "#4844fa" }}>kelvin@slugsignal.com</Typography>
            </Box>

            <SimpleFormDialog open={open} onClose={() => setOpen(false)} />
        </Box>
    )
}

export default UserDetails;
