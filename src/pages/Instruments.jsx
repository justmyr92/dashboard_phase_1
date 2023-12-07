import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

const Instruments = () => {
    // app.get("/getInstruments", async (req, res) => {
    //     try {
    //         const instruments = await pool.query(
    //             "SELECT * FROM instrument_table order by date_posted desc"
    //         );
    //         res.json(instruments.rows);
    //     } catch (err) {
    //         console.error(err.message);
    //     }
    // });

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
                    "http://localhost:5000/getInstruments"
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

        // Fetch records and initialize editedRecords with the current state
        const getRecords = async () => {
            try {
                const response = await fetch(
                    `http://localhost:5000/getRecords/${instrument.instrument_id}`
                );
                const jsonData = await response.json();
                setRecord(jsonData);

                // Initialize editedRecords with the current state
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
            const response = await fetch("http://localhost:5000/sdg");
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
                            `http://localhost:5000/updateRecords`,
                            {
                                method: "PATCH",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify(record),
                            }
                        );

                        // Handle the response accordingly
                        // For example, you can check if the response is successful
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

        // Reset isEdit and fetch updated records
        setIsEdit(false);
        setRecord(editedRecords);
    };

    return (
        <section className="dashboard">
            <Sidebar />
            <div className="p-4 sm:ml-64">
                <div className="p-4 border-2 border-gray-500 border-dashed rounded-lg">
                    <div className="header flex justify-between items-center">
                        <h3 className="text-3xl font-bold text-gray-700 title">
                            Instruments
                        </h3>
                        <div className="flex gap-2 items-center justify-end">
                            <Link
                                className="p-2 px-4 bg-blue-500 text-white rounded-lg"
                                to="/csd/instruments-form"
                            >
                                Add Instrument
                            </Link>
                            <div className="search relative">
                                <input
                                    className="p-2 pl-8 border-2 border-gray-500 border-dashed rounded-lg"
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
                    <hr className="my-5 border-gray-800 border-1" />
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
                                        selector: (row) => row.status,
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
                                                    className="p-2 px-4 bg-green-500 text-white rounded-lg text-xs"
                                                    onClick={() =>
                                                        viewRecord(row)
                                                    }
                                                >
                                                    View
                                                </button>
                                                <Link
                                                    className="p-2 px-4 bg-red-500 text-white rounded-lg text-xs"
                                                    to={`/csd/instruments-form/${row.instrument_id}`}
                                                >
                                                    Archive
                                                </Link>
                                            </div>
                                        ),
                                    },
                                ]}
                                data={instruments}
                                pagination
                                highlightOnHover
                                pointerOnHover
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
                                            // Assuming sdg_no is a number, adjust accordingly if it's a string
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
                                                                        index +
                                                                        1 +
                                                                        ". " +
                                                                        recordItem.record_name
                                                                    ) : (
                                                                        <input
                                                                            className="border-2 border-gray-500 border-dashed rounded-lg w-full"
                                                                            type="text"
                                                                            value={
                                                                                editedRecords[
                                                                                    index
                                                                                ]
                                                                                    .record_name
                                                                            }
                                                                            onChange={(
                                                                                e
                                                                            ) => {
                                                                                const newEditedRecords =
                                                                                    [
                                                                                        ...editedRecords,
                                                                                    ];
                                                                                newEditedRecords[
                                                                                    index
                                                                                ].record_name =
                                                                                    e.target.value;
                                                                                setEditedRecords(
                                                                                    newEditedRecords
                                                                                );
                                                                            }}
                                                                        />
                                                                    )}
                                                                </td>
                                                            </tr>
                                                        )
                                                )}
                                            </React.Fragment>
                                        ))}
                                </tbody>
                            </table>
                            <hr className="my-5 border-gray-800 border-1" />
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
