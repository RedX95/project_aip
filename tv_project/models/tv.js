const mongoose = require('mongoose');

const tvSchema = new mongoose.Schema({
    title: String,
    model: String,
    diagonal: Number,
    price: Number,
    display_technology: String,
    features: [String],
    energy_class: String,
    created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Tv', tvSchema);
