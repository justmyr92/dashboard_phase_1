import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("https://csddashboard.online");

const Card = ({ sdg, instrument }) => {
    const [records, setRecords] = useState([]);
    const [recordsData, setRecordsData] = useState([]);
    const [recordValue, setRecordValue] = useState([]);
    const [sum, setSum] = useState([]);
    const [reload, setReload] = useState(false);

    const [unit, setUnit] = useState([]);

    const [ID, setID] = useState(localStorage.getItem("sdo"));

    useEffect(() => {
        setID(localStorage.getItem("sdo"));
        console.log(ID);
    }, []);

    const [isTableVisibleArray, setTableVisibilityArray] = useState(
        new Array(records.length).fill(false)
    );

    useEffect(() => {
        socket.on("fetchRecords", (submitStatus) => {
            setReload(true);
        });
    }, [socket]);

    useEffect(() => {
        const fetchRecords = async () => {
            try {
                const response = await fetch(
                    `https://csddashboard.online/api/record/sdg/${sdg}/${instrument.instrument_id}`
                );
                const data = await response.json();
                setRecords(data);
                setTableVisibilityArray(new Array(data.length).fill(false));
                console.log(data);
            } catch (error) {
                console.error("Error fetching records:", error);
            }
        };
        fetchRecords();
    }, [sdg, instrument.instrument_id, reload]);

    useEffect(() => {
        const fetchUnit = async () => {
            try {
                const response = await fetch(
                    `https://csddashboard.online/api/unit/sdo/${ID}`
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
                        `https://csddashboard.online/api/record_data/approved/${record.record_id}/${ID}`
                    );
                    return response.json();
                });
                const data = await Promise.all(dataPromises);

                const filteredData = data.filter((d) => d.length > 0);

                setRecordsData(filteredData);
            } catch (error) {
                console.error("Error fetching records data:", error);
            }
        };
        if (records.length > 0) {
            fetchRecordsData();
        }
    }, [records, ID]);

    useEffect(() => {
        const fetchRecordValues = async () => {
            try {
                let sum = [];
                let temp = [];
                for (const recordData of recordsData) {
                    for (const record of recordData) {
                        const response = await fetch(
                            `https://csddashboard.online/api/record_value/${record.record_data_id}`
                        );
                        const data = await response.json();
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

    const [hoveredIndex, setHoveredIndex] = useState(null);

    const handleHover = (index) => {
        setTableVisibilityArray((prev) =>
            prev.map((value, i) => (i === index ? true : value))
        );
        setHoveredIndex(index);
    };

    const handleLeave = (index) => {
        setTableVisibilityArray((prev) =>
            prev.map((value, i) => (i === index ? false : value))
        );
        setHoveredIndex(null);
    };

    return (
        <>
            {records.map((value, index) => (
                <div
                    className="card bg-white shadow-lg rounded-lg p-5 border border-gray-200 hover:border-blue-500 relative"
                    onMouseOver={() => handleHover(index)}
                    onMouseLeave={() => handleLeave(index)}
                    key={index}
                >
                    <div className="card-body">
                        <h5 className="card-title text-3xl font-bold text-blue-500">
                            {sum[index] || 0}
                        </h5>
                        <hr className="my-1" />
                        <p className="card-text text-black text-base justify-between">
                            {value.record_name}
                        </p>

                        {isTableVisibleArray[index] && recordValue[index] && (
                            <div
                                className={`absolute text-gray-900 p-4 rounded-md mt-2 w-[30rem] z-10 bg-white shadow-lg transition-all duration-300 
    ${(index + 1) % 4 === 1 ? "left-0 -top-[100%] translate-y-[-50%]" : ""}
    ${(index + 1) % 4 === 0 ? "right-0 -top-[100%] translate-y-[-50%]" : ""}
    ${
        (index + 1) % 4 !== 0 && (index + 1) % 4 !== 1
            ? "left-[50%] -top-[100%] translate-x-[-50%] translate-y-[-50%]"
            : ""
    }
  `}
                            >
                                <table className="w-full">
                                    <thead>
                                        <tr>
                                            <th className="border font-semibold p-2 text-sm">
                                                Record ID
                                            </th>
                                            <th className="border font-semibold p-2 text-sm">
                                                Question
                                            </th>
                                            <th className="border font-semibold p-2 text-sm">
                                                Value
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {recordValue.map(
                                            (record, recordIndex) => (
                                                <tr key={recordIndex}>
                                                    <td className="border p-2 text-sm">
                                                        {
                                                            record[index]
                                                                .record_data_id
                                                        }
                                                    </td>
                                                    <td className="border p-2 text-sm">
                                                        {
                                                            record[index]
                                                                .unit_name
                                                        }
                                                    </td>
                                                    <td className="border p-2 text-sm">
                                                        {record[index].value}
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </>
    );
};

export default Card;
