const express = require("express");
const mongoose = require("mongoose");
const hotelRoutes = require("./Routes/hotelRoutes");
const ChambreRoutes = require("./Routes/ChambreRoutes");
const http = require("http");
var path = require("path");

const socketIo = require("socket.io");
const chambreController = require("./Controllers/ExamenController");

var app = express();
var server = http.createServer(app);
var io = socketIo(server);

app.use(express.json());

app.set("views", path.join(__dirname, "views"));

app.use('/hotels', hotelRoutes);
app.use('/chambres', ChambreRoutes);
app.get('/hotels', (req, res) => {
    res.render('hotel');
});

io.on("connection", (socket) => {
    console.log("New client connected");

    socket.on("reserve", (data) => {
        console.log("Reserve event received:", data);
    });

    socket.on("displayChambres", (data) => {
        chambreController.displayChambres(socket, data);
    });

    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
});

app.set("view engine", "twig");

const mongoURI = "mongodb://127.0.0.1:27017/myexam2024";
mongoose
    .connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Connected to MongoDB');
        const port = 3000;
        server.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err.message);
    });