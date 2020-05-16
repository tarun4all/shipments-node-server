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

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    res.status(404);
    res.send({ error: 'URL Not found' });
  });
  
// error handler
app.use(function(err, req, res, next) {
    console.log(err)
    res.status(err.status || 500)
    res.send({error: err.message || 'Something bad happens.'});
});

const port = process.env.PORT || '3000';
app.listen(port, () => {
    //TODO add url also from config
    console.log(`Server listening on ${port}`);
});