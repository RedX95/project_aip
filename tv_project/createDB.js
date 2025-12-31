// Файл: tv_project/createDB.js
var data = require('./data.js').data;
var MongoClient = require("mongodb").MongoClient;

MongoClient.connect("mongodb://localhost:27017/tv_project", function(err, db) {
    if(err) {
        console.error("Ошибка подключения к MongoDB:", err.message);
        console.log("Возможно, сервер MongoDB не запущен.");
        console.log("Запустите его командой: Start-Service MongoDB (PowerShell от администратора)");
        return;
    }
    
    console.log("✅ Подключение к MongoDB успешно!");
    
    var collection = db.collection("tvs");
    collection.insertOne({model: "Samsung QLED Q80"}, function(err, result) {
        if(err) throw err;
        console.log("📺 Телевизор добавлен в базу данных");
        db.close();
        console.log("Соединение закрыто");
    });
});