const express = require('express');
const measure = require('../schemas/Measure');
const router = express.Router();

router.post('/', (req, res) => {
    measure.create(req.body, (err, data) => {
        if(err)
            res.status(400).json(err);
        else
            res.json(data);
    });
});

router.get('/', (req, res) => {
    measure.find({}, (err, data) => {
        if(err)
            res.status(400).json(err);
        else
            res.json(data);
    });
});

module.exports = router;