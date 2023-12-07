import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import DataTable from "react-data-table-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import AddSDOfficer from "../components/AddSDOfficer";

const SDOfficer = () => {
    const [SDOfficers, setSDOfficers] = useState([]);
    const [modal, setModal] = useState(false);
    const [reload, setReload] = useState(false);
    const columns = [
        {
            name: "#",
            selector: (row, index) => index + 1,
            sortable: true,
            width: "50px",
        },
        {
            name: "Name",
            selector: (row) => row.sdo_officer_name,
            sortable: true,
        },
        {
            name: "Email",
            selector: (row) => row.sdo_officer_email,
            sortable: true,
        },
        {
            name: "Phone",
            selector: (row) => row.sdo_officer_phone,
            sortable: true,
        },
        {
            name: "Campus",
            selector: (row) => row.campus_name,
            sortable: true,
        },
    ];

    useEffect(() => {
        const getSDOfficers = async () => {
            const response = await fetch("http://localhost:5000/sdo-officers");
            const data = await response.json();
            setSDOfficers(data);
        };
        getSDOfficers();
        setReload(false);
    }, [reload]);

    return (
        <section className="sd-officers">
            <Sidebar />
            <div className="p-4 sm:ml-64">
                <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg">
                    <div className="header flex justify-between items-center mb-5">
                        <h3 className="text-3xl font-bold text-gray-700">
                            SD Officers
                        </h3>
                        <button
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            onClick={() => setModal(true)}
                        >
                            <FontAwesomeIcon icon={faSquarePlus} /> Add SD
                            Officer
                        </button>
                    </div>
                    <hr className="my-5 border-gray-800 border-1" />
                    <DataTable columns={columns} data={SDOfficers} pagination />
                </div>
            </div>
            {modal && (
                <AddSDOfficer setReload={setReload} setModal={setModal} />
            )}
        </section>
    );
};

export default SDOfficer;
