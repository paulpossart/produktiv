import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

import usersRouter from  './routers/usersRouter.js';
import authRouter from './routers/authRouter.js';

import { isProd } from './queries/helperFunctions.js';

const app = express();

const allowedOrigin = process.env.ALLOWED_URL
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({origin: allowedOrigin, credentials: true}));
app.use(helmet());
app.use(cookieParser());

//=====
app.get('/', (req, res) => res.json({backend: 'running'}));
//=====

app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);

app.use((err, req, res, next) => {
    const status =  err.status || 500;

    res.status(status).json({
        name: err.name || 'Error',
        message: err.message || 'An unexpected error occured',
        stack: isProd() ? err.stack : 'No details available'
    });
});

app.listen(PORT, () => {
    console.log(`app running on port ${PORT}`);
});

