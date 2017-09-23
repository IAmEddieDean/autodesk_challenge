'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const defaultErrHandler = require(path.join(__dirname, 'lib/utils')).errHandler;
const PORT = process.env.PORT || 3000;

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(require(path.join(__dirname, 'lib/routes')));
app.use(defaultErrHandler);


app.listen(PORT);
console.log(process.env, '***********************************');

console.log(`app listening on port ${PORT}`);
