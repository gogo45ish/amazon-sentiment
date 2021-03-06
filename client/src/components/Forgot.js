import React, { useCallback, useContext, useState } from "react";
import { withRouter, Redirect } from "react-router";
import fire from "../fire";
import { AuthContext } from "../Auth";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
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
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    logo: {
        marginBottom: '30px'
    }
}));

const Forgot = ({ history }) => {
    const classes = useStyles();
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const handleForgot = useCallback(
        async event => {
            event.preventDefault();
            const { email } = event.target.elements;
            try {
                await fire
                    .auth()
                    .sendPasswordResetEmail(email.value);
                history.push("/login");
            } catch (error) {
                setErrorMessage(error.message)
                setError(true);
            }
        },
        [history]
    );

    const { currentUser } = useContext(AuthContext);


    if (currentUser) {
        return <Redirect to="/" />;
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <div className={classes.logo}>
                    <img alt="logo" src="/images/Amazon Sentiment.png" height="50" />
                </div>
                <Typography component="h1" variant="h5">
                    Forgot Password
                </Typography>
                <form onSubmit={handleForgot} className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    {error &&
                        <Alert
                            variant="outlined"
                            severity="error"
                            onClose={() => { setError(false) }}>{errorMessage}
                        </Alert>}

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Submit
          </Button>

                </form>
            </div>

        </Container>

    );
};

export default withRouter(Forgot);