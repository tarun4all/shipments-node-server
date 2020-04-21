const express = require("express");
const path = require('path');
const mongoose = require('mongoose');

require('dotenv').config();

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
let db = mongoose.connection;

//check for connection
db.once('open', ()=>console.log('Connected to MongoDb'))

//check for db errors
db.on('error', (err)=>console.log(err));


//Init App
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public/')));


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