import React, { useEffect, useState } from "react";
import fire from "./fire.js";
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';


const useStyles = makeStyles((theme) => ({
    center: {
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)'
    },

    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));


export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
    const classes = useStyles();
    const [currentUser, setCurrentUser] = useState(null);
    const [pending, setPending] = useState(true);

    useEffect(() => {
        fire.auth().onAuthStateChanged((user) => {
            // alert(JSON.stringify(user.emailVerified));
            if (user == null) {
                setCurrentUser(null)
                setPending(false)
            } else {
                if (user.emailVerified) {
                    setCurrentUser(user)
                    setPending(false)
                } else {

                    setCurrentUser(null)
                    setPending(false)
                }

            }

        });
    }, []);

    if (pending) {
        return <Backdrop className={classes.backdrop} open={pending}><CircularProgress color="inherit" /></Backdrop>
    }

    return (
        <AuthContext.Provider
            value={{
                currentUser
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};