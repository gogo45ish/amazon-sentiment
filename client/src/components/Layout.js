import { List, ListItem, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core';
import React from 'react';
import fire from "../fire"
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import RateReviewIcon from '@material-ui/icons/RateReview';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import InfoIcon from '@material-ui/icons/Info';
import { useHistory, useLocation } from 'react-router';


const drawerWidth = 240;
const useStyles = makeStyles({
    root: {
        display: 'flex',
    },
    page: {
        background: '#191919',
        width: '100%'
    },
    drawer: {
        width: drawerWidth,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    active: {
        background: '#f4f4f4'
    }
});

export const Layout = ({ children }) => {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();

    const handleLogout = () => { fire.auth().signOut() }

    const menuItems = [
        {
            text: "Search Products",
            icon: <SearchIcon color="primary" />,
            path: '/'
        },
        {
            text: "Get Reviews",
            icon: <RateReviewIcon color="primary" />,
            path: '/review'
        },
        {
            text: "About",
            icon: <InfoIcon color="primary" />,
            path: '/about'
        },
        {
            text: "Contact Us",
            icon: <ContactMailIcon color="primary" />,
            path: '/contact'
        }
    ]
    return (
        <div className={classes.root}>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                anchor="left"
                classes={{ paper: classes.drawerPaper }}
            >
                <div>
                    <Typography style={{ marginLeft: 10 }} variant="h5">Amazon Sentiment</Typography>
                </div>
                <List>
                    {menuItems.map(item => (
                        <ListItem
                            button
                            key={item.text}
                            onClick={() => history.push(item.path)}
                            className={location.pathname === item.path ? classes.active : null}
                        >
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text}></ListItemText>
                        </ListItem>
                    ))}
                    <ListItem
                        button
                        key="Log Out"
                        onClick={handleLogout}
                    >
                        <ListItemIcon><MeetingRoomIcon color="primary" /></ListItemIcon>
                        <ListItemText primary="Log Out"></ListItemText>
                    </ListItem>
                </List>
            </Drawer>
            <div>
                {children}
            </div>

        </div>
    )
}



export default Layout
