import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Population from "../components/Population";
import ChartSDG from "../components/ChartSDG";
import Notifications from "../components/Notifications";
import sdg_1 from "../assets/res/E-WEB-Goal-01.png";

const Ladder = () => {
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
            <div className="p-4 sm:ml-64">
                <div className="p-4 border-2 border-gray-500 border-dashed rounded-lg">
                    <div className="header flex justify-between items-center">
                        <h3 className="text-3xl font-bold text-gray-700 title">
                            Dashboard
                        </h3>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Ladder;
