import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartOptions, LineElement, ChartData, PointElement, LinearScale, CategoryScale, ChartDataset, BarElement } from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Space, Typography } from 'antd';
import './style.scss'

ChartJS.register(ArcElement, Tooltip, Legend, LineElement, PointElement, LinearScale, CategoryScale, BarElement)
function UserMnDashboardChart() {
    
    const dataPieChart = {
        labels: ['90182', '90172', '90376', '90847', '90843'],
        datasets: [
            {
                data: [8, 6, 9,10, 7],
                backgroundColor: ['rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 205, 86, 0.6)',
                    'rgba(255, 99, 134, 0.6)',
                    'rgba(250, 90, 134, 0.6)']
            }
        ],

    }
    const dataLineChart: any = {
        labels: ['0.00-3.00', '3.00-6.00', '6.00-9.00', '9.00-12.00', '12.00-15.00', '15.00-18.00', '18.00-21.00', '21.00-24.00'],
        datasets: [
            {
                label: 'safe',
                data: [20, 6, 9, 12, 5, 18, 50, 30],
                borderColor: '#52c41a',
                backgroundColor: '#52c41a',
                borderWidth: 1,
                fill: true,
                pointBorderColor: 'green',
            },
            {
                label: 'dangerous',
                data: [2, 1, 0, 3, 2, 3, 4, 10],
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderWidth: 1,
                fill: true,
                pointBorderColor: 'red',
            }
        ]
    }
    const optionsLine: ChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: false
            },
        }
    }

    return (
        <Space className='chart-wrapper'>
            <div className='chart-item'>

                <Typography className='chart-title'>Top 5 rule IDs</Typography>
                <Pie
                    data={dataPieChart}
                    className='chart-content'
                />
            </div>
            <div className='chart-item'>
                <Typography className='chart-title'>Number of prevented within 24h</Typography>
                <Line data={dataLineChart} options={optionsLine} className='chart-content' />
            </div>
        </Space>
    );
}

export default UserMnDashboardChart