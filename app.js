const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const path = require('path')

//routes
const index = require('./routes/index');

//init
const app = express();
//settings
app.set('views', path.join(__dirname, 'views')); //where our views are located
app.set('view engine', 'ejs')
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//map routes
app.use('/', index);


app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
  
  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });


module.exports = app;