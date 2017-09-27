'use strict';

var express = require('express');
var google = require('googleapis');
var youtube = google.youtube('v3');
var path = require('path');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var moment = require('moment');
require("moment-duration-format");
var ytdl = require('ytdl-core');
var fs = require('fs');
var os = require('os');
var ffmpeg = require('fluent-ffmpeg');
var config = require('./config.json');

var app = express();

app.locals.moment = require('moment');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.locals.pretty = true;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ 'extended': 'true' }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components', express.static(path.join(__dirname, 'bower_components')));
app.use('/downloads', express.static(path.join(__dirname, 'downloads')));

app.get('/', function (req, res) {
    if (req.query.q) {
        youtube.search.list({
            q: req.query.q,
            part: 'id',
            maxResults: req.query.limit || 9,
            type: "video",
            pageToken: req.query.next || req.query.prev || null,
            type: req.query.type || 'video',
            key: config.apiKey
        }, function (err, result) {

            var nextPageToken = result.nextPageToken;
            var prevPageToken = result.prevPageToken;
            var totalNumberResults = result.pageInfo.totalResults;
            var videoIds = [];

            result.items.forEach(function (item) {
                videoIds.push(item.id.videoId);
            });

            youtube.videos.list({
                id: videoIds.join(','),
                part: 'id,snippet,contentDetails,player',
                type: "video",
                type: req.query.type || 'video',
                key: config.apiKey
            }, function (err, result) {
                console.log(JSON.stringify(result.items, null, 2));
                res.render('index', {
                    result: result,
                    limit: req.query.limit || 9,
                    items: result.items,
                    totalResults: totalNumberResults,
                    nextPageToken: nextPageToken,
                    prevPageToken: prevPageToken,
                    query: req.query.q,
                    type: req.query.type || 'video'
                });
            });
        });
    } else {
        res.render('index', {
            items: []
        });
    }
});

app.get('/game-plan', function (req, res, next) {
    res.render('game-plan');
});

function youtube_parser(url) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    return (match && match[7].length == 11) ? match[7] : false;
};

app.get('/download', function (req, res, next) {

    var videoId = youtube_parser(req.query.url);

    youtube.videos.list({
        id: videoId,
        part: 'id,snippet',
        type: "video",
        key: config.apiKey
    }, function (err, result) {
        var videoName = result.items[0].snippet.title;
        var videoFileName = "./downloads/" + videoName + ".mp4";
        var audioFileName = "./downloads/" + videoName + ".mp3";

        ytdl(req.query.url)
            .on('info', function (info, format) {
                console.log(info.title);
            })
            .pipe(fs.createWriteStream(videoFileName))
            .on('close', function () {

                var proc = new ffmpeg({ source: videoFileName, nolog: true });

                if (os.platform() === 'win32') {
                    proc.setFfmpegPath(path.join(__dirname, 'ffmpeg.exe'));
                    proc.setFfprobePath(path.join(__dirname, 'ffprobe.exe'));
                } else {
                    proc.setFfmpegPath(path.join(__dirname, 'ffmpeg'));
                }

                proc.on('end', function () {
                    console.log('file has been converted successfully');
                })
                    .on('error', function (err) {
                        console.log('an error happened: ' + err.message);
                    });

                proc.toFormat('mp3').pipe(fs.createWriteStream(audioFileName), { end: true });
            });

        res.render('download');
    });
});

app.get('/files', function (req, res, next) {
    const testFolder = './downloads/';
    const fileList = [];

    // const read = (dir) =>
    //     fs.readdirSync(dir)
    //         .reduce((files, file) =>
    //             fs.statSync(path.join(dir, file)).isDirectory() ?
    //                 files.concat(read(path.join(dir, file))) :
    //                 files.concat(path.join(dir, file)),
    //         []);

    // console.log(read('./downloads'));

    fs.readdir(testFolder, (err, files) => {
        files.forEach(file => {
            console.log(file);
            fileList.push(file);
        });

        res.render('files', {
            fileList: fileList
        });
    });
});

app.listen(3002, function () {
    console.log("Listen on port " + 3002);
});