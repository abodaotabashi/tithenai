import React from 'react';

import '../assets/styles.css';
import InstagramIcon from "../assets/icons/instagram_64px.png";
import FacebookIcon from "../assets/icons/facebook_32px.png";
import TwitterIcon from "../assets/icons/twitter_32px.png";
import LinkedinIcon from "../assets/icons/linkedin_48px.png";
import YoutubeIcon from "../assets/icons/youtube_32px.png";
import TithenaiLogo from '../assets/logos/Uncircled White.png';
import { Box, Grid, IconButton } from '@mui/material';


const Footer = (props) => {
    return(
        <footer className="footer">
            <Grid container style={{width: "90%"}} alignItems="center" justifyContent="center">
                <Box
                    component={Grid}
                    className='footerSection'
                    item
                    xs={12} sm={4} md={4} lg={3}
                    sx={{ display: { xs: 'block', sm: 'block', md: 'block', lg:"block" } }}
                    >
                    <p className='footerText'>Tithenai {new Date().getFullYear()} ©</p>
                </Box>
                <Box
                    component={Grid}
                    className='footerSection'
                    item
                    sm={4} md={4} lg={6}
                    sx={{ display: { xs: 'none', sm: 'block', md: 'block', lg:"block" } }}
                    >
                    <img className='footerLogo' src={TithenaiLogo} alt='TithenaiLogo'/>
                </Box>
                <Grid item container xs={12} sm={4} md={4} lg={3} className='footerSection' >
                    <IconButton size="small" style={{color: "white", margin: "auto"}} onClick={() => window.location.href = `https://www.facebook.com/`}>
                        <img className='footerSocialLinkIcon' src={FacebookIcon} alt='facebookIcon'/>
                    </IconButton>
                    <IconButton size="small" style={{color: "white", margin: "auto"}} onClick={() => window.location.href = `https://www.instagram.com/`}>
                        <img className='footerSocialLinkIcon' src={InstagramIcon} style={{width: "1.2rem",height: "1.2rem"}} alt='instagramIcon'/>
                    </IconButton>
                    <IconButton size="small" style={{color: "white", margin: "auto"}} onClick={() => window.location.href = `https://www.linkedin.com/`}>
                        <img className='footerSocialLinkIcon' src={LinkedinIcon} alt='linkedinIcon'/>
                    </IconButton>
                    <IconButton size="small" style={{color: "white", margin: "auto"}} onClick={() => window.location.href = `https://twitter.com/`}>
                        <img className='footerSocialLinkIcon' src={TwitterIcon} alt='twitterIcon'/>
                    </IconButton>
                    <IconButton size="small" style={{color: "white", margin: "auto"}} onClick={() => window.location.href = `https://www.youtube.com/`}>
                        <img className='footerSocialLinkIcon' src={YoutubeIcon} alt='youtubeIcon'/>
                    </IconButton>
                </Grid>
            </Grid>
        </footer>
    );
}

export default Footer;