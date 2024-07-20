const express = require('express');
const app = express();
const port = 5000;
const mongoDb = require('./db');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Origin,X-Requested-With,Content-Type,Accept'
}));
app.use(helmet());
app.use(express.json());

mongoDb();

app.use('/api/', require('./Routes/CreatUser.js'));
app.use('/api/', require('./Routes/LoginUser.js'));
app.use('/api/', require('./Routes/DisplayData.js'));


app.get('/', (req, res) => {
    res.send('Hello World__!');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});