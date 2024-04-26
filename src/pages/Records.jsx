import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Sidebar from "../components/Sidebar";
import ViewRecords from "../components/ViewRecords";
import AddRecord from "../components/AddRecord";

const Records = () => {
    const [selectedYear, setSelectedYear] = useState("2024");
    const [recordDataId, setRecordDataId] = useState("");
    useEffect(() => {
        // router.get("/recordy_data/:year/:sdo_id", async (req, res) => {
        //     try {
        //         const { year, sdo_id } = req.params;
        //         const recordData = await pool.query(
        //             "SELECT record_data_id FROM record_data_table WHERE EXTRACT(YEAR FROM record_date) = $1 AND sdo_officer_id = $2",
        //             [year, sdo_id]
        //         );
        //         res.json(recordData.rows);
        //     } catch (err) {
        //         console.error(err.message);
        //         res.status(500).json({ error: "Internal server error" });
        //     }
        // });

        const getRecordDataId = async () => {
            try {
                const response = await fetch(
                    `http://localhost:5000/api/recordy_data/${selectedYear}/${localStorage.getItem(
                        "ID"
                    )}`
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch record data");
                }
                const data = await response.json();
                if (data.length > 0) {
                    setRecordDataId(data[0].record_data_id);
                } else {
                    setRecordDataId("");
                }
            } catch (error) {
                console.error("Error fetching record data:", error);
            }
        };

        getRecordDataId();
    }, [selectedYear]);

    return (
        <>
            <Sidebar />
            <div className="p-4 sm:ml-64 h-screen">
                <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg h-full">
                    <h3 className="text-xl font-semibold text-gray-900">
                        View Record
                    </h3>
                    <div className="flex items-center justify-between p-6 space-x-2 border-b border-gray-200">
                        {/* create input year */}
                        <select
                            className="block w-32 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(e.target.value)}
                        >
                            <option value="2024" selected>
                                2024
                            </option>
                            <option value="2023">2023</option>
                            <option value="2022">2022</option>
                            <option value="2021">2021</option>
                        </select>
                    </div>
                    {recordDataId !== "" ? (
                        <ViewRecords
                            selectedYear={selectedYear}
                            record_data_id={recordDataId}
                        />
                    ) : (
                        <AddRecord selectedYear={selectedYear} />
                    )}
                </div>
            </div>
        </>
    );
};

export default Records;
