import { Logger, ILogObject } from 'tslog';
import express from 'express';
import * as dotenv from 'dotenv';
import { appendFileSync } from 'fs';
import monk from 'monk';

dotenv.config();

export const log: Logger = new Logger({
    name: 'he_backend_logger',
    minLevel: 'silly',
    dateTimeTimezone: 'Europe/Berlin'
});

const port = process.env.PORT;
const db_url = process.env.DBURL;
const db_port = process.env.DBPORT;
const db_string = `${db_url}:${db_port}/he`;

const api = require('./api');

const db = monk(db_string);

db.then(() => {
    log.info(`Active database connection on url: ${db_string}`)
})

const app: express.Application = express();

app.use(express.json());

app.use('/api', api);

app.listen(port, () => {
    log.info(`Running backend on ${port}`)
})

function logToFile(logObject : ILogObject) {
    appendFileSync('log.log', `${JSON.stringify(logObject)} \n`);
}

function attachFileOut() {
    log.attachTransport(
        {
            silly: logToFile,
            debug: logToFile,
            trace: logToFile,
            info: logToFile,
            warn: logToFile,
            error: logToFile,
            fatal: logToFile,
        },
        'debug'
    )
}