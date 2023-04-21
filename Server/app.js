var createError = require('http-errors');
var express     = require('express');
const morganBody = require("morgan-body")
const bodyParser = require("body-parser")

var sqlserver = require("mssql/msnodesqlv8");
let port = process.env.PORT || 3000;


var app = express()
app.use(express.json());

const pathConfig = require('./path');

global.__base               = __dirname + '/';
global.__path_app           = __base + pathConfig.folder_app + '/';
global.__path_models        = __path_app + pathConfig.folder_models + '/';
global.__path_routes        = __path_app + pathConfig.folder_routes + '/';
global.__path_configs       = __path_app + pathConfig.folder_config + '/';
global.__folder_validates   = __path_app + pathConfig.folder_validates + '/';
global.__folder_schemas     = __path_app + pathConfig.folder_schemas + '/';

// const systemConfig = require(__path_configs + 'system')
const databaseConfig = require(__path_configs + 'database')

// app.locals.systemConfig = systemConfig;
var config = {
    user: databaseConfig.user,
    password: databaseConfig.password,
    server: databaseConfig.server,
    database: databaseConfig.database,
    driver: "msnodesqlv8",
    // options: {
    //   trustedConnection: true,
    // },
  };

sqlserver.connect(config, (err) => {
    if (err) {
        console.log(err);
    }
        else console.log("Database connected.");
  });


// must parse body before morganBody as body will be logged
app.use(bodyParser.json());

// hook morganBody to express app
morganBody(app, {logAllReqHeader:true, maxBodyLength:5000});

app.use('/api/v1/', require(__path_routes));

// catch 404 and forward to error handler
app.use((req, res, next)=> {
    next(createError(404));
});

// error handler
app.use((err, req, res, next)=> {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.end('Error app');
});

// start the Express server
app.listen( port, () => {
  console.log( `server started at http://localhost:${ port }` );
} );