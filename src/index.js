import express from 'express';
import apiRouter from './routers/api';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send(req.originalUrl);
});

app.use('/api', apiRouter);

app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).send('Something broke!');
});

app.use((req, res, next) => {
    res.status(404).send("Sorry I can't find that");
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});