const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    favorites: {
        type: [String],
        required: false
    }
});

module.exports = mongoose.model('Favorite', favoriteSchema);