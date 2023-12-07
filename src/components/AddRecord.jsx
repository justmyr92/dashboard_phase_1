import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const AddRecord = ({ showModal, setShowModal, setReload }) => {
    const [ID, setID] = useState(localStorage.getItem("ID"));
    const [sdg, setSdg] = useState([]);
    const [records, setRecords] = useState([]);
    const [sdgID, setSdgID] = useState("");

    const [recordID, setRecordID] = useState("");
    const [recordFiles, setRecordFiles] = useState([]);

    const [recordValues, setRecordValues] = useState({});

    const handleInputChange = (record_id, value) => {
        setRecordValues((prevValues) => ({
            ...prevValues,
            [record_id]: value,
        }));
        console.log(recordValues);
    };

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("http://localhost:5000/sdg");
            const data = await response.json();
            if (response.ok) {
                setSdg(data);
                setSdgID(data[0].sdg_id);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(
                `http://localhost:5000/records/${sdgID}`
            );
            const data = await response.json();
            if (response.ok) {
                setRecords(data);
                setRecordID(data[0].record_id);
            }
        };
        if (sdgID !== "") {
            fetchData();
        }
    }, [sdgID]);

    const handleFileInputChange = (files, index) => {
        const updatedFiles = [...recordFiles];
        updatedFiles[index] = files[0];
        setRecordFiles(updatedFiles);
    };

    useEffect(() => {
        console.log(recordFiles);
    }, [recordFiles]);

    const handleAddFileInput = () => {
        setRecordFiles([...recordFiles, null]);
    };

    useEffect(() => {
        console.log(recordFiles);
    }, [recordFiles]);

    const handleRemoveFileInput = (index) => {
        // Remove the file input at the specified index
        setRecordFiles((prevFiles) => [
            ...prevFiles.slice(0, index),
            ...prevFiles.slice(index + 1),
        ]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const record_data_id = "RD" + Math.floor(Math.random() * 100000);
        const formData = new FormData();
        formData.append("record_data_id", record_data_id);
        formData.append("record_date", new Date().toISOString().slice(0, 10));
        formData.append("record_status", "For Approval");
        formData.append("record_id", recordID);
        formData.append("unit_id", ID);

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, submit it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true,
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await fetch(
                    "http://localhost:5000/record_data",
                    {
                        method: "POST",
                        body: formData,
                    }
                );

                const data = await response.json();
                if (data.record_data_id) {
                    const recordDataID = data.record_data_id;
                    console.log(recordDataID);

                    for (const key in recordValues) {
                        const value = recordValues[key];
                        const values = {
                            record_data_id: recordDataID,
                            record_data_value: value,
                            record_id: key,
                        };

                        console.log(values);

                        const response = await fetch(
                            "http://localhost:5000/record_value",
                            {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify(values),
                            }
                        );

                        const responseData = await response.json();
                        console.log(responseData);
                    }

                    recordFiles.map(async (file) => {
                        const fileData = new FormData();
                        fileData.append("file", file);
                        fileData.append("record_data_id", recordDataID);
                        console.log(file);
                        try {
                            const fileResponse = await fetch(
                                "http://localhost:5000/file",
                                {
                                    method: "POST",
                                    body: fileData,
                                }
                            );

                            if (!fileResponse.ok) {
                                throw new Error(
                                    `HTTP error! Status: ${fileResponse.status}`
                                );
                            }

                            const fileData1 = await fileResponse.json();
                            console.log(fileData1);
                        } catch (error) {
                            console.error("Error uploading file:", error);
                        }
                    });
                }
            }
        });

        setReload(true);
        setShowModal(false);
    };

    return (
        <div
            id="default-modal"
            tabindex="-1"
            aria-hidden="true"
            className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
            <div className="relative w-full max-w-2xl max-h-full">
                <div className="relative bg-white rounded-lg shadow">
                    <div className="flex items-start justify-between p-4 border-b rounded-t">
                        <h3 className="text-xl font-semibold text-gray-900">
                            Add Record
                        </h3>
                        <button
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
                            data-modal-hide="default-modal"
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
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="p-6 space-y-6">
                            {
                                <div className="flex flex-col">
                                    <label
                                        for="sdg"
                                        className="text-sm font-semibold text-gray-600"
                                    >
                                        SDG
                                    </label>
                                    <select
                                        id="sdg"
                                        name="sdg"
                                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                        onChange={(e) =>
                                            setSdgID(e.target.value)
                                        }
                                    >
                                        <option value="" disabled>
                                            Select SDG
                                        </option>
                                        {sdg.map((sdg) => (
                                            <option
                                                value={sdg.sdg_id}
                                                key={sdg.sdg_id}
                                            >
                                                SDG {sdg.sdg_no}: {sdg.sdg_name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            }
                            {
                                <div>
                                    {records.map((record, index) => (
                                        <div
                                            key={record.record_id}
                                            className="mb-4"
                                        >
                                            <label
                                                htmlFor={`record-${record.record_id}`}
                                                className="text-sm font-semibold text-gray-600"
                                            >
                                                {record.record_name}
                                            </label>
                                            <input
                                                type="number"
                                                id={`record-${record.record_id}`}
                                                name={`record-${record.record_id}`}
                                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                                min="0"
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        record.record_id,
                                                        parseInt(
                                                            e.target.value,
                                                            10
                                                        )
                                                    )
                                                }
                                                value={
                                                    recordValues[
                                                        record.record_id
                                                    ] || ""
                                                }
                                                required
                                            />
                                        </div>
                                    ))}
                                </div>
                            }
                            {recordFiles.map((file, index) => (
                                <div
                                    key={index}
                                    className="flex items-center space-x-2"
                                >
                                    <input
                                        type="file"
                                        id={`file-${index}`}
                                        name={`file-${index}`}
                                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                        accept=".pdf,.docx,.doc, .xlsx,.xls, .jpg, .jpeg, .png"
                                        onChange={(e) =>
                                            handleFileInputChange(
                                                e.target.files,
                                                index
                                            )
                                        }
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleRemoveFileInput(index)
                                        }
                                        className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-1.5"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={handleAddFileInput}
                                className="text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-3 py-1.5 mt-2"
                            >
                                Add File
                            </button>
                        </div>

                        <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b">
                            <button
                                data-modal-hide="default-modal"
                                type="submit"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            >
                                Submit
                            </button>
                            <button
                                data-modal-hide="default-modal"
                                type="button"
                                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
                                onClick={() => setShowModal(false)}
                            >
                                Decline
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddRecord;
