import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, LineElement, PointElement, LinearScale, CategoryScale, BarElement } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import CardTitleCustom from '../CardTitleCustom';
import { RamSVG, CpuSVG } from '../../assets/images';

import './style.scss'
import { usePerformance } from '../../utils/request/usePerfomance';

ChartJS.register(ArcElement, Tooltip, LineElement, PointElement, LinearScale, CategoryScale, BarElement)
const StoragePerformance = () => {
  const {data, isLoading, error, mutate} = usePerformance();
  const options = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const label = context.label || '';
            const value = context.raw || 0;
            return `${label}: ${value.toFixed(1)}%`;
          }
        }
      }
    },
  };
  const dataPieChart = {
    labels: ['Used Storage', 'Free Storage'],
    datasets: [
      {
        data: [data?.storage.percent, 100 - data?.storage.percent],
        backgroundColor: [
          '#e7202f',
          '#1a6de3',
        ],
      },
    ],
  };


  return (
    <div style={{ display: "flex", height: "220px", marginBottom: "8px" }}>
      <div style={{ width: "24.5%", backgroundColor: "#FFF", padding: "8px", borderRadius: '8px' }}>
        <div style={{ fontSize: "22px", fontWeight: "600" }}>RAM</div>
        <RamSVG />
        <div style={{ paddingLeft: "10px" }}>
          <div style={{ display: "flex", fontSize: "22px", fontWeight: "600" }}><div>Used: </div><div style={{ marginLeft: "5px", color: "#e7202f" }}>{data?.ram.percent}%</div></div>
          <div style={{ display: "flex", fontSize: "22px", fontWeight: "600" }}><div>Free: </div><div style={{ marginLeft: "5px", color: "#1a6de3" }}>{100 - data?.ram.percent}%</div></div>
        </div>
      </div>
      <div style={{ width: "24.5%", backgroundColor: "#FFF", padding: "8px", borderRadius: '8px', marginLeft: "10px" }}>
        <div style={{ fontSize: "22px", fontWeight: "600" }}>CPU</div>
        <CpuSVG />
        <div style={{ paddingLeft: "10px" }}>
          <div style={{ display: "flex", fontSize: "22px", fontWeight: "600" }}><div>Used: </div><div style={{ marginLeft: "5px", color: "#e7202f" }}>{data?.cpu.usage_percent}</div></div>
          <div style={{ display: "flex", fontSize: "22px", fontWeight: "600" }}><div>Core: </div><div style={{ marginLeft: "5px", color: "#1a6de3" }}>{data?.cpu.core}</div></div>
        </div>
      </div>
      <div style={{ width: "24.5%", backgroundColor: "#FFF", padding: "8px", borderRadius: '8px', marginLeft: "10px" }}>
        <div style={{fontSize: "22px", fontWeight: "600", marginBottom: "8px" }}>STORAGE</div>
        <Doughnut
          data={dataPieChart}
          options={options}
          className='performance-chart'
        />
      </div>
    </div>
  )
}

export default StoragePerformance