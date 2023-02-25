const socket = io();

const form = document.getElementById("textSend");
const room = document.getElementById("room");
const roomList = document.getElementById("roomList");
const roomMake = document.getElementById("roomMake");
const modal = document.getElementById("modal");
const roomName = document.getElementById("roomNameText");

let currentRoom;

form.hidden = true;
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
  addMessage("누군가 입장했습니다.");
});

socket.on("send_message", function (message) {
  addMessage(message);
});

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
    roomName.value = "";
  } else {
    const li = document.createElement("li");
    li.textContent = roomName.value;
    roomList.appendChild(li);

    // roomList와 modal의 hidden = true, message From의 hidden = false
    room.hidden = true;
    form.hidden = false;
    modal.hidden = true;

    currentRoom = roomName.value;
  }
}

function modalClick(event) {
  if (event.target.id == "modal") {
    // modal창의 바깥부분을 클릭했을 경우 close
    modal.hidden = true;
    roomName.value = "";
  } else if (event.target.id == "roomMakeAndEnter") {
    // 생성 버튼을 클릭했을 경우
    socket.emit("make_room", roomName.value, makeRoom);
  } else if (event.target.id == "cancel") {
    // 취소버튼을 누르면 modal hidden = true
    modal.hidden = true;
    roomName.value = "";
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
  form.hidden = false;
}

form.addEventListener("submit", messageSubmit);
roomList.addEventListener("click", enterRoom);

// 채팅방 생성 모달창 보여주기
roomMake.addEventListener("click", () => {
  modal.hidden = false;
});
modal.addEventListener("click", modalClick);
