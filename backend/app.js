const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const app = express();
const allowedOrigin = process.env.ALLOWED_URL;
const { verifyUser } = require('./queries/auth');

const authRouter = require('./routers/authRouters');
const usersRouter = require('./routers/usersRouter');
const tasksRouter = require('./routers/tasksRouter');

app.use(cors({ origin: allowedOrigin, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cookieParser());

app.get('/', (req, res) => res.json({ backend: 'running' }));

app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/tasks', verifyUser, tasksRouter);
app.use((err, req, res, next) => {
    const status = err.status || 500;

    res.status(status).json({
        name: err.name || 'Error',
        message: err.message || 'An unexpected error occured'
    });
});

module.exports = app;
