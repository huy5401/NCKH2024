import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartOptions, LineElement, ChartData, PointElement, LinearScale, CategoryScale, ChartDataset, BarElement } from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Space, Typography, message } from 'antd';
import './style.scss'
import { statisticApi } from '../../../../../apis/statistic';
import { useParams } from 'react-router-dom';

ChartJS.register(ArcElement, Tooltip, Legend, LineElement, PointElement, LinearScale, CategoryScale, BarElement)
function UserMnDashboardChart() {
    const {id} = useParams();
    const [dataRawLineChart, setDataRawLineChart] = useState([]);
    const fetcherDataLine = async () => {
        try {
            const res = await statisticApi.getNumOfPrevent24hById(Number(id));
            console.log(res);
            
            if(res.status === 200) setDataRawLineChart(res.data)
            else message.error("Data number of prevent get error")
        } catch (error) {
            message.error("Data number of prevent get error");
        }
    }
    useEffect(() => {
        fetcherDataLine();
    },[])
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
        labels: dataRawLineChart?.map((item: any) => item.time),
        datasets: [
            {
                label: 'Prevented',
                data: dataRawLineChart.map((item: any) => item.number_of_prevented),
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderWidth: 1,
                pointBorderColor: 'red',
                fill: true,
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