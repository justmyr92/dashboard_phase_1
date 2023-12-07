import React, { useEffect, useState } from "react";

const AddAccreditation = ({
    setShowModal,
    accreditation,
    setReload,
    campusID,
}) => {
    const [newAccreditation, setNewAccreditation] = useState([]);
    const [year, setYear] = useState(new Date().getFullYear());

    useEffect(() => {
        setNewAccreditation(
            accreditation.map((accreditationItem) => ({
                accreditation_id: "AC" + Math.random(1000, 9999),
                accreditation_program: accreditationItem.accreditation_program,
                accreditation_program_type:
                    accreditationItem.accreditation_program_type,
                accreditation_level: "Level A",
                accreditation_year: year,
                campus_id: campusID,
            }))
        );
    }, [year, accreditation, campusID]);

    const handleLevelChange = (index, level) => {
        setNewAccreditation((prevAccreditations) =>
            prevAccreditations.map((accreditation, i) =>
                i === index
                    ? { ...accreditation, accreditation_level: level }
                    : accreditation
            )
        );

        console.log(newAccreditation);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const addAccreditation = async () => {
            //for each accreditation, add to database
            newAccreditation.forEach(async (accreditation) => {
                const response = await fetch(
                    "http://localhost:5000/accreditation",
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(accreditation),
                    }
                );
                const data = await response.json();
                console.log(data);
                setReload(true);
                setShowModal(false);
            });
        };

        addAccreditation();
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
                    <form onSubmit={handleSubmit}>
                        <div className="flex items-start justify-between p-4 border-b rounded-t">
                            <h3 className="text-xl font-semibold text-gray-900">
                                Add Accreditation
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
                            <table className="w-full text-left whitespace-no-wrap">
                                <thead>
                                    <tr>
                                        <th className="font-semibold text-gray-600 uppercase text-sm tracking-wider">
                                            Program
                                        </th>
                                        <th className="font-semibold text-gray-600 uppercase text-sm tracking-wider">
                                            Program Type
                                        </th>
                                        <th className="font-semibold text-gray-600 uppercase text-sm tracking-wider">
                                            Level
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="w-full">
                                    {newAccreditation &&
                                        newAccreditation.map(
                                            (accreditation, index) => (
                                                <tr
                                                    key={
                                                        accreditation.accreditation_id
                                                    }
                                                    className="h-10 border-gray-200 border-b"
                                                >
                                                    <td className="text-sm">
                                                        {
                                                            accreditation.accreditation_program
                                                        }
                                                    </td>
                                                    <td className="text-sm">
                                                        {
                                                            accreditation.accreditation_program_type
                                                        }
                                                    </td>

                                                    <td className="text-sm">
                                                        <select
                                                            value={
                                                                accreditation.accreditation_level
                                                            }
                                                            onChange={(e) =>
                                                                handleLevelChange(
                                                                    index,
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            className="w-full px-4 py-2 border rounded-md"
                                                        >
                                                            <option value="Level A">
                                                                Level A
                                                            </option>
                                                            <option value="Level B">
                                                                Level B
                                                            </option>
                                                            <option value="Level C">
                                                                Level C
                                                            </option>
                                                        </select>
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                </tbody>
                            </table>
                        </div>
                        <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b">
                            <button
                                data-modal-hide="default-modal"
                                type="submit"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            >
                                I accept
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

export default AddAccreditation;
