import React, { useEffect, useState } from "react";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    Title
);
const WasteManagement = () => {
    const [WasteGeneration, setWasteGeneration] = useState({
        labels: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November ",
            "December",
        ],
        datasets: [
            {
                label: "Residual",
                data: [
                    //math random for random number 12 times
                    Math.floor(Math.random() * 100),
                    Math.floor(Math.random() * 100),
                    Math.floor(Math.random() * 100),
                    Math.floor(Math.random() * 100),
                    Math.floor(Math.random() * 100),
                    Math.floor(Math.random() * 100),
                    Math.floor(Math.random() * 100),
                    Math.floor(Math.random() * 100),
                    Math.floor(Math.random() * 100),
                    Math.floor(Math.random() * 100),
                    Math.floor(Math.random() * 100),
                    Math.floor(Math.random() * 100),
                ],
                backgroundColor: ["#F87171"],
                borderColor: ["#FFFFFF"],
            },
            {
                label: "Recyclable",
                data: [
                    Math.floor(Math.random() * 100),
                    Math.floor(Math.random() * 100),
                    Math.floor(Math.random() * 100),
                    Math.floor(Math.random() * 100),
                    Math.floor(Math.random() * 100),
                    Math.floor(Math.random() * 100),
                    Math.floor(Math.random() * 100),
                    Math.floor(Math.random() * 100),
                    Math.floor(Math.random() * 100),
                    Math.floor(Math.random() * 100),
                    Math.floor(Math.random() * 100),
                    Math.floor(Math.random() * 100),
                ],
                backgroundColor: ["#F87171"],
                borderColor: ["#FFFFFF"],
            },
            {
                label: "Hazardous",
                data: [
                    Math.floor(Math.random() * 100),
                    Math.floor(Math.random() * 100),
                    Math.floor(Math.random() * 100),
                    Math.floor(Math.random() * 100),
                    Math.floor(Math.random() * 100),
                    Math.floor(Math.random() * 100),
                    Math.floor(Math.random() * 100),
                    Math.floor(Math.random() * 100),
                    Math.floor(Math.random() * 100),
                    Math.floor(Math.random() * 100),
                    Math.floor(Math.random() * 100),
                    Math.floor(Math.random() * 100),
                ],
            },
        ],
    });

    // const

    return (
        <>
            <div className="col-span-3 grid grid-cols-2 gap-4 p-4 border-2 border-gray-200 border-dashed rounded-lg">
                <div className="card bg-white shadow-lg rounded-lg p-5 border border-gray-200 hover:border-blue-500 row-span-1">
                    <h3 className="text-xl font-bold text-gray-700">61%</h3>
                    <p className="text-gray-700 text-sm">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Quisquam, voluptatum.
                    </p>
                </div>
                <div className="card bg-white shadow-lg rounded-lg p-5 border border-gray-200 hover:border-blue-500 row-span-1">
                    <h3 className="text-xl font-bold text-gray-700">61%</h3>
                    <p className="text-gray-700 text-sm">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Quisquam, voluptatum.
                    </p>
                </div>
                <div className="col-span-2 row-span-2 p-4 border-2 border-gray-200 border-dashed rounded-lg row-span-2">
                    <Pie data={WasteGeneration} />
                </div>
            </div>
            <div className="col-span-3 grid grid-cols-2 gap-4 p-4 border-2 border-gray-200 border-dashed rounded-lg">
                <div className="col-span-3 row-span-2 p-4 border-2 border-gray-200 border-dashed rounded-lg">
                    <Bar data={WasteGeneration} />
                </div>
                <div className="col-span-3 row-span-1 p-4 border-2 border-gray-200 border-dashed rounded-lg">
                    <Pie data={WasteGeneration} />
                </div>
            </div>
        </>
    );
};

export default WasteManagement;
