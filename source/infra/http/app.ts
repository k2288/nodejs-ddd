import http from 'http';
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { v1Router } from './api/v1';
import config from '../../config/config';
import { BaseError } from '../../utils/base-error';
import i18n from '../../config/i18n';

const app = express();

const origin = {
    origin: config.isProduction ? config.server.hostname : '*'
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(origin));
app.use(compression());
app.use(helmet());
app.use(morgan('combined'));


app.use(i18n.init);

app.use('/api/v1', v1Router)



app.use(async (err: Error, req: Request, res: Response) => {
    if (err instanceof BaseError) {
        res.status(err.httpCode).send(err);
    } else {
        res.status(500).send({ message: err.message });
    }
});



const httpServer = http.createServer(app);

const httpserver=httpServer.listen(config.server.port, () => {
    console.log(`[App]: Server listening on ${config.server.hostname}:${config.server.port}`);
});

process.on('uncaughtException', (error: Error) => {
    process.exit(1);
});

export { httpserver };
