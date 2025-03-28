const express = require('express'); // import express
const app = express(); // create express app ( server )
const cors = require('cors'); // import cors
const aiRoutes = require('./routes/ai.routes'); // import ai routes

app.use(cors()); // enable cors

app.use(express.json()); // parse incoming request body as JSONp

app.get('/', (req, res) => { // create a route for the home page
    res.send('Hello World!'); // send a response to the client
});


app.use('/ai', aiRoutes); // use ai routes


module.exports = app; // export app