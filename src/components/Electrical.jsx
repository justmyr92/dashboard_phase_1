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

const Electrical = () => {
    const [electrical, setElectrical] = useState({
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
                label: "Electrical Consumption",
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
                    //any yellow shade
                    "#FCD34D",
                    "#FBBF24",
                    "#F59E0B",
                    "#D97706",
                    "#B45309",
                    "#92400E",
                    "#78350F",
                    "#FCD34D",
                    "#FBBF24",
                    "#F59E0B",
                    "#FBBF24",
                    "#F59E0B",
                ],
                borderColor: "#FFFFFF",
                borderWidth: 1,
            },
        ],
    });

    const [consumptionPerCampus, setConsumptionPerCampus] = useState({
        labels: ["Balayan", "Bauan", "Lemery", "Lipa", "Nasugbu", "Rosario"],
        datasets: [
            {
                label: "Consumption Per Campus",
                data: [567, 938, 215, 81, 56, 55],
                backgroundColor: [
                    "#D97706",
                    "#B45309",
                    "#92400E",
                    "#78350F",
                    "#FCD34D",
                ],
                borderColor: "#FFFFFF",
                borderWidth: 1,
            },
        ],
    });

    const [fuelConsumption, setFuelConsumption] = useState({
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
                label: "Fuel Consumption",
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

                backgroundColor: ["#3B82F6", "#2563EB", "#1D4ED8"],
                borderColor: "#FFFFFF",
                borderWidth: 1,
            },
        ],
    });

    //fule consumption by vehicle type
    const [fuelConsumptionByVehicleType, setFuelConsumptionByVehicleType] =
        useState({
            labels: ["Car", "Motorcycle", "Truck"],
            datasets: [
                {
                    label: "Fuel Consumption By Vehicle Type",
                    data: [567, 938, 215],
                    backgroundColor: ["#3B82F6", "#2563EB", "#1D4ED8"],
                    borderColor: "#FFFFFF",
                    borderWidth: 1,
                },
            ],
        });

    return (
        <>
            <div className="grid col-span-3 p-4 border-2 border-gray-200 border-dashed rounded-lg grid-cols-2 gap-4">
                <div className="col-span-2 row-span-1 p-4 border-2 border-gray-200 border-dashed rounded-lg">
                    <Bar data={electrical} />
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
            <div className="grid col-span-3 p-4 border-2 border-gray-200 border-dashed rounded-lg grid-cols-2 gap-4">
                <Pie data={consumptionPerCampus} />
            </div>
            <div className="grid col-span-2 p-4 border-2 border-gray-200 border-dashed rounded-lg grid-cols-2 gap-4">
                <Pie data={fuelConsumptionByVehicleType} />
            </div>
            <div className="grid col-span-2 p-4 border-2 border-gray-200 border-dashed rounded-lg grid-cols-2 gap-4">
                <Pie data={fuelConsumption} />
            </div>
            <div className="grid col-span-2 p-4 border-2 border-gray-200 border-dashed rounded-lg grid-cols-1 gap-4">
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
        </>
    );
};

export default Electrical;
