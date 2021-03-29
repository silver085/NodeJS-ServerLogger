import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import middleware from './middleware';
import api from './api';
import config from './config.json';
import {writeLog} from "./services/logService";

let app = express();
app.server = http.createServer(app);

// logger
app.use(morgan('dev'));

// 3rd party middleware
app.use(cors({
    exposedHeaders: config.corsHeaders
}));

app.use(bodyParser.json({
    limit: config.bodyLimit
}));

// internal middleware
app.use(middleware({config}));

// api router
app.use('/api', api({config}));

app.server.listen(process.env.PORT || config.port, () => {
    console.log(`Started on port ${app.server.address().port}`);
});

let infoStart = {
    "buffer" : [
        {
            "level": "LOGSERVER_INFO",
            "string" : "Service Started ( LogServer ) "
        },
        {
            "level": "LOGSERVER_INFO",
            "string" : "Configuration:"
        },
        {
            "level": "LOGSERVER_INFO",
            "string" : JSON.stringify(config)
        },
        {
            "level": "LOGSERVER_INFO",
            "string" : "Make sure the " + config.logPath + " folder exists!"
        },
    ]
}
writeLog(infoStart)

export default app;

