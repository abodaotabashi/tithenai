import React from 'react';
import { Pie } from 'react-chartjs-2';

const PieChart = (props) => {
    const { data, title } = props;

    return (
        data !== null ?
        <Pie
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
                    },
                    datalabels: {
                        formatter: (value, context) => {
                            return "gei"
                        },
                    }
                },
                scales: {
                    y: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            display: false
                        }
                    },
                }
            }} />
        : null
    )
}

export default PieChart