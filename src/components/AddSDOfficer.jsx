import React, { useState } from "react";
import { useEffect } from "react";

const AddSDOfficer = ({ setReload, setModal }) => {
    const [campus, setCampus] = useState([]);
    const [showPassword, setShowPassword] = useState(false);
    const [sdo_officer, setSDOOfficer] = useState({
        sdo_officer_id: "SD" + Math.floor(Math.random() * 1000000),
        sdo_officer_name: "",
        sdo_officer_email: "",
        sdo_officer_phone: "",
        sdo_officer_password: "",
        campus_id: "",
    });
    useEffect(() => {
        const getCampus = async () => {
            const response = await fetch("http://localhost:5000/campus");
            const data = await response.json();
            setCampus(data);
            setSDOOfficers({
                ...sdo_officer,
                campus_id: data[0].campus_id,
            });
            console.log(data);
        };
        getCampus();
    }, []);

    const submitData = async (e) => {
        e.preventDefault();
        console.log(sdo_officer);
        const response = await fetch("http://localhost:5000/sdo_officer", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(sdo_officer),
        });
        const data = await response.json();
        setReload(true);
        setModal(false);
    };

    return (
        <div
            id="default-modal"
            tabindex="-1"
            aria-hidden="true"
            class="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
            <form onSubmit={submitData}>
                <div class="relative w-full max-w-2xl max-h-full p-4 mx-auto">
                    <div class="relative bg-white rounded-lg shadow">
                        <div class="flex items-start justify-between p-4 border-b rounded-t">
                            <h3 class="text-xl font-semibold text-gray-900">
                                Add SD Officer
                            </h3>
                            <button
                                type="button"
                                class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
                                data-modal-hide="default-modal"
                                onClick={() => setModal(false)}
                            >
                                <svg
                                    class="w-3 h-3"
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
                                <span class="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div class="p-6 space-y-6">
                            {/* createa a selectinput where user  can select campus */}
                            <div>
                                <label
                                    for="campus"
                                    class="block text-sm font-medium text-gray-700"
                                >
                                    Campus
                                </label>
                                <select
                                    id="campus"
                                    name="campus"
                                    autoComplete="campus"
                                    className="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    defaultValue={FormData.campus_id}
                                    onChange={(e) =>
                                        setSDOOfficer({
                                            ...sdo_officer,
                                            campus_id: e.target.value,
                                        })
                                    }
                                >
                                    <option value="0" disabled>
                                        Select Campus
                                    </option>
                                    {campus
                                        .filter(
                                            (campus) =>
                                                campus.campus_id === "1" ||
                                                campus.campus_id === "2" ||
                                                campus.campus_id === "3" ||
                                                campus.campus_id === "4" ||
                                                campus.campus_id === "5"
                                        )
                                        .map((campus) => (
                                            <option
                                                value={campus.campus_id}
                                                key={campus.campus_id}
                                            >
                                                {campus.campus_name}
                                            </option>
                                        ))}
                                </select>
                            </div>

                            <div>
                                <label
                                    for="name"
                                    class="block text-sm font-medium text-gray-700"
                                >
                                    Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    autocomplete="name"
                                    class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    placeholder="Enter Name"
                                    value={FormData.sdo_officer_name}
                                    onChange={(e) =>
                                        setSDOOfficer({
                                            ...sdo_officer,
                                            sdo_officer_name: e.target.value,
                                        })
                                    }
                                />
                            </div>

                            <div>
                                <label
                                    for="email"
                                    class="block text-sm font-medium text-gray-700"
                                >
                                    Email
                                </label>
                                <div class="mt-1">
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        autocomplete="email"
                                        class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        placeholder="Enter Email"
                                        value={FormData.sdo_officer_email}
                                        onChange={(e) =>
                                            setSDOOfficer({
                                                ...sdo_officer,
                                                sdo_officer_email:
                                                    e.target.value,
                                            })
                                        }
                                    />
                                </div>
                            </div>

                            <div>
                                <label
                                    for="phone"
                                    class="block text-sm font-medium text-gray-700"
                                >
                                    Phone
                                </label>
                                <div class="mt-1">
                                    <input
                                        type="text"
                                        name="phone"
                                        id="phone"
                                        autocomplete="phone"
                                        class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        placeholder="Enter Phone"
                                        value={FormData.sdo_officer_phone}
                                        onChange={(e) =>
                                            setSDOOfficer({
                                                ...sdo_officer,
                                                sdo_officer_phone:
                                                    e.target.value,
                                            })
                                        }
                                    />
                                </div>
                            </div>
                            {/* password */}
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Password
                                </label>
                                <div className="mt-1 relative">
                                    <input
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        name="password"
                                        id="password"
                                        autoComplete="password"
                                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        placeholder="Enter Password"
                                        onChange={(e) =>
                                            setSDOOfficer({
                                                ...sdo_officer,
                                                sdo_officer_password:
                                                    e.target.value,
                                            })
                                        }
                                        value={sdo_officer.sdo_officer_password}
                                    />
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                        <input
                                            type="checkbox"
                                            className="h-5 w-5 text-blue-500 focus:ring-blue-400 border-gray-300 rounded"
                                            id="showPasswordToggle"
                                            checked={showPassword}
                                            onChange={() =>
                                                setShowPassword(!showPassword)
                                            }
                                        />
                                        <label
                                            htmlFor="showPasswordToggle"
                                            className="ml-2 text-sm text-gray-700"
                                        >
                                            Show Password
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b">
                            <button
                                data-modal-hide="default-modal"
                                type="submit"
                                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            >
                                Save
                            </button>
                            <button
                                data-modal-hide="default-modal"
                                type="button"
                                class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
                                onClick={() => setModal(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddSDOfficer;
