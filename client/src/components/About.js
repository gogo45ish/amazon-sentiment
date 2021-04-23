import { Typography, makeStyles } from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import React from 'react'
const useStyles = makeStyles((theme) => ({

    root: {

        '& > *': {
            margin: theme.spacing(1),
        },
    },

    content: {
        marginTop: "50px",

    },
    about: {
        margin: "60px",
        fontWeight: 600
    },
    paragraph: {
        paddingTop: "5px",
        paddingLeft: "150px",
        paddingRight: "150px"
    },
    large: {
        width: theme.spacing(30),
        height: theme.spacing(30),
    },
    name: {
        marginTop: '30px',
        marginLeft: '30px'
    }

}));
const About = () => {
    const classes = useStyles();

    return (
        <div className={classes.content}>
            <Typography className={classes.about} variant='h2' align='center'>
                About This Website
            </Typography>
            <Typography className={classes.paragraph} variant='body1'>
                This Website is intended to help businesses learn from Amazon market and come up with
                their strategy of how to make a product better from the listed ones and define whats the best price by providing
                the seller average price,average rating,and lifetime sold units of related products.
                The website uses machine learning to get actual sentiments of the reviews to give overall sentiment of
                searched product based on keywords. This helps the seller with saving his time not reading reviews of each
                product one by one. "Review Product" feature is used to searched reviews for specific product by providing its
                asin number. With that, machine learning is used also to give sentiments of these reviews.
            </Typography>
            <Typography className={classes.about} variant='h2' align='center'>
                Developers
            </Typography>
            <div className={classes.root}>
                <Grid container spacing={3} justify='center'>
                    <Grid item xs={12} sm={8} md={4}>
                        {/* <Grid item >
                            <Avatar alt="George Zummar" src="/images/george1.png" className={classes.large} />
                        </Grid>
                        <Grid item xs={9}>
                            <Typography variant='h5'>George Zummar</Typography>
                        </Grid> */}
                        <div>
                            <Avatar alt="George Zummar" src="/images/george1.jpg" className={classes.large} />
                            <Typography className={classes.name} variant='h5'>George Zummar</Typography>
                        </div>

                    </Grid>
                    <Grid item xs={12} sm={8} md={4} lg={3}>
                        {/* <Grid item >
                            <Avatar alt="George Alatrash" src="/images/george2.jpg" className={classes.large} />
                        </Grid>
                        <Grid item xs={9}>
                            <Typography variant='h5'>George Alatrash</Typography>
                        </Grid> */}
                        <div>
                            <Avatar alt="George Alatrash" src="/images/george2.jpg" className={classes.large} />
                            <Typography className={classes.name} variant='h5'>George Alatrash</Typography>
                        </div>

                    </Grid>


                </Grid>


            </div>
        </div>
    )
}

export default About
