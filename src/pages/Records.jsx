import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import AddRecord from "../components/AddRecord";
import ViewFiles from "../components/ViewFiles";
import DataTable from "react-data-table-component";
import ViewRecords from "../components/ViewRecords";
import SetNotification from "../components/SetNotification";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile, faSearch } from "@fortawesome/free-solid-svg-icons";
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

    const [search, setSearch] = useState("");

    const [showUpdateStatus, setShowUpdateStatus] = useState(false);
    useEffect(() => {
        if (!ID) {
            window.location.href = "/login";
        }
    }, [ID]);

    useEffect(() => {
        setRecords([]);
        const getRecords = async () => {
            if (ROLE === "sdo") {
                const response = await fetch(
                    `http://localhost:5000/unit_id/${ID}`
                );
                const data = await response.json();
                console.log(data);
                if (data.length > 0) {
                    for (const unit of data) {
                        const response2 = await fetch(
                            `http://localhost:5000/record/all/${unit.unit_id}`
                        );
                        const data2 = await response2.json();
                        if (data2.length > 0) {
                            setRecords((prev) => {
                                const filteredData = data2.filter(
                                    (record) =>
                                        !prev.some(
                                            (prevRecord) =>
                                                prevRecord.record_data_id ===
                                                record.record_data_id
                                        )
                                );
                                return [...prev, ...filteredData];
                            });
                        }
                    }
                }
            } else {
                const response = await fetch(
                    `http://localhost:5000/record/all/${ID}`
                );
                const data = await response.json();
                setRecords(data);
            }
        };

        getRecords();
        console.log(records);
        setReload(false);
    }, [reload, ID, ROLE]);

    const columns = [
        {
            name: "Record ID",
            selector: (row) => row.record_data_id,
            sortable: true,
        },
        {
            name: "Date Uploaded",
            selector: (row) =>
                new Date(row.record_date).toLocaleDateString("en-GB", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                }),
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
                            className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-[10px] px-5 py-2.5 text-center"
                            type="button"
                        >
                            File
                        </button>
                        <button
                            onClick={() => {
                                setRecord_data_id(row.record_data_id);
                                setViewRecordModal(true);
                            }}
                            className="block text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-[10px] px-5 py-2.5 text-center"
                            type="button"
                        >
                            Record
                        </button>
                        <button
                            onClick={() => {
                                setSelectedRecords(row);
                                setShowUpdateStatus(true);
                            }}
                            className="block text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg px-5 py-2.5 text-center text-[10px]"
                        >
                            Status
                        </button>
                    </div>
                ) : (
                    <div className="flex space-x-2">
                        <button
                            onClick={() => {
                                setShowViewFile(true);
                                setFile(row.record_data_id);
                            }}
                            className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-[10px] px-5 py-2.5 text-center"
                            type="button"
                        >
                            File
                        </button>
                        <buttons
                            onClick={() => {
                                setRecord_data_id(row.record_data_id);
                                setViewRecordModal(true);
                            }}
                            className="block text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-[10px] px-5 py-2.5 text-center"
                            type="button"
                        >
                            Record
                        </buttons>
                    </div>
                ),
            sortable: true,
        },
    ];

    const filteredRecords = records.filter((record) => {
        const searchString = search.toLowerCase();
        const recordIdMatch =
            record.record_data_id &&
            record.record_data_id.toLowerCase().includes(searchString);
        const recordDateMatch =
            record.record_date &&
            new Date(record.record_date)
                .toLocaleDateString("en-GB", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                })
                .toLowerCase()
                .includes(searchString);
        const statusMatch =
            record.record_status &&
            record.record_status.toLowerCase().includes(searchString);

        return recordIdMatch || recordDateMatch || statusMatch;
    });

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
                                    className="block text-white bg-blue-700 hover:bg-blue-800 outline-none font-medium rounded-lg text-[10px] px-5 py-2.5 text-center"
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
                                    {/* search */}
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
                            <hr className="my-5 border-gray-800 border-1" />

                            <DataTable
                                columns={columns}
                                data={filteredRecords}
                                pagination
                                striped
                                highlightOnHover
                                responsive
                                defaultSortFieldId={2}
                            />
                        </>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Records;
