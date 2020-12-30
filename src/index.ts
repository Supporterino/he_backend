import { Logger } from 'tslog';
import express from 'express';
import * as dotenv from 'dotenv';
import monk from 'monk';
import helmet from 'helmet';
import cors from 'cors';
import { router } from './api';

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

const db = monk(db_string);

export const diseases = db.get('diseases');
export const signs = db.get('signs');

db.then(() => {
    log.info(`Active database connection on url: ${db_string}`);
});

const app: express.Application = express();

app.use(helmet.dnsPrefetchControl());
app.use(helmet.expectCt());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());
app.use(helmet.hsts());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(helmet.xssFilter());

app.use(express.json());
app.use(express.static('./client'));
app.enable('trust proxy');
app.use(cors());

app.use('/api', router);

app.listen(port, () => {
    log.info(`Running backend on ${port}`);
});