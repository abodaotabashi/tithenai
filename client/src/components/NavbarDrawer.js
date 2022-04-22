import React from 'react';
import { Box, ListItem, List, ListItemText, ListItemIcon, Divider } from '@mui/material';
import { makeStyles } from '@mui/styles';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import PersonIcon from '@mui/icons-material/Person';
import ArticleIcon from '@mui/icons-material/Article';
import UploadIcon from '@mui/icons-material/Upload';

const useStyles = makeStyles((theme) => ({
    list: {
        width: "70vw",
        '& .MuiListItemButton-root': {
            fontFamily: "Ubuntu-Light",
        },
        '& .MuiTypography-root': {
            fontFamily: "Ubuntu-Light",
            fontWeight: "bold",
            color: "#0A481C"
        },
        '& .MuiListItem-root:hover': {
            backgroundColor: "#A5F3BC",
        },
    },
}));

const NavbarDrawer = (props) => {
    const classes = useStyles();
    const {toggleDrawer} = props;
    return (
        <Box
            className={classes.list} >
            <List>
                <ListItem button key={"Home"} onClick={() => toggleDrawer(false)}>
                    <ListItemIcon style={{height:"2rem", width: "2rem", display: "flex", alignItems: "center", justifyContent: "flex-start"}}>
                        <HomeIcon style={{fontSize: "1.75rem", color: "#0A481C"}}/>
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItem>
                <Divider variant="inset" />
                <ListItem button key={"Upload"} onClick={() => toggleDrawer(false)}>
                    <ListItemIcon style={{height:"2rem", width: "2rem", display: "flex", alignItems: "center", justifyContent: "flex-start"}}>
                        <UploadIcon style={{fontSize: "1.75rem", color: "#0A481C"}}/>
                    </ListItemIcon>
                    <ListItemText primary="Upload" />
                </ListItem>
                <Divider variant="fullWidth" />
                <ListItem button key={"Profile"} onClick={() => toggleDrawer(false)}>
                    <ListItemIcon style={{height:"2rem", width: "2rem", display: "flex", alignItems: "center", justifyContent: "flex-start"}}>
                        <PersonIcon style={{fontSize: "1.75rem", color: "#0A481C"}}/>
                    </ListItemIcon>
                    <ListItemText primary="Profile" style={{fontFamily: "Ubuntu"}} />
                </ListItem>
                <Divider variant="inset" />
                <ListItem button key={"My Papers"} onClick={() => toggleDrawer(false)}>
                    <ListItemIcon style={{height:"2rem", width: "2rem", display: "flex", alignItems: "center", justifyContent: "flex-start"}}>
                        <ArticleIcon style={{fontSize: "1.75rem", color: "#0A481C"}}/>
                    </ListItemIcon>
                    <ListItemText primary="My Papers" style={{fontFamily: "Ubuntu"}} />
                </ListItem>
                <Divider variant="inset" />
                <ListItem button key={"Saved List"} onClick={() => toggleDrawer(false)}>
                    <ListItemIcon style={{height:"2rem", width: "2rem", display: "flex", alignItems: "center", justifyContent: "flex-start"}}>
                        <BookmarksIcon style={{fontSize: "1.75rem", color: "#0A481C"}}/>
                    </ListItemIcon>
                    <ListItemText primary="Saved List" />
                </ListItem>
                <Divider variant="inset" />
                <ListItem button key={"Sign Out"} onClick={() => toggleDrawer(false)}>
                    <ListItemIcon style={{height:"2rem", width: "2rem", display: "flex", alignItems: "center", justifyContent: "flex-start"}}>
                        <LogoutIcon style={{fontSize: "1.75rem", color: "#0A481C"}}/>
                    </ListItemIcon>
                    <ListItemText primary="Sign Out" />
                </ListItem>
                <Divider variant="fullWidth" />
            </List>
        </Box>
    )
}

export default NavbarDrawer;