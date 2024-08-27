import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartOptions, LineElement, ChartData, PointElement, LinearScale, CategoryScale, ChartDataset, BarElement } from 'chart.js';
import { Line, Pie } from 'react-chartjs-2';
import { Space, Typography, message } from 'antd';
import './style.scss'
import { statisticApi } from '../../../../../apis/statistic';
import { useParams } from 'react-router-dom';

ChartJS.register(ArcElement, Tooltip, Legend, LineElement, PointElement, LinearScale, CategoryScale, BarElement)
function UserMnDashboardChart() {
    const {id} = useParams();
    const [dataRawLineChart, setDataRawLineChart] = useState([]);
    const [dataTop5RuleHit, setDataTop5RuleHit] = useState([]);
    const fetcherDataLine = async () => {
        try {
            const res = await statisticApi.getNumOfPrevent24hById(Number(id));            
            if(res.status === 200) setDataRawLineChart(res.data)
            else message.error("Data number of prevent get error")
        } catch (error) {
            message.error("Data number of prevent get error");
        }
    }
    const fetchDataTop5RulesHit = async () => {
        try {
            const res = await statisticApi.getTopRuleHit();
            if (res.status === 200) setDataTop5RuleHit(res.data.slice(0, 5))
            else message.error("Get data top 5 rules failed");
        } catch (error) {
            message.error("Get data top 5 rules failed");
        }
    }

    useEffect(() => {
        fetcherDataLine();
        fetchDataTop5RulesHit();
    },[])
    const dataPieChart = {
        labels: dataTop5RuleHit?.map((item: any) => item.rule_id),
        datasets: [
            {
                data: dataTop5RuleHit?.map((item: any) => item.count),
                backgroundColor: ['#0da9a0',
                    '#d74042',
                    'rgba(255, 205, 86, 0.6)',
                    'rgba(255, 99, 134, 0.6)',
                    '#3813cc']
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
    const optionsLine: ChartOptions<'line'> = {
        responsive: true,
        plugins: {
            legend: {
                display: false
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                min: 0,
            },
        },
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