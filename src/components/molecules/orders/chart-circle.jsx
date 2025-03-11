import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Text from "../../atoms/text";
import Title from "../../atoms/title";
import TextBold from "../../atoms/text-bold";

ChartJS.register(ArcElement, Tooltip, Legend);

const ChartCircle = ({
    labelOne,
    labelTwo,
    labelThree,
    labelFour,
    labelFive,
    circleOne,
    circleTwo,
    circleThree,
    circleFour,
    circleFive,
    }) => {

    const data = {
        labels: [labelOne, labelTwo, labelThree, labelFour, labelFive],
        datasets: [
        {
            data: [circleOne, circleTwo, circleThree, circleFour, circleFive],
            backgroundColor: ["#6669F9", "#0050B3", "green", "#52C41A", "#FFDD00"],
            hoverOffset: 4,
            cutout: "80%",
        },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
        },
    };

    return (
        <div className="flex items-center justify-center space-x-4">
            {/* لیبل‌ها */}
            <div className="flex flex-col space-y-2">
                {data.labels.map((label, index) => (
                    <div key={index} className="flex items-center space-x-2 gap-2">
                        <Text>{label}</Text>
                        <span
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: data.datasets[0].backgroundColor[index] }}
                        ></span>
                    </div>
                ))}
            </div>
            {/* چارت */}
            <div className="w-1/2">
                <div className="flex justify-center items-center">
                    <div className="absolute text-center grid gap-2">
                        <Text>فروش ها</Text>
                        <TextBold>13,569 ريال</TextBold>
                    </div>
                    <Doughnut data={data} options={options} />
                </div>
            </div>
        </div>
    );
};

export default ChartCircle;
