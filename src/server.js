import express from "express";
import http from "http";
import SocketIO from "socket.io";

const app = express();
const httpServer = http.createServer(app);
const socketServer = SocketIO(httpServer);

const sockets = [];
const rooms = ["room1", "room2"];

app.use("/js", express.static(__dirname + "/js"));
app.use("/style", express.static(__dirname + "/style"));

app.get("/", (req, res) => res.sendFile(__dirname + "/views/" + "home.html"));
app.get("/*", (req, res) => res.redirect("/"));

socketServer.on("connection", (socket) => {
  sockets.push(socket);

  // 서버와 클라이언트가 연결되면 rooms 배열을 클라이언트로 보냄
  socket.emit("init", rooms);

  socket.on("send_message", (message) => console.log(message));

  socket.on("enter_room", (roomName) => {
    socket.join(roomName);
    console.log(socket.rooms);
  });

  socket.on("make_room", (roomName) => {
    if (rooms.includes(roomName) == true) {
      // 이미 방이 만들어져있을 경우
    } else {
      // 방이 새로 만들어질 경우
      rooms.push(roomName);
      socket.join(roomName);
      console.log(socket.rooms);
    }
  });
});

const handleListen = () => {
  console.log("Server Start");
};
httpServer.listen(3000, handleListen);
