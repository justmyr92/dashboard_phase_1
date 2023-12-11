import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import DataTable from "react-data-table-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faSquarePlus,
    faSearch,
    faUsers,
} from "@fortawesome/free-solid-svg-icons";
import AddSDOfficer from "../components/AddSDOfficer";

const SDOfficer = () => {
    const [SDOfficers, setSDOfficers] = useState([]);
    const [modal, setModal] = useState(false);
    const [reload, setReload] = useState(false);
    const [search, setSearch] = useState("");
    const columns = [
        {
            name: "#",
            selector: (row, index) => index + 1,
            sortable: true,
            width: "10%",
        },
        {
            name: "Name",
            selector: (row) => row.sdo_officer_name,
            sortable: true,
            width: "25%",
        },
        {
            name: "Email",
            selector: (row) => row.sdo_officer_email,
            sortable: true,
            width: "25%",
        },
        {
            name: "Phone",
            selector: (row) => row.sdo_officer_phone,
            sortable: true,
            width: "20%",
        },
        {
            name: "Campus",
            selector: (row) => row.campus_name,
            sortable: true,
            width: "20%",
        },
    ];

    useEffect(() => {
        const getSDOfficers = async () => {
            const response = await fetch("http://localhost:5000/sdo-officers");
            const data = await response.json();

            if (search.length > 0) {
                //byall search
                setSDOfficers(
                    data.filter((officer) => {
                        return (
                            officer.sdo_officer_name
                                .toLowerCase()
                                .includes(search.toLowerCase()) ||
                            officer.sdo_officer_email
                                .toLowerCase()
                                .includes(search.toLowerCase()) ||
                            officer.sdo_officer_phone
                                .toLowerCase()
                                .includes(search.toLowerCase()) ||
                            officer.campus_name
                                .toLowerCase()
                                .includes(search.toLowerCase())
                        );
                    })
                );
            } else {
                setSDOfficers(data);
            }
        };
        getSDOfficers();
        setReload(false);
    }, [reload, search]);

    return (
        <section className="sd-officers bg-white h-screen">
            <Sidebar />
            <div className="p-4 sm:ml-64">
                <div className="p-4">
                    <div className="header flex justify-between items-center mb-5">
                        <h3 className="text-3xl font-bold text-gray-700">
                            <FontAwesomeIcon icon={faUsers} className="mr-3" />
                            SD Officers
                        </h3>
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <input
                                    type="text"
                                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none pl-8" // Add left padding for the icon
                                    placeholder="Search"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                <span className="absolute left-3 top-2">
                                    <FontAwesomeIcon
                                        icon={faSearch}
                                        className="text-gray-400"
                                    />
                                </span>
                            </div>
                            <button
                                className="px-4 py-2 bg-blue-600 text-white rounded-md"
                                onClick={() => setModal(true)}
                            >
                                <FontAwesomeIcon icon={faSquarePlus} /> Add SD
                                Officer
                            </button>
                        </div>
                    </div>
                    <hr className="my-5 border-gray-300 border-1" />
                    <DataTable
                        columns={columns}
                        data={SDOfficers}
                        pagination
                        highlightOnHover
                        pointerOnHover
                        striped
                        fixedHeader
                        className="border border-gray-200 rounded-md"
                    />
                </div>
            </div>
            {modal && (
                <AddSDOfficer setReload={setReload} setModal={setModal} />
            )}
        </section>
    );
};

export default SDOfficer;
