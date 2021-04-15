import { Bar } from 'react-chartjs-2';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({

    center: {
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)'
    }
}));
const BarChart = (props) => {

    const classes = useStyles();

    // const keywords = props.keywords;
    // const country = props.country;

    const predictions = props.data.predictions;
    const avgPrice = props.data.avgPrice;
    const avgRating = props.data.avgRating;
    const soldUnits = props.data.soldUnits;



    return (
        <div
            className={classes.center}>
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
                height={200}
                width={400}
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
            <Typography align="center">Average Price: {avgPrice}</Typography>
            <Typography align="center">Average Rating: {avgRating}</Typography>
            <Typography align="center">Sold Units: {soldUnits}</Typography>

        </div>
    );
}

export default BarChart;