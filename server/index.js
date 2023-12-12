const express = require("express");
const app = express();
const cors = require("cors");
const dashboardRoutes = require("./routes/dashboardRoutes");

app.use(cors());
app.use(express.json());

app.use("/api", dashboardRoutes);

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
