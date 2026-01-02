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
    console.log('4. Заполнение базы тестовыми данными...');
    
    // ТЕСТОВЫЙ МАССИВ - специально с дубликатами model
    var testData = [
        {
            title: 'Samsung QLED Q80',
            model: 'TEST_DUPLICATE_MODEL',  // У всех три одинаковый model!
            brand: 'Samsung',
            diagonal: 65,
            price: 120000,
            display_technology: 'QLED',
            features: ['Smart TV', 'HDR10+', '4K'],
            energy_class: 'A+'
        },
        {
            title: 'LG OLED C3',
            model: 'TEST_DUPLICATE_MODEL',  // ДУБЛИКАТ!
            brand: 'LG',
            diagonal: 55,
            price: 89990,
            display_technology: 'OLED',
            features: ['Smart TV', 'Dolby Vision'],
            energy_class: 'A+'
        },
        {
            title: 'Sony Bravia XR',
            model: 'TEST_DUPLICATE_MODEL',  // ЕЩЕ ДУБЛИКАТ!
            brand: 'Sony',
            diagonal: 75,
            price: 149990,
            display_technology: 'LCD',
            features: ['Smart TV'],
            energy_class: 'A'
        }
    ];
    
    async.each(testData, function(tvData, tvCallback) {
        var Tv = mongoose.models.Tv;
        
        var tv = new Tv({
            title: tvData.title,
            model: tvData.model,  // Будет одинаковый у всех
            brand: tvData.brand,
            diagonal: tvData.diagonal,
            price: tvData.price,
            display_technology: tvData.display_technology,
            features: tvData.features,
            energy_class: tvData.energy_class
        });
        
        tv.save()
            .then(function(savedTv) {
                console.log('   Сохранен: ' + savedTv.title + ' (model: ' + savedTv.model + ')');
                tvCallback();
            })
            .catch(function(err) {
                console.log('   ОШИБКА при сохранении ' + tvData.title + ': ' + err.message);
                tvCallback(); // Продолжаем, несмотря на ошибку
            });
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