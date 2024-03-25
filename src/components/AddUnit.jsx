import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { getCampuses } from "../services/api";

const AddUnit = ({ showModal, setShowModal, setReload }) => {
    const [unitName, setUnitName] = useState("");
    const [unitPhone, setUnitPhone] = useState("");
    const [unitEmail, setUnitEmail] = useState("");
    const [unitPassword, setUnitPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const localStorageId = localStorage.getItem("ID");
    const [options, setOptions] = useState([]);
    const [sdgs, setSdgs] = useState([]);
    const [sdg, setSdg] = useState([]);
    const [campus_id, setCampus_id] = useState("");
    const [sdoNo, setSdoNo] = useState(0);
    const [sdoOfficers, setSdoOfficers] = useState([]);
    const [sdoOfficer, setSdoOfficer] = useState({});
    useEffect(() => {
        const fetchSdg = async () => {
            try {
                const response = await fetch(
                    `https://csddashboard.online/api/sdg`
                );
                const data = await response.json();
                setSdgs(data);
                setSdg(data[0].sdg_id);
            } catch (error) {
                console.error("Error fetching sdg:", error);
            }
        };

        fetchSdg();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `https://csddashboard.online/api/sdo-officers`
                );
                const jsonData = await response.json();
                setSdoOfficers(jsonData);

                if (localStorage.getItem("ROLE") === "sdo") {
                    setSdoOfficer(
                        jsonData.find(
                            (sdo) => sdo.sdo_officer_id === localStorageId
                        )
                    );
                    setSdoNo(
                        jsonData.find(
                            (sdo) => sdo.sdo_officer_id === localStorageId
                        ).sd_no
                    );
                }
            } catch (error) {
                console.error("Error fetching sdo officer:", error);
            }
        };

        fetchData();
    }, [localStorageId]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const jsonData = await getCampuses();

                setOptions(jsonData);
            } catch (error) {
                console.error("Error fetching campus:", error);
            }
        };

        fetchData();
    }, [sdoNo]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            //generate random unit id U + random 5 digit number
            unit_id: Math.floor(Math.random() * 100000),
            unit_name: unitName,
            unit_address: options.find(
                (option) => option.campus_id === campus_id
            ).campus_name,
            unit_phone: unitPhone,
            unit_email: unitEmail,
            unit_password: unitPassword,
            //get the sdo officer id of the from ths with matching sd_no if the user is an sdo else find fromo the sdo officers with the same sd_no as the campus
            sdo_officer_id:
                localStorage.getItem("ROLE") === "sdo"
                    ? sdoOfficers.find((sdo) => sdo.sd_no === sdoNo)
                          .sdo_officer_id
                    : sdoOfficers.find(
                          (sdo) =>
                              sdo.sd_no ===
                              options.find(
                                  (option) => option.campus_id === campus_id
                              ).sd_no
                      ).sdo_officer_id,

            campus_id: campus_id,
            // sdg_id: sdg,
        };

        console.log(data);

        try {
            const response = await fetch(
                "https://csddashboard.online/api/unit",
                {
                    method: "POST",
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
                    text: "Record added successfully!",
                });

                setShowModal(false);
                setReload(true);
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
            <div className="relative w-full max-w-2xl max-h-full mx-auto">
                <div className="relative bg-white rounded-lg shadow">
                    <div className="flex items-start justify-between p-4 border-b rounded-t">
                        <h3 className="text-xl font-semibold text-gray-900">
                            Add Unit
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
                                    autoComplete="false"
                                />
                            </div>

                            <div className="space-y-2">
                                <label
                                    htmlFor="unitAddress"
                                    className="block font-medium text-gray-900"
                                >
                                    Unit Address
                                </label>
                                {options.length > 0 ? (
                                    <select
                                        id="unitAddress"
                                        value={campus_id}
                                        onChange={(e) =>
                                            setCampus_id(e.target.value)
                                        }
                                        className="w-full p-2 border border-gray-300 rounded"
                                    >
                                        <option value="" disabled>
                                            Select Unit Address
                                        </option>
                                        {sdoNo !== 0
                                            ? options
                                                  .filter(
                                                      (option) =>
                                                          option.sd_no === sdoNo
                                                  )
                                                  .map((option) => (
                                                      <option
                                                          key={option.campus_id}
                                                          value={
                                                              option.campus_id
                                                          }
                                                      >
                                                          {option.campus_name}
                                                      </option>
                                                  ))
                                            : options.map((option) => (
                                                  <option
                                                      key={option.campus_id}
                                                      value={option.campus_id}
                                                  >
                                                      {option.campus_name}
                                                  </option>
                                              ))}
                                    </select>
                                ) : (
                                    <p>No ID found in localStorage</p>
                                )}
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
                                    autoComplete="false"
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
                                    autoComplete="false"
                                />
                            </div>
                            <div className="space-y-2">
                                <label
                                    htmlFor="unitPassword"
                                    className="block font-medium text-gray-900"
                                >
                                    Unit Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        id="unitPassword"
                                        value={unitPassword}
                                        onChange={(e) =>
                                            setUnitPassword(e.target.value)
                                        }
                                        className="w-full p-2 border border-gray-300 rounded"
                                        autoComplete="false"
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

                        <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b">
                            <button
                                data-modal-hide="default-modal"
                                type="submit"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            >
                                Submit
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

export default AddUnit;
