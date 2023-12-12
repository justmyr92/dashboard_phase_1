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
