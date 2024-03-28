import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartOptions, LineElement, ChartData, PointElement, LinearScale, CategoryScale, ChartDataset, BarElement, Filler } from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import { Space, Typography, message } from 'antd';
import './style.scss'
import { statisticApi } from '../../../apis/statistic';

ChartJS.register(ArcElement, Tooltip, Legend, LineElement, PointElement, LinearScale, CategoryScale, BarElement, Filler)
function DashboardChart() {
    const [dataRawLineChart, setDataRawLineChart] = useState([]);
    const fetcher = async () => {
        try {
            const res = await statisticApi.getNumOfPrevent24h();
            if(res.status === 200) setDataRawLineChart(res.data)
            else message.error("Data number of prevent get error")
        } catch (error) {
            message.error("Data number of prevent get error");
        }
    }
    useEffect(() => {
        fetcher();
    },[])
    //const { data: dataRawLineChart, mutate, isLoading, error } = useNumOfPrevent24h();
    const mockDataService = [
        {
            name: 'Service 1',
            data: 50,
        },
        {
            name: 'Service 2',
            data: 40,
        },
        {
            name: 'Service 3',
            data: 35,
        },
        {
            name: 'Service 4',
            data: 30,
        },
        {
            name: 'Service 5',
            data: 28,
        }
    ]
    const listServices = {
        labels: mockDataService.map(item => item.name),
        datasets: [
            {
                label: 'Top service',
                borderColor: 'rgba(75,192,192,1)',
                backgroundColor: ['rgba(75,192,192,0.4)', 'rgba(255,99,132,0.4)', 'rgba(255,205,86,0.4)', 'rgba(54,162,235,0.4)', 'rgba(153,102,255,0.4)'],
                borderWidth: 1,
                hoverBackgroundColor: ['rgba(75,192,192,0.6)', 'rgba(255,99,132,0.6)', 'rgba(255,205,86,0.6)', 'rgba(54,162,235,0.6)', 'rgba(153,102,255,0.6)'],
                hoverBorderColor: 'rgba(75,192,192,1)',
                data: mockDataService.map(item => item.data),
            },
        ],
    };

    const optionsBar: any = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
        plugins: {
            legend: {
                display: false,
            },
        },
    };
    const dataLineChart: any = {
        labels: dataRawLineChart?.map((item: any) => item.time),
        datasets: [
            {
                label: 'Prevented',
                data: dataRawLineChart.map((item: any) => item.number_of_prevented),
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
                display:false,
            },
        },
    }


    return (
        <Space className='chart-wrapper'>
            <div className='chart-item'>
                {/* <Pie
                    data={dataPieChart}
                    options={options}
                    className='chart-content'
                /> */}
                <Typography className='chart-title'>Top services</Typography>
                <Bar data={listServices} options={optionsBar} />
            </div>
            <div className='chart-item'>
                <Typography className='chart-title'>Number of access</Typography>
                <Line data={dataLineChart} options={optionsLine} className='chart-content' />
            </div>
        </Space>
    );
}

export default DashboardChart