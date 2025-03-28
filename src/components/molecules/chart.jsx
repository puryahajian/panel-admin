import React from 'react'
import { Chart, LineElement, CategoryScale, LinearScale, PointElement } from "chart.js";
import { Line } from "react-chartjs-2";



Chart.register(LineElement, CategoryScale, LinearScale, PointElement);

const data = {
    labels: ["", "", "", "", "", "", ""],
    datasets: [
      {
        label: "Try hiding me",
        data: [0, 5, 10,],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
      },
    ],
};
  
const options = {
  responsive: true,
  // maintainAspectRatio: false,
  scales: {
      x: {
        ticks: {
          maxTicksLimit: 3,
        },
      },
      y: {
        ticks: {
          maxTicksLimit: 3,
        },
      },
  },
  animations: {
    show: {
      animations: {
        x: {
          from: 0,
        },
        y: {
          from: 0,
        },
      },
    },
    hide: {
      animations: {
        x: {
          to: 0,
        },
        y: {
          to: 0,
        },
      },
    },
  },
};




function ChartComponent() {
    return (
        <div>
          <Line className='!h-28 !w-full' data={data} options={options} />
        </div>
    )
}

export default ChartComponent
