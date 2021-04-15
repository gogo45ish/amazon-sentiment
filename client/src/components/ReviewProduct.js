
import { useState, useEffect } from 'react';
import Alert from '@material-ui/lab/Alert';
import Cards from './Cards';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from "@material-ui/core/InputAdornment";
import { Grid, TextField, IconButton, Select, FormControl, MenuItem, InputLabel, Typography } from '@material-ui/core';
import { ReactComponent as Loading } from '../loading.svg';
const useStyles = makeStyles((theme) => ({
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
}));



const Search = () => {

    const classes = useStyles();


    const [data, setData] = useState(null);
    const [asin, setAsin] = useState('');
    const [country, setCountry] = useState('AU');
    const [top, setTop] = useState('0');
    const [url, setUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');






    useEffect(() => {
        const fetchData = () => {
            setIsLoading(true);
            fetch(url).then(res => {
                return res.json();
            })
                .then(data => {


                    if (!data.status) {
                        setData(data);
                        setError(false);
                        setIsLoading(false);
                    } else {
                        setError(true);
                        setErrorMessage(data.message)
                        setIsLoading(false);
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

        var url = '';
        if (url !== '') {
            url = 'http://localhost:5000/api/reviewProduct?asin=' + asin + '&country=' + country + '&top=' + top;
            // var url = 'http://localhost:5000/api/test'
            setUrl(url)
        }
    }



    return (

        <div>

            <div className={classes.margin} >
                <Grid container spacing={1} alignItems="flex-end">

                    <Grid item>
                        <TextField
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment>
                                        <IconButton size="small" color="primary" disabled={!asin} onClick={clickSearch}>
                                            <SearchIcon />
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                            color="primary"
                            variant="outlined"
                            value={asin}
                            onChange={handleAsin}
                            id="input-with-icon-grid"
                            label="Search..." />
                    </Grid>
                    <Grid item>
                        <FormControl>
                            <InputLabel id="demo-simple-select-label">Country</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                variant="outlined"
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
                        <FormControl>
                            <InputLabel id="demo-simple-select-label">Relevancy</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                variant="outlined"
                                value={top}
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

            {isLoading &&
                <Typography align="center">Please wait while we fetch for results
            <Loading />
                </Typography>


            }
            {data && <Cards data={data} />}



        </div>

    );
}

export default Search;