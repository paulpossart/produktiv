import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

import authRouter from './routers/authRouters.js';

const app = express();
const allowedOrigin = process.env.ALLOWED_URL;
const PORT = process.env.PORT;

app.use(cors({ origin: allowedOrigin, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cookieParser());

app.get('/', (req, res) => res.json({ backend: 'running' }));

app.use('/api/auth', authRouter);

app.use((err, req, res, next) => {
    const status = err.status || 500;

    res.status(status).json({
        name: err.name || 'Error',
        message: err.message || 'An unexpected error occured'
    });
});

app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`);
});
