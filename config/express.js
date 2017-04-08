var config                          = require('./config.js');
var express                         = require('express');
var logger                          = require('morgan');
var bodyParser                      = require('body-parser');
var methodOverride                  = require('method-override');
var session                         = require('express-session');

module.exports = function() {
    var app = express();

    if (process.env.NODE_ENV === 'development') {
        app.use(logger('dev'));
    } else if (process.env.NODE_ENV === 'production') {
        app.use(compress());
    }

    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(methodOverride());
    app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: config.sessionSecret
    }));

    app.use(express.static('./public'));

    require('../server/routes/cocktails.routes.js')(app);

    return app;
};
