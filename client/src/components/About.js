import { Typography, makeStyles } from '@material-ui/core'
import React from 'react'
const useStyles = makeStyles({
    content: {
        marginTop: "50px",
        paddingBottom: "100%"
    },
    about: {
        margin: "60px",
        fontWeight: 600
    },
    paragraph: {
        paddingTop: "5px",
        paddingLeft: "150px",
        paddingRight: "150px"
    }
});
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
        </div>
    )
}

export default About
