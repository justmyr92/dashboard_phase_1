import { useState, useEffect } from "react";
import React from "react";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { MultiSelect, MultiSelectItem } from "@tremor/react";
import {
    addInstrument,
    addRecord,
    addTag,
    getSDG,
    getUnits,
} from "../services/api";

const InstrumentForm = () => {
    const [sdgIndicators, setSdgIndicators] = useState([]);
    const [instrumentName, setInstrumentName] = useState("");
    const [sdgIndicator, setSdgIndicator] = useState("");
    const [record, setRecord] = useState([]);
    const [page, setPage] = useState(1);

    const [units, setUnits] = useState([]);
    const [sectionContent, setSectionContent] = useState("");

    const addRecordInput = () => {
        if (sdgIndicator === "") {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please select an SDG indicator first!",
            });
            return;
        }
        setRecord((prevRecords) => [
            ...prevRecords,
            {
                record_id: "",
                record_name: "",
                unit_ids: [],
                sdg_id: sdgIndicator,
            },
        ]);
        console.log(units);
    };

    useEffect(() => {
        console.log(record);
    }, [record]);

    const deleteRecord = (index) => {
        setRecord((prevRecords) => {
            const newRecords = [...prevRecords];
            newRecords.splice(index, 1);
            return newRecords;
        });
    };

    const handleRecordChange = (index, field, value) => {
        setRecord((prevRecords) => {
            const newRecords = [...prevRecords];
            newRecords[index][field] = value;
            return newRecords;
        });
    };

    const groupRecordsBySdgId = (records) => {
        return records.reduce((grouped, record) => {
            const sdgId = record.sdg_id;
            if (!grouped[sdgId]) {
                grouped[sdgId] = [];
            }
            grouped[sdgId].push(record);
            return grouped;
        }, {});
    };

    useEffect(() => {
        const fetchData = async () => {
            const data = await getUnits();
            setUnits(data);
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getSDG();
            setSdgIndicators(data);
        };
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3B82F6",
            cancelButtonColor: "#EF4444",
            confirmButtonText: "Yes, add it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const instrument = {
                    name: instrumentName,
                    status: "Active",
                    date_posted: new Date(),
                    section_content: sectionContent,
                };

                try {
                    const data = await addInstrument(instrument);
                    if (data) {
                        if (instrumentName !== "") {
                            record.map(async (recordItem) => {
                                if (recordItem.record_name === "") {
                                    return;
                                }
                                const newRecord = {
                                    record_id:
                                        "ID" +
                                        Math.floor(Math.random() * 999999),
                                    record_name: recordItem.record_name,
                                    sdg_id: recordItem.sdg_id,
                                    instrument_id: data.instrument_id,
                                };
                                try {
                                    const data2 = await addRecord(newRecord);
                                    if (data2) {
                                        recordItem.unit_ids.map(
                                            async (unit_id) => {
                                                const tag = {
                                                    record_id:
                                                        newRecord.record_id,
                                                    unit_id: unit_id,
                                                };
                                                try {
                                                    const data3 = await addTag(
                                                        tag
                                                    );
                                                } catch (error) {
                                                    console.error(error);
                                                }
                                            }
                                        );
                                    }
                                } catch (error) {
                                    console.error(error);
                                }
                            });
                        }
                    }
                    Swal.fire({
                        icon: "success",
                        title: "Success!",
                        text: "Instrument has been added.",
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.href = "/csd/instruments";
                        }
                    });
                } catch (error) {
                    console.error(error);
                }
            }
        });
    };

    return (
        <section className="dashboard">
            <Sidebar />
            <div className="p-4 sm:ml-64">
                <div className="p-4">
                    <div className="header flex justify-between items-center">
                        <h3 className="text-3xl font-bold text-gray-700 title">
                            Instrument Form
                        </h3>
                        <Link
                            className="p-2 px-4 bg-blue-500 text-white rounded-lg"
                            to="/csd/instruments"
                        >
                            Back
                        </Link>
                    </div>
                    <hr className="my-5 border-gray-300 border-1" />

                    <form
                        className="flex flex-col gap-4"
                        onSubmit={handleSubmit}
                    >
                        {page === 1 && (
                            <>
                                <div className="grid-cols-2 gap-4 grid">
                                    <div className="control-group flex flex-col gap-2 items-start">
                                        <label className="block text-gray-700 text-sm font-semibold">
                                            Instrument Name
                                        </label>
                                        <input
                                            className="w-full px-5 py-2 text-gray-900 rounded focus:outline-none focus:shadow-outline border border-gray-300 placeholder-gray-500 focus:bg-white"
                                            type="text"
                                            placeholder="Instrument Name"
                                            value={instrumentName}
                                            onChange={(e) => {
                                                setInstrumentName(
                                                    e.target.value
                                                );
                                            }}
                                            required
                                        />
                                    </div>
                                    <div className="control-group flex flex-col gap-2 items-start">
                                        <label className="block text-gray-700 text-sm font-semibold">
                                            SDG Indicator
                                        </label>
                                        <select
                                            className="w-full px-5 py-2 text-gray-900 rounded focus:outline-none focus:shadow-outline border border-gray-300 focus:bg-white"
                                            value={sdgIndicator}
                                            onChange={(e) => {
                                                setSdgIndicator(e.target.value);
                                            }}
                                            required
                                        >
                                            <option value="" disabled selected>
                                                Select SDG Indicator
                                            </option>
                                            {sdgIndicators.map(
                                                (sdgIndicator) => (
                                                    <option
                                                        key={
                                                            sdgIndicator.sdg_id
                                                        }
                                                        value={
                                                            sdgIndicator.sdg_id
                                                        }
                                                    >
                                                        SDG{" "}
                                                        {sdgIndicator.sdg_no +
                                                            " - " +
                                                            sdgIndicator.sdg_name}
                                                    </option>
                                                )
                                            )}
                                        </select>
                                    </div>
                                    {/* Section Content Input col-1*/}
                                    <div className="control-group flex flex-col gap-2 items-start">
                                        <label className="block text-gray-700 text-sm font-semibold">
                                            Section Content
                                        </label>
                                        <input
                                            className="w-full px-5 py-2 text-gray-900 rounded focus:outline-none focus:shadow-outline border border-gray-300 placeholder-gray-500 focus:bg-white"
                                            type="text"
                                            placeholder="Section Content"
                                            value={sectionContent}
                                            onChange={(e) => {
                                                setSectionContent(
                                                    e.target.value
                                                );
                                            }}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="control-group flex flex-col gap-2 items-start mt-5">
                                    <h3 className="block text-red-500 text-lg font-semibold">
                                        {sdgIndicators.map((sdgItem) => {
                                            if (
                                                sdgItem.sdg_id === sdgIndicator
                                            ) {
                                                return (
                                                    "SDG " +
                                                    sdgItem.sdg_no +
                                                    " - " +
                                                    sdgItem.sdg_name
                                                );
                                            }
                                        })}
                                    </h3>
                                    <p className="block text-gray-700 text-sm">
                                        {sdgIndicators.map((sdgItem) => {
                                            if (
                                                sdgItem.sdg_id === sdgIndicator
                                            ) {
                                                return sdgItem.sdg_description;
                                            }
                                        })}
                                    </p>
                                </div>
                                <hr className="my-5 border-gray-300 border-1" />

                                {/* Dynamic Record Inputs */}
                                {record.map(
                                    (recordItem, index) =>
                                        recordItem.sdg_id === sdgIndicator && (
                                            <div
                                                key={index}
                                                className="flex gap-4 border-1 rounded-lg border p-4 shadow-md items-end"
                                            >
                                                {/* Add an input for Record Name */}
                                                <div className="control-group flex flex-col gap-2 items-start w-full justify-end">
                                                    <label className="block text-gray-700 text-sm font-semibold">
                                                        Instrument Question
                                                    </label>

                                                    <input
                                                        className="w-full px-5 py-2 text-gray-900 rounded focus:outline-none focus:shadow-outline border border-gray-300 placeholder-gray-500 focus:bg-white"
                                                        type="text"
                                                        placeholder="SAT Question"
                                                        value={
                                                            recordItem.record_name
                                                        }
                                                        onChange={(e) =>
                                                            handleRecordChange(
                                                                index,
                                                                "record_name",
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                    <MultiSelect
                                                        className="w-full bg-white"
                                                        value={
                                                            recordItem.unit_ids
                                                        }
                                                        onChange={(e) =>
                                                            handleRecordChange(
                                                                index,
                                                                "unit_ids",
                                                                e
                                                            )
                                                        }
                                                    >
                                                        {units.map((unit) => (
                                                            <MultiSelectItem
                                                                className="bg-white"
                                                                key={
                                                                    unit.unit_id
                                                                }
                                                                value={
                                                                    unit.unit_id
                                                                }
                                                            >
                                                                {unit.unit_name}
                                                            </MultiSelectItem>
                                                        ))}
                                                    </MultiSelect>
                                                    <button
                                                        type="button"
                                                        className="px-5 py-2 bg-red-500 text-white rounded-lg"
                                                        onClick={() =>
                                                            deleteRecord(index)
                                                        }
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        )
                                )}

                                {/* Add Button */}
                                <button
                                    type="button"
                                    className="p-2 px-4 bg-green-500 text-white rounded-lg w-fit"
                                    onClick={addRecordInput}
                                >
                                    Add Record
                                </button>

                                <hr className="my-5 border-gray-300 border-1" />
                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        className="p-2 px-4 bg-blue-500 text-white rounded-lg"
                                        onClick={() => setPage(2)}
                                        disabled={
                                            record.length === 0 ||
                                            !instrumentName
                                        }
                                    >
                                        Preview
                                    </button>
                                </div>
                            </>
                        )}
                        {page === 2 && (
                            <>
                                <table className="table-auto w-full">
                                    <tbody>
                                        <tr>
                                            <th className="border px-4 py-2 text-left font-semibold ">
                                                Instrument Name
                                            </th>
                                            <td className="border px-4 py-2">
                                                {instrumentName}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td
                                                className="border px-4 py-2 bg-red-500 text-white text-lg font-semibold text-center"
                                                colSpan={2}
                                            >
                                                Questionnaire
                                            </td>
                                        </tr>
                                        {Object.keys(
                                            groupRecordsBySdgId(record)
                                        )
                                            .sort((a, b) => {
                                                return (
                                                    parseInt(a) - parseInt(b)
                                                );
                                            })
                                            .map((sdg_id) => (
                                                <React.Fragment key={sdg_id}>
                                                    <tr>
                                                        <td
                                                            className="border px-4 py-2 bg-gray-100 font-semibold text-center"
                                                            colSpan={2}
                                                        >
                                                            SDG{" "}
                                                            {
                                                                sdgIndicators.find(
                                                                    (sdgItem) =>
                                                                        sdgItem.sdg_id ===
                                                                        sdg_id
                                                                ).sdg_no
                                                            }{" "}
                                                            -{" "}
                                                            {
                                                                sdgIndicators.find(
                                                                    (sdgItem) =>
                                                                        sdgItem.sdg_id ===
                                                                        sdg_id
                                                                ).sdg_name
                                                            }
                                                        </td>
                                                    </tr>
                                                    {groupRecordsBySdgId(
                                                        record
                                                    )[sdg_id].map(
                                                        (recordItem, index) =>
                                                            recordItem.record_name !==
                                                                "" && (
                                                                <tr key={index}>
                                                                    <td
                                                                        className="border px-4 py-2"
                                                                        colSpan={
                                                                            2
                                                                        }
                                                                    >
                                                                        {index +
                                                                            1 +
                                                                            ". " +
                                                                            recordItem.record_name}
                                                                    </td>
                                                                </tr>
                                                            )
                                                    )}
                                                </React.Fragment>
                                            ))}
                                    </tbody>
                                </table>
                                <hr className="my-5 border-gray-300 border-1" />
                                <div className="flex justify-end gap-2">
                                    <button
                                        type="button"
                                        className="p-2 px-4 bg-blue-500 text-white rounded-lg"
                                        onClick={() => setPage(1)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        type="submit"
                                        className="p-2 px-4 bg-blue-500 text-white rounded-lg"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </>
                        )}
                    </form>
                </div>
            </div>
        </section>
    );
};

export default InstrumentForm;
