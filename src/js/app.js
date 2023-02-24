const socket = io();

const form = document.getElementById("textSend");
const room = document.getElementById("room");
const roomList = document.getElementById("roomList");
const roomMake = document.getElementById("roomMake");
const modal = document.getElementById("modal");

form.hidden = true;
modal.hidden = true;

socket.on("init", (rooms) => {
  rooms.forEach((room) => {
    const li = document.createElement("li");
    li.textContent = room;
    roomList.appendChild(li);
  });
});

function makeRoom(event) {
  const roomName = document.getElementById("roomNameText");
  socket.emit("make_room", roomName.value);
  // TODO : 동일한 채팅방 이름이 있을 경우 (추후 DB로 확인)

  // TODO : 채팅방을 만들 경우 채팅방 이름 저장 (추후 DB에 저장)
  event.preventDefault();
  // 방 생성
  // TODO : 추후에는 서버로 방 이름을 보내서 검증 후 서버에서 생성
  const li = document.createElement("li");
  li.textContent = roomName.value;
  roomList.appendChild(li);

  // form과 modal hidden = true
  room.hidden = true;
  form.hidden = false;
  modal.hidden = true;
}

function messageSubmit(event) {
  event.preventDefault();
  const input = document.getElementById("messageText");
  socket.emit("send_message", input.value);
  input.value = "";
}

function enterRoom(event) {
  socket.emit("enter_room", event.target.textContent);
  room.hidden = true;
  form.hidden = false;
}

form.addEventListener("submit", messageSubmit);
roomList.addEventListener("click", enterRoom);
// 채팅방 생성 modal 보여주기
roomMake.addEventListener("click", () => {
  modal.hidden = false;
});
modal.addEventListener("submit", makeRoom);
