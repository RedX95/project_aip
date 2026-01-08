const mongoose = require('mongoose');

const tvSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  nick: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  diagonal: {
    type: Number,
    required: true,
    min: 10,
    max: 100
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  display_technology: {
    type: String,
    required: true,
    enum: ['QLED', 'OLED', 'LCD', 'Mini-LED', 'MicroLED', 'LED']
  },
  features: [{
    type: String,
    trim: true
  }],
  energy_class: {
    type: String,
    required: true,
    enum: ['A+++', 'A++', 'A+', 'A', 'B', 'C']
  },
  image: {
    type: String,
    default: '/images/tv.png'
  },
  brand: {
    type: String,
    required: true,
    enum: ['Samsung', 'LG', 'Sony', 'Philips', 'TCL']
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

// Индекс для быстрого поиска по бренду
tvSchema.index({ brand: 1 });
tvSchema.index({ price: 1 });

const Tv = mongoose.model('Tv', tvSchema);
module.exports = Tv;