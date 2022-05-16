const mongoose = require('mongoose');
const { Schema } = mongoose;

const mainSchema = new Schema({
    bpm: [Number],
    spo2: [Number],
    temp: [Number],
    imgs: [String],
    email: String,
    dateCreated: {
        type: Date,
        default: Date()
    }
});

const Main = mongoose.model('main', mainSchema);

module.exports = Main;