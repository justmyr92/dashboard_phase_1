import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const UpdateUnit = ({ showModal, setShowModal, setReload, unitData }) => {
    console.log(unitData);
    const [unitName, setUnitName] = useState(unitData.unit_name);
    const [unitAddress, setUnitAddress] = useState(unitData.unit_address);
    const [unitPhone, setUnitPhone] = useState(unitData.unit_phone);
    const [unitEmail, setUnitEmail] = useState(unitData.unit_email);
    const [ID, setID] = useState(localStorage.getItem("ID"));

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            unit_id: unitData.unit_id,
            unit_name: unitName,
            unit_address: unitAddress,
            unit_phone: unitPhone,
            unit_email: unitEmail,
            sdo_officer_id: ID,
            campus_id: 1,
        };
        try {
            const response = await fetch(
                `http://localhost:5000/unit/update/${unitData.unit_id}`,
                {
                    method: "PATCH",
                    body: JSON.stringify(data),
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status === 200) {
                Swal.fire({
                    icon: "success",
                    title: "Success!",
                    text: "Record updated successfully!",
                });
                setReload(true);
                setShowModal(false);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div
            id="default-modal"
            tabIndex="-1"
            aria-hidden="true"
            className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
            <div className="relative w-full max-w-2xl max-h-full">
                <div className="relative bg-white rounded-lg shadow">
                    <div className="flex items-start justify-between p-4 border-b rounded-t">
                        <h3 className="text-xl font-semibold text-gray-900">
                            Update Record
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
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="p-6 space-y-6">
                            <div className="space-y-2">
                                <label
                                    htmlFor="unitName"
                                    className="block font-medium text-gray-900"
                                >
                                    Unit Name
                                </label>
                                <input
                                    type="text"
                                    id="unitName"
                                    value={unitName}
                                    onChange={(e) =>
                                        setUnitName(e.target.value)
                                    }
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                            </div>
                            <div className="space-y-2">
                                <label
                                    htmlFor="unitAddress"
                                    className="block font-medium text-gray-900"
                                >
                                    Unit Address
                                </label>
                                <input
                                    type="text"
                                    id="unitAddress"
                                    value={unitAddress}
                                    onChange={(e) =>
                                        setUnitAddress(e.target.value)
                                    }
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                            </div>
                            <div className="space-y-2">
                                <label
                                    htmlFor="unitPhone"
                                    className="block font-medium text-gray-900"
                                >
                                    Unit Phone
                                </label>
                                <input
                                    type="text"
                                    id="unitPhone"
                                    value={unitPhone}
                                    onChange={(e) =>
                                        setUnitPhone(e.target.value)
                                    }
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                            </div>
                            <div className="space-y-2">
                                <label
                                    htmlFor="unitEmail"
                                    className="block font-medium text-gray-900"
                                >
                                    Unit Email
                                </label>
                                <input
                                    type="text"
                                    id="unitEmail"
                                    value={unitEmail}
                                    onChange={(e) =>
                                        setUnitEmail(e.target.value)
                                    }
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                            </div>
                        </div>

                        <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b">
                            <button
                                data-modal-hide="default-modal"
                                type="submit"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            >
                                Update
                            </button>
                            <button
                                data-modal-hide="default-modal"
                                type="button"
                                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
                                onClick={() => setShowModal(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateUnit;
