import { Box, Grid, Container, Link } from "@mui/material";
import logo from '../assets/ChirpleLogo.PNG';
import React from "react";

export default function Footer() {    
    return (
        <footer>
            <Box
                px={{ xs: 3, sm: 10 }}
                py={{ xs: 5, sm: 10 }}
                bgcolor="#F5F5F5"
                color="black"
            >            
                <Container maxWidth="lg">
                <Grid container spacing={5}>
                    <Grid item xs={12} sm={4}>
                    <img src={logo} width="300" alt="logo" />
                    </Grid>
                    <Grid item xs={12} sm={4} sx={{ textAlign: 'left'}} paddingRight={5} borderRight={1}>
                    <Box sx={{ fontWeight: 'bold', fontSize: '120%'}}>Chirple is an application that makes use of the Twitter Scrapping API to provide tailored data analysis to users about their products or events.</Box>
                    <br></br>
                    <Box>We are developing a web application that aims to provide instant, fresh analysis of global sentiments using the Twitter scrapping API. Chirple leverages critical real-time social media data made possible by the API to give users a leg up on upcoming trends, predict the next fads and fashions, and keep track of consumer sentiment.</Box>
                    </Grid>
                    <Grid item xs={12} sm={4} sx={{ textAlign: 'left'}}>
                    <Box sx={{ fontWeight: 'bold', fontSize: '120%'}} paddingBottom={2}>Contact Us</Box>
                    <Box>89 Gangnam-Ro Crescent #09-23,</Box>
                    <Box paddingBottom={1}>센텀에이스아파트 983-152</Box>
                    <Box paddingBottom={1}>+82 3957 7231</Box>
                    <Box>info@chirple.biz</Box>
                    <Box>
                        <Link href="/" color="inherit">
                        Chirple@gmail.com
                        </Link>
                    </Box>
                    
                    </Grid>
                </Grid>
                <Box textAlign="center" pt={{ xs: 5, sm: 10 }} pb={{ xs: 5, sm: 0 }}>
                    Chirple &reg; {new Date().getFullYear()}
                </Box>
                </Container>
            </Box>
        </footer>
    );
}