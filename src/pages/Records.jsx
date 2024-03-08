import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import AddRecord from "../components/AddRecord";
import ViewFiles from "../components/ViewFiles";
import DataTable from "react-data-table-component";
import ViewRecords from "../components/ViewRecords";
import SetNotification from "../components/SetNotification";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircleCheck,
    faFile,
    faList,
    faSearch,
} from "@fortawesome/free-solid-svg-icons";
import Notifications from "../components/Notifications";
const Records = () => {
    const [ID, setID] = useState(localStorage.getItem("ID"));
    const [ROLE, setROLE] = useState(localStorage.getItem("ROLE"));
    const [showAddRecord, setShowAddRecord] = useState(false);
    const [reload, setReload] = useState(false);
    const [records, setRecords] = useState([]);
    const [showViewFile, setShowViewFile] = useState(false);
    const [viewRecordModal, setViewRecordModal] = useState(false);
    const [record_data_id, setRecord_data_id] = useState(null);
    const [file, setFile] = useState(null);
    const [ids, setIds] = useState([]);
    const [selectedRecords, setSelectedRecords] = useState([]);
    const [unit, setUnit] = useState([]);

    const [search, setSearch] = useState("");

    const [showUpdateStatus, setShowUpdateStatus] = useState(false);
    useEffect(() => {
        if (!ID) {
            window.location.href = "/login";
        }
        const getUnit = async () => {
            const response = await fetch(`http://localhost:5000/api/unit`);
            const data = await response.json();
            setUnit(data);
        };
        getUnit();
    }, [ID]);

    useEffect(() => {
        console.log(reload);
        const getRecords = async () => {
            const response = await fetch(
                `http://localhost:5000/api/record_data/unit`
            );
            const data = await response.json();
            console.log(data);

            if (ROLE === "sdo") {
                const filteredData = data.filter(
                    (record) => record.sdo_officer_id === ID
                );
                setRecords(filteredData);
            } else if (ROLE === "unit") {
                const filteredData = data.filter(
                    (record) => record.unit_id === ID
                );
                setRecords(filteredData);
            } else {
                setRecords(data);
            }

            setReload(false);
        };

        getRecords();
        console.log(records);
    }, [reload, ID, ROLE]);

    const [searchedRecords, setSearchedRecords] = useState([]);

    useEffect(() => {
        setSearchedRecords(
            records.filter(
                (record) =>
                    //all fields to be searched
                    record.record_data_id
                        .toString()
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||
                    record.unit_name
                        .toString()
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||
                    record.sdg_name
                        .toString()
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||
                    record.record_date
                        .toString()
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||
                    record.record_status
                        .toString()
                        .toLowerCase()
                        .includes(search.toLowerCase())
            )
        );
    }, [search, records]);

    const columns = [
        {
            name: "Record ID",
            selector: (row) => row.record_data_id,
            sortable: true,
            width: "10%",
        },
        {
            name: "Unit Name",
            selector: (row) => row.unit_name,
            sortable: true,
            omit: ROLE === "unit",
        },
        {
            name: "SDG Indicator",
            sortable: true,
            selector: (row) => row.sdg_name,
        },
        {
            name: "Date Uploaded",
            selector: (row) => row.record_date.toString().split("T")[0],
            sortable: true,
            sortFunction: (a, b) => {
                return new Date(a.record_date) - new Date(b.record_date);
            },
        },
        {
            name: "Status",
            selector: (row) => row.record_status,
            sortable: true,
        },
        {
            name: "Action",
            selector: (row) =>
                ROLE === "sdo" ? (
                    <div className="flex space-x-2">
                        <button
                            onClick={() => {
                                setShowViewFile(true);
                                setFile(row.record_data_id);
                            }}
                            className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-[10px] px-3 py-2.5 text-center"
                            type="button"
                        >
                            <FontAwesomeIcon icon={faFile} />
                        </button>
                        <button
                            onClick={() => {
                                setRecord_data_id(row.record_data_id);
                                setViewRecordModal(true);
                            }}
                            className="block text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-[10px] px-3 py-2.5 text-center"
                            type="button"
                        >
                            <FontAwesomeIcon icon={faList} />
                        </button>
                        <button
                            onClick={() => {
                                setSelectedRecords(row);
                                setShowUpdateStatus(true);
                            }}
                            className="block text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg px-3 py-2.5 text-center text-[10px]"
                        >
                            <FontAwesomeIcon icon={faCircleCheck} />
                        </button>
                    </div>
                ) : (
                    <div className="flex space-x-2">
                        <button
                            onClick={() => {
                                setShowViewFile(true);
                                setFile(row.record_data_id);
                            }}
                            className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-[10px] px-3 py-2.5 text-center"
                            type="button"
                        >
                            <FontAwesomeIcon icon={faFile} />
                        </button>
                        <buttons
                            onClick={() => {
                                setRecord_data_id(row.record_data_id);
                                setViewRecordModal(true);
                            }}
                            className="block text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-[10px] px-3 py-2.5 text-center"
                            type="button"
                        >
                            <FontAwesomeIcon icon={faList} />
                        </buttons>
                    </div>
                ),
            sortable: true,
        },
    ];

    return (
        <section className="dashboard">
            {viewRecordModal && (
                <ViewRecords
                    setShowModal={setViewRecordModal}
                    record_data_id={record_data_id}
                />
            )}
            {showUpdateStatus && (
                <SetNotification
                    showModal={showUpdateStatus}
                    setShowModal={setShowUpdateStatus}
                    selectedRecords={selectedRecords}
                    setReload={setReload}
                />
            )}
            <Sidebar />
            <div className="p-4 sm:ml-64 h-screen">
                <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg h-full">
                    {showViewFile ? (
                        <>
                            <div className="header flex justify-between items center mb-5">
                                <h3 className="text-3xl font-bold text-gray-700">
                                    <FontAwesomeIcon icon={faFile} /> Records
                                </h3>
                                <button
                                    onClick={() => setShowViewFile(false)}
                                    className="block text-white bg-blue-700 hover:bg-blue-800 outline-none font-medium rounded-lg text-[10px] px-3 py-2.5 text-center"
                                    type="button"
                                >
                                    Back
                                </button>
                            </div>
                            <hr />
                            <ViewFiles record_data_id={file} />
                        </>
                    ) : (
                        <>
                            <div className="header flex justify-between items center mb-5">
                                <h3 className="text-3xl font-bold text-gray-700">
                                    <FontAwesomeIcon icon={faFile} /> Records
                                </h3>

                                <div className="control-container flex items-center space-x-2">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            className="block w-full border border-gray-300 rounded bg-white outline-none px-3 py-2.5 text-sm"
                                            placeholder="Search"
                                            value={search}
                                            onChange={(e) =>
                                                setSearch(e.target.value)
                                            }
                                        />
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                            <FontAwesomeIcon icon={faSearch} />{" "}
                                        </div>
                                    </div>
                                    {ROLE !== "sdo" && (
                                        <button
                                            data-modal-target="default-modal"
                                            data-modal-toggle="default-modal"
                                            className="block text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-[10px]  px-3 py-2.5 text-center"
                                            type="button"
                                            onClick={() =>
                                                setShowAddRecord(true)
                                            }
                                        >
                                            Add Record
                                        </button>
                                    )}
                                    {ROLE === "unit" && <Notifications />}
                                </div>
                                {showAddRecord && (
                                    <AddRecord
                                        showModal={showAddRecord}
                                        setShowModal={setShowAddRecord}
                                        setReload={setReload}
                                    />
                                )}
                            </div>
                            <hr className="my-5 border-gray-300 border-1" />
                            <div className="border border-gray-200 rounded-lg max-w-[100vw] overflow-x-auto">
                                <DataTable
                                    columns={columns}
                                    data={searchedRecords}
                                    pagination
                                    striped
                                    highlightOnHover
                                    responsive
                                    defaultSortFieldId={2}
                                    className="w-[100%] overflow-x-auto"
                                />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Records;
