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

const Population = () => {
    const [enrolled, setEnrolled] = useState([]); // Add enrolledByYearLevel as a dependency
    const [population, setPopulation] = useState([]); // Add enrolledByGender as a dependency
    const [enrolledByGender, setEnrolledByGender] = useState([
        { gender: "Female", count: 760 },
        { gender: "Male", count: 740 },
    ]);
    const [enrolledByYearLevel, setEnrolledByYearLevel] = useState({
        labels: ["1st Year", "2nd Year", "3rd Year", "4th Year", "5th Year"],
        datasets: [
            {
                label: "Enrolled",
                data: [100, 200, 300, 400, 500],
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

    const [personel, setPersonel] = useState([
        { gender: "Female", count: 890 },
        { gender: "Male", count: 615 },
    ]);

    const [personelByPosition, setPersonelByPosition] = useState({
        labels: ["Teaching Personnel", "Non-Teaching Personnel"],
        datasets: [
            {
                label: "Personel",
                data: [567, 938],
                backgroundColor: ["#3B82F6", "#2563EB", "#1D4ED8"],
                borderColor: "#FFFFFF",
                borderWidth: 1,
            },
        ],
    });

    return (
        <>
            <div className="col-span-3 row-span-3 p-4 border-2 border-gray-200 border-dashed rounded-lg">
                <div className="flex justify-between items-center">
                    <h3 className="text-xl title text-gray-800">Enrolled</h3>
                </div>
                <Pie data={enrolledByYearLevel} />
            </div>
            <div className="grid row-span-3 col-span-3 grid-cols-2 gap-4">
                <div className="col-span-2 row-span-1 p-4 border-2 border-gray-200 border-dashed rounded-lg">
                    <h3 className="text-xl title text-gray-800">
                        Student Population
                    </h3>
                    <div className="flex flex-col justify-between items-start">
                        {enrolledByGender.map(({ gender, count }) => (
                            <p key={gender} className="text-gray-800 text-lg">
                                {gender}: {count}
                            </p>
                        ))}
                    </div>
                </div>
                <div className="col-span-2 row-span-1 p-4 border-2 border-gray-200 border-dashed rounded-lg">
                    <h3 className="text-xl title text-gray-800">
                        Personel Population
                    </h3>
                    <div className="flex flex-col justify-between items-start">
                        {personel.map(({ gender, count }) => (
                            <p key={gender} className="text-lg text-gray-800">
                                {gender}: {count}
                            </p>
                        ))}
                    </div>
                </div>
                <div className="col-span-2 row-span-1 p-4 border-2 border-gray-200 border-dashed rounded-lg">
                    <div className="flex justify-between items-center">
                        <h3 className="text-xl title text-gray-800">
                            Personel
                        </h3>
                    </div>
                    <Bar data={personelByPosition} />
                </div>
            </div>
        </>
    );
};

export default Population;
