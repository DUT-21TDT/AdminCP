const createError = require('http-errors');
const express     = require('express');
const ejsLayout   = require('express-ejs-layouts');
const helmet      = require('helmet');
const morgan      = require('morgan')
const bodyParser  = require("body-parser")
const path        = require('path');
const rfs         = require("rotating-file-stream");
const pathConfig  = require('./path');
const dotenv      = require("dotenv");
const session     = require('express-session');
dotenv.config();
const isProduction = process.env.NODE_ENV === "production";

const accessLogStream = rfs.createStream("access.log", {
  interval: "1d",
  path: path.join(__dirname, "log"),
});

const app = express()
app.disable('x-powered-by');
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      "img-src": ["'self'", "https: data:"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
    }
  })
)

app.use(
  isProduction ? morgan("combined", {stream:accessLogStream}) : morgan("dev")
);

app.use(session({
  resave: true, 
  saveUninitialized: true, 
  secret: 'somesecret', 
  cookie: { maxAge: 60 * 60000 }})); // 60000 is one minute

app.use(function(req, res, next) {
    res.locals.token = req.session.token;
    next();
  });

app.use(express.json());

global.__base                 = __dirname + '/';
global.__path_app             = __base + pathConfig.folder_app + '/';
global.__path_models          = __path_app + pathConfig.folder_models + '/';
global.__path_routes          = __path_app + pathConfig.folder_routes + '/';
global.__path_configs         = __path_app + pathConfig.folder_config + '/';
global.__path_controllers     = __path_app + pathConfig.folder_controllers + '/';
global.__path_middleware      = __path_app + pathConfig.folder_middleware + '/';
global.__folder_validates     = __path_app + pathConfig.folder_validates + '/';
global.__folder_schemas       = __path_app + pathConfig.folder_schemas + '/';
global.__path_views           = __path_app + pathConfig.folder_views + '/';
global.__path_utils           = __path_app + pathConfig.folder_utils + '/';

// set configuration value of bodyParser
const bParserConfig = require(__path_configs + "bodyParserConfig.js");
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
app.use('/', require(__path_routes));

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

module.exports = app;