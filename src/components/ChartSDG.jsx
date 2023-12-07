import React, { useState, useEffect } from "react";
import Card from "./Card";
import WaterConsumption from "./WaterConsumption";
import Electrical from "./Electrical";
import Expenditure from "./Expenditure";
import WasteManagement from "./WasteManagement";
import Ppa from "./Ppa";
import SDG1 from "../assets/res/E-WEB-Goal-01.png";
import SDG2 from "../assets/res/E-WEB-Goal-02.png";
import SDG3 from "../assets/res/E-WEB-Goal-03.png";
import SDG4 from "../assets/res/E-WEB-Goal-04.png";
import SDG5 from "../assets/res/E-WEB-Goal-05.png";
import SDG6 from "../assets/res/E-WEB-Goal-06.png";
import SDG7 from "../assets/res/E-WEB-Goal-07.png";
import SDG8 from "../assets/res/E-WEB-Goal-08.png";
import SDG9 from "../assets/res/E-WEB-Goal-09.png";
import SDG10 from "../assets/res/E-WEB-Goal-10.png";
import SDG11 from "../assets/res/E-WEB-Goal-11.png";
import SDG12 from "../assets/res/E-WEB-Goal-12.png";
import SDG13 from "../assets/res/E-WEB-Goal-13.png";
import SDG14 from "../assets/res/E-WEB-Goal-14.png";
import SDG15 from "../assets/res/E-WEB-Goal-15.png";
import SDG16 from "../assets/res/E-WEB-Goal-16.png";
import SDG17 from "../assets/res/E-WEB-Goal-17.png";

const ChartSDG = () => {
    const [sdg, setSdg] = useState("SDG1");
    const [sdgName, setSdgName] = useState("No Poverty");
    const [role, setRole] = useState(localStorage.getItem("ROLE"));
    const [sdgs, setSdgs] = useState([
        { no: "01", id: "SDG1", name: "No Poverty", img: SDG1 },
        { no: "02", id: "SDG2", name: "Zero Hunger", img: SDG2 },
        { no: "03", id: "SDG3", name: "Good Health and Well-being", img: SDG3 },
        { no: "04", id: "SDG4", name: "Quality Education", img: SDG4 },
        { no: "05", id: "SDG5", name: "Gender Equality", img: SDG5 },
        { no: "06", id: "SDG6", name: "Clean Water and Sanitation", img: SDG6 },
        {
            no: "07",
            id: "SDG7",
            name: "Affordable and Clean Energy",
            img: SDG7,
        },
        {
            no: "08",
            id: "SDG8",
            name: "Decent Work and Economic Growth",
            img: SDG8,
        },
        {
            no: "09",
            id: "SDG9",
            name: "Industry, Innovation, and Infrastructure",
            img: SDG9,
        },
        { no: "10", id: "SDG10", name: "Reduced Inequality", img: SDG10 },
        {
            no: "11",
            id: "SDG11",
            name: "Sustainable Cities and Communities",
            img: SDG11,
        },
        {
            no: "12",
            id: "SDG12",
            name: "Responsible Consumption and Production",
            img: SDG12,
        },
        { no: "13", id: "SDG13", name: "Climate Action", img: SDG13 },
        { no: "14", id: "SDG14", name: "Life Below Water", img: SDG14 },
        { no: "15", id: "SDG15", name: "Life on Land", img: SDG15 },
        {
            no: "16",
            id: "SDG16",
            name: "Peace, Justice, and Strong Institutions",
            img: SDG16,
        },
        {
            no: "17",
            id: "SDG17",
            name: "Partnerships for the Goals",
            img: SDG17,
        },
    ]);
    const [reloadKey, setReloadKey] = useState(0);

    const handleSDGClick = (selectedSDG) => {
        setSdg(selectedSDG.id);
        setSdgName(selectedSDG.name);
        // Increment the reload key to trigger a re-render of the Card component
        setReloadKey(reloadKey + 1);
    };

    const handleOfficerClick = (selectedOfficer) => {
        localStorage.setItem("sdo", selectedOfficer.sdo_officer_id);
        setReloadKey(reloadKey + 1);
    };

    const [sdOfficers, setSdOfficers] = useState([]);

    useEffect(() => {
        const getSdOfficers = async () => {
            try {
                const response = await fetch(
                    `http://localhost:5000/sdo_officer`
                );
                const jsonData = await response.json();
                setSdOfficers(jsonData);
                if (role !== "sdo") {
                    localStorage.setItem("sdo", jsonData[0].sdo_officer_id);
                }
            } catch (err) {
                console.error(err.message);
            }
        };

        getSdOfficers();
    }, []);

    return (
        <>
            {role !== "sdo" && (
                <div className="my-5">
                    <h1 className="text-xl font-bold text-gray-700 title text-red-500">
                        Sustainable Development Offices
                    </h1>
                </div>
            )}

            <div className="grid grid-cols-5 gap-4 my-5">
                {role !== "sdo" &&
                    sdOfficers.map((sdOfficer, index) => (
                        <div
                            className="card bg-white shadow-lg rounded-lg p-5 border border-gray-200 hover:border-blue-500"
                            key={sdOfficer.sdo_officer_id}
                            onClick={() => handleOfficerClick(sdOfficer)}
                        >
                            <div className="card-body">
                                <h5 className="card-title text-base font-bold text-blue-500">
                                    SDO {index + 1} :{" "}
                                    {sdOfficer.sdo_officer_name}
                                </h5>
                            </div>
                        </div>
                    ))}
            </div>

            <div className="form-group">
                <div className="grid grid-cols-17 gap-1">
                    {sdgs.map((sdg) => (
                        <img
                            src={sdg.img}
                            style={{
                                cursor: "pointer",
                            }}
                            alt={`SDG ${sdg}`}
                            key={sdg.id}
                            onClick={() => handleSDGClick(sdg)}
                        />
                    ))}
                </div>
                <div className="my-5">
                    <h1 className="text-xl font-bold text-gray-700 title text-red-500">
                        {sdgName}
                    </h1>
                </div>

                <hr className="my-5 border-gray-800 border-1" />
            </div>
            <div className="grid grid-cols-4 gap-4 mt-5">
                {sdg && <Card sdg={sdg} key={reloadKey} />}
            </div>
            {/* {sdg === "SDG6" && (
                <div className="grid grid-cols-6 mt-5 gap-4">
                    <WaterConsumption />
                </div>
            )} */}
            {/* <div className="grid grid-cols-6 mt-5 gap-4">
                <Electrical />
            </div> */}
            {/* <div className="grid grid-cols-6 mt-5 gap-4">
                <Expenditure />
            </div>
            <div className="grid grid-cols-6 mt-5 gap-4">
                <WasteManagement />
            </div> */}
            {/* <div className="grid grid-cols-6 mt-5 gap-4">
                <Ppa />
            </div> */}
        </>
    );
};

export default ChartSDG;
