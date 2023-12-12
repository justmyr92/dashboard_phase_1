const express = require("express");
const app = express();
const cors = require("cors");
const dashboardRoutes = require("./routes/dashboardRoutes");

app.use(cors());
app.use(express.json());

app.use("/api", dashboardRoutes);

app.listen(7061, () => {
    console.log("server has started on port 7061");
});
