const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var provider = new Schema({
    name:{type:String, required:[true, 'No provider name.']},
    RFC:[{type:String, maxlength:13, uppercase:true}],
    email:[{type:String}],
    phone:[{type:String}]
});

module.exports = mongoose.model('provider', provider);