var express = require("express");
var app = express();

app.get("/", function(req, res) {
  res.send("TV Project: Всё о телевизорах");
});

app.listen(3000, function() {
  console.log("Сервер работает и слушает порт: 3000");
});