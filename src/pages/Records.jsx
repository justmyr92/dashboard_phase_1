import { useState, useEffect } from "react";
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
import Swal from "sweetalert2";
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
    const [showRequestModal, setShowRequestModal] = useState(false);
    const [requestTitle, setRequestTitle] = useState("");
    const [requestDescription, setRequestDescription] = useState("");
    const [startDate, setStartDate] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [selectedInstrument, setSelectedInstrument] = useState("");
    const [selectedRequestID, setSelectedRequestID] = useState("");
    const [unitCount, setUnitCount] = useState(0);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    // const [requests, setRequests] = useState([]);

    const [showUpdateStatus, setShowUpdateStatus] = useState(false);
    useEffect(() => {
        if (!ID) {
            window.location.href = "/login";
        }
        const getUnit = async () => {
            const response = await fetch(
                `https://csddashboard.online/api/unit`
            );
            const data = await response.json();
            setUnit(data);
            setUnitCount(data.length);
        };
        getUnit();
    }, [ID]);

    useEffect(() => {
        console.log(reload);
        const getRecords = async () => {
            const response = await fetch(
                `https://csddashboard.online/api/record_data/unit`
            );
            const data = await response.json();
            console.log(data);

            if (ROLE === "sdo") {
                const filteredData = data.filter(
                    (record) => record.sdo_officer_id === ID
                );
                //filert by selected request id
                setRecords(
                    filteredData.filter(
                        (record) => record.request_id === selectedRequestID
                    )
                );
            } else if (ROLE === "unit") {
                const filteredData = data.filter(
                    (record) => record.unit_id === ID
                );
                setRecords(
                    filteredData.filter((record) => record.request_id) ===
                        selectedRequestID
                );
            } else {
                setRecords(
                    data.filter(
                        (record) => record.request_id === selectedRequestID
                    )
                );
            }

            setReload(false);
        };

        getRecords();
        console.log(records);
    }, [reload, ID, ROLE, selectedRequestID, records]);

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
            name: "Request ID",
            selector: (row) => row.request_id,
            sortable: true,
        },
        {
            name: "Unit Name",
            selector: (row) => row.unit_name,
            sortable: true,
            omit: ROLE === "unit",
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

    const [requests, setRequests] = useState([]);

    const columns2 = [
        {
            name: "Request ID",
            selector: (row) => row.request_id,
            sortable: true,
        },
        {
            name: "Title",
            selector: (row) => row.request_title,
            sortable: true,
        },
        {
            name: "Progress",
            selector: (row) => {
                const filteredRecords = records.filter(
                    (record) => record.request_id === row.request_id
                );
                const progress = `${filteredRecords.length} / ${unitCount} (${(
                    (filteredRecords.length / unitCount) *
                    100
                ).toFixed(2)}%)`;
                return progress;
            },
            sortable: true,
        },

        {
            name: "Start Date",
            selector: (row) => row.start_date.toString().split("T")[0],
            sortable: true,
        },
        {
            name: "Due Date",
            selector: (row) => row.due_date.toString().split("T")[0],
            sortable: true,
        },
        {
            name: "Instrument ID",
            selector: (row) => row.instrument_id,
            sortable: true,
        },
        // view submitted records
        {
            name: "Action",
            selector: (row) => (
                <button
                    onClick={() => {
                        setSelectedRequestID(row.request_id);
                        console.log(row.request_id, "Asdasd");
                        setPage(2);
                    }}
                    className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-[10px] px-3 py-2.5 text-center"
                    type="button"
                >
                    View Records
                </button>
            ),
        },
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    "https://csddashboard.online/api/request/"
                );
                const data = await response.json();
                setRequests(data);
            } catch (error) {
                console.error("Error fetching requests:", error);
            }
        };

        fetchData();
    }, [reload]);

    const [instruments, setInstruments] = useState([]);

    useEffect(() => {
        // run getInstruments API call
        const getInstruments = async () => {
            const response = await fetch(
                "https://csddashboard.online/api/getInstruments/"
            );
            const data = await response.json();
            setInstruments(data);
            console.log(data);
        };
        getInstruments();
    }, []);

    const handleRequestSubmit = async (e) => {
        e.preventDefault();
        console.log("Form submitted:", {
            requestTitle,
            requestDescription,
            startDate,
            dueDate,
            selectedInstrument,
        });

        Swal.fire({
            title: "Request Submitted",
            text: "Request has been submitted successfully",
            icon: "success",
            confirmButtonText: "OK",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await fetch(
                        "https://csddashboard.online/api/request",
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                request_title: requestTitle,
                                request_description: requestDescription,
                                start_date: startDate,
                                due_date: dueDate,
                                instrument_id: selectedInstrument,
                            }),
                        }
                    );
                    const data = await response.json();

                    setReload(true);
                } catch (error) {
                    console.error("Error:", error);
                }
            }
        });

        // Reset form fields and close modal
        setRequestTitle("");
        setRequestDescription("");
        setStartDate("");
        setDueDate("");
        setSelectedInstrument("");
        setShowRequestModal(false);
    };

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
            {showRequestModal && (
                <div className="request-modal absolute top-1/2 left-1/2 transform w-[40rem] -translate-x-1/2 -translate-y-1/2 z-20 bg-white p-8 rounded-lg shadow-lg">
                    <h2 className="text-xl font-bold mb-4">
                        Create New Request
                    </h2>
                    <form onSubmit={handleRequestSubmit}>
                        <div className="mb-4">
                            <label
                                htmlFor="request-title"
                                className="block text-sm font-medium text-gray-600"
                            >
                                Title
                            </label>
                            <input
                                type="text"
                                id="request-title"
                                className="block w-full border border-gray-300 rounded px-3 py-2.5 mt-1 focus:outline-none focus:border-blue-500"
                                value={requestTitle}
                                onChange={(e) =>
                                    setRequestTitle(e.target.value)
                                }
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="request-description"
                                className="block text-sm font-medium text-gray-600"
                            >
                                Description
                            </label>
                            <textarea
                                id="request-description"
                                className="block w-full border border-gray-300 rounded px-3 py-2.5 mt-1 focus:outline-none focus:border-blue-500"
                                value={requestDescription}
                                onChange={(e) =>
                                    setRequestDescription(e.target.value)
                                }
                                required
                            ></textarea>
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="start-date"
                                className="block text-sm font-medium text-gray-600"
                            >
                                Start Date
                            </label>
                            <input
                                type="date"
                                id="start-date"
                                className="block w-full border border-gray-300 rounded px-3 py-2.5 mt-1 focus:outline-none focus:border-blue-500"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="due-date"
                                className="block text-sm font-medium text-gray-600"
                            >
                                Due Date
                            </label>
                            <input
                                type="date"
                                id="due-date"
                                className="block w-full border border-gray-300 rounded px-3 py-2.5 mt-1 focus:outline-none focus:border-blue-500"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="instrument"
                                className="block text-sm font-medium text-gray-600"
                            >
                                Select Instrument
                            </label>
                            <select
                                id="instrument"
                                className="block w-full border border-gray-300 rounded px-3 py-2.5 mt-1 focus:outline-none focus:border-blue-500"
                                value={selectedInstrument}
                                onChange={(e) =>
                                    setSelectedInstrument(e.target.value)
                                }
                                required
                            >
                                <option value="" disabled>
                                    Select Instrument
                                </option>
                                {instruments.map((instrument) => (
                                    <option
                                        key={instrument.instrument_id}
                                        value={instrument.instrument_id}
                                    >
                                        {instrument.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="button"
                                className="px-4 py-2.5 text-sm bg-gray-200 text-gray-600 hover:bg-gray-300 rounded-lg mr-2"
                                onClick={() => setShowRequestModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2.5 text-sm bg-blue-700 text-white hover:bg-blue-800 rounded-lg"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
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
                                    {ROLE === "unit" && (
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
                                    {ROLE === "csd" && (
                                        <button
                                            className="block text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-[10px] px-3 py-2.5 text-center"
                                            type="button"
                                            onClick={() =>
                                                setShowRequestModal(true)
                                            }
                                        >
                                            Create Request
                                        </button>
                                    )}
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
                            {page === 2 && (
                                <>
                                    <button
                                        onClick={() => setPage(1)}
                                        className="block text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-[10px] px-3 py-2.5 text-center mb-2"
                                        type="button"
                                    >
                                        Back
                                    </button>
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
                            {page === 1 && (
                                <div className="border border-gray-200 rounded-lg max-w-[100vw] overflow-x-auto">
                                    <DataTable
                                        columns={columns2}
                                        data={requests}
                                        pagination
                                        striped
                                        highlightOnHover
                                        responsive
                                        defaultSortFieldId={0}
                                        className="w-[100%] overflow-x-auto"
                                    />
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Records;
