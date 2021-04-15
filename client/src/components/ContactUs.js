import React from 'react'
import { Typography, makeStyles, TextField, Button } from '@material-ui/core'
import emailjs from 'emailjs-com'

const useStyles = makeStyles({
    content: {
        marginTop: "50px",
        paddingBottom: "100%"
    },
    contact: {
        marginBottom: '40px'
    },
    form: {
        paddingLeft: "200px",
        paddingRight: "200px"
    },
    input: {
        marginBottom: '10px'
    }
});

const ContactUs = () => {
    const classes = useStyles();

    function sendEmail(e) {
        e.preventDefault();

        emailjs.sendForm('service_yi8rxnv', 'template_6p9ev9k', e.target, 'user_PuIaGaCRy94irht2x2Wl9')
            .then(result => {
                console.log(result.text);
                alert("Your submission was successful!")
            }).catch(error => {
                console.log(error.text);
            })


        e.target.reset()
    }

    return (
        <div className={classes.content}>
            <Typography className={classes.contact} variant='h2' align='center'>
                Contact Us
            </Typography>

            <form className={classes.form} onSubmit={sendEmail}>
                <TextField
                    className={classes.input}
                    name="name"
                    fullWidth
                    id="outlined-basic"
                    label="Name"
                    variant="outlined"
                    required />
                <TextField
                    className={classes.input}
                    name="email"
                    autoComplete="email"
                    fullWidth
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    required />
                <TextField
                    className={classes.input}
                    name="subject"
                    fullWidth
                    id="outlined-basic"
                    label="Subject"
                    variant="outlined"
                    required />
                <TextField
                    className={classes.input}
                    name="message"
                    fullWidth
                    id="outlined-multiline-static"
                    label="Message"
                    multiline
                    rows={10}
                    variant="outlined"
                    required
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                >
                    Submit
                </Button>
            </form>


        </div>
    )
}

export default ContactUs
