// Файл: tv_project/createDB.js
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/tv_project');

var Tv = mongoose.model('Tv', { 
    model: String,
    brand: String,
    price: Number
});

var samsungTv = new Tv({ 
    model: 'QLED Q80',
    brand: 'Samsung',
    price: 120000
});

// Используем .then()/.catch() вместо callback
samsungTv.save()
    .then(function() {
        console.log('✅ Телевизор сохранен в базе через Mongoose');
    })
    .catch(function(err) {
        console.log('Ошибка:', err);
    })
    .finally(function() {
        mongoose.disconnect();
    });