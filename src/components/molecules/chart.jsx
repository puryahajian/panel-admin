import React from 'react'
import {
  Chart,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import { Line } from "react-chartjs-2";

Chart.register(LineElement, CategoryScale, LinearScale, PointElement);

const options = {
  responsive: true,
  scales: {
    x: {
      ticks: {
        maxTicksLimit: 5,
      },
    },
    y: {
      ticks: {
        maxTicksLimit: 5,
      },
    },
  },
  animations: {
    show: {
      animations: {
        x: { from: 0 },
        y: { from: 0 },
      },
    },
    hide: {
      animations: {
        x: { to: 0 },
        y: { to: 0 },
      },
    },
  },
};

function ChartComponent({ data, labels }) {
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Total Sales",
        // data: [data?.sales_data[0].total_sales , data?.sales_data[1].total_sales],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
      },
    ],
  };

  return (
    <div>
      <Line className='!h-28 !w-full' data={chartData} options={options} />
    </div>
  );
}

export default ChartComponent;
