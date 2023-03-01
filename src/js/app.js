const socket = io();

const form = document.getElementById("textSend");
const room = document.getElementById("room");
const roomList = document.getElementById("roomList");
const roomMake = document.getElementById("roomMake");
const modal = document.getElementById("modal");
const roomNameInput = document.getElementById("roomNameText");
const roomName = document.getElementById("roomName");
const chattingRoom = document.getElementById("chattingRoom");
const exit = document.getElementById("exit");

let currentRoom;

chattingRoom.hidden = true;
modal.hidden = true;

// 서버와 연결됬을 경우 방 목록 그리기
socket.on("init", (rooms) => {
  rooms.forEach((room) => {
    const li = document.createElement("li");
    li.textContent = room;
    roomList.appendChild(li);
  });
});

socket.on("welcome", () => {
  roomName.innerText = currentRoom;
  addMessage("누군가 입장했습니다.");
});

socket.on("send_message", function (message) {
  addMessage(message);
});

socket.on("bye", () => {
  addMessage("누군가 퇴장했습니다.");
});

function exitRoom() {
  socket.emit("exit");
}

function addMessage(message) {
  const ul = document.getElementById("message");
  const li = document.createElement("li");

  li.innerText = message;
  ul.appendChild(li);
}

function makeRoom(check) {
  if (check == false) {
    // 동일한 이름의 채팅방이 있을 경우
    alert("채팅방이 존재합니다.");
    roomNameInput.value = "";
  } else {
    const li = document.createElement("li");
    li.textContent = roomNameInput.value;
    roomList.appendChild(li);

    // roomList와 modal의 hidden = true, message From의 hidden = false
    room.hidden = true;
    chattingRoom.hidden = false;
    modal.hidden = true;

    currentRoom = roomNameInput.value;
  }
}

function modalClick(event) {
  if (event.target.id == "modal") {
    // modal창의 바깥부분을 클릭했을 경우 close
    modal.hidden = true;
    roomNameInput.value = "";
  } else if (event.target.id == "roomMakeAndEnter") {
    // 생성 버튼을 클릭했을 경우
    socket.emit("make_room", roomNameInput.value, makeRoom);
  } else if (event.target.id == "cancel") {
    // 취소버튼을 누르면 modal hidden = true
    modal.hidden = true;
    roomNameInput.value = "";
  }
}

function messageSubmit(event) {
  event.preventDefault();
  const input = document.getElementById("messageText");
  socket.emit("send_message", input.value, currentRoom);
  input.value = "";
}

function enterRoom(event) {
  socket.emit("enter_room", event.target.textContent);
  currentRoom = event.target.textContent;
  room.hidden = true;
  chattingRoom.hidden = false;
}

form.addEventListener("submit", messageSubmit);
roomList.addEventListener("click", enterRoom);

// 채팅방 생성 모달창 보여주기
roomMake.addEventListener("click", () => {
  modal.hidden = false;
});
modal.addEventListener("click", modalClick);
exit.addEventListener("click", exitRoom);
