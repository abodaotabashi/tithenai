import React from 'react';
import { Line } from 'react-chartjs-2';

const LineChart = (props) => {
    const { data, title } = props;

    return (
        data !== null ?
        <Line
            data={data}
            options={{
                maintainAspectRatio: false,
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: title,
                        font: {
                            family: "Ubuntu"
                        }
                    },
                    legend: {
                        display: true,
                        position: "bottom"
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1
                        }
                    }
                }
            }} />
        : null
    )
}

export default LineChart