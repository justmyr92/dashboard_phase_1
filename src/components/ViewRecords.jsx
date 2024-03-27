import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const ViewRecords = ({ setShowModal, record_data_id }) => {
    const [recordValues, setRecordValues] = useState([]);
    const [originalValues, setOriginalValues] = useState([]);

    const role = localStorage.getItem("ROLE");

    useEffect(() => {
        const getValues = async () => {
            console.log(
                "Fetching record values for record_data_id:",
                record_data_id
            );
            const response = await fetch(
                `http://localhost:5000/api/record_value/${record_data_id}`
            );
            const data = await response.json();
            setRecordValues(data);
            setOriginalValues(data);
            console.log("Record values fetched:", data);
        };

        getValues();
    }, [record_data_id]);

    const handleInputChange = (value, index) => {
        setRecordValues((prevValues) => {
            const newValues = [...prevValues];
            newValues[index].value = value;
            return newValues;
        });
    };

    const handleSave = async () => {
        recordValues.forEach(async (record) => {
            const response = await fetch(
                `http://localhost:5000/api/update_record_values/${record.record_value_id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ value: record.value }),
                }
            );

            if (response.ok) {
                console.log("Record values updated successfully!");

                const response = await fetch(
                    `http://localhost:5000/api/record_data/${record_data_id}`,
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
                                {recordValues.map((record, index) => (
                                    <tr key={record.record_value_id}>
                                        <td className="text-sm font-semibold text-gray-600">
                                            {record.record_name}
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                id={`record-${record.record_value_id}`}
                                                name={`record-${record.record_value_id}`}
                                                className="block w-24 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 float-right"
                                                value={record.value}
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        e.target.value,
                                                        index
                                                    )
                                                }
                                                disabled={
                                                    role === "sdo" ||
                                                    role === "csd"
                                                        ? true
                                                        : false
                                                }
                                            />
                                        </td>
                                    </tr>
                                ))}
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
                        {role !== "sdo" ||
                            (role !== "csd" && (
                                <button
                                    type="button"
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm font-medium px-5 py-2.5"
                                    onClick={handleSave}
                                >
                                    Save
                                </button>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewRecords;
