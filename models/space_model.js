const mongoose = require('mongoose');

const spaceSchema = new mongoose.Schema({
    listing_url: String,
    name: String,
    summary: String,
    description: String,
    property_type: String,
    room_type: String,
    minimum_nights: Number,
    maximum_nights: Number,
    cancellation_policy: String,
    accommodates: Number,
    bedrooms: Number,
    beds: Number,
    number_of_reviews: Number,
    bathrooms: mongoose.Decimal128,
    price: mongoose.Decimal128,
    weekly_price: mongoose.Decimal128
});

module.exports = mongoose.model('Space', spaceSchema);