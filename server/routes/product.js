const express = require('express');
const product = require('../schemas/Product');
const router = express.Router();

router.post('/', (req, res) => {
    product.create(req.body, (err, data) => {
        if(err)
            res.status(400).json(err);
        else{
            product.findOne({_id:data._id}).populate('provider').populate('measure').populate('classification').exec((err, data) => {
                if(err)
                    res.status(400).json(err);
                else
                    res.json(data);
            });
        }
    });
});

router.get('/', (req, res) => {
    product.find({}).sort([['code',1]]).populate('provider').populate('measure').populate('classification').exec((err, data) => {
        if(err)
            res.status(400).json(err);
        else
            res.json(data);
    });
});

router.put('/', (req, res) => {
    product.updateOne({code:req.body.code}, {$set:req.body}, (err, data) => {
        if(err)
            res.status(400).json(err);
        else{
            product.findOne({code:req.body.code}).populate('provider').populate('measure').populate('classification').exec((err, data) => {
                if(err)
                    res.status(400).json(err);
                else
                    res.json(data);
            });
        }
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

router.delete('/:id', (req, res) => {
    product.deleteOne({_id:req.params.id}, (err) => {
        if(err)
            res.status(400).json(err);
        else
            res.status(200).end();
    });
});

router.get('/:id', (req, res) => {
    product.findOne({_id:req.params.id}, (err, data) => {
        if(err)
            res.status(400).json(err);
        else
            res.json(data);
    });
});

module.exports = router;