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
import { getStatus } from "../services/api";

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
        const fetchData = async () => {
            try {
                const data = await getStatus();
                // Sort the status data based on count in descending order
                data.sort((a, b) => b.count - a.count);
                setStatus(data);
                setReload(false);
            } catch (error) {
                console.error("Error fetching status:", error);
            }
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
