import express from "express";

const app = express();

app.use("/js", express.static(__dirname + "/js"));

app.get("/", (req, res) => res.sendFile(__dirname + "/views/" + "home.html"));
app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () => {
  console.log("Server Start");
};
app.listen(3000, handleListen);
