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
const Ppa = () => {
    const [ppaUsedPerQuarter, setPpaUsedPerQuarter] = useState({
        labels: ["1st Quarter", "2nd Quarter", "3rd Quarter", "4th Quarter"],
        datasets: [
            {
                label: "PPA Used per Quarter",
                data: [100, 200, 300, 400],
                backgroundColor: ["#FCD34D", "#FCD34D", "#FCD34D"],
            },
        ],
    });

    const [ppaProportionPerAgenda, setPpaProportionPerAgenda] = useState({
        labels: ["SDG 1", "SDG 2", "SDG 3", "SDG 4"],
        datasets: [
            {
                label: "PPA Proportion per Agenda",
                data: [100, 200, 300, 400],
                backgroundColor: ["#FCD34D", "#FCD34D", "#FCD34D"],
            },
        ],
    });

    return (
        <>
            <div className="grid col-span-6 p-4 border-2 border-gray-200 border-dashed rounded-lg grid-cols-6 gap-4 row-span-2">
                <div className="grid col-span-3 p-4 border-2 border-gray-200 border-dashed rounded-lg grid-cols-2 gap-4">
                    <div className="card bg-white shadow-lg rounded-lg p-5 border border-gray-200 hover:border-blue-500 col-span-2">
                        <Bar data={ppaUsedPerQuarter} />
                    </div>
                    <div className="card bg-white shadow-lg rounded-lg p-5 border border-gray-200 hover:border-blue-500">
                        <h3 className="text-xl font-bold text-gray-700">61%</h3>
                        <p className="text-gray-700 text-sm">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Quisquam, voluptatum.
                        </p>
                    </div>
                    <div className="card bg-white shadow-lg rounded-lg p-5 border border-gray-200 hover:border-blue-500">
                        <h3 className="text-xl font-bold text-gray-700">61%</h3>
                        <p className="text-gray-700 text-sm">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Quisquam, voluptatum.
                        </p>
                    </div>
                </div>
                <div className="grid col-span-3 p-4 border-2 border-gray-200 border-dashed rounded-lg grid-cols-1 gap-4">
                    <div className="card bg-white shadow-lg rounded-lg p-5 border border-gray-200 hover:border-blue-500">
                        <Pie data={ppaProportionPerAgenda} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Ppa;
