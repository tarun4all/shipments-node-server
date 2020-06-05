const express = require("express");
const app = express();
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public/')));

//setting template system
//Loads the handlebars module
const handlebars = require('express-handlebars');

//Sets handlebars configurations (we will go through them later on)
app.engine('handlebars', handlebars({defaultLayout: 'main', extname: '.hbs'}));

//Sets our app to use the handlebars engine
app.set('view engine', '.hbs');

require('dotenv').config();
require('./bootloader/index')();
require('./bootloader/passportAuth');

//router.group enable
require('./utils/expressGroup');

const indexRouter = require('./routes/index');
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    res.status(404);
    res.send({ error: 'URL Not found' });
  });
  
// error handler
app.use(function(err, req, res, next) {
    console.log(err)
    res.status(err.status || 500)
    res.send({error: err.message || err});
});

const port = process.env.PORT || '3000';
app.listen(port, () => {
    //TODO add url also from config
    console.log(`Server listening on ${port}`);
});