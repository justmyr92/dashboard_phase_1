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
import { Pie } from "react-chartjs-2";
import io from "socket.io-client";

const socket = io("https://csddashboard.online:5000", { secure: true });

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    Title
);

const RecordPieChart = () => {
    const [status, setStatus] = useState([]);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const response = await fetch(
                    `https://csddashboard.online/api/status`
                );
                const data = await response.json();
                setStatus(data);
            } catch (error) {
                console.error("Error fetching status:", error);
            }
        };

        const fetchData = async () => {
            await fetchStatus();
            setReload(false);
        };
        fetchData();
    }, [reload]);

    useEffect(() => {
        socket.on("fetchRecords", (submitStatus) => {
            console.log(submitStatus);
            setReload(true);
        });
    }, [socket]);

    const data = {
        labels: status && status.map((status) => status.record_status),
        datasets: [
            {
                label: "# of Records by Status",
                data: status && status.map((status) => status.count),
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
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
                text: "Total Records by Status",
            },
        },
    };
    return (
        <div className="card bg-white rounded-lg p-5 border border-red-500 hover:border-blue-500">
            <Pie data={data} options={options} />
        </div>
    );
};

export default RecordPieChart;
