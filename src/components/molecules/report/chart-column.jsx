import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ChartColumn = ({ colOne, colTwo, colThree, colFour, colFive, colSix, colSeven }) => {
  const labels = ["1", "2", "3", "4", "5", "6", "7"];
  const data = {
    labels: labels,
    datasets: [
      {
        data: [colOne, colTwo, colThree, colFour, colFive, colSix, colSeven],
        backgroundColor: Array(7).fill("#6669F9"),
        borderColor: Array(7).fill("#6669F9"),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {},
  };

  return <Bar data={data} options={options} />;
};

export default ChartColumn;
