const express = require('express');
const fs = require('fs');
const parameters = require("./config/parameters");

const modelConfig = require('./models/config');
modelConfig.init();
const Query = require('./models/Todo');

console.log('Server started, visit url: http://127.0.0.1:8080');

const router = require('./routes');
var app = express();
app.base = "/api";
app.use(router);
app.listen(8080);
