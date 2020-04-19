const express = require("express");
const app = express();
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public/')));

require('dotenv').config();
require('./bootloader/index')();

//router.group enable
require('./utils/expressGroup');

const indexRouter = require('./routes/index');
app.use('/', indexRouter);

const port = process.env.PORT || '3000';
app.listen(port, () => {
    //TODO add url also from config
    console.log(`Server listening on ${port}`);
});