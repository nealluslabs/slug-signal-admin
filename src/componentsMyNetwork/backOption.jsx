import React from "react";
import { useNavigate } from "react-router-dom";
import { Breadcrumbs, Typography, Link, Box } from "@mui/material";

// React icon
import { IoIosArrowBack } from "react-icons/io";

const BackOption = ({ items }) => {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: "flex", my: 3, alignItems: "center", mx: 12 }}>
        <Box 
            sx={{ p: .5, mr: .5, cursor: "pointer", "&:hover": { background: "#FFFFFF20" } }}
            onClick={ () => navigate(-1) }
        >
            <IoIosArrowBack style={{ marginTop: 5 }} />
        </Box>

        <Breadcrumbs aria-label="breadcrumb">
            {items.map((item, index) => {
                const isLast = index === items.length - 1;

                return isLast ? (
                <Typography key={index} color="text.primary">
                    {item.label}
                </Typography>
                ) : (
                <Link
                    key={index}
                    underline="hover"
                    color="inherit"
                    onClick={() => navigate(item.path)}
                    sx={{ cursor: "pointer" }}
                >
                    {item.label}
                </Link>
                );
            })}
            </Breadcrumbs>
    </Box>
  );
};

export default BackOption;
