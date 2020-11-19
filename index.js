const express = require('express');
const mySqlCommection = require('./connection');
var cors = require('cors')
const app = express();

app.use(cors())
app.use(express.json());

// Courses Routes
app.use('/api/courses', require('./routes/courses'));

// Employee Routes
app.use('/api/employee', require('./routes/employee'));

const port = process.env.port || 3000;
app.listen(port, () => console.log('Listening on port '+ port));