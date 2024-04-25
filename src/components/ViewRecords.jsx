import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const ViewRecords = ({ setShowModal, record_data_id }) => {
    const [recordValues, setRecordValues] = useState([]);
    const [originalValues, setOriginalValues] = useState([]);

    const role = localStorage.getItem("ROLE");

    const [instruments, setInstruments] = useState([]);
    const [records, setRecords] = useState([]);
    const [toptions, setTOptions] = useState([]);

    useEffect(() => {
        const getInstruments = async () => {
            try {
                const response = await fetch(
                    `https://csddashboard.online/api/getInstruments`
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch instruments");
                }
                const data = await response.json();
                setInstruments(data);
            } catch (error) {
                console.error("Error fetching instruments:", error);
            }
        };
        const getRecords = async () => {
            try {
                const response = await fetch(
                    `https://csddashboard.online/api/record_value/${record_data_id}`
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch records");
                }
                const data = await response.json();
                setRecords(data);
            } catch (error) {
                console.error("Error fetching records:", error);
            }
        };

        const getOptions = async () => {
            try {
                const response = await fetch(
                    `https://csddashboard.online/api/toption`
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch options");
                }
                const data = await response.json();
                setTOptions(data);
            } catch (error) {
                console.error("Error fetching options:", error);
            }
        };

        getInstruments();
        getRecords();
        getOptions();
    }, []);

    const handleInputChange = (value, index) => {
        setRecords((prevValues) => {
            const newValues = [...prevValues];
            newValues[index].value = value;
            return newValues;
        });
    };

    const handleSave = async () => {
        records.forEach(async (record) => {
            const response = await fetch(
                `https://csddashboard.online/api/update_record_values/${record.record_value_id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ value: record.value }),
                }
            );

            if (response.ok) {
                const response = await fetch(
                    `https://csddashboard.online/api/record_data/${record_data_id}`,
                    {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ status: "For Approval" }),
                    }
                );

                const data = await response.json();

                if (response.ok) {
                    Swal.fire({
                        icon: "success",
                        title: "Success!",
                        text: "Record values updated successfully!",
                        timer: 1500,
                    });
                }

                setShowModal(false);
            } else {
                console.error("Failed to update record values");
            }
        });
    };

    const [groupedRecords, setGroupedRecords] = useState([]);

    // Whenever records change, update the grouped records
    useEffect(() => {
        const grouped = [];

        // Loop through each record
        records.forEach((record) => {
            // Get the instrument ID of the current record
            const instrumentId = record.instrument_id;

            // Find the index of the existing group for this instrument ID
            const groupIndex = grouped.findIndex(
                (group) => group.instrumentId === instrumentId
            );

            // If a group for this instrument ID doesn't exist, create a new one
            if (groupIndex === -1) {
                grouped.push({
                    instrumentId: instrumentId,
                    records: [record],
                });
            } else {
                // If a group for this instrument ID already exists, add the record to it
                grouped[groupIndex].records.push(record);
            }
        });

        // Update the state with the new grouped records
        setGroupedRecords(grouped);
    }, [records]); // Trigger the effect whenever records change

    return (
        <div
            id="default-modal"
            tabIndex="-1"
            aria-hidden="true"
            className="z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full flex justify-center items-center fixed top-0 left-0 right-0 bottom-0"
        >
            <div className="relative w-full max-w-2xl max-h-full">
                <div className="relative bg-white rounded-lg shadow">
                    <div className="flex items-start justify-between p-4 border-b rounded-t">
                        <h3 className="text-xl font-semibold text-gray-900">
                            View Record
                        </h3>
                        <button
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
                            data-modal-hide="default-modal"
                            aria-label="Close modal"
                            onClick={() => setShowModal(false)}
                        >
                            <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 14"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className="p-6 space-y-6">
                        <table className="table-auto w-full">
                            <tbody>
                                <tbody>
                                    {groupedRecords.map((group, groupIndex) => (
                                        <tr key={group.instrumentId}>
                                            <td className="text-sm font-semibold text-gray-600 p-4">
                                                <div className="mb-4">
                                                    <span className="text-lg">
                                                        {/* find the instrument name from instruments */}
                                                        {
                                                            instruments.find(
                                                                (instrument) =>
                                                                    instrument.instrument_id ===
                                                                    group.instrumentId
                                                            ).name
                                                        }
                                                    </span>{" "}
                                                    <br />
                                                    <span className="text-gray-500">
                                                        Section:{" "}
                                                        {
                                                            instruments.find(
                                                                (instrument) =>
                                                                    instrument.instrument_id ===
                                                                    group.instrumentId
                                                            ).section
                                                        }
                                                    </span>
                                                </div>

                                                <div className="border border-gray-200 rounded-md p-4">
                                                    {group.records.map(
                                                        (
                                                            record,
                                                            recordIndex
                                                        ) => (
                                                            <div
                                                                key={
                                                                    record.record_value_id
                                                                }
                                                                className="flex items-center justify-between mb-2"
                                                            >
                                                                <div className="text-sm font-semibold text-gray-600">
                                                                    {recordIndex +
                                                                        1}
                                                                    .{" "}
                                                                    {
                                                                        record.record_name
                                                                    }
                                                                </div>
                                                                <div>
                                                                    {record.rtype ===
                                                                    "choice" ? (
                                                                        <select
                                                                            id={`record-${record.record_value_id}`}
                                                                            name={`record-${record.record_value_id}`}
                                                                            className="block px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                                                            value={
                                                                                record.value
                                                                            }
                                                                            onChange={(
                                                                                e
                                                                            ) =>
                                                                                handleInputChange(
                                                                                    e
                                                                                        .target
                                                                                        .value,
                                                                                    recordIndex
                                                                                )
                                                                            }
                                                                            disabled={
                                                                                role ===
                                                                                "csd"
                                                                            }
                                                                        >
                                                                            {toptions
                                                                                .filter(
                                                                                    (
                                                                                        option
                                                                                    ) => {
                                                                                        return (
                                                                                            option.record_id ===
                                                                                            record.record_id
                                                                                        );
                                                                                    }
                                                                                )
                                                                                .map(
                                                                                    (
                                                                                        option
                                                                                    ) => (
                                                                                        <option
                                                                                            key={
                                                                                                option.option_id
                                                                                            }
                                                                                            value={
                                                                                                option.option_id
                                                                                            }
                                                                                        >
                                                                                            {
                                                                                                option.option_value
                                                                                            }
                                                                                        </option>
                                                                                    )
                                                                                )}
                                                                        </select>
                                                                    ) : (
                                                                        <input
                                                                            type="number"
                                                                            id={`record-${record.record_value_id}`}
                                                                            name={`record-${record.record_value_id}`}
                                                                            className="block w-24 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                                                            value={
                                                                                record.value
                                                                            }
                                                                            onChange={(
                                                                                e
                                                                            ) =>
                                                                                handleInputChange(
                                                                                    e
                                                                                        .target
                                                                                        .value,
                                                                                    recordIndex
                                                                                )
                                                                            }
                                                                            disabled={
                                                                                role ===
                                                                                "csd"
                                                                            }
                                                                        />
                                                                    )}
                                                                </div>
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </tbody>
                        </table>
                    </div>
                    <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b">
                        <button
                            data-modal-hide="default-modal"
                            type="button"
                            className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
                            onClick={() => setShowModal(false)}
                        >
                            Close
                        </button>
                        {role !== "csd" && (
                            <button
                                type="button"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm font-medium px-5 py-2.5"
                                onClick={handleSave}
                            >
                                Save
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewRecords;
