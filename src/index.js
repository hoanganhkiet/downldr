import express from 'express';
import apiRouter from './routers/api';

const app = express();

app.get('/', (req, res) => {
    res.send(req.originalUrl);
});

app.get('/api', apiRouter);

app.use((err, res, res, next) => {
    console.log(err.stack);
    res.status(500).send('Something broke!');
});

app.use((req, res, next) => {
    res.status(404).send("Sorry I can't find that");
});