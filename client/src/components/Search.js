
import { useState, useEffect } from 'react';
import BarChart from './BarChart';
import Alert from '@material-ui/lab/Alert';
import TableResult from './TableResult';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import TableChartIcon from '@material-ui/icons/TableChart';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import InputAdornment from "@material-ui/core/InputAdornment";
import { Button, Grid, TextField, IconButton, Select, FormControl, MenuItem, InputLabel, Typography } from '@material-ui/core';
import { ReactComponent as Loading } from '../loading.svg';
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
    center: {
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)'
    }
}));



const Search = () => {

    const classes = useStyles();


    const [data, setData] = useState(null);
    const [keywords, setKeywords] = useState('');
    const [country, setCountry] = useState('AU');
    const [url, setUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [chart, setChartSelected] = useState(true);
    const [table, setTableSelected] = useState(false);
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
        var url = 'http://localhost:5000/api/chart3?keywords=' + keywords + '&country=' + country;
        // var url = 'http://localhost:5000/api/test'
        setUrl(url)

    }



    return (

        <div className={classes.content}>
            <div className={classes.margin}>
                <Grid direction="row" container spacing={1} alignItems="flex-end">

                    <Grid item>
                        <TextField
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment>
                                        <IconButton size="small" color="primary" disabled={!keywords} onClick={clickSearch}>
                                            <SearchIcon />
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                            color="primary"
                            variant="outlined"
                            value={keywords}
                            onChange={handleKeywords}
                            id="input-with-icon-grid"
                            label="Search..." />
                    </Grid>
                    <Grid item>
                        <FormControl className={classes.formControl}>
                            <InputLabel color="primary" id="demo-simple-select-label">Country</InputLabel>
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
                </Grid>
            </div>
            {error && <Alert variant="outlined" severity="error" onClose={() => { setError(false) }}>{errorMessage}</Alert>}
            <Button color="primary" disabled={!data} type="button" onClick={selectChart} endIcon={<EqualizerIcon></EqualizerIcon>}>
                Bar Chart
            </Button>
            <Button color="primary" disabled={!data} type="button" onClick={selectTable} endIcon={<TableChartIcon></TableChartIcon>}>
                Table Results
            </Button>

            {isLoading &&
                <Typography align="center"> Please wait while we fetch for results
                    <Loading />
                </Typography>
            }
            {data && chart && <div style={{ height: "100%", width: "100%" }}><BarChart data={data} /></div>}
            {data && table && <TableResult data={data} />}





        </div>

    );
}

export default Search;