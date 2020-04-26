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
    product.find({}, (err, data) => {
        if(err)
            res.status(400).json(err);
        else
            res.json(data);
    });
});

module.exports = router;