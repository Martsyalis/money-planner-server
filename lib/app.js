const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
require('dotenv').config();


app.use(morgan('dev'));
app.use(express.static('./public'));

const jsonParser = bodyParser.json();


module.exports = app;