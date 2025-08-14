import React, { useState } from 'react';

import { Typography, Box } from "@mui/material";

// icons
import { IoIosSearch, IoIosCloseCircle, IoMdAdd } from "react-icons/io";

// Components
import RightDrawer from './rightDrawer';
import { useSelector } from 'react-redux';
import { saveAllTrends,saveFilteredTrends } from 'src/redux/reducers/group.slice';
import { useDispatch } from 'react-redux';

const ScreenSearchComponent = ({ title }) => {

    const dispatch = useDispatch()

    const {mySignals,allTrends} = useSelector((state)=> state.group)
    const [drawerOpen, setDrawerOpen] = useState(false);

    const openDrawer = () => setDrawerOpen(true);
    const closeDrawer = () => setDrawerOpen(false);

    const [searchTerm, setSearchTerm] = useState("");

    return (
        <Box mx="88px" my="32px" sx={{ display: 'flex', justifyContent: "space-between", alignItems: "center" }}>
            <Typography sx={{ fontWeight: "bold", fontSize: "24px" }}>{ title }</Typography>

            <Box style={{ display: "flex" }}>
                <Box px={1} py={0.5} sx={{ display: "flex", background: "#F0F0F0", alignItems: "center", borderRadius: "8px", width: "282px" }}>
                    <IoIosSearch style={{ color: "grey" }} />
                    <input 
                        type="text" 
                        placeholder="Search" 
                        value={ searchTerm }
                        onChange={ e => {setSearchTerm(e.target.value); dispatch(saveFilteredTrends(allTrends.filter((trend)=>((trend.trendName.toLowerCase()).includes(e.target.value))))) } }
                        style={{ 
                            background: "transparent", outline: "none", border: "none", padding: "2px 6px", width: "90%", fontSize: "16px", color: "black"
                        }} 
                    />
                    { searchTerm.length > 0 && <IoIosCloseCircle /> }
                </Box>

               {/* <button 
                    onClick={ openDrawer }
                    style={{ 
                        alignItems: 'center', marginLeft: "6px", borderRadius: "8px", background: "#0564fc", 
                        color: "white", outline: "none", border: "none", padding: "2px 12px", display: 'flex',
                        cursor: 'pointer'
                    }}
                >
                    <IoMdAdd style={{ fontSize: "16px", marginRight: "4px" }} />
                    <p  style={{ fontSize: "16px" }}>Add</p>
                </button>
                */}
            </Box>

            <RightDrawer open={drawerOpen} onClose={closeDrawer} />
        </Box>
    )
}

export default ScreenSearchComponent;
