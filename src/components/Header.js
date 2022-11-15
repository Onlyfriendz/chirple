import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import logo from '../assets/ChirpleLogo.PNG';
import React from "react";

export default function Header() {
    const displayDesktop = () => {
        return <Toolbar>{chirpleLogo}</Toolbar>;
    };

    const chirpleLogo = (
        <Box sx={{ flexDirection: "row", display: "flex", alignItems: "center", justifyContent: "space-between", ml: 4.5 }} width={1350} >
            
            <Typography variant="h5" component="h1" sx={{
                fontFamily: "Work Sans, sans-serif",
                fontWeight: 600,
                fontSize: 33,
                color: "#FFFEFE",
                textAlign: "left", flexDirection: "row", display: "flex", alignItems: "center"
            }}>
                <img src={logo} width="70" alt="logo" />
                Chirple
            </Typography>
            <Typography variant="h5" component="h1" sx={{
                fontFamily: "Work Sans, sans-serif",
                fontWeight: 200,
                fontSize: 20,
                color: "#FFFEFE",
                textAlign: "left",
                fontStyle: 'italic'
            }}>
                Boost your business with twitter analytics
            </Typography>
        </Box> 
    );
    
    return (
        <header>
            <AppBar sx={{ backgroundColor: "#400CCC", height: 110, flexDirection: "row", display: "flex", alignItems: "center" }}>
                {displayDesktop()}
            </AppBar>
        </header>
    );
}