import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";

const Notifications = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleNotifications = () => {
        setIsOpen(!isOpen);
    };

    const [notifications, setNotifications] = useState([]);

    const id = localStorage.getItem("ID");

    useEffect(() => {
        const getNotifications = async () => {
            try {
                const response = await fetch(
                    `https://csd.dashboard.online/api/notification/${id}`
                );
                const jsonData = await response.json();
                setNotifications(jsonData);
            } catch (err) {
                console.error(err.message);
            }
        };

        getNotifications();
    }, []);

    return (
        <div className="notifications">
            <button
                id="dropdownDefaultButton"
                data-dropdown-toggle="dropdown"
                className="text-white bg-red-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button"
                onClick={toggleNotifications}
            >
                <FontAwesomeIcon icon={faBell} />
            </button>

            {isOpen && (
                <div
                    id="dropdown"
                    className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-96 absolute right-8 mt-2"
                >
                    <ul
                        className="py-2 text-sm text-gray-700"
                        aria-labelledby="dropdownDefaultButton"
                    >
                        {notifications.map((notification) => (
                            <li
                                className="px-4 py-2 border-b border-gray-100"
                                key={notification.id}
                            >
                                <h3 className="px-4 py-2 font-bold">
                                    SD Officer
                                </h3>
                                <small className="px-4 py-2 text-gray-500">
                                    {new Date(
                                        notification.notification_date
                                    ).toLocaleDateString("en-US", {
                                        weekday: "short",
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                    {new Date(
                                        notification.notification_date
                                    ).toLocaleTimeString("en-US")}
                                </small>
                                <p className="px-4 py-2">
                                    {notification.message}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Notifications;
