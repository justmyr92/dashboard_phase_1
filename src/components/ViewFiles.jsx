import { faFilePdf, faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";

const ViewFiles = ({ record_data_id }) => {
    const [files, setFiles] = useState([]);
    useEffect(() => {
        const getFiles = async () => {
            const response = await fetch(
                `http://localhost:5000/file/${record_data_id}`
            );
            const data = await response.json();
            setFiles(data);
        };
        getFiles();
    }, []);

    const [showModal, setShowModal] = useState(false);
    const [file, setFile] = useState(null);

    const openModal = (file) => {
        setShowModal(true);
        setFile(file);
    };

    return (
        <div className="flex flex-col font-lg mt-5">
            <div className="grid grid-cols-3 gap-4">
                {files.map((file) => (
                    <>
                        {file.file_extension === "pdf" ? (
                            <button
                                className="border-2 border-gray-300 border-dashed rounded-lg p-5 flex flex-row items-center justify-center hover:bg-gray-100"
                                onClick={() => openModal(file)}
                            >
                                <FontAwesomeIcon
                                    icon={faFilePdf}
                                    size="2x"
                                    className="mr-2 text-blue-500"
                                />
                                <p className="text-sm">{file.file_name}</p>
                            </button>
                        ) : (
                            <button
                                className="border-2 border-gray-300 border-dashed rounded-lg p-5 flex flex-row items-center justify-center hover:bg-gray-100"
                                onClick={() => openModal(file)}
                            >
                                <FontAwesomeIcon
                                    icon={faImage}
                                    size="2x"
                                    className="mr-2 text-blue-500"
                                />
                                <p className="text-sm">{file.file_name}</p>
                            </button>
                        )}
                    </>
                ))}
            </div>
            {showModal && (
                <div
                    id="default-modal"
                    tabindex="-1"
                    aria-hidden="true"
                    class="overflow-y-auto overflow-x-hidden z-50 justify-center items-center w-full md:inset-0 max-h-full absolute inset-0 flex fixed top-0 left-0 right-0 bottom-0"
                >
                    <div class="relative p-4 w-full max-w-4xl max-h-full">
                        <div class="relative bg-white rounded-lg shadow">
                            <div class="flex items-center justify-between md:p-5 border-b rounded-t">
                                <h3 class="text-xl font-semibold text-gray-900"></h3>
                                <button
                                    type="button"
                                    class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                                    data-modal-hide="default-modal"
                                    onClick={() => setShowModal(false)}
                                >
                                    <svg
                                        class="w-3 h-3"
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
                                    <span class="sr-only">Close modal</span>
                                </button>
                            </div>
                            <div class="p-4 md:p-5 space-y-4">
                                {file.file_extension === "pdf" && (
                                    <iframe
                                        src={`../src/assets/records/${file.file_name}.${file.file_extension}`}
                                        width="100%"
                                        height="500px"
                                    ></iframe>
                                )}
                                {file.file_extension === "jpg" ||
                                    file.file_extension === "png" ||
                                    (file.file_extension === "jpeg" && (
                                        <img
                                            src={`../src/assets/records/${file.file_name}.${file.file_extension}`}
                                            width="100%"
                                            height="500px"
                                        />
                                    ))}
                                {/* 
                                {file.file_extension === "docx" && (
                                    <iframe
                                        src={`../src/assets/records/${file.file_name}.${file.file_extension}`}
                                        width="100%"
                                        height="500px"
                                    ></iframe>
                                )} */}
                            </div>
                            <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b">
                                <button
                                    data-modal-hide="default-modal"
                                    type="button"
                                    class="ms-3 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
                                    onClick={() => setShowModal(false)}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
//1699054869809
export default ViewFiles;
