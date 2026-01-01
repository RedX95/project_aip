var mongoose = require('mongoose');
var Tv = require('./models/tv').Tv;
var data = require('./data.js').data;
var async = require('async');

// Шаг 1: Функция подключения к базе
function open(callback) {
    console.log('1. Подключение к MongoDB...');
    mongoose.connect('mongodb://localhost/tv_project');
    mongoose.connection.once('open', callback);
}

// Шаг 2: Функция удаления старых данных
function dropDatabase(callback) {
    console.log('2. Удаление старых данных...');
    Tv.deleteMany({})
        .then(function() {
            console.log('   Старые данные удалены');
            callback();
        })
        .catch(callback);
}

// Шаг 3: Функция создания индексов
function createIndexes(callback) {
    console.log('3. Создание индексов...');
    Tv.createIndexes()
        .then(function() {
            console.log('   Индексы созданы');
            callback();
        })
        .catch(callback);
}

// Шаг 4: Функция создания телевизоров из data.js
function createTvsFromData(callback) {
    console.log('4. Создание ' + data.length + ' телевизоров...');
    
    async.each(data, function(tvData, tvCallback) {
        var tv = new Tv({
            title: tvData.title,
            model: tvData.nick + '_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
            brand: tvData.title.split(' ')[0],
            diagonal: tvData.diagonal || 55,
            price: tvData.price || 50000,
            display_technology: tvData.display_technology || 'LCD',
            features: tvData.features || ['Smart TV'],
            energy_class: tvData.energy_class || 'A',
            created: new Date()
        });
        
        tv.save()
            .then(function(savedTv) {
                console.log('   ' + savedTv.title + ' сохранен');
                tvCallback();
            })
            .catch(tvCallback);
    }, callback);
}

// Шаг 5: Функция закрытия соединения
function close(callback) {
    console.log('5. Закрытие соединения...');
    mongoose.disconnect()
        .then(function() {
            console.log('   Соединение закрыто');
            callback();
        })
        .catch(callback);
}

// Основная серия задач
async.series([
    open,
    dropDatabase,
    createIndexes,
    createTvsFromData,
    close
], function(err, results) {
    if(err) {
        console.log('Ошибка:', err.message);
        process.exit(1);
    } else {
        console.log('Все задачи выполнены успешно');
        console.log('Создано телевизоров: ' + data.length);
        process.exit(0);
    }
});