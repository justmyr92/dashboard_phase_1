import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import AddAccreditation from "../components/AddAccreditation";

const Accreditation = () => {
    const [ID, setID] = useState(localStorage.getItem("ID"));
    const [accreditation, setAccreditation] = useState([]);
    const [campusID, setCampusID] = useState("");
    const [year, setYear] = useState(new Date().getFullYear());
    const [reload, setReload] = useState(false);
    const [showAddAccreditation, setShowAddAccreditation] = useState(false);

    useEffect(() => {
        if (!ID) {
            window.location.href = "/login";
        }
    }, [ID]);

    useEffect(() => {
        const getCampusID = async () => {
            const response = await fetch(`http://localhost:5000/campus/${ID}`);
            const data = await response.json();
            setCampusID(data.campus_id);
            const response2 = await fetch(
                `http://localhost:5000/accreditation/${data.campus_id}`
            );
            const data2 = await response2.json();
            setAccreditation(data2);

            console.log(accreditation);
        };
        getCampusID();
    }, []);

    return (
        <section className="accreditation">
            <Sidebar />
            <div className="p-4 sm:ml-64">
                <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg">
                    <div className="header flex justify-between items-center mb-5">
                        <h3 className="text-3xl font-bold text-gray-700">
                            Accreditation
                        </h3>
                    </div>
                    <hr />

                    <div className="flex justify-end mt-4">
                        {/* select statement taht will filter the accreditation based on the year */}
                        <select
                            className="form-select w-1/4 mr-2 border border-gray-400 rounded-md p-2"
                            onChange={(e) => setYear(e.target.value)}
                        >
                            <option value="2022">2022</option>
                            <option value="2023" selected>
                                2023
                            </option>
                        </select>

                        <button
                            data-modal-target="default-modal"
                            data-modal-toggle="default-modal"
                            className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            type="button"
                            onClick={() => (
                                setShowAddAccreditation(true),
                                console.log(showAddAccreditation)
                            )}
                        >
                            Add Accreditation
                        </button>
                        {showAddAccreditation && (
                            <AddAccreditation
                                setShowModal={setShowAddAccreditation}
                                accreditation={accreditation}
                                setReload={setReload}
                                campusID={campusID}
                            />
                        )}
                    </div>
                    <table className="table-auto w-full mt-4">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">Program</th>
                                <th className="px-4 py-2">Type</th>
                                <th className="px-4 py-2">Level</th>
                                <th className="px-4 py-2">Year</th>
                                <th className="px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {accreditation.map(
                                (accreditation) =>
                                    accreditation.accreditation_year ==
                                        year && (
                                        <tr
                                            key={accreditation.accreditation_id}
                                        >
                                            <td className="border px-4 py-2">
                                                {
                                                    accreditation.accreditation_program
                                                }
                                            </td>
                                            <td className="border px-4 py-2">
                                                {
                                                    accreditation.accreditation_program_type
                                                }
                                            </td>
                                            <td className="border px-4 py-2">
                                                {
                                                    accreditation.accreditation_level
                                                }
                                            </td>
                                            <td className="border px-4 py-2">
                                                {
                                                    accreditation.accreditation_year
                                                }
                                            </td>
                                            <td className="border px-4 py-2">
                                                <button className="btn btn-primary">
                                                    Edit
                                                </button>
                                            </td>
                                        </tr>
                                    )
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default Accreditation;
