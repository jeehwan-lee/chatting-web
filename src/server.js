import express from "express";

const app = express();

const handleListen = () => {
  console.log("Server Start");
};
app.listen(3000, handleListen);
