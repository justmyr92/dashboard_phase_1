const express = require("express");
const app = express();
const cors = require("cors");
const dashboardRoutes = require("./routes/dashboardRoutes");
require("dotenv").config();

const server = http.createServer(app);

const io = new Server(server);

app.use(cors());

app.use(express.json());

app.use("/api", dashboardRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
