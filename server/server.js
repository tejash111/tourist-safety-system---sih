const express = require('express');
require('./database/db');
const useroutes = require("./routes/user");
const cookieParser = require("cookie-parser");
const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.json());
app.use(cookieParser());
app.use('/api/user/', useroutes);

// Store all active users + their locations
let activeUsers = {};

// Socket logic
io.on("connection", (socket) => {
    console.log("New user connected:", socket.id);

    // Send existing users' locations to the newly connected user
    socket.emit("init-locations", activeUsers);

    socket.on("send-location", (data) => {
        activeUsers[socket.id] = { id: socket.id, ...data };

        // Broadcast to everyone (including new client)
        io.emit("receive-location", activeUsers[socket.id]);
    });

    socket.on("disconnect", () => {
        delete activeUsers[socket.id];
        io.emit("user-disconnected", socket.id);
    });
});

app.use('/api', (req, res) => {
    res.status(200).json({ message: "hello SIH" });
});

server.listen(3000, () => {
    console.log('App is now running on port 3000');
});
