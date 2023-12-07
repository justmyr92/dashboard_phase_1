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

const WaterConsumption = () => {
    const [waterConsumption, setWaterConsumption] = useState({
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
                label: "Water Consumption",
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
                backgroundColor: [
                    "#3B82F6",
                    "#2563EB",
                    "#1D4ED8",
                    "#1E40AF",
                    "#1E3A8A",
                ],
                borderColor: "#FFFFFF",
                borderWidth: 1,
            },
        ],
    });

    const [consumptionType, setConsumptionType] = useState({
        labels: ["Drinking Water", "Deep Well", "Mains"],
        datasets: [
            {
                label: "Consumption Type",
                data: [567, 938, 215],
                backgroundColor: ["#3B82F6", "#2563EB", "#1D4ED8"],
                borderColor: "#FFFFFF",
                borderWidth: 1,
            },
        ],
    });

    useEffect(() => {
        // const getWaterConsumption = async () => {
        //     const response = await fetch(
        //         "http://localhost:5000/api/v1/water-consumption"
        //     );
        //     const data = await response.json();
        //     setWaterConsumption(data);
        // };
        // getWaterConsumption();
    }, []);

    return (
        <>
            <div className="grid col-span-3 p-4 border-2 border-gray-200 border-dashed rounded-lg grid-cols-2 gap-4">
                <div className="col-span-2 row-span-1 p-4 border-2 border-gray-200 border-dashed rounded-lg">
                    <Bar data={waterConsumption} />
                </div>
                <div className="card bg-white shadow-lg rounded-lg p-5 border border-gray-200 hover:border-blue-500">
                    <h3 className="text-xl font-bold text-gray-700">61%</h3>
                    <p className="text-gray-700 text-sm">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Quisquam, voluptatum.
                    </p>
                </div>
                <div className="card bg-white shadow-lg rounded-lg p-5 border border-gray-200 hover:border-blue-500">
                    <h3 className="text-xl font-bold text-gray-700">61%</h3>
                    <p className="text-gray-700 text-sm">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Quisquam, voluptatum.
                    </p>
                </div>
            </div>
            <div className="col-span-3 p-4 border-2 border-gray-200 border-dashed rounded-lg">
                <Pie data={consumptionType} />
            </div>
        </>
    );
};

export default WaterConsumption;
