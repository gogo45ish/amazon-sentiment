import { Bar } from 'react-chartjs-2';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({


    center: {
        position: 'absolute', left: '57%', top: '60%',
        transform: 'translate(-50%, -50%)'
    },
}));
const BarChart = (props) => {

    const classes = useStyles();

    // const keywords = props.keywords;
    // const country = props.country;

    const predictions = props.data.predictions;
    const avgPrice = props.data.avgPrice;
    const avgRating = props.data.avgRating;
    const soldUnits = props.data.soldUnits;
    const keywords = window.localStorage.getItem('keywords');
    const countrySearched = window.localStorage.getItem('countrySearched');




    return (
        <div
            className={classes.center}>
            <Typography align='center'>Last Search: "{keywords}" in {countrySearched}</Typography>
            <Bar
                data={{
                    labels: ['Positive', 'Negative'],
                    datasets: [
                        {
                            label: 'Sentiment Review',
                            data: predictions,
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',

                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                            ],
                            borderWidth: 1,
                        }
                    ]
                }}
                height={500}
                width={1000}
                options={{
                    // maintainAspectRatio: false,
                    responsive: true,
                    scales: {
                        yAxes: [
                            {
                                ticks: {
                                    beginAtZero: true
                                },
                            }
                        ],
                        xAxes: [
                            {
                                barPercentage: 0.4
                            }
                        ]
                    }
                }}
            />
            <Typography align="center">Average Price: {avgPrice}$</Typography>
            <Typography align="center">Average Rating: {avgRating}/5⭐</Typography>
            <Typography align="center">Sold Units: {soldUnits} unit</Typography>

        </div>
    );
}

export default BarChart;