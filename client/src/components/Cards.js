import { Card, CardContent, Typography, Container } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Masonry from 'react-masonry-css';
const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    bold: {
        fontWeight: 600,
    },
    positive: {
        color: 'green'
    },
    negative: {
        color: 'red'
    }
});
const Cards = (props) => {
    const classes = useStyles();

    const reviews = props.data;

    const breakpoints = {
        default: 3,
        1100: 2,
        700: 1
    }

    return (
        <Container>
            <Masonry
                breakpointCols={breakpoints}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
            >
                {reviews.map(review => (
                    <div>
                        <Card style={{ border: '2px solid' }} className={classes.root} variant="outlined">
                            <CardContent>
                                <Typography variant="h6" color="textPrimary" gutterBottom>
                                    <span className={classes.bold}>Title:</span> {review.title}
                                </Typography>
                                <Typography variant="subtitle1" className={classes.title} color="textSecondary" gutterBottom>
                                    <span className={classes.bold}>Name:</span> {review.name}
                                </Typography>

                                <Typography color="textSecondary" gutterBottom>
                                    <span className={classes.bold}>Rating:</span>  {review.rating}
                                </Typography>
                                <Typography variant="body2" component="p" paragraph>
                                    {review.review}

                                </Typography>
                                <Typography variant="body2" component="p" >
                                    <span className={classes.bold}>Sentiment:</span> {review.prediction > 0.5 ? <span className={classes.positive}>Positive</span> : <span className={classes.negative}>Negative</span>}

                                </Typography>
                            </CardContent>
                        </Card>
                    </div>
                ))}
            </Masonry>
        </Container>
    );
}

export default Cards;