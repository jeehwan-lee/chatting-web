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
  // TODO : 추후 DB 연동시 쿼리로 room 가져와서 보내기
  socket.emit("init", rooms);

  socket.on("enter_room", (roomName) => {
    socket.join(roomName);

    // 클라이언트가 채팅방에 접속하면 "welcome" 이벤트 발생
    socketServer.to(roomName).emit("welcome");
  });

  socket.on("make_room", (roomName, makeRoom) => {
    if (rooms.includes(roomName) == true) {
      // 동일한 이름의 채팅방이 존재할 경우
      // TODO : 추후 DB 연동시 쿼리로 존재여부 확인
      makeRoom(false);
    } else {
      // TODO : 추후 DB 연동시 쿼리로 room 저장
      rooms.push(roomName);
      socket.join(roomName);
      console.log(socket.rooms);

      makeRoom(true);
    }
  });

  socket.on("send_message", (message, currentRoom) => {
    console.log(currentRoom);
    console.log(message);

    // send_message 이벤트가 발생하면 채팅방에 접속한 모든 클라이언트에게 message 다시 전송
    socketServer.to(currentRoom).emit("send_message", message);
  });

  socket.on("exit", () => {
    socket.rooms.forEach((room) => socketServer.to(room).emit("bye"));
    socket.disconnect();
  });

  socket.on("disconnecting", () => {
    socket.rooms.forEach((room) => socketServer.to(room).emit("bye"));
  });
});

const handleListen = () => {
  console.log("Server Start");
};
httpServer.listen(3000, handleListen);
