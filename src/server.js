import express from "express";
import http from "http";
import SocketIO from "socket.io";

const app = express();
const httpServer = http.createServer(app);
const socketServer = SocketIO(httpServer);

app.use("/js", express.static(__dirname + "/js"));

app.get("/", (req, res) => res.sendFile(__dirname + "/views/" + "home.html"));
app.get("/*", (req, res) => res.redirect("/"));

socketServer.on("connection", (socket) => {
  console.log(socket);
});

const handleListen = () => {
  console.log("Server Start");
};
httpServer.listen(3000, handleListen);
