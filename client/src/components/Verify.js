import React from "react";
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    logo: {
        marginBottom: '30px'
    }
}));

const Verify = () => {
    const classes = useStyles();

    return (
        <div>

            <Container component="main" maxWidth="lg">
                <CssBaseline />
                <div className={classes.paper}>
                    <div className={classes.logo}>
                        <img src="/images/Amazon Sentiment.png" height="50" />
                    </div>
                    <Typography variant="h3">Verification link has been sent to your email</Typography>

                </div>

            </Container>
        </div>

    )
}

export default Verify
