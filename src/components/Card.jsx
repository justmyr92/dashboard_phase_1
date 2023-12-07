import React, { useState, useEffect } from "react";

const Card = ({ sdg }) => {
    const [records, setRecords] = useState([]);
    const [recordsData, setRecordsData] = useState([]);
    const [recordValue, setRecordValue] = useState([]);
    const [sum, setSum] = useState([]);

    const [unit, setUnit] = useState([]);

    const [ID, setID] = useState(
        localStorage.getItem("sdo") || localStorage.getItem("ID")
    );

    useEffect(() => {
        const fetchRecords = async () => {
            try {
                const response = await fetch(
                    `http://localhost:5000/record/sdg/${sdg}`
                );
                const data = await response.json();
                setRecords(data);
            } catch (error) {
                console.error("Error fetching records:", error);
            }
        };

        fetchRecords();
    }, [sdg]);

    useEffect(() => {
        const fetchUnit = async () => {
            try {
                const response = await fetch(
                    `http://localhost:5000/unit/sdo/${ID}`
                );
                const data = await response.json();
                setUnit(data);
                console.log(data);
            } catch (error) {
                console.error("Error fetching unit:", error);
            }
        };

        fetchUnit();
    }, [ID]);

    useEffect(() => {
        const fetchRecordsData = async () => {
            try {
                const dataPromises = records.map(async (record) => {
                    const response = await fetch(
                        `http://localhost:5000/record_data/approved/${record.record_id}/${ID}`
                    );
                    return response.json();
                });
                const data = await Promise.all(dataPromises);
                console.log(data, "data");

                const filteredData = data.filter((d) => d.length > 0);

                console.log(filteredData, "filteredData");
                setRecordsData(filteredData);
            } catch (error) {
                console.error("Error fetching records data:", error);
            }
        };
        if (records.length > 0) {
            fetchRecordsData();
        }
    }, [records]);

    useEffect(() => {
        const fetchRecordValues = async () => {
            try {
                let sum = [];
                let temp = [];
                for (const recordData of recordsData) {
                    for (const record of recordData) {
                        const response = await fetch(
                            `http://localhost:5000/record_value/${record.record_data_id}`
                        );
                        const data = await response.json();
                        console.log(data);
                        if (data.length > 0) {
                            temp.push(data);
                            data.forEach((d, index) => {
                                if (
                                    sum[index] === undefined ||
                                    sum[index] === null
                                ) {
                                    sum[index] = 0;
                                }
                                sum[index] += parseInt(d.value);
                            });
                        }
                    }
                }
                setRecordValue(temp);
                setSum(sum);
            } catch (error) {
                console.error("Error fetching record values:", error);
            }
        };
        if (recordsData.length > 0) {
            fetchRecordValues();
        }
    }, [recordsData]);

    return (
        <>
            {records.map((value, index) => (
                <div
                    className="card bg-white shadow-lg rounded-lg p-5 border border-gray-200 hover:border-blue-500"
                    key={index}
                >
                    <div className="card-body">
                        <h5 className="card-title text-3xl font-bold text-blue-500">
                            {sum[index] || 0}
                        </h5>
                        <hr className="my-1" />
                        <p className="card-text text-black text-base justify-between">
                            {records[index].record_name}
                        </p>
                    </div>
                </div>
            ))}
        </>
    );
};

export default Card;
