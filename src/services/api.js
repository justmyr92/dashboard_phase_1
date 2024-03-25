const API_URL = "https://csddashboard.online/api";

//get all sdo officers
export const getSDOfficers = async () => {
    try {
        const response = await fetch(`${API_URL}/sdo-officers`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

//delete a sdo officer
export const deleteSDOfficer = async (sdo_officer_id) => {
    try {
        const response = await fetch(
            `${API_URL}/sdo_officer/${sdo_officer_id}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        if (response.ok) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
    }
};

//get all tag via id
export const getTagById = async (id) => {
    try {
        const response = await fetch(`${API_URL}/tag/${id}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

//get all units
export const getUnits = async () => {
    try {
        const response = await fetch(`${API_URL}/unit`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

//get all record data
export const getRecordData = async () => {
    try {
        const response = await fetch(`${API_URL}/record_data`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

//add record data
export const addRecordData = async (recordData) => {
    try {
        const response = await fetch(`${API_URL}/record_data`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(recordData),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

//add record value
export const addRecordValue = async (recordValue) => {
    try {
        const response = await fetch(`${API_URL}/record_value`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(recordValue),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

//get unit by id
export const getUnitById = async (id) => {
    try {
        const response = await fetch(`${API_URL}/unit/${id}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

//get record data per unit
export const getRecordDataPerUnit = async () => {
    try {
        const response = await fetch(`${API_URL}/record_data/unit`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

//get all request
export const getRequests = async () => {
    try {
        const response = await fetch(`${API_URL}/request`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

//get all instruments by id
export const getInstrumentById = async (id) => {
    try {
        const response = await fetch(`${API_URL}/getInstruments/${id}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

//add a request
export const addRequest = async (request) => {
    try {
        const response = await fetch(`${API_URL}/request`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(request),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

//get all instruments
export const getInstruments = async () => {
    try {
        const response = await fetch(`${API_URL}/getInstruments`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

//get unit per sdo by id
export const getUnitPerSdoById = async (id) => {
    try {
        const response = await fetch(`${API_URL}/unit/sdo/${id}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

//upate unit status by by unit id
export const updateUnitStatus = async (unit_id, status) => {
    try {
        const response = await fetch(`${API_URL}/unit/status/${unit_id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                status: status,
            }),
        });
        if (response.ok) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
    }
};

//login user
export const loginUser = async (body) => {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

//get sdg
export const getSDG = async () => {
    try {
        const response = await fetch(`${API_URL}/sdg`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

//fet records by instrument id
export const getRecordsByInstrumentId = async (id) => {
    try {
        const response = await fetch(`${API_URL}/getRecords/${id}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

//update records
export const updateRecords = async (record) => {
    try {
        const response = await fetch(`${API_URL}/updateRecords`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(record),
        });
        if (response.ok) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
    }
};

//update instrument status
export const updateInstrumentStatus = async (instrument) => {
    try {
        const response = await fetch(`${API_URL}/updateInstrumentStatus`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(instrument),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

//add instrument
export const addInstrument = async (instrument) => {
    try {
        const response = await fetch(`${API_URL}/instruments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(instrument),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

//add record
export const addRecord = async (record) => {
    try {
        const response = await fetch(`${API_URL}/addRecord`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(record),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

//add a tag
export const addTag = async (tag) => {
    try {
        const response = await fetch(`${API_URL}/tag`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(tag),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

//get all annual reports
export const getAnnualReports = async () => {
    try {
        const response = await fetch(`${API_URL}/annual_report`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

//add an annual report
export const addAnnualReport = async (report) => {
    try {
        const response = await fetch(`${API_URL}/annual_report`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(report),
        });
        return await response.json();
    } catch (error) {
        console.log(error);
    }
};

//get all record values by record data id
export const getRecordValuesByRecordDataId = async (record_data_id) => {
    try {
        const response = await fetch(
            `${API_URL}/record_value/${record_data_id}`
        );
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

//update record values by record value id
export const updateRecordValues = async (record) => {
    try {
        const response = await fetch(
            `${API_URL}/update_record_values/${record.record_value_id}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ value: record.value }),
            }
        );
        return await response.json();
    } catch (error) {
        console.log(error);
    }
};

//update record data status by record data id
export const updateRecordDataStatus = async (record_data_id, status) => {
    try {
        const response = await fetch(
            `${API_URL}/record_data/${record_data_id}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ status: status }),
            }
        );
        return await response.json();
    } catch (error) {
        console.log(error);
    }
};

//get a file by record data id
export const getFileByRecordDataId = async (record_data_id) => {
    try {
        const response = await fetch(`${API_URL}/file/${record_data_id}`);
        return await response.json();
    } catch (error) {
        console.log(error);
    }
};

//update a unit by unit id
export const updateUnit = async (unitData) => {
    try {
        const response = await fetch(
            `${API_URL}/unit/update/${unitData.unit_id}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(unitData),
            }
        );
        return await response.json();
    } catch (error) {
        console.log(error);
    }
};

//get all campuses
export const getCampuses = async () => {
    try {
        const response = await fetch(`${API_URL}/campus`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

//get sdo officer by id
export const updateSDOOfficer = async (updatedOfficer) => {
    try {
        const response = await fetch(`${API_URL}/sdo_officer/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedOfficer),
        });
        return await response.json();
    } catch (error) {
        console.log(error);
    }
};

//add notification
export const addNotification = async (notif) => {
    try {
        const response = await fetch(`${API_URL}/notification`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(notif),
        });
        return await response.json();
    } catch (error) {
        console.log(error);
    }
};

//get all status
export const getStatus = async () => {
    try {
        const response = await fetch(`${API_URL}/status`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

//get all sdg count
export const getSdgCount = async () => {
    try {
        const response = await fetch(`${API_URL}/sdg/count`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

//get all notifications by id
export const getNotificationById = async (id) => {
    try {
        const response = await fetch(`${API_URL}/notification/${id}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

//get all records by sdg and instrument id
export const getRecordsBySdgAndInstrumentId = async (sdg, instrument) => {
    try {
        const response = await fetch(
            `${API_URL}/record/sdg/${sdg}/${instrument}`
        );
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

//get approverdrecord data by record id and user id
export const getApprovedRecordDataByRecordIdAndUserId = async (
    record_id,
    id
) => {
    try {
        const response = await fetch(
            `${API_URL}/record_data/approved/${record_id}/${id}`
        );
        return await response.json();
    } catch (error) {
        console.log(error);
    }
};

//upload a file
export const uploadFile = async (file) => {
    try {
        const response = await fetch(`${API_URL}/file`, {
            method: "POST",
            body: file,
        });
        return await response.json();
    } catch (error) {
        console.log(error);
    }
};

//add sdo officer

export const addSDOOfficer = async (sdo_officer) => {
    try {
        const response = await fetch(`${API_URL}/sdo_officer`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(sdo_officer),
        });
        return await response.json();
    } catch (error) {
        console.log(error);
    }
};
