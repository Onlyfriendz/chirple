import { AppBar, Toolbar, Typography } from "@mui/material";
import logo from '../assets/ChirpleLogo.PNG';
import React from "react";

export default function Header() {
    const displayDesktop = () => {
        return <Toolbar>{chirpleLogo}</Toolbar>;
    };

    const chirpleLogo = (
        <><img src={logo} width="50" alt="logo" />
        <Typography variant="h5" component="h1" sx={{
            fontFamily: "Work Sans, sans-serif",
            fontWeight: 600,
            color: "#FFFEFE",
            textAlign: "left"
        }}>
            Chirple
        </Typography></>
    );
    
    return (
        <header>
            <AppBar sx={{ backgroundColor: "#400CCC" }}>
                {displayDesktop()}
            </AppBar>
        </header>
    );
}