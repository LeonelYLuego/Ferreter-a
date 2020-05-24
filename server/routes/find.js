const express = require('express');
const product = require('../schemas/Product');
const measure = require('../schemas/Measure');
const classification = require('../schemas/Classification');
const provider = require('../schemas/Provider');
const router = express.Router();

router.get('/product/:find', async (req, res) => {
    var errMea, mea = await measure.find({description:{'$regex':req.params.find,'$options':'i'}});
    var errClassi, classi = await classification.find({description:{'$regex':req.params.find,'$options':'i'}});
    var errPro, pro = await provider.find({name:{'$regex':req.params.find,'$options':'i'}});
    if(errMea || errClassi || errPro)
        res.status(400).json(errMea + errClassi + errPro);
    var err, data = await product.find({
        "$or":[
            {description:{'$regex':req.params.find,'$options':'i'}},
            {code:{'$regex':req.params.find,'$options':'i'}},
            {measure:{'$in':mea}},
            {classification:{'$in':classi}},
            {provider:{'$in':pro}}
        ]
    }).populate('provider').populate('measure').populate('classification');
    if(err)
        res.status(400).json(err);
    else
        res.json(data);
});

module.exports = router;