import React from 'react';
import PropTypes from 'prop-types';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { useHistory } from 'react-router';
import Button from '@material-ui/core/Button';





function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    { id: 'title', numeric: false, disablePadding: true, label: 'Title' },
    { id: 'asin', numeric: false, disablePadding: false, label: 'Asin' },
    { id: 'pricee', numeric: true, disablePadding: false, label: 'Price' },
    { id: 'rate', numeric: true, disablePadding: false, label: 'Rating' },
    { id: 'totalReviews', numeric: true, disablePadding: false, label: 'Total Reviews' },
    { id: 'amazonChoice', numeric: true, disablePadding: false, label: 'Amazon Choice' },
    { id: 'amazonPrime', numeric: true, disablePadding: false, label: 'Amazon Prime' },
    { id: 'bestSeller', numeric: true, disablePadding: false, label: 'Best Seller' },
    { id: 'sponsored', numeric: true, disablePadding: false, label: 'Sponsored' },
    { id: 'thumbnail', numeric: false, disablePadding: false, label: 'Image' },
];

function EnhancedTableHead(props) {
    const { classes, order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>

                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    title: {
        flex: '1 1 100%',
    },
}));





const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
}));

export default function EnhancedTable(props) {
    const history = useHistory();
    const products = props.data.products;
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('asin');
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };



    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const reviewAsin = (asin) => {
        history.push('/review')
        window.localStorage.setItem('asin', asin);
    }


    const emptyRows = rowsPerPage - Math.min(rowsPerPage, products.length - page * rowsPerPage);

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>

                <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                        aria-label="enhanced table"
                    >
                        <EnhancedTableHead
                            classes={classes}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            rowCount={products.length}
                        />
                        <TableBody>
                            {stableSort(products, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            tabIndex={-1}
                                            key={row.name}
                                        >

                                            <TableCell component="th" id={labelId} scope="row" padding="default">
                                                {row.title}
                                            </TableCell>
                                            <TableCell align="right">
                                                <Button variant="contained" color="secondary" onClick={() => {
                                                    reviewAsin(row.asin)
                                                }}>
                                                    {row.asin}
                                                </Button>
                                            </TableCell>
                                            <TableCell align="right">{row.pricee}$</TableCell>
                                            <TableCell align="right">{row.rate}</TableCell>
                                            <TableCell align="right">{row.totalReviews}</TableCell>
                                            <TableCell align="right">{row.amazonChoice ? (<Typography>Yes</Typography>) : (<Typography>No</Typography>)}</TableCell>
                                            <TableCell align="right">{row.amazonPrime ? (<Typography>Yes</Typography>) : (<Typography>No</Typography>)}</TableCell>
                                            <TableCell align="right">{row.bestSeller ? (<Typography>Yes</Typography>) : (<Typography>No</Typography>)}</TableCell>
                                            <TableCell align="right">{row.sponsored ? (<Typography>Yes</Typography>) : (<Typography>No</Typography>)}</TableCell>
                                            <TableCell align="right">{
                                                <a href={row.url} rel="noopener noreferrer" target="_blank">
                                                    <img src={row.thumbnail} alt="" width="50" height="80" />
                                                </a>
                                            }</TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={products.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
        </div >
    );
}