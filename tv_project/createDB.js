var mongoose = require('mongoose');
var async = require('async');
var data = require('./data.js').data;

// Загружаем модель
require('./models/tv').Tv;

// Функция открытия соединения
function open(callback) {
    console.log('1. Подключение к базе данных...');
    mongoose.connect('mongodb://localhost/tv_project');
    mongoose.connection.once('open', callback);
}

// Функция создания индексов
function createIndexes(callback) {
    console.log('2. Создание индексов...');
    mongoose.models.Tv.createIndexes()
        .then(function() {
            console.log('   Индексы созданы');
            callback();
        })
        .catch(callback);
}

// Функция очистки базы
function clearDatabase(callback) {
    console.log('3. Очистка базы данных...');
    mongoose.models.Tv.deleteMany({})
        .then(function(result) {
            console.log('   Удалено документов: ' + result.deletedCount);
            callback();
        })
        .catch(callback);
}

// Функция создания телевизоров
function createTvs(callback) {
    console.log('4. Заполнение базы ' + data.length + ' телевизорами...');
    
    async.each(data, function(tvData, tvCallback) {
        var Tv = mongoose.models.Tv;
        
        var tv = new Tv({
            title: tvData.title,
            model: tvData.nick + '_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
            brand: tvData.title.split(' ')[0],
            diagonal: tvData.diagonal || 55,
            price: tvData.price || 50000,
            display_technology: tvData.display_technology || 'LCD',
            features: tvData.features || ['Smart TV'],
            energy_class: tvData.energy_class || 'A'
        });
        
        tv.save()
            .then(function(savedTv) {
                console.log('   ' + savedTv.title);
                tvCallback();
            })
            .catch(tvCallback);
    }, callback);
}

// Основная серия задач
async.series([
    open,
    createIndexes,
    clearDatabase,
    createTvs
], function(err, results) {
    if(err) {
        console.log('Ошибка:', err.message);
    } else {
        console.log('База данных успешно заполнена');
        console.log('Создано телевизоров: ' + data.length);
    }
    
    // Закрытие соединения
    mongoose.disconnect()
        .then(function() {
            console.log('Соединение закрыто');
            process.exit(err ? 1 : 0);
        });
});