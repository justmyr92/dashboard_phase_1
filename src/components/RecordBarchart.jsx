import React from "react";
import { Bar } from "react-chartjs-2";

const sdgs = [
    {
        id: "SDG1",
        name: "No Poverty",
        indicator: "Indicator for SDG1",
        color: "#FF6384",
    },
    {
        id: "SDG2",
        name: "Zero Hunger",
        indicator: "Indicator for SDG2",
        color: "#4BC0C0",
    },
    {
        id: "SDG3",
        name: "Good Health and Well-being",
        indicator: "Indicator for SDG3",
        color: "#FFCE56",
    },
    {
        id: "SDG4",
        name: "Quality Education",
        indicator: "Indicator for SDG4",
        color: "#E7E9ED",
    },
    {
        id: "SDG5",
        name: "Gender Equality",
        indicator: "Indicator for SDG5",
        color: "#9966CC",
    },
    {
        id: "SDG6",
        name: "Clean Water and Sanitation",
        indicator: "Indicator for SDG6",
        color: "#FFD700",
    },
    {
        id: "SDG7",
        name: "Affordable and Clean Energy",
        indicator: "Indicator for SDG7",
        color: "#ADFF2F",
    },
    {
        id: "SDG8",
        name: "Decent Work and Economic Growth",
        indicator: "Indicator for SDG8",
        color: "#4B0082",
    },
    {
        id: "SDG9",
        name: "Industry, Innovation, and Infrastructure",
        indicator: "Indicator for SDG9",
        color: "#20B2AA",
    },
    {
        id: "SDG10",
        name: "Reduced Inequality",
        indicator: "Indicator for SDG10",
        color: "#DC143C",
    },
    {
        id: "SDG11",
        name: "Sustainable Cities and Communities",
        indicator: "Indicator for SDG11",
        color: "#00CED1",
    },
    {
        id: "SDG12",
        name: "Responsible Consumption and Production",
        indicator: "Indicator for SDG12",
        color: "#FF4500",
    },
    {
        id: "SDG13",
        name: "Climate Action",
        indicator: "Indicator for SDG13",
        color: "#8B4513",
    },
    {
        id: "SDG14",
        name: "Life Below Water",
        indicator: "Indicator for SDG14",
        color: "#000080",
    },
    {
        id: "SDG15",
        name: "Life on Land",
        indicator: "Indicator for SDG15",
        color: "#2E8B57",
    },
    {
        id: "SDG16",
        name: "Peace, Justice, and Strong Institutions",
        indicator: "Indicator for SDG16",
        color: "#FF69B4",
    },
    {
        id: "SDG17",
        name: "Partnerships for the Goals",
        indicator: "Indicator for SDG17",
        color: "#808080",
    },
];
const data = {
    labels: sdgs.map((sdg, index) => `SDG ${index + 1}`),
    datasets: [
        {
            label: "Number of Occurrences",
            data: Array.from({ length: sdgs.length }, () =>
                Math.floor(Math.random() * 100)
            ),
            backgroundColor: sdgs.map((sdg) => sdg.color || "#36A2EB"), // Use the SDG color if available, otherwise fallback to a default color

            borderWidth: 1,
        },
    ],
};

const options = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: true,
            text: "Number of Occurrences for each SDG",
        },
        tooltip: {
            callbacks: {
                label: (context) => {
                    const sdg = sdgs[context.dataIndex];
                    return `${sdg.name}: ${context.parsed.toFixed(2)}`;
                },
                afterLabel: (context) => {
                    const sdg = sdgs[context.dataIndex];
                    return `Indicator: ${sdg.indicator}`;
                },
            },
        },
    },
    scales: {
        x: {
            title: {
                display: true,
                text: "SDGs",
            },
        },
        y: {
            title: {
                display: true,
                text: "Number of Occurrences",
            },
        },
    },
};

const RecordBarChart = () => {
    return (
        <div className="card bg-white rounded-lg p-5 border border-red-500 hover:border-blue-500 col-span-2">
            <Bar data={data} options={options} />
        </div>
    );
};

export default RecordBarChart;
