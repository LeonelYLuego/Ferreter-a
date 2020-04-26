const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var classification = new Schema({
    description:{type:String, required:[true, 'No classification description.']}
});

module.exports = mongoose.model('classification', classification);