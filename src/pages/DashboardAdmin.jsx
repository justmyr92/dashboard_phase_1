import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import ChartSDG from "../components/ChartSDG";
import Notifications from "../components/Notifications";
const DashboardAdmin = () => {
    const [ID, setID] = useState(localStorage.getItem("ID"));
    const [ROLE, setROLE] = useState(localStorage.getItem("ROLE"));

    useEffect(() => {
        if (!ID) {
            window.location.href = "/login";
        }
    }, [ID]);

    return (
        <section className="dashboard">
            <Sidebar />
            <div className="p-4 sm:ml-64 bg-gray-200">
                <div className="p-4 rounded-lg bg-white border border-gray-200">
                    <div className="header flex justify-between items-center">
                        <h3 className="text-3xl font-bold text-gray-700 title">
                            Dashboard
                        </h3>
                        {ROLE === "unit" && <Notifications />}
                    </div>
                    <hr className="my-5 border-gray-800 border-1" />
                    <ChartSDG />{" "}
                    <hr className="my-5 border-gray-800 border-1" />
                </div>
            </div>
        </section>
    );
};

export default DashboardAdmin;
