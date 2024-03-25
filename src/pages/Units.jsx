import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Sidebar from "../components/Sidebar";
import AddUnit from "../components/AddUnit";
import UpdateUnit from "../components/UpdateUnit";
import Notifications from "../components/Notifications";
import DataTable from "react-data-table-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import {
    faBuildingUser,
    faSquarePlus,
} from "@fortawesome/free-solid-svg-icons";
import { getUnitPerSdoById, getUnits, updateUnitStatus } from "../services/api";

const Units = () => {
    const ID = useState(localStorage.getItem("ID"));
    const ROLE = useState(localStorage.getItem("ROLE"));
    const [showAddUnit, setShowAddUnit] = useState(false);
    const [showUpdateUnit, setShowUpdateUnit] = useState(false);
    const [unit, setUnit] = useState(null);
    const [reload, setReload] = useState(false);
    const [search, setSearch] = useState("");

    useEffect(() => {
        if (!ID) {
            window.location.href = "/login";
        }
    }, [ID]);

    const [units, setUnits] = useState([]);

    useEffect(() => {
        function searchUnit(data) {
            if (search.length > 0) {
                setUnits(
                    data.filter((unit) => {
                        return (
                            unit.unit_name
                                .toLowerCase()
                                .includes(search.toLowerCase()) ||
                            unit.unit_address
                                .toLowerCase()
                                .includes(search.toLowerCase()) ||
                            unit.unit_phone
                                .toLowerCase()
                                .includes(search.toLowerCase()) ||
                            unit.unit_email
                                .toLowerCase()
                                .includes(search.toLowerCase())
                        );
                    })
                );
            } else {
                setUnits(data);
            }
        }
        const fetchData = async () => {
            if (ROLE === "sdo") {
                const data = await getUnitPerSdoById(ID);
                searchUnit(data);
            } else {
                const data = await getUnits();
                searchUnit(data);
            }
        };
        fetchData();
    }, [reload, search, ROLE, ID]);

    const columns = [
        {
            name: "#",
            selector: (row) => row.customId,
            sortable: true,
            width: "5%",
        },
        {
            name: "Name",
            selector: (row) => row.unit_name,
            sortable: true,
        },
        {
            name: "Address",
            selector: (row) => row.unit_address,
            sortable: true,
        },
        {
            name: "Status",
            selector: (row) => row.status,

            cell: (row) => (
                <span
                    className={`px-2 py-1 text-white rounded-lg text-xs font-medium ${
                        row.status === true ? "bg-green-500" : "bg-red-500"
                    }`}
                >
                    {row.status === true ? "Active" : "Deactivated"}
                </span>
            ),
        },
        {
            name: "Contact",
            selector: (row) => row.unit_phone,
            sortable: true,
        },
        {
            name: "Email",
            selector: (row) => row.unit_email,
            sortable: true,
        },
        {
            name: "Action",
            cell: (row) => (
                <div className="flex gap-2">
                    <button
                        data-modal-target="default-modal"
                        data-modal-toggle="default-modal"
                        className="text-blue-600 bg-none me-2"
                        type="button"
                        onClick={() => {
                            setUnit(row);
                            setShowUpdateUnit(true);
                        }}
                    >
                        Update
                    </button>
                    <button
                        className="text-red-600 bg-none"
                        type="button"
                        onClick={() => toggleUnitStatus(row)}
                    >
                        Set status
                    </button>
                </div>
            ),
        },
    ];

    const unitsWithCustomId = units.map((unit, index) => ({
        ...unit,
        customId: index + 1,
    }));

    const toggleUnitStatus = (row) => {
        Swal.fire({
            title: "Are you sure?",
            text: `Do you want to toggle the status of ${row.unit_name}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "No",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const data = await updateUnitStatus(row.unit_id, !row.status);
                if (data) {
                    Swal.fire("Success", "Unit status updated", "success");
                    setReload(!reload);
                } else {
                    Swal.fire("Error", "Failed to update unit status", "error");
                }
            }
        });
    };

    return (
        <section className="dashboard">
            <Sidebar />
            <div className="p-4 sm:ml-64">
                <div className="p-4">
                    <div className="header flex justify-between items-center mb-5">
                        <h3 className="text-3xl title text-gray-700">
                            <FontAwesomeIcon icon={faBuildingUser} /> Units
                        </h3>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none pl-8"
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
