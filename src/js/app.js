const socket = io();

const form = document.querySelector("form");

function messageSubmit(event) {
  event.preventDefault();
  const input = form.querySelector("input");
  socket.emit("message", input.value);
  input.value = "";
}

form.addEventListener("submit", messageSubmit);
