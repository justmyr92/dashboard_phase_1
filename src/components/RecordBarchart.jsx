import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

const RecordBarChart = () => {
    const [sdgs, setSdgs] = useState([]);
    const [selectedSdg, setSelectedSdg] = useState(null);
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
                    `http://localhost:5000/api/sdg/count`
                );
                const data = await response.json();
                // Parse the SDG IDs as integers before sorting
                data.forEach(
                    (sdg) =>
                        (sdg.sdg_id = parseInt(sdg.sdg_id.replace("SDG", "")))
                );
                // Sort the SDGs based on the SDG ID
                data.sort((a, b) => a.sdg_id - b.sdg_id);
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
        console.log(sdgs, "adasdasd");
    }, []);

    const handleSdgSelect = (sdgId) => {
        setSelectedSdg(sdgId);
    };

    const data = {
        labels: sdgs.map((sdg) => `SDG ${sdg.sdg_id}`),
        datasets: [
            {
                label: selectedSdg
                    ? `Total Records by ${selectedSdg}`
                    : "Total Records by SDG",
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
                text: "Total Records by SDG Accumulated",
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
