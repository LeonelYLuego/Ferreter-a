const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var measure = new Schema({
    description:{type:String, required:[true, 'No measure description.']}
});

module.exports = mongoose.model('measure', measure);