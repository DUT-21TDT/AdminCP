var createError = require('http-errors');
var express     = require('express');
var ejsLayout   = require('express-ejs-layouts')
const bodyParser = require("body-parser")
const path = require('path');
const pathConfig = require('./path');
let port = process.env.PORT || 8080;

var app = express()
var http = require('http').Server(app);
app.use(express.json());

global.__base               = __dirname + '/';
global.__path_app           = __base + pathConfig.folder_app + '/';
global.__path_models        = __path_app + pathConfig.folder_models + '/';
global.__path_routes        = __path_app + pathConfig.folder_routes + '/';
global.__path_configs       = __path_app + pathConfig.folder_config + '/';
global.__folder_validates   = __path_app + pathConfig.folder_validates + '/';
global.__folder_schemas     = __path_app + pathConfig.folder_schemas + '/';
global.__path_views       = __path_app + pathConfig.folder_views + '/';

// set configuration value of bodyParser
var bParserConfig = require(__path_configs + "bodyParserConfig.js");
app.use(bodyParser.urlencoded({
  limit: bParserConfig.limit, 
  extended: bParserConfig.extended, 
  parameterLimit: bParserConfig.parameterLimit
}));

// set Routers
app.set('views', __path_views);
app.use(ejsLayout);
app.set('layout', './layouts/full_layout');
app.set('view engine', 'ejs');
app.use('/', express.static(path.join(__path_views, "assets")));
app.use('/AdminCP', require(__path_routes));

// catch 404 and forward to error handler
app.use((req, res, next)=> {
    res.sendFile(__path_views + "/statics/404.html");
});

// error handler
app.use((err, req, res, next)=> {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.sendFile(__path_views + "/statics/500.html");
});

// start the Express server
http.listen( port, () => {
  console.log( `server started at http://localhost:${ port }` );
} );