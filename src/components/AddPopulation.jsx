import React, { useState } from "react";

const AddPopulation = ({ setShowModal, showModal, setReload }) => {
    const [ID, setID] = useState(localStorage.getItem("ID"));
    const [formData, setFormData] = useState({
        enrolled_school_year: "",
        enrolled_year_level: "",
        enrolled_male: "Male",
        enrolled_female: "Female",
        enrollment_male_number: 0,
        enrollment_female_number: 0,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const idResponse = await fetch(
                `http://localhost:5000/campus/${ID}`
            ); // Updated here
            const { campus_id } = await idResponse.json();

            const data = {
                enrolled_id: Math.floor(
                    Math.random() * (99999999 - 10000000) + 10000000
                ),
                enrolled_school_year: formData.enrolled_school_year,
                enrolled_year_level: formData.enrolled_year_level,
                enrolled_gender: formData.enrolled_male,
                enrollment_number: parseInt(
                    formData.enrollment_male_number,
                    10
                ),
                campus_id: campus_id,
            };

            const data2 = {
                enrolled_id: Math.floor(
                    Math.random() * (99999999 - 10000000) + 10000000
                ),
                enrolled_school_year: formData.enrolled_school_year,
                enrolled_year_level: formData.enrolled_year_level,
                enrolled_gender: formData.enrolled_female,
                enrollment_number: parseInt(
                    formData.enrollment_female_number,
                    10
                ),
                campus_id: campus_id,
            };

            const response = await fetch(
                "http://localhost:5000/add_enrollment",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                }
            );

            const response2 = await fetch(
                "http://localhost:5000/add_enrollment",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data2),
                }
            );

            console.log(response, response2, "response");

            if (response.ok && response2.ok) {
                setReload(true);
                setShowModal(false);
                setFormData({
                    enrolled_school_year: "",
                    enrolled_year_level: "",
                    enrolled_male: "Male",
                    enrolled_female: "Female",
                    enrollment_male_number: 0,
                    enrollment_female_number: 0,
                });
            } else {
                console.error("Error in one or both requests");
            }
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <div
            id="default-modal"
            tabindex="-1"
            aria-hidden="true"
            className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
            <form onSubmit={handleSubmit}>
                <div className="relative w-full max-w-2xl max-h-full">
                    <div className="relative bg-white rounded-lg shadow">
                        <div className="flex items-start justify-between p-4 border-b rounded-t">
                            <h3 className="text-xl font-semibold text-gray-900">
                                Add Population
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
                        <div className="p-6 space-y-6">
                            <div className="flex flex-col">
                                <label
                                    for="schoolYear"
                                    className="text-sm font-medium text-gray-700"
                                >
                                    School Year
                                </label>
                                <input
                                    type="text"
                                    id="schoolYear"
                                    name="enrolled_school_year"
                                    value={formData.enrolled_school_year}
                                    onChange={handleChange} // Updated here
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none sm:text-sm"
                                />
                            </div>

                            <div className="flex flex-col">
                                <label
                                    for="yearLevel"
                                    className="text-sm font-medium text-gray-700"
                                >
                                    Year Level
                                </label>
                                <input
                                    type="text"
                                    id="yearLevel"
                                    name="enrolled_year_level"
                                    value={formData.enrolled_year_level}
                                    onChange={handleChange} // Updated here
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none sm:text-sm"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col">
                                    <label
                                        for="femaleGender"
                                        className="text-sm font-medium text-gray-700"
                                    >
                                        Female
                                    </label>
                                    <input
                                        type="text"
                                        id="femaleGender"
                                        name="enrolled_female"
                                        value={formData.enrolled_female}
                                        onChange={handleChange} // Updated here
                                        disabled
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none sm:text-sm"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label
                                        for="enrollmentFemaleNumber"
                                        className="text-sm font-medium text-gray-700"
                                    >
                                        Enrollment Number
                                    </label>
                                    <input
                                        type="text"
                                        id="enrollmentFemaleNumber"
                                        name="enrollment_female_number"
                                        value={
                                            formData.enrollment_female_number
                                        }
                                        onChange={handleChange} // Updated here
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col">
                                    <label
                                        for="maleGender"
                                        className="text-sm font-medium text-gray-700"
                                    >
                                        Male
                                    </label>
                                    <input
                                        type="text"
                                        id="maleGender"
                                        name="enrolled_male"
                                        value={formData.enrolled_male}
                                        disabled
                                        onChange={handleChange} // Updated here
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none sm:text-sm"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label
                                        for="enrollmentMaleNumber"
                                        className="text-sm font-medium text-gray-700"
                                    >
                                        Enrollment Number
                                    </label>
                                    <input
                                        type="text"
                                        id="enrollmentMaleNumber"
                                        name="enrollment_male_number"
                                        value={formData.enrollment_male_number}
                                        onChange={handleChange} // Updated here
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none sm:text-sm"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b">
                            <button
                                type="submit"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            >
                                Add Population
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
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddPopulation;
