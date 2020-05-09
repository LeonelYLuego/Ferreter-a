const express = require('express');
const classification = require('../schemas/Classification');
const router = express.Router();

router.post('/', (req, res) => {
    classification.create(req.body, (err, data) => {
        if(err)
            res.status(400).json(err);
        else
            res.json(data);
    })
});

router.get('/', (req, res) => {
    classification.find({}).sort([['description',1]]).exec((err, data) => {
        if(err)
            res.status(400).json(err);
        else
            res.json(data);
    });
});

module.exports = router;