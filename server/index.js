const express = require("express");
const app = express();
const cors = require("cors");
const dashboardRoutes = require("./routes/dashboardRoutes");
require("dotenv").config();
const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://csddashboard.online/",
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    },
});

app.use(cors());

app.use(express.json());

app.use("/api", dashboardRoutes);

io.on("connection", (socket) => {
    console.log("User connected to socket : ", socket.id);

    socket.on("submitRecord", (submitStatus) => {
        socket.broadcast.emit("fetchRecords", submitStatus);
    });

    socket.on("addUnit", (unitStatus) => {
        socket.broadcast.emit("fetchUnits", unitStatus);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected from socket : ", socket.id);
    });
});

server.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
