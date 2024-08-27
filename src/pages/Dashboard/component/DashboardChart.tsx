import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartOptions, LineElement, ChartData, PointElement, LinearScale, CategoryScale, ChartDataset, BarElement, Filler } from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Space, Typography, message } from 'antd';
import './style.scss'
import { statisticApi } from '../../../apis/statistic';

ChartJS.register(ArcElement, Tooltip, Legend, LineElement, PointElement, LinearScale, CategoryScale, BarElement, Filler)
function DashboardChart() {
    const [dataRawLineChart, setDataRawLineChart] = useState([]);
    const [dataTop10SourceIP, setDataTop10SourceIP] = useState([]);
    const [dataTop5RuleHit, setDataTop5RuleHit] = useState([]);
    const fetcherDataLine = async () => {
        try {
            const res = await statisticApi.getNumOfPrevent24h();
            if (res.status === 200) setDataRawLineChart(res.data)
            else message.error("Data number of prevent get error")
        } catch (error) {
            message.error("Data number of prevent get error");
        }
    }
    const fetchDataTop10SrcIP = async () => {
        try {
            const res = await statisticApi.getTop10SourceIp();
            if (res.status === 200) setDataTop10SourceIP(res.data)
            else message.error("Get data top 10 source ip failed");
        } catch (error) {
            message.error("Get data top 10 source ip failed");
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
        fetchDataTop10SrcIP();
        fetchDataTop5RulesHit();
    }, [])
    //const { data: dataRawLineChart, mutate, isLoading, error } = useNumOfPrevent24h();
    const top10Source = {
        labels: dataTop10SourceIP.map((item: any) => item.ip),
        datasets: [
            {
                label: 'Top 10 source IP',
                borderColor: 'rgba(75,192,192,1)',
                backgroundColor: ['rgba(75,192,192,0.4)', 'rgba(255,99,132,0.4)', 'rgba(255,205,86,0.4)', 'rgba(54,162,235,0.4)', 'rgba(153,102,255,0.4)'],
                borderWidth: 1,
                hoverBackgroundColor: ['rgba(75,192,192,0.6)', 'rgba(255,99,132,0.6)', 'rgba(255,205,86,0.6)', 'rgba(54,162,235,0.6)', 'rgba(153,102,255,0.6)'],
                hoverBorderColor: 'rgba(75,192,192,1)',
                data: dataTop10SourceIP.map((item: any) => item.count),
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
                pointBorderColor: 'red',
            },
            {
                label: 'Pass',
                data: dataRawLineChart?.map((item: any) => item.total_requests-item.number_of_prevented), 
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 1,
                pointBorderColor: 'green',
            }
    
        ]
    }
    const optionsLine: ChartOptions<'line'> = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                min: 0,
            },
        },
    }

    // top rule
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


    return (
        <>
            <Space className='chart-wrapper'>
                <div className='chart-item'>
                    <Typography className='chart-title'>TOP 10 DETECTED IP</Typography>
                    <Bar data={top10Source} options={optionsBar} />
                </div>
                <div className='chart-item' style={{ width: "50%" }}>
                    <Typography className='chart-title'>Top 5 rule IDs</Typography>
                    <Pie
                        data={dataPieChart}
                        className='chart-content'
                    />
                </div>
            </Space>
            <Space className='chart-wrapper-bottom'>
                <div className='chart-item'>
                    <Typography className='chart-title'>NUMBER OF PREVENT</Typography>
                    <Line data={dataLineChart} options={optionsLine} className='chart-content' />
                </div>
            </Space>
        </>
    );
}

export default DashboardChart