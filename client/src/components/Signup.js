import React, { useCallback, useState } from "react";
import { withRouter } from "react-router";
import fire from "../fire";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    logo: {
        marginBottom: '30px'
    }
}));

const SignUp = ({ history }) => {
    const classes = useStyles();
    const [emailError, setEmailError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSignUp = useCallback(async event => {
        event.preventDefault();
        const { email, password } = event.target.elements;
        try {
            const newUser = await fire
                .auth()
                .createUserWithEmailAndPassword(email.value, password.value);

            await newUser.user.sendEmailVerification();
            fire.auth().signOut();

            history.push("/verify");

        } catch (error) {
            switch (error.code) {
                case "auth/invalid-email":
                    setErrorMessage(error.message)
                    setError(true);
                    setEmailError(true);
                    break;
                case "auth/weak-password":
                    setErrorMessage(error.message)
                    setError(true);
                    setPasswordError(true);
                    break;
                case "auth/email-already-in-use":
                    setErrorMessage(error.message)
                    setError(true);
                    setPasswordError(true);
                    break;
                default:
            }


            // alert(error.code);
        }
    }, [history]);

    const handleEmail = (event) => {
        setEmail(event.target.value);
    }
    const handlePassword = (event) => {
        setPassword(event.target.value);
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <div className={classes.logo}>
                    <img alt="logo" src="/images/Amazon Sentiment.png" height="50" />
                </div>
                <Typography component="h1" variant="h5">
                    Sign up
                 </Typography>
                <form onSubmit={handleSignUp} className={classes.form}>
                    <Grid container spacing={2}>


                        <Grid item xs={12}>
                            <TextField
                                error={emailError}
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                value={email}
                                onChange={handleEmail}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                error={passwordError}
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={handlePassword}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            {error &&
                                <Alert
                                    variant="outlined"
                                    severity="error"
                                    onClose={() => { setError(false) }}>{errorMessage}
                                </Alert>}
                        </Grid>


                    </Grid>
                    <Button
                        id='signupB'
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
            </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="/login" variant="body2">
                                Already have an account? Sign in
                </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>

        </Container>
    );
};

export default withRouter(SignUp);