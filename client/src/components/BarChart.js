import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

const BarChart = (props) => {
    const { data, title } = props;

    return (
        data !== null ?
        <Bar
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

export default BarChart