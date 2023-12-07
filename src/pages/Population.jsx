import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import DataTable from "react-data-table-component";
import AddPopulation from "../components/AddPopulation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquare, faSquarePlus } from "@fortawesome/free-solid-svg-icons";
const Population = () => {
    const [ID, setID] = useState(localStorage.getItem("ID"));
    const [ROLE, setROLE] = useState(localStorage.getItem("ROLE"));

    useEffect(() => {
        if (!ID) {
            window.location.href = "/login";
        }
    }, [ID]);

    const [enrolled, setEnrolled] = useState([]);

    const columns = [
        {
            name: "#",
            selector: (row, index) => index + 1,
            sortable: true,
        },
        {
            name: "School Year",
            selector: (row) => row.enrollment_school_year,
            sortable: true,
        },
        {
            name: "Year Level",
            selector: (row) => row.enrollment_year_level,
            sortable: true,
        },
        {
            name: "Gender",
            selector: (row) => row.enrollment_gender,
            sortable: true,
        },
        {
            name: "Enrolled",
            selector: (row) => row.enrollment_number,
            sortable: true,
        },
        {},
    ];

    const [showAddPopulation, setShowAddPopulation] = useState(false);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        const getEnrolled = async () => {
            const response = await fetch("http://localhost:5000/enrollment");
            const data = await response.json();
            setEnrolled(data);
            setReload(false);
        };
        getEnrolled();
        console.log(enrolled);
    }, [reload]);

    return (
        <section className="population">
            <Sidebar />
            <div className="p-4 sm:ml-64">
                <div className="p-4 border-2 border-gray-500 border-dashed rounded-lg min-h-[calc(100vh-2rem)]">
                    <div className="header flex justify-between items-center">
                        <h3 className="text-3xl font-bold text-gray-700 title">
                            Population
                        </h3>
                        <button
                            className="btn bg-blue-500 text-white hover:bg-blue-600 px-3 py-2 rounded-lg"
                            onClick={() => setShowAddPopulation(true)}
                        >
                            <FontAwesomeIcon
                                icon={faSquarePlus}
                                className="mr-2"
                            />
                            Add Population
                        </button>
                    </div>
                    <hr className="my-5 border-gray-800 border-1" />
                    <DataTable
                        columns={columns}
                        data={enrolled}
                        pagination
                        highlightOnHover
                        striped
                        responsive
                    />
                </div>
            </div>
            {showAddPopulation && (
                <AddPopulation
                    setShowModal={setShowAddPopulation}
                    showModal={showAddPopulation}
                    setReload={setReload}
                />
            )}
        </section>
    );
};

export default Population;
