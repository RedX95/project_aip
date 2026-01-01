// Файл: tv_project/models/tv.js
var mongoose = require('mongoose');

// Создание схемы телевизора
var tvSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    model: {
        type: String,
        unique: true,
        required: true
    },
    brand: {
        type: String,
        enum: ['Samsung', 'LG', 'Sony', 'Philips', 'TCL', 'Panasonic', 'Hisense'],
        required: true
    },
    diagonal: {
        type: Number,
        min: 32,
        max: 98
    },
    price: {
        type: Number,
        min: 10000
    },
    display_technology: {
        type: String,
        enum: ['QLED', 'OLED', 'LCD', 'Mini-LED', 'NanoCell', 'ULED']
    },
    features: [String],  // Массив строк: ["Smart TV", "HDR", "4K"]
    energy_class: {
        type: String,
        enum: ['A+++', 'A++', 'A+', 'A', 'B', 'C', 'D']
    },
    created: {
        type: Date,
        default: Date.now
    }
});

// Создание метода схемы
tvSchema.methods.getInfo = function() {
    return this.title + ' (' + this.brand + ') - ' + (this.price ? this.price + ' руб.' : 'цена не указана');
};

// Экспорт модели
module.exports.Tv = mongoose.model('Tv', tvSchema);