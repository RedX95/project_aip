const mongoose = require('mongoose');

// Схема телевизора
const tvSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        model: {
            type: String,
            required: true,
            unique: true,    
            index: true
        },

        brand: {
            type: String,
            required: true,
            enum: ['Samsung', 'LG', 'Sony', 'Philips', 'TCL', 'Panasonic', 'Hisense']
        },

        diagonal: {
            type: Number,
            min: 32,
            max: 98,
            required: true
        },

        price: {
            type: Number,
            min: 10000,
            required: true
        },

        display_technology: {
            type: String,
            enum: ['QLED', 'OLED', 'LCD', 'Mini-LED', 'NanoCell', 'ULED'],
            required: true
        },

        features: {
            type: [String],
            default: []
        },

        energy_class: {
            type: String,
            enum: ['A+++', 'A++', 'A+', 'A', 'B', 'C', 'D'],
            required: true
        },

        created: {
            type: Date,
            default: Date.now
        }
    },
    {
        versionKey: false
    }
);

// Метод экземпляра (по методичке)
tvSchema.methods.getInfo = function () {
    return `${this.title} (${this.brand}) — ${this.price} руб.`;
};

// Экспорт модели
module.exports.Tv = mongoose.model('Tv', tvSchema);