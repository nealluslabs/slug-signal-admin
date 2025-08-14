import { Box, Typography } from "@mui/material";

// React Icons
import { MdOutlineClose } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";

const AddMusicBioDetails = ({ title, option, btnTxt }) => {

    return (
        <>
            <Box my={2}>
                <Typography
                    sx={{ fontSize: "16px", fontFamily: "inter", fontWeight: "bold" }}
                    mb={1}
                >{ title }</Typography>

                <Box
                    sx={{ background: "#252328", borderRadius: "14px" }}
                    py={3} px={2.5}
                >
                    <Box 
                        sx={{ background: "#A01565", display: "inline-block", alignItems: "center" }}
                        p={1} px={1.5}
                    >
                        <Box sx={{ display: "flex" }}>
                            <Typography ml={2} mr={1.5}>{ option }</Typography>
                            <MdOutlineClose style={{ marginTop: "4px" }} />
                        </Box>
                    </Box>

                    <Box 
                        sx={{ display: "flex", justifyContent: "center", background: "#C4C4C4", borderRadius: "6px", color: "#161419", cursor: "pointer" }}
                        mt={1.5} p={1}
                    >
                        <IoMdAdd style={{ marginTop: "4px", fontSize: "16px", marginRight: "4px" }} />
                        <Typography
                            sx={{ fontFamily: "inter", fontSize: "14px" }}
                        >{ btnTxt }</Typography>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default AddMusicBioDetails;
