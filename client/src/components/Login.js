import React, { useCallback, useContext, useState } from "react";
import { withRouter, Redirect } from "react-router";
import fire from "../fire";
import { AuthContext } from "../Auth";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import firebase from 'firebase';
import { GoogleLoginButton } from "react-social-login-buttons";


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
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    logo: {
        marginBottom: '30px'
    }
}));

const Login = ({ history }) => {
    const classes = useStyles();
    const [emailError, setEmailError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = useCallback(

        async event => {

            event.preventDefault();
            // const { email, password } = event.target.elements;
            try {
                setEmailError(null);
                setPasswordError(null);
                var user = await fire
                    .auth()
                    .signInWithEmailAndPassword(email, password);

                window.localStorage.setItem('email', email);

                if (!user.emailVerified) {
                    window.location.reload(false);
                }



                history.push("/");
            } catch (error) {

                // alert(error.code);
                switch (error.code) {
                    case "auth/invalid-email":
                        alert(error.message);
                        setEmailError(true);
                        break;
                    case "auth/wrong-password":
                        alert(error.message);
                        setPasswordError(true);
                        break;
                    case "auth/user-not-found":
                        alert(error.message);
                        setEmailError(true);
                        break;
                    case "auth/too-many-requests":
                        alert(error.message);
                        break;
                    default:
                    // code block
                }

            }
        },
        [history, email, password]
    );

    const handleEmail = (event) => {
        setEmail(event.target.value);
    }
    const handleGoogleSign = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                window.localStorage.setItem('email', result.user.email)

            }).catch((error) => {
                alert(error)
            });
    }
    const handlePassword = (event) => {
        setPassword(event.target.value);
    }

    const { currentUser } = useContext(AuthContext);

    if (currentUser) {
        return <Redirect to="/" />;
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <div className={classes.logo}>
                    <img src="/images/Amazon Sentiment.png" height="50" />
                </div>
                <Typography component="h1" variant="h5">
                    Log In
                </Typography>
                <form onSubmit={handleLogin} className={classes.form}>
                    <TextField
                        error={emailError}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={handleEmail}
                    />
                    <TextField
                        error={passwordError}
                        variant="outlined"
                        margin="normal"
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

                    <Button
                        id='loginB'
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Log In
          </Button>
                    <GoogleLoginButton
                        type="button"
                        variant="contained"
                        color="primary"
                        align="center"
                        size="40px"
                        className={classes.submit}
                        onClick={handleGoogleSign}
                    >
                    </GoogleLoginButton>
                    <Grid container>
                        <Grid item xs>
                            <Link color="secondary" href="/forgot" variant="body2">
                                Forgot password?
              </Link>
                        </Grid>
                        <Grid item>
                            <Link color="secondary" href="/signup" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>

        </Container>

    );
};

export default withRouter(Login);