
import { useState, useEffect } from 'react';
import BarChart from './BarChart';
import Alert from '@material-ui/lab/Alert';
import TableSort from './TableSort';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import TableChartIcon from '@material-ui/icons/TableChart';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import InputAdornment from "@material-ui/core/InputAdornment";
import { Button, Grid, TextField, IconButton, Select, FormControl, MenuItem, InputLabel, Typography } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Popover from '@material-ui/core/Popover';
import HelpIcon from '@material-ui/icons/Help';
const useStyles = makeStyles((theme) => ({

    content: {
        marginTop: '30px',
        width: "100%",
        height: '100%'
    },
    margin: {
        margin: theme.spacing(1),
    },
    button: {
        margin: theme.spacing(1),
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    message: {
        position: 'absolute', left: '55%', top: '55%',
        transform: 'translate(-50%, -50%)',
        color: 'gray'
    },

    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    typography: {
        padding: theme.spacing(2),
    },
}));



const Search = () => {

    const classes = useStyles();

    const [anchorEl, setAnchorEl] = useState(null);
    const [data, setData] = useState(null);
    const [keywords, setKeywords] = useState('');
    const [country, setCountry] = useState('US');
    const [url, setUrl] = useState('');
    const [chart, setChartSelected] = useState(true);
    const [table, setTableSelected] = useState(false);
    const [message] = useState(true);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [open, setOpen] = useState(false);



    useEffect(() => {
        const dataStorage = window.localStorage.getItem('searchData');
        setData(JSON.parse(dataStorage));
    }, [])



    useEffect(() => {
        const fetchData = () => {
            fetch(url).then(res => {
                return res.json();
            })
                .then(data => {


                    if (!data.status) {
                        window.localStorage.setItem('searchData', JSON.stringify(data))
                        setData(data);
                        setError(false);
                        setOpen(false);

                    } else {
                        setError(true);
                        setErrorMessage(data.message)
                        setOpen(false);

                    }
                })
                .catch(error => {

                    console.log(error)
                })
        }

        if (url !== '') {
            setData(null)
            fetchData();
            setUrl('');
        }



    }, [url, data]);


    const handleKeywords = (event) => {
        setKeywords(event.target.value)
    }
    const handleCountry = (event) => { setCountry(event.target.value) }
    const selectChart = () => {
        setChartSelected(true);
        setTableSelected(false);
    }
    const selectTable = () => {
        setTableSelected(true);
        setChartSelected(false);
    }
    const clickSearch = () => {
        var url = 'https://amazon-sent.herokuapp.com/api/searchProducts?keywords=' + keywords + '&country=' + country;
        // var url = 'http://localhost:5000/api/searchProducts?keywords=' + keywords + '&country=' + country;
        // var url = 'http://localhost:5000/api/test'
        setUrl(url)
        setOpen(!open);

        window.localStorage.setItem('keywords', keywords)
        window.localStorage.setItem('countrySearched', country)

    }
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open1 = Boolean(anchorEl);
    const id = open1 ? 'simple-popover' : undefined;

    return (

        <div className={classes.content}>
            <div className={classes.margin}>
                <Grid direction="row" container spacing={1} alignItems="flex-end">

                    <Grid item>
                        <TextField
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment>
                                        <IconButton id="searchI" size="small" color="primary" disabled={!keywords} onClick={clickSearch}>
                                            <SearchIcon />
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                            fullWidth
                            color="primary"
                            variant="outlined"
                            value={keywords}
                            onChange={handleKeywords}
                            label="Search..."
                            id="searchT"
                        />
                    </Grid>
                    <Grid item>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel color="primary" id="demo-simple-select-label">Country</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={country}
                                onChange={handleCountry}
                                label="Country"
                            >
                                <MenuItem value={"US"}>United States</MenuItem>
                                <MenuItem value={"AU"}>Australia</MenuItem>
                                <MenuItem value={"GB"}>Great Britain</MenuItem>
                                <MenuItem value={"FR"}>France</MenuItem>
                                <MenuItem value={"CA"}>Canada</MenuItem>
                                <MenuItem value={"DE"}>Germany</MenuItem>
                                <MenuItem value={"IN"}>India</MenuItem>
                                <MenuItem value={"IT"}>Italy</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <IconButton aria-describedby={id} variant="contained" color="primary" onClick={handleClick}>
                            <HelpIcon />
                        </IconButton>
                        <Popover
                            id={id}
                            open={open1}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                        >
                            <Typography className={classes.typography}>Search for any products with keywords. The more
                keywords you provide the more specific you are.</Typography>
                        </Popover>
                    </Grid>
                </Grid>
            </div>
            {error && <Alert variant="outlined" severity="error" onClose={() => { setError(false) }}>{errorMessage}</Alert>}
            <div>
                <Button color="primary" disabled={!data} type="button" onClick={selectChart} endIcon={<EqualizerIcon></EqualizerIcon>}>
                    Bar Chart
                </Button>
                <Button color="primary" disabled={!data} type="button" onClick={selectTable} endIcon={<TableChartIcon></TableChartIcon>}>
                    Table Results
                </Button>
            </div>


            <Backdrop className={classes.backdrop} open={open}>
                <CircularProgress color="inherit" />
            </Backdrop>

            {!data && message &&

                <Typography className={classes.message} variant='h5'>Start Searching for products!</Typography>

            }
            {data && chart && <BarChart data={data} />}
            {/* { data && table && <TableResult data={data} />} */}
            { data && table && <TableSort data={data} country={country} />}





        </div >

    );
}

export default Search;