// Файл: tv_project/createDB.js
var MongoClient = require("mongodb").MongoClient;
var data = require("./data.js").data;

MongoClient.connect("mongodb://localhost:27017/tv_project", function(err, db) {
    if(err) {
        console.error("Ошибка подключения к MongoDB:", err.message);
        console.log("Убедитесь, что сервер MongoDB запущен (Start-Service MongoDB)");
        return;
    }
    
    console.log("Подключение к MongoDB успешно!");
    
    // Очищаем базу перед заполнением
    db.dropDatabase(function(err) {
        if(err) throw err;
        console.log("Старая база данных удалена");
        
        var collection = db.collection("tvs");
        
        // Вставляем все данные из модуля data.js
        collection.insertMany(data, function(err, result) {
            if(err) throw err;
            console.log("Добавлено телевизоров: " + result.insertedCount);
            console.log("Данные приложения записаны в базу данных");
            db.close();
        });
    });
});