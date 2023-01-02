const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors=require('cors');
const router = require('./routes/index');

let app = express(); 

app.use( bodyParser.json() );      
app.use(bodyParser.urlencoded({    
  extended: true
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', router);

app.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
  });



module.exports = app;
