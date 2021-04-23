import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import { useHistory } from 'react-router';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    bold: {
        fontWeight: 600
    }
});

const TableResult = (props) => {
    const classes = useStyles();
    const history = useHistory();


    const products = props.data.products;

    const reviewAsin = (asin) => {
        history.push('/review')
        window.localStorage.setItem('asin', asin);
    }


    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <Typography className={classes.bold}>
                                Title
                            </Typography>
                        </TableCell>
                        <TableCell align="center">
                            <Typography className={classes.bold}>
                                Asin
                            </Typography>
                        </TableCell>
                        <TableCell align="center">
                            <Typography className={classes.bold}>
                                Price
                            </Typography>
                        </TableCell>
                        <TableCell align="center">
                            <Typography className={classes.bold}>
                                Rating
                            </Typography>
                        </TableCell>
                        <TableCell align="center">
                            <Typography className={classes.bold}>
                                Total Reviews
                            </Typography>
                        </TableCell>
                        <TableCell align="center">
                            <Typography className={classes.bold}>
                                Amazon Choice
                            </Typography>
                        </TableCell>
                        <TableCell align="center">
                            <Typography className={classes.bold}>
                                Amazon Prime
                            </Typography>
                        </TableCell>
                        <TableCell align="center">
                            <Typography className={classes.bold}>
                                Best Seller
                            </Typography>
                        </TableCell>
                        <TableCell align="center">
                            <Typography className={classes.bold}>
                                Sponsored
                            </Typography>
                        </TableCell>
                        <TableCell align="center">
                            <Typography className={classes.bold}>
                                Image
                            </Typography>
                        </TableCell>

                    </TableRow>
                </TableHead>

                <TableBody>
                    {products.map((product) => (
                        <TableRow>
                            <TableCell component="th" scope="row">
                                {product.title}
                            </TableCell>
                            <TableCell align="right"><button type='button' onClick={() => {
                                reviewAsin(product.asin)
                            }}>{product.asin}</button></TableCell>
                            <TableCell align="right">{product.price.current_price}</TableCell>
                            <TableCell align="right">{product.reviews.rating}</TableCell>
                            <TableCell align="right">{product.reviews.total_reviews}</TableCell>
                            <TableCell align="right">{product.amazonChoice ? (<Typography>Yes</Typography>) : (<Typography>No</Typography>)}</TableCell>
                            <TableCell align="right">{product.amazonPrime ? (<Typography>Yes</Typography>) : (<Typography>No</Typography>)}</TableCell>
                            <TableCell align="right">{product.BestSeller ? (<Typography>Yes</Typography>) : (<Typography>No</Typography>)}</TableCell>
                            <TableCell align="right">{product.sponsored ? (<Typography>Yes</Typography>) : (<Typography>No</Typography>)}</TableCell>
                            <TableCell align="right">
                                <a href={product.url} rel="noopener noreferrer" target="_blank">
                                    <img src={product.thumbnail} alt="" width="50" height="80" />
                                </a>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>

            </Table>

        </TableContainer>
        // <div>
        //     <li>
        //         {products.map((product) => (
        //             <ul>{product.title} {product.asin} {product.price}{product.rating}{product.total_reviews}{product.amazonChoice}{product.amazonPrime}{product.bestSeller}{product.sponsored}</ul>
        //         ))}
        //     </li>
        // </div>
    );
}

export default TableResult;
