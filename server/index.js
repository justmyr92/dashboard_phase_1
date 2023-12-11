const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db/sdg.dashboard");
const bcrypt = require("bcrypt");

const multer = require("multer");

app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "../src/assets/records"); // Define the destination folder
    },
    filename: (req, file, cb) => {
        const ext = file.originalname.split(".").pop();
        cb(null, Date.now() + "-" + file.fieldname + "." + ext); // Define the file name
    },
});

const upload = multer({ storage: storage });

//add a new sdo_officer
app.post("/sdo_officer", async (req, res) => {
    try {
        const {
            sdo_officer_id,
            sdo_officer_name,
            sdo_officer_email,
            sdo_officer_phone,
            sdo_officer_password,
            campus_id,
        } = req.body;
        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(sdo_officer_password, salt);
        const newSdoOfficer = await pool.query(
            "INSERT INTO sdo_officer_table (sdo_officer_id, sdo_officer_name, sdo_officer_email, sdo_officer_phone, sdo_officer_password, campus_id) VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
            [
                sdo_officer_id,
                sdo_officer_name,
                sdo_officer_email,
                sdo_officer_phone,
                encryptedPassword,
                campus_id,
            ]
        );
        res.json(newSdoOfficer.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//get all sdo_officer
app.get("/sdo_officer", async (req, res) => {
    try {
        const allSdoOfficer = await pool.query(
            "SELECT * FROM sdo_officer_table"
        );
        res.json(allSdoOfficer.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//add a new campus
app.post("/campus", async (req, res) => {
    try {
        const {
            campus_id,
            campus_name,
            campus_address,
            campus_phone,
            campus_email,
        } = req.body;
        const newCampus = await pool.query(
            "INSERT INTO campus_table (campus_id, campus_name, campus_address, campus_phone, campus_email) VALUES($1, $2, $3, $4, $5) RETURNING *",
            [campus_id, campus_name, campus_address, campus_phone, campus_email]
        );
        res.json(newCampus.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//get all campus
app.get("/campus", async (req, res) => {
    try {
        const allCampus = await pool.query("SELECT * FROM campus_table");
        res.json(allCampus.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//add a new csd_officer
app.post("/csd_officer", async (req, res) => {
    try {
        const {
            csd_officer_id,
            csd_officer_name,
            csd_officer_email,
            csd_officer_phone,
            csd_officer_password,
        } = req.body;
        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(csd_officer_password, salt);
        const newCsdOfficer = await pool.query(
            "INSERT INTO csd_officer_table (csd_officer_id, csd_officer_name, csd_officer_email, csd_officer_phone, csd_officer_password) VALUES($1, $2, $3, $4, $5) RETURNING *",
            [
                csd_officer_id,
                csd_officer_name,
                csd_officer_email,
                csd_officer_phone,
                encryptedPassword,
            ]
        );
        res.json(newCsdOfficer.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//get all csd_officer
app.get("/csd_officer", async (req, res) => {
    try {
        const allCsdOfficer = await pool.query(
            "SELECT * FROM csd_officer_table"
        );
        res.json(allCsdOfficer.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//add unit officer
app.post("/unit", async (req, res) => {
    try {
        const {
            unit_id,
            unit_name,
            unit_address,
            unit_phone,
            unit_email,
            unit_password,
            sdo_officer_id,
            campus_id,
            sdg_id,
        } = req.body;
        console.log(req.body);
        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(unit_password, salt);
        const newUnit = await pool.query(
            "INSERT INTO unit_table (unit_id, unit_name, unit_address, unit_phone, unit_email, unit_password, sdo_officer_id, campus_id, sdg_id) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
            [
                unit_id,
                unit_name,
                unit_address,
                unit_phone,
                unit_email,
                encryptedPassword,
                sdo_officer_id,
                campus_id,
                sdg_id,
            ]
        );
        res.json(newUnit.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//get all unit
app.get("/unit", async (req, res) => {
    try {
        const allUnit = await pool.query("SELECT * FROM unit_table");
        res.json(allUnit.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//SELECT record_data_table.*, unit_table.* FROM record_data_table INNER JOIN unit_table ON record_data_table.unit_id = unit_table.unit_id
app.get("/record_data/unit", async (req, res) => {
    try {
        const recordData = await pool.query(
            // and inner jin sgd table
            "SELECT record_data_table.*, unit_table.*, sdg_table.* FROM record_data_table INNER JOIN unit_table ON record_data_table.unit_id = unit_table.unit_id INNER JOIN sdg_table ON unit_table.sdg_id = sdg_table.sdg_id"
        );
        res.json(recordData.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//get sdg by unit_id
app.get("/sdg/unit/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const sdg = await pool.query(
            "SELECT sdg_table.* FROM sdg_table INNER JOIN unit_table ON sdg_table.sdg_id = unit_table.sdg_id WHERE unit_table.unit_id = $1",
            [id]
        );
        res.json(sdg.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//get all unit by unit_id
app.get("/unit/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const allUnit = await pool.query(
            "SELECT * FROM unit_table WHERE unit_id = $1",
            [id]
        );
        res.json(allUnit.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//get all unit by sdo_officer_id
app.get("/unit/sdo/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const allUnit = await pool.query(
            "SELECT * FROM unit_table WHERE sdo_officer_id = $1",

            [id]
        );
        res.json(allUnit.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//add record
app.post("/record", async (req, res) => {
    try {
        const { record_id, record_name, sdg_id } = req.body;
        const newRecord = await pool.query(
            "INSERT INTO record_table (record_id, record_name, sdg_id) VALUES($1, $2, $3) RETURNING *",
            [record_id, record_name, sdg_id]
        );
        res.json(newRecord.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//get all record
app.get("/record", async (req, res) => {
    try {
        const allRecord = await pool.query("SELECT * FROM record_table");
        res.json(allRecord.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//login via 3 tables (sdo_officer, csd_officer, unit)
app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const sdoOfficer = await pool.query(
            "SELECT * FROM sdo_officer_table WHERE sdo_officer_email = $1",
            [username]
        );
        const csdOfficer = await pool.query(
            "SELECT * FROM csd_officer_table WHERE csd_officer_email = $1",
            [username]
        );
        const unit = await pool.query(
            "SELECT * FROM unit_table WHERE unit_email = $1",
            [username]
        );
        if (sdoOfficer.rows.length > 0) {
            const validPassword = await bcrypt.compare(
                password,
                sdoOfficer.rows[0].sdo_officer_password
            );
            if (validPassword) {
                res.json(sdoOfficer.rows[0]);
            } else {
                res.json({ message: "Invalid Password" });
            }
        } else if (csdOfficer.rows.length > 0) {
            const validPassword = await bcrypt.compare(
                password,
                csdOfficer.rows[0].csd_officer_password
            );
            if (validPassword) {
                res.json(csdOfficer.rows[0]);
            } else {
                res.json({ message: "Invalid Password" });
            }
        } else if (unit.rows.length > 0) {
            const validPassword = await bcrypt.compare(
                password,
                unit.rows[0].unit_password
            );
            if (validPassword) {
                res.json(unit.rows[0]);
            } else {
                res.json({ message: "Invalid Password" });
            }
        } else {
            res.json({ message: "User does not exist" });
        }
    } catch (err) {
        console.error(err.message);
    }
});

//get all sdg
app.get("/sdg", async (req, res) => {
    try {
        const allSdg = await pool.query("SELECT * FROM sdg_table");
        res.json(allSdg.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// useEffect(() => {
//     const fetchData = async () => {
//         const response = await fetch(
//             `http://localhost:5000/records/${sdgID}`
//         );
//         const data = await response.json();
//         setRecords(data);
//     };
// }, [sdgID]);

app.get("/records/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const records = await pool.query(
            "SELECT * FROM record_table WHERE sdg_id = $1",
            [id]
        );
        res.json(records.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//get record by sdg id and instrument id
app.get("/record/:id/:instrument_id", async (req, res) => {
    try {
        const { id, instrument_id } = req.params;
        const record = await pool.query(
            "SELECT * FROM record_table WHERE sdg_id = $1 AND instrument_id = $2",
            [id, instrument_id]
        );
        res.json(record.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//get all record_data
app.get("/record/unit/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const recordData = await pool.query(
            "SELECT * from record_data_table WHERE unit_id = $1"
        );
        res.json(recordData.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//get all record_data
app.get("/record_data", async (req, res) => {
    try {
        const recordData = await pool.query("SELECT * from record_data_table");
        res.json(recordData.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//get all unit id by sdo_officer_id
app.get("/unit_id/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const unitID = await pool.query(
            "SELECT unit_id FROM unit_table WHERE sdo_officer_id = $1",
            [id]
        );

        res.json(unitID.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//get all record_data by unit_id
app.get("/record_data/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const recordData = await pool.query(
            "SELECT * FROM record_data_table WHERE record_id = $1",
            [id]
        );
        res.json(recordData.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//get all record_data by record_id taht is "Approved"
app.get("/record_data/approved/:id/:unit_id", async (req, res) => {
    try {
        const { id, unit_id } = req.params;
        console.log(id, unit_id);
        const recordData = await pool.query(
            //inner join unit_table where s
            "SELECT record_data_table.*, unit_table.* FROM record_data_table INNER JOIN unit_table ON record_data_table.unit_id = unit_table.unit_id WHERE record_data_table.record_id = $1 AND record_data_table.record_status = 'Approved' AND unit_table.sdo_officer_id = $2",
            [id, unit_id]
        );
        res.json(recordData.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.post("/notification", async (req, res) => {
    // CREATE TABLE notification_table (
    //     unit_id character varying(25) REFERENCES unit_table(unit_id),
    //     notification_date date NOT NULL,
    //     message text NOT NULL
    // );

    try {
        const { unit_id, notification_date, message } = req.body;
        const newNotification = await pool.query(
            "INSERT INTO notification_table (unit_id, notification_date, message) VALUES($1, $2, $3) RETURNING *",
            [unit_id, notification_date, message]
        );
        res.json(newNotification.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//get all notification by unit_id
app.get("/notification/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const notification = await pool.query(
            "SELECT * FROM notification_table WHERE unit_id = $1",
            [id]
        );
        res.json(notification.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.patch("/record_data/:id", async (req, res) => {
    try {
        //only the status will be updated
        const { id } = req.params;
        const { record_status } = req.body;
        const updateRecordData = await pool.query(
            "UPDATE record_data_table SET record_status = $1 WHERE record_data_id = $2",
            [record_status, id]
        );
        res.json("Record Data was updated");
    } catch (err) {
        console.error(err.message);
    }
});

//add record_data
app.post("/record_data", upload.single("record_file"), async (req, res) => {
    try {
        const {
            record_data_id,
            record_date,
            record_status,
            record_id,
            unit_id,
        } = req.body;
        console.log(req.body);

        const newRecordData = await pool.query(
            "INSERT INTO record_data_table (record_data_id, record_date, record_status, record_id, unit_id) VALUES($1, $2, $3, $4, $5) RETURNING *",
            [record_data_id, record_date, record_status, record_id, unit_id]
        );

        res.json(newRecordData.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// app.post("/file", upload.single("file"), async (req, res) => {
app.post("/file", async (req, res) => {
    try {
        const { file, record_data_id, file_extension } = req.body;

        const id = Math.floor(Math.random() * 100000);

        console.log(req.body);

        const newFile = await pool.query(
            "INSERT INTO file_table (file_id, file_name, file_extension, record_data_id) VALUES($1, $2, $3, $4) RETURNING *",
            [id, file, file_extension, record_data_id]
        );

        res.json(newFile.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

app.post("/record_value", async (req, res) => {
    try {
        //record_value_id | record_data_id | value
        const record_value_id = "RV" + Math.floor(Math.random() * 100000);
        const { record_data_id, record_data_value, record_id } = req.body;
        console.log(req.body);
        const newRecordValue = await pool.query(
            "INSERT INTO record_value_table (record_value_id, record_data_id, value, record_id) VALUES($1, $2, $3, $4) RETURNING *",
            [record_value_id, record_data_id, record_data_value, record_id]
        );
        res.json(newRecordValue.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//get all record_value  by record_data_id
app.get("/record_value/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const recordValue = await pool.query(
            "SELECT record_value_table.*, record_table.*, sdg_table.* FROM record_value_table INNER JOIN record_table ON record_value_table.record_id = record_table.record_id INNER JOIN sdg_table ON record_table.sdg_id = sdg_table.sdg_id WHERE record_value_table.record_data_id = $1",
            [id]
        );
        res.json(recordValue.rows);
        console.log(recordValue.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//update record_value by record_data_id
app.patch("/update_record_values/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { value } = req.body;

        const updateRecordValue = await pool.query(
            "UPDATE record_value_table SET value = $1 WHERE record_value_id = $2",
            [value, id]
        );
        res.json("Record Value was updated");
    } catch (err) {
        console.error(err.message);
    }
});

//get record_name by record_id
app.get("/record_name/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const recordName = await pool.query(
            "SELECT record_name FROM record_table WHERE record_id = $1",
            [id]
        );
        res.json(recordName.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//get all record_value inner join record_data by record_data_id

app.get("/record_value/record_data/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const recordValue = await pool.query(
            "SELECT record_value_table.*, record_data_table.*, record_table.*  FROM record_value_table INNER JOIN record_data_table ON record_value_table.record_data_id = record_data_table.record_data_id INNER JOIN record_table ON record_data_table.record_id = record_table.record_id  WHERE record_value_table.record_data_id = $1",
            [id]
        );
        res.json(recordValue.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//get campus by sdo_officer_id
app.get("/campus/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const campus = await pool.query(
            "SELECT campus_id FROM sdo_officer_table WHERE sdo_officer_id = $1",
            [id]
        );
        res.json(campus.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//get all accreditation
app.get("/accreditation/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const allAccreditation = await pool.query(
            "SELECT * FROM accreditation_table WHERE campus_id = $1",
            [id]
        );
        res.json(allAccreditation.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//:5000/record/sdg/${sdg}/${instrument.instrument_id
app.get("/record/sdg/:id/:instrument_id", async (req, res) => {
    try {
        const { id, instrument_id } = req.params;
        console.log(id, instrument_id);
        const record = await pool.query(
            "SELECT * FROM record_table WHERE sdg_id = $1 AND instrument_id = $2",
            [id, instrument_id]
        );
        console.log(record.rows);
        res.json(record.rows);
    } catch (err) {
        console.error(err.message);
    }
});
//get all record_data
app.get("/record/unit/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const recordData = await pool.query(
            "SELECT record_table.*, record_data_table.* FROM record_table LEFT JOIN record_data_table ON record_table.record_id = record_data_table.record_id WHERE record_data_table.unit_id = $1",
            [id]
        );
        res.json(recordData.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get("/record/all/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const recordData = await pool.query(
            "SELECT * FROM record_data_table WHERE unit_id = $1",
            [id]
        );
        res.json(recordData.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//add accreditation
app.post("/accreditation", async (req, res) => {
    try {
        const {
            accreditation_id,
            accreditation_program,
            accreditation_program_type,
            accreditation_level,
            accreditation_year,
            campus_id,
        } = req.body;
        const newAccreditation = await pool.query(
            "INSERT INTO accreditation_table (accreditation_id, accreditation_program, accreditation_program_type, accreditation_level, accreditation_year, campus_id) VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
            [
                accreditation_id,
                accreditation_program,
                accreditation_program_type,
                accreditation_level,
                accreditation_year,
                campus_id,
            ]
        );
        res.json(newAccreditation.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//SELECT *
// FROM sdo_officer_table
// INNER JOIN campus_table ON sdo_officer_table.campus_id = campus_table.campus_id;

//get all sdo_officer inner join campus
app.get("/sdo-officers", async (req, res) => {
    try {
        const allSdoOfficer = await pool.query(
            "SELECT * FROM sdo_officer_table INNER JOIN campus_table ON sdo_officer_table.campus_id = campus_table.campus_id"
        );
        res.json(allSdoOfficer.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//get specific sdo_officer
app.get("/sdo-officers/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const sdoOfficer = await pool.query(
            "SELECT * FROM sdo_officer_table where sdo_officer_id = $1",
            [id]
        );
        res.json(sdoOfficer.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

app.patch("/unit/update/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const {
            unit_name,
            unit_address,
            unit_phone,
            unit_email,
            sdo_officer_id,
            campus_id,
        } = req.body;
        const updateUnit = await pool.query(
            "UPDATE unit_table SET unit_name = $1, unit_address = $2, unit_phone = $3, unit_email = $4, sdo_officer_id = $5, campus_id = $6 WHERE unit_id = $7 returning *",
            [
                unit_name,
                unit_address,
                unit_phone,
                unit_email,
                sdo_officer_id,
                campus_id,
                id,
            ]
        );
        res.json(updateUnit.rows[0]);
    } catch (err) {
        console.log(err.message);
    }
});

// Routes
app.get("/water_consumption", async (req, res) => {
    try {
        const { rows } = await pool.query("SELECT * FROM water_consumption");
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

app.post("/water_consumption", async (req, res) => {
    const { month, deepWell, mains, drinkingWater } = req.body;
    try {
        const query = `
        INSERT INTO water_consumption (month, deep_well, mains, drinking_water)
        VALUES ($1, $2, $3, $4)
        RETURNING *
      `;
        const values = [month, deepWell, mains, drinkingWater];
        const { rows } = await pool.query(query, values);
        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

//get the campus_id of the sdo_officer by sdo_officer_id
app.get("/campus_id/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const campusID = await pool.query(
            "SELECT campus_id FROM sdo_officer_table WHERE sdo_officer_id = $1",
            [id]
        );
        res.json(campusID.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

app.post("/add_enrollment", async (req, res) => {
    try {
        // Destructure the data from the request body
        const {
            enrolled_id,
            enrolled_school_year,
            enrolled_year_level,
            enrolled_gender,
            enrollment_number,
            campus_id,
        } = req.body;

        // Use the data to insert a new enrollment into the database
        const newEnrollment = await pool.query(
            "INSERT INTO enrollment_table (enrollment_id, enrollment_school_year, enrollment_year_level, enrollment_gender, enrollment_number, campus_id) " +
                "VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
            [
                enrolled_id,
                enrolled_school_year,
                enrolled_year_level,
                enrolled_gender,
                enrollment_number,
                campus_id,
            ]
        );

        // Send the newly inserted enrollment data back as the response
        res.json(newEnrollment.rows[0]); // Assuming you expect a single enrollment back
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

app.get("/enrollment", async (req, res) => {
    try {
        const allEnrollment = await pool.query(
            "SELECT * FROM enrollment_table"
        );
        res.json(allEnrollment.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/file/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const file = await pool.query(
            "SELECT * FROM file_table WHERE record_data_id = $1",
            [id]
        );
        res.json(file.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.post(
    "/annual_report",
    upload.single("annual_report_file"),
    async (req, res) => {
        try {
            const { annual_report_year, sdo_officer_id } = req.body;
            const newAnnualReport = await pool.query(
                "INSERT INTO annual_reports (annual_report_year, annual_report_file, sdo_officer_id) VALUES($1, $2, $3) RETURNING *",
                [annual_report_year, req.file.filename, sdo_officer_id]
            );
            res.json(newAnnualReport.rows[0]);
        } catch (err) {
            console.error(err.message);
        }
    }
);

app.get("/annual_report/", async (req, res) => {
    try {
        const annualReport = await pool.query("SELECT * FROM annual_reports");
        res.json(annualReport.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/getReport", async (req, res) => {
    try {
        const report = await pool.query("SELECT * FROM record_table");
        res.json(report.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.post("/instruments", async (req, res) => {
    const { name, status, date_posted } = req.body;
    //from 1000000 to 9999999 id, no string
    const id = Math.floor(Math.random() * 1000000 + 9999999);

    try {
        const instrument = await pool.query(
            "INSERT INTO instrument_table(instrument_id, name, status, date_posted) VALUES($1, $2, $3, $4) RETURNING *",
            [id, name, status, date_posted]
        );
        res.status(200).json(instrument.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post("/addRecord", async (req, res) => {
    const { record_id, record_name, sdg_id, instrument_id } = req.body;

    try {
        // Insert the new record into the 'reportData' table
        const result = await pool.query(
            "INSERT INTO record_table (record_id, record_name, sdg_id , instrument_id) VALUES ($1, $2, $3, $4) RETURNING *",
            [record_id, record_name, sdg_id, instrument_id]
        );
        // Send the newly inserted record back as the response
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get("/getInstruments", async (req, res) => {
    try {
        const instruments = await pool.query(
            "SELECT * FROM instrument_table order by date_posted desc"
        );
        res.json(instruments.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/getRecords/:instrument_id", async (req, res) => {
    try {
        const { instrument_id } = req.params;
        const records = await pool.query(
            "SELECT * FROM record_table WHERE instrument_id = $1",
            [instrument_id]
        );
        console.log(records.rows);
        res.status(200).json(records.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.patch("/updateRecords", async (req, res) => {
    try {
        const { record_id, record_name, sdg_id, instrument_id, record_status } =
            req.body;
        console.log(req.body);
        // Update the records in the database
        const result = await pool.query(
            "UPDATE record_table SET record_name = $1 , record_status = $2 WHERE record_id = $3",
            [record_name, record_status, record_id]
        );
        // Send the updated records back as the response
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.patch("/updateInstrumentStatus", async (req, res) => {
    try {
        const { instrument_id, status } = req.body;
        console.log(req.body);
        // Update the records in the database
        const result = await pool.query(
            "UPDATE instrument_table SET status = $1 WHERE instrument_id = $2",
            [status, instrument_id]
        );
        // Send the updated records back as the response
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//get all status of records and count them
app.get("/status", async (req, res) => {
    try {
        const status = await pool.query(
            "SELECT record_status, COUNT(record_status) FROM record_data_table GROUP BY record_status"
        );
        res.json(status.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//loop via all sdg and get the count of record_data by sdg_id
app.get("/sdg/count", async (req, res) => {
    try {
        const sdg = await pool.query(
            "SELECT sdg_table.sdg_id, sdg_table.sdg_name, COUNT(record_data_table.record_data_id) FROM sdg_table LEFT JOIN record_table ON sdg_table.sdg_id = record_table.sdg_id LEFT JOIN record_data_table ON record_table.record_id = record_data_table.record_id GROUP BY sdg_table.sdg_id"
        );

        res.json(sdg.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.listen(5000, () => {
    console.log("server has started on port 5000");
});

// [
//     { sdg_id: "SDG1", sdg_name: "No Poverty", count: "9" },
//     { sdg_id: "SDG6", sdg_name: "Clean Water and Sanitation", count: "9" },
//     { sdg_id: "SDG13", sdg_name: "Climate Action", count: "9" },
//     { sdg_id: "SDG7", sdg_name: "Affordable and Clean Energy", count: "9" },
//     { sdg_id: "SDG4", sdg_name: "Quality Education", count: "9" },
//     { sdg_id: "SDG8", sdg_name: "Decent Work and Economic Growth", count: "9" },
//     { sdg_id: "SDG2", sdg_name: "Zero Hunger", count: "9" },
//     {
//         sdg_id: "SDG12",
//         sdg_name: "Responsible Consumption and Production",
//         count: "9",
//     },
//     { sdg_id: "SDG14", sdg_name: "Life Below Water", count: "9" },
//     { sdg_id: "SDG10", sdg_name: "Reduced Inequality", count: "9" },
//     { sdg_id: "SDG3", sdg_name: "Good Health and Well-being", count: "9" },
//     {
//         sdg_id: "SDG16",
//         sdg_name: "Peace, Justice, and Strong Institutions",
//         count: "9",
//     },
//     { sdg_id: "SDG15", sdg_name: "Life on Land", count: "9" },
//     { sdg_id: "SDG17", sdg_name: "Partnerships for the Goals", count: "9" },
//     {
//         sdg_id: "SDG11",
//         sdg_name: "Sustainable Cities and Communities",
//         count: "9",
//     },
//     {
//         sdg_id: "SDG9",
//         sdg_name: "Industry, Innovation, and Infrastructure",
//         count: "9",
//     },
//     { sdg_id: "SDG5", sdg_name: "Gender Equality", count: "9" },
// ];
