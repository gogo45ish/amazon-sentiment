
import { useState, useEffect } from 'react';
import Alert from '@material-ui/lab/Alert';
import Cards from './Cards';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from "@material-ui/core/InputAdornment";
import { Grid, TextField, IconButton, Select, FormControl, MenuItem, InputLabel, Typography } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
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
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
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
}));



const ReviewProduct = () => {

    const classes = useStyles();
    const [open, setOpen] = useState(false);


    const [data, setData] = useState(null);
    const [asin, setAsin] = useState('');
    const [country, setCountry] = useState('AU');
    const [top, setTop] = useState('0');
    const [url, setUrl] = useState('');
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [message] = useState(true);





    useEffect(() => {
        const reviewStorage = window.localStorage.getItem('reviewData');
        const asin = window.localStorage.getItem('asin');
        const country = window.localStorage.getItem('country');
        setAsin(asin)
        if (country === null) {
            setCountry('AU')
        } else {
            setCountry(country)
        }

        setData(JSON.parse(reviewStorage));
    }, []);


    useEffect(() => {
        const fetchData = () => {
            fetch(url).then(res => {
                return res.json();
            })
                .then(data => {


                    if (!data.status) {
                        window.localStorage.setItem('reviewData', JSON.stringify(data));
                        setData(data);
                        setError(false);
                        // setIsLoading(false);
                        setOpen(false);
                    } else {
                        setError(true);
                        setErrorMessage(data.message)
                        // setIsLoading(false);
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


    const handleAsin = (event) => {
        setAsin(event.target.value)
    }
    const handleCountry = (event) => { setCountry(event.target.value) }
    const handleTop = (event) => { setTop(event.target.value) }



    const clickSearch = () => {

        var url = 'https://amazon-sent.herokuapp.com/api/reviewProduct?asin=' + asin + '&country=' + country + '&top=' + top;
        setUrl(url);
        window.localStorage.removeItem('asin')
        setOpen(!open);

    }



    return (

        <div className={classes.content}>

            <div className={classes.margin} >
                <Grid container spacing={1} alignItems="flex-end">

                    <Grid item>
                        <TextField
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment>
                                        <IconButton id="searchI" size="small" color="primary" disabled={!asin} onClick={clickSearch}>
                                            <SearchIcon />
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                            color="primary"
                            variant="outlined"
                            value={asin}
                            onChange={handleAsin}
                            label="Search..."
                            id="searchB" />
                    </Grid>
                    <Grid item>
                        <FormControl variant="outlined">
                            <InputLabel id="demo-simple-select-label">Country</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                variant="outlined"
                                label="Country"
                                value={country}
                                onChange={handleCountry}
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
                        <FormControl variant="outlined">
                            <InputLabel id="demo-simple-select-label">Relevancy</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                variant="outlined"
                                value={top}
                                label="Relevancy"
                                onChange={handleTop}
                            >
                                <MenuItem value={"0"}>Most Recent</MenuItem>
                                <MenuItem value={"1"}>Top Reviews</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </div>

            {error && <Alert variant="outlined" severity="error" onClose={() => { setError(false) }}>{errorMessage}</Alert>}

            <Backdrop className={classes.backdrop} open={open}>
                <CircularProgress color="inherit" />
            </Backdrop>
            {!data && message &&

                <Typography className={classes.message} variant='h5'>Start Searching for products!</Typography>

            }
            {data && <Cards data={data} />}



        </div>

    );
}

export default ReviewProduct;