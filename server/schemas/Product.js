const mongoose = require('mongoose');
const providers = require('./Provider');
const measures = require('./Measure');
const classifications = require('./Classification');
const Schema = mongoose.Schema;

var product = new Schema({
    code:{type:String, required:[true, 'No product code.']},
    description:{type:String, required:[true, 'No product description.']},
    satCode:{type:String, uppercase:true},
    baseCost:{type:Number, default:0,required:[true, 'No baseCost description.']},
    wPercentage:{type:Number, default:0, required:[true, 'No wPercentage description.']},
    rPercentage:{type:Number, default:0, required:[true, 'No rPercentage description.']},
    classification:{type:mongoose.Schema.Types.ObjectId, ref:classifications, required:[true, 'No product classification.']},
    inventory:{type:Number, default:0, required:[true, 'No product inventory.']},
    measure:{type:mongoose.Schema.Types.ObjectId, ref:measures, required:[true, 'No product measure.']},
    provider:{type:mongoose.Schema.Types.ObjectId, ref:providers, required:[true, 'No product provider.']}
});

module.exports = mongoose.model('product', product);