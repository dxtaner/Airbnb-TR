const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const socketio = require("socket.io");
const http = require("http");

const routes = require("./routes");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const url =
  "mongodb+srv://taner16:taner123@cluster0.guofsiq.mongodb.net/airbnbtr";

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

const connectedUsers = {};
io.on("connection", (socket) => {
  const { user_id } = socket.handshake.query;
  if (!user_id) {
    socket.disconnect();
    return;
  }
  connectedUsers[user_id] = socket.id;
  socket.on("disconnect", () => {
    delete connectedUsers[user_id];
  });
});

app.use((req, res, next) => {
  req.io = io;
  req.connectedUsers = connectedUsers;

  return next();
});

app.use(cors());
app.use(express.json());
app.use("/files", express.static(path.resolve(__dirname, "..", "uploads")));
app.use(routes);

const port = process.env.PORT || 3033;

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
