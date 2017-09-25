'use strict';

var express = require('express');
var google = require('googleapis');
var youtube = google.youtube('v3');
var path = require('path');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var moment = require('moment');
var config = require('./config.json');

var API_KEY = config.apiKey;
console.log(API_KEY);
var app = express();

app.locals.moment = require('moment');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
    res.render('index', {
        items: [] 
    });
});

app.post('/', function(req, res){
    youtube.search.list({
        q: req.body.q,
        part: 'snippet',
        maxResults: 10,
        type: "video",
        key: API_KEY
    }, function(err, result){
        res.render('index', {
           items: result.items,
           query: req.body.q
        });
    }); 
});

app.listen(3002, function(){
    console.log("Listen on port " + 3002);
});