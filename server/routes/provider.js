const express = require('express');
const provider = require('../schemas/Provider');
const router = express.Router();

router.post('/', (req, res) => {
    provider.create(req.body, (err, data) => {
        if(err)
            res.status(400).json(data);
        else
            res.json(data);
    });
});

router.get('/', (req, res) => {
    provider.find({}).sort([['name',1]]).exec((err, data) => {
        if(err)
            res.status(400);
        else
            res.json(data);
    });
});

module.exports = router;