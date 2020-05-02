const express = require('express');
const product = require('../schemas/Product');
const router = express.Router();

router.post('/', (req, res) => {
    product.create(req.body, (err, data) => {
        if(err)
            res.status(400).json(err);
        else
            res.json(data);
    });
});

router.get('/', (req, res) => {
    product.find().populate('provider').populate('measure').populate('classification').exec((err, data) => {
        if(err)
            res.status(400).json(err);
        else
            res.json(data);
    });
});

router.get('/code/:code', (req, res) => {
    product.findOne({code:req.params.code}, (err, data) => {
        if(err)
            res.status(400).json(err);
        else
            res.json(data);
    });
});

module.exports = router;