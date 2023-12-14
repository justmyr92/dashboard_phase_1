import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import io from "socket.io-client";

const socket = io("https://csddashboard.online:5000", { secure: true });

const RecordBarChart = () => {
    const [sdgs, setSdgs] = useState([]);
    const [reload, setReload] = useState(false);
    const sdgColors = [
        "#FF6384",
        "#4BC0C0",
        "#FFCE56",
        "#E7E9ED",
        "#9966CC",
        "#FFD700",
        "#ADFF2F",
        "#4B0082",
        "#20B2AA",
        "#DC143C",
        "#00CED1",
        "#FF4500",
        "#8B4513",
        "#000080",
        "#2E8B57",
        "#FF69B4",
        "#808080",
    ];

    useEffect(() => {
        const fetchSdgs = async () => {
            try {
                const response = await fetch(
                    `https://csddashboard.online/api/sdg/count`
                );
                const data = await response.json();
                setSdgs(data);
            } catch (error) {
                console.error("Error fetching sdgs:", error);
            }
        };
        const fetchData = async () => {
            await fetchSdgs();
            setReload(false);
        };
        fetchData();
    }, [reload]);

    useEffect(() => {
        socket.on("fetchRecords", (submitStatus) => {
            setReload(true);
        });
    }, []);

    const data = {
        labels: sdgs.map((sdg) => sdg.sdg_id),
        datasets: [
            {
                label: "Total Records",
                data: sdgs.map((sdg) => sdg.count),
                backgroundColor: sdgColors,
                borderColor: sdgColors,

                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Total Records by SDG Accummulated",
            },
        },
    };

    return (
        <div className="card bg-white rounded-lg p-5 border border-red-500 hover:border-blue-500 col-span-2">
            <Bar data={data} options={options} />
        </div>
    );
};

export default RecordBarChart;
