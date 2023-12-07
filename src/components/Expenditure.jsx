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
const Expenditure = () => {
    const [campusBudget, setCampusBudget] = useState([1172322, 819412, 819332]);
    const [campusExpenditure, setCampusExpenditure] = useState([
        917232, 781216, 682123,
    ]);

    const [expenditure, setExpenditure] = useState({
        labels: ["Personnel Services", "Capita;", "MOOE"],
        datasets: [
            {
                label: "Campus Budget",
                data: campusBudget,
                backgroundColor: ["#FCD34D", "#FCD34D", "#FCD34D"],
            },
            {
                label: "Campus Expenditure",
                data: campusExpenditure,
                backgroundColor: ["#FCD34D", "#FCD34D", "#FCD34D"],
            },
        ],
    });

    const [campusTotalExpenditure, setCampusTotalExpenditure] = useState({
        labels: ["MDS Funds", "STF Funds"],
        datasets: [
            {
                label: "Campus Total Expenditure",
                data: [917232, 781216],
                backgroundColor: ["#FCD34D", "#FCD34D", "#FCD34D"],
            },
        ],
    });

    return (
        <>
            <div className="grid col-span-6 p-4 border-2 border-gray-200 border-dashed rounded-lg grid-cols-6 gap-4 row-span-2">
                <div className="grid col-span-3 p-4 border-2 border-gray-200 border-dashed rounded-lg grid-cols-2 gap-4">
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
                    <div className="col-span-2 row-span-1 p-4 border-2 border-gray-200 border-dashed rounded-lg">
                        <Bar data={expenditure} />
                    </div>
                </div>

                <div className="col-span-3 row-span-1 p-4 border-2 border-gray-200 border-dashed rounded-lg">
                    <Pie data={campusTotalExpenditure} />
                </div>
            </div>
        </>
    );
};

export default Expenditure;
