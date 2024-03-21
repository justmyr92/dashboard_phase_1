import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTools } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

const Instruments = () => {
    const [instruments, setInstruments] = useState([]);
    const [search, setSearch] = useState("");
    const [sdgIndicators, setSdgIndicators] = useState([]);
    const [record, setRecord] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [editedRecords, setEditedRecords] = useState([]);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        const getInstruments = async () => {
            try {
                const response = await fetch(
                    "https://csddashboard/api/getInstruments"
                );
                const jsonData = await response.json();
                if (search !== "") {
                    setInstruments(
                        jsonData.filter(
                            (instrument) =>
                                instrument.name
                                    .toLowerCase()
                                    .includes(search.toLowerCase()) ||
                                instrument.status
                                    .toLowerCase()
                                    .includes(search.toLowerCase()) ||
                                new Date(instrument.date_posted)
                                    .toLocaleDateString("en-US", {
                                        weekday: "long",
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })
                                    .toLowerCase()
                                    .includes(search.toLowerCase())
                        )
                    );
                } else {
                    setInstruments(jsonData);
                }
            } catch (err) {
                console.error(err.message);
            }
        };
        getInstruments();
    }, [search]);

    const [page, setPage] = useState(1);
    const [instrument, setInstrument] = useState({});

    const viewRecord = (instrument) => {
        setInstrument(instrument);
        setPage(2);

        const getRecords = async () => {
            try {
                const response = await fetch(
                    `https://csddashboard/api/getRecords/${instrument.instrument_id}`
                );
                const jsonData = await response.json();
                setRecord(jsonData);

                setEditedRecords(jsonData.map((record) => ({ ...record })));
            } catch (err) {
                console.error(err.message);
            }
        };
        getRecords();
    };

    const groupRecordsBySdgId = (records) => {
        return records.reduce((grouped, record) => {
            const sdgId = record.sdg_id;
            if (!grouped[sdgId]) {
                grouped[sdgId] = [];
            }
            grouped[sdgId].push(record);
            return grouped;
        }, {});
    };

    useEffect(() => {
        const fetchSdgIndicators = async () => {
            const response = await fetch("https://csddashboard/api/sdg");
            const data = await response.json();
            setSdgIndicators(data);
        };
        fetchSdgIndicators();
    }, []);

    useEffect(() => {
        console.log(editedRecords);
    }, [editedRecords]);

    const handleEditSubmit = async () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3B82F6",
            cancelButtonColor: "#EF4444",
            confirmButtonText: "Yes, update it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                editedRecords.map(async (record) => {
                    try {
                        console.log(record);
                        const response = await fetch(
                            `https://csddashboard/api/updateRecords`,
                            {
                                method: "PATCH",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify(record),
                            }
                        );
                        if (response.ok) {
                            console.log("Records updated successfully.");
                        } else {
                            console.error("Failed to update records.");
                        }
                    } catch (err) {
                        console.error(err.message);
                    }
                });
                setReload(!reload);
                Swal.fire(
                    "Updated!",
                    "Your records have been updated.",
                    "success"
                );
            }
        });

        setIsEdit(false);
        setRecord(editedRecords);
    };

    const updateInstrumentStatus = async (instrument_id, status) => {
        const instrument = {
            instrument_id: instrument_id,
            status: status === "Active" ? "Inactive" : "Active",
        };
        let setTitle = `Are you sure you want to set this instrument be ${status
            .toString()
            .toLowerCase()}`;
        Swal.fire({
            title: setTitle,
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3B82F6",
            cancelButtonColor: "#EF4444",
            confirmButtonText: "Yes, update it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await fetch(
                        "https://csddashboard/api/updateInstrumentStatus",
                        {
                            method: "PATCH",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(instrument),
                        }
                    );
                    const data = await response.json();
                } catch (error) {
                    console.error(error);
                }
                window.location.href = "/csd/instruments";
            }
        });
    };

    return (
        <section className="dashboard">
            <Sidebar />
            <div className="p-4 sm:ml-64">
                <div className="p-4">
                    <div className="header flex justify-between items-center">
                        <h3 className="text-3xl font-bold text-gray-700 title">
                            <FontAwesomeIcon icon={faTools} className="mr-3" />
                            Instruments
                        </h3>
                        <div className="flex gap-2 items-center justify-end">
                            <Link
                                className="p-2 px-4 bg-blue-500 text-white rounded-lg"
                                to="/csd/instruments-form"
                            >
                                Add Instrument
                            </Link>
                            <div
                                className={`search relative ${
                                    page === 2 && "hidden"
                                }`}
                            >
                                <input
                                    className="p-2 pl-8 border-2 border-gray-500 rounded-lg"
                                    type="text"
                                    placeholder="Search"
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                <FontAwesomeIcon
                                    className="absolute top-3 left-3 text-gray-500"
                                    icon={faSearch}
                                />
                            </div>
                        </div>
                    </div>
                    <hr className="my-5 border-gray-300 border-1" />
                    {page === 1 && (
                        <div className="instruments">
                            <DataTable
                                columns={[
                                    {
                                        name: "Name",
                                        selector: (row) => row.name,
                                        sortable: true,
                                    },
                                    {
                                        name: "Status",
                                        cell: (row) => (
                                            <span
                                                className={`px-2 py-1 text-white rounded-lg text-xs font-medium ${
                                                    row.status === "Active"
                                                        ? "bg-green-500"
                                                        : "bg-red-500"
                                                }`}
                                            >
                                                {row.status}
                                            </span>
                                        ),
                                        sortable: true,
                                    },
                                    {
                                        name: "Date Posted",
                                        selector: (row) =>
                                            new Date(
                                                row.date_posted
                                            ).toLocaleDateString("en-US", {
                                                weekday: "long",
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            }),
                                        sortable: true,
                                    },
                                    {
                                        name: "Actions",
                                        cell: (row) => (
                                            <div className="flex justify-between items-center gap-2">
                                                <button
                                                    className="text-green-500 me-3"
                                                    onClick={() =>
                                                        viewRecord(row)
                                                    }
                                                >
                                                    View
                                                </button>
                                                <button
                                                    className="text-red-500"
                                                    onClick={() => {
                                                        updateInstrumentStatus(
                                                            row.instrument_id,
                                                            row.status
                                                        );
                                                    }}
                                                >
                                                    Update Archive
                                                </button>
                                            </div>
                                        ),
                                    },
                                ]}
                                data={instruments}
                                pagination
                                highlightOnHover
                                pointerOnHover
                                striped
                                fixedHeader
                                className="border border-gray-200 rounded-md"
                            />
                        </div>
                    )}

                    {page === 2 && (
                        <>
                            <table className="table-auto w-full">
                                <tbody>
                                    <tr>
                                        <th className="border px-4 py-2 text-left font-semibold ">
                                            Instrument Name
                                        </th>
                                        <td className="border px-4 py-2">
                                            {instrument.name}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td
                                            className="border px-4 py-2 bg-red-500 text-white text-lg font-semibold text-center"
                                            colSpan={2}
                                        >
                                            Questionnaire
                                        </td>
                                    </tr>
                                    {Object.keys(groupRecordsBySdgId(record))
                                        .sort((a, b) => {
                                            return parseInt(a) - parseInt(b);
                                        })
                                        .map((sdg_id) => (
                                            <React.Fragment key={sdg_id}>
                                                <tr>
                                                    <td
                                                        className="border px-4 py-2 bg-gray-100 font-semibold text-center"
                                                        colSpan={2}
                                                    >
                                                        SDG{" "}
                                                        {
                                                            sdgIndicators.find(
                                                                (sdgItem) =>
                                                                    sdgItem.sdg_id ===
                                                                    sdg_id
                                                            ).sdg_no
                                                        }{" "}
                                                        -{" "}
                                                        {
                                                            sdgIndicators.find(
                                                                (sdgItem) =>
                                                                    sdgItem.sdg_id ===
                                                                    sdg_id
                                                            ).sdg_name
                                                        }
                                                    </td>
                                                </tr>
                                                {groupRecordsBySdgId(record)[
                                                    sdg_id
                                                ].map(
                                                    (recordItem, index) =>
                                                        recordItem.record_name !==
                                                            "" && (
                                                            <tr key={index}>
                                                                <td
                                                                    className="border px-4 py-2"
                                                                    colSpan={2}
                                                                >
                                                                    {!isEdit ? (
                                                                        <div className="flex justify-between items-center gap-2">
                                                                            <p className="text-gray-700">
                                                                                {index +
                                                                                    1 +
                                                                                    ". " +
                                                                                    recordItem.record_name}
                                                                            </p>
                                                                            <p>
                                                                                {recordItem.record_status ===
                                                                                    "inactive" && (
                                                                                    <span className="px-2 py-1.5 rounded text-white text-center w-[5rem] bg-green-500">
                                                                                        Archived
                                                                                    </span>
                                                                                )}
                                                                            </p>
                                                                        </div>
                                                                    ) : (
                                                                        <div className="flex justify-between items-center gap-2">
                                                                            <input
                                                                                className="border px-2 py-3 border-gray-500 rounded-lg w-full"
                                                                                type="text"
                                                                                value={
                                                                                    editedRecords.find(
                                                                                        (
                                                                                            record
                                                                                        ) =>
                                                                                            record.record_id ===
                                                                                            recordItem.record_id
                                                                                    )
                                                                                        .record_name
                                                                                }
                                                                                onChange={(
                                                                                    e
                                                                                ) => {
                                                                                    const newEditedRecords =
                                                                                        [
                                                                                            ...editedRecords,
                                                                                        ];
                                                                                    newEditedRecords.find(
                                                                                        (
                                                                                            record
                                                                                        ) =>
                                                                                            record.record_id ===
                                                                                            recordItem.record_id
                                                                                    ).record_name =
                                                                                        e.target.value;
                                                                                    setEditedRecords(
                                                                                        newEditedRecords
                                                                                    );
                                                                                }}
                                                                            />
                                                                            <td
                                                                                className="px-4 py-2"
                                                                                colSpan={
                                                                                    1
                                                                                }
                                                                            >
                                                                                <button
                                                                                    className="p-2 px-4 bg-green-500 text-white rounded-lg text-xs"
                                                                                    onClick={() => {
                                                                                        const newEditedRecords =
                                                                                            [
                                                                                                ...editedRecords,
                                                                                            ];
                                                                                        const updatedRecords =
                                                                                            newEditedRecords.map(
                                                                                                (
                                                                                                    record
                                                                                                ) =>
                                                                                                    record.record_id ===
                                                                                                    recordItem.record_id
                                                                                                        ? {
                                                                                                              ...record,
                                                                                                              record_status:
                                                                                                                  record.record_status ===
                                                                                                                  "active"
                                                                                                                      ? "inactive"
                                                                                                                      : "active",
                                                                                                          }
                                                                                                        : record
                                                                                            );

                                                                                        setEditedRecords(
                                                                                            updatedRecords
                                                                                        );
                                                                                    }}
                                                                                >
                                                                                    {editedRecords.find(
                                                                                        (
                                                                                            record
                                                                                        ) =>
                                                                                            record.record_id ===
                                                                                            recordItem.record_id
                                                                                    )
                                                                                        .record_status ===
                                                                                    "active" ? (
                                                                                        <span>
                                                                                            Archive
                                                                                        </span>
                                                                                    ) : (
                                                                                        <span>
                                                                                            Unarchive
                                                                                        </span>
                                                                                    )}
                                                                                </button>
                                                                            </td>
                                                                        </div>
                                                                    )}
                                                                </td>
                                                            </tr>
                                                        )
                                                )}
                                            </React.Fragment>
                                        ))}
                                </tbody>
                            </table>
                            <hr className="my-5 border-gray-300 border-1" />
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    className="p-2 px-4 bg-blue-500 text-white rounded-lg"
                                    onClick={() => {
                                        setPage(1);
                                        setIsEdit(false);
                                    }}
                                >
                                    Back
                                </button>

                                <button
                                    type="button"
                                    className="p-2 px-4 bg-blue-500 text-white rounded-lg"
                                    onClick={() => setIsEdit(!isEdit)}
                                >
                                    {isEdit ? "Cancel" : "Edit"}
                                </button>
                                {isEdit && (
                                    <button
                                        type="button"
                                        className="p-2 px-4 bg-blue-500 text-white rounded-lg"
                                        onClick={handleEditSubmit}
                                    >
                                        Submit
                                    </button>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Instruments;
