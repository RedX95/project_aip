// Файл: tv_project/createDB.js
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/tv_project');
var Tv = require('./models/tv').Tv;

// Создание телевизора с проверкой схемы
var testTv = new Tv({
    title: 'Samsung QLED Q80',
    model: 'QE65Q80TAU',
    brand: 'Samsung',
    diagonal: 65,
    price: 120000,
    display_technology: 'QLED',
    features: ['Smart TV', 'HDR10+', '4K'],
    energy_class: 'A+'
});

// Использование метода схемы
console.log(testTv.getInfo());

testTv.save()
    .then(function(savedTv) {
        console.log('✅ Телевизор сохранен:', savedTv.title);
        // Использование метода после сохранения
        console.log('📝 Информация:', savedTv.getInfo());
    })
    .catch(function(err) {
        console.log('❌ Ошибка валидации:', err.message);
    })
    .finally(function() {
        mongoose.disconnect();
    });