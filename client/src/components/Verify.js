import React from "react";
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { useHistory, useLocation } from 'react-router';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    logo: {
        marginBottom: '30px'
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const Verify = () => {
    const classes = useStyles();
    const history = useHistory();


    return (
        <div>

            <Container component="main" maxWidth="lg">
                <CssBaseline />
                <div className={classes.paper}>
                    <div className={classes.logo}>
                        <img src="/images/Amazon Sentiment.png" height="50" />
                    </div>
                    <Typography variant="h3">Verification link has been sent to your email</Typography>
                    <Button
                        id='loginB'
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={() => history.push('/login')}
                    >Back to Login</Button>

                </div>

            </Container>
        </div>

    )
}

export default Verify
