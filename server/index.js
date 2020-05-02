const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();

//Settings
app.set('port', 3000);
mongoose.connect('mongodb://127.0.0.1/ferretería');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Database connected');
});

//Middlewares
function logger(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    console.log(`Request recived ${req.protocol}:/${req.get('host')}${req.originalUrl}`);
    const date = new Date;
    console.log(date.toUTCString());
    next();
}

app.use(express.json());
app.use(logger);
app.use(morgan('tiny'));

//Routes
const product = require('./routes/product');
const classification = require('./routes/classification');
const provider = require('./routes/provider');
const measure = require('./routes/measure');
app.use('/product', product);
app.use('/classification', classification);
app.use('/provider', provider);
app.use('/measure', measure);


app.use(express.static('public'));

app.listen(app.get('port'), () => {
    console.log(app.get('appName'));
    console.log('Server on port', app.get('port'));
});