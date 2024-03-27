import { useEffect, useState } from "react";
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
                    `http://localhost:5000/api/status`
                );
                const data = await response.json();
                // Sort the status data based on count in descending order
                data.sort((a, b) => b.count - a.count);
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
