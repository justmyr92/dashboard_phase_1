import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import AddUnit from "../components/AddUnit";
import UpdateUnit from "../components/UpdateUnit";
import Notifications from "../components/Notifications";
import DataTable from "react-data-table-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBuildingUser,
    faSquarePlus,
} from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import io from "socket.io-client";

const socket = io("https://csddashboard.online:5000", { secure: true });
const Units = () => {
    const [ID, setID] = useState(localStorage.getItem("ID"));
    const [ROLE, setROLE] = useState(localStorage.getItem("ROLE"));
    const [showAddUnit, setShowAddUnit] = useState(false);
    const [showUpdateUnit, setShowUpdateUnit] = useState(false);
    const [unit, setUnit] = useState(null);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        if (!ID) {
            window.location.href = "/login";
        }
    }, [ID]);

    const [units, setUnits] = useState([]);

    useEffect(() => {
        const getUnits = async () => {
            const response = await fetch(
                `https://csddashboard.online/api/unit/sdo/${ID}`
            );
            const data = await response.json();
            setUnits(data);
        };

        if (ROLE === "sdo") {
            getUnits();
        }
        {
            const getUnits = async () => {
                const response = await fetch(
                    `https://csddashboard.online/api/unit`
                );
                const data = await response.json();
                setUnits(data);
            };
            getUnits();
        }
        console.log(units);
    }, [reload]);

    useEffect(() => {
        socket.on("fetchUnits", (submitStatus) => {
            setReload(true);
        });
    }, [socket]);

    const columns = [
        {
            name: "#",
            selector: "customId",
            sortable: true,
        },
        {
            name: "Name",
            selector: "unit_name",
            sortable: true,
        },
        {
            name: "Address",
            selector: "unit_address",
            sortable: true,
        },
        {
            name: "Contact",
            selector: "unit_phone",
            sortable: true,
        },
        {
            name: "Email",
            selector: "unit_email",
            sortable: true,
        },
        {
            name: "Action",
            cell: (row) => (
                <button
                    data-modal-target="default-modal"
                    data-modal-toggle="default-modal"
                    className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2.5 text-center"
                    type="button"
                    onClick={() => {
                        setUnit(row);
                        setShowUpdateUnit(true);
                    }}
                >
                    <FontAwesomeIcon icon={faEdit} />
                </button>
            ),
        },
    ];

    const unitsWithCustomId = units.map((unit, index) => ({
        ...unit,
        customId: index + 1,
    }));

    return (
        <section className="dashboard">
            <Sidebar />
            <div className="p-4 sm:ml-64">
                <div className="p-4">
                    <div className="header flex justify-between items-center mb-5">
                        <h3 className="text-3xl title text-gray-700">
                            <FontAwesomeIcon icon={faBuildingUser} /> Units
                        </h3>
                        <button
                            data-modal-target="default-modal"
                            data-modal-toggle="default-modal"
                            className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            type="button"
                            onClick={() => setShowAddUnit(true)}
                        >
                            <FontAwesomeIcon icon={faSquarePlus} /> Add Unit
                        </button>
                        {showAddUnit && (
                            <AddUnit
                                showModal={showAddUnit}
                                setShowModal={setShowAddUnit}
                                setReload={setReload}
                            />
                        )}
                        {ROLE === "unit" && <Notifications />}
                    </div>
                    <hr />
                    <DataTable
                        columns={columns}
                        data={unitsWithCustomId}
                        pagination
                        highlightOnHover
                        pointerOnHover
                        striped
                        fixedHeader
                        className="border border-gray-200 rounded-md"
                    />
                </div>
            </div>
            {showUpdateUnit && unit && (
                <UpdateUnit
                    showModal={showUpdateUnit}
                    setShowModal={setShowUpdateUnit}
                    setReload={setReload}
                    unitData={unit}
                />
            )}
        </section>
    );
};

export default Units;
