const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors");

var indexRouter = require('./routes/index.js');
var userRouter = require('./routes/users.js');
var uniRouter = require('./routes/universities.js');
var thesesRouter = require('./routes/theses.js');
var reportsRouter = require('./routes/reports.js');
var reviewsRouter = require('./routes/reviews.js');

const app = express();

// ========================== Uses =================================  

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', userRouter);
app.use('/universities', uniRouter);
app.use('/theses', thesesRouter);
app.use('/reports', reportsRouter);
app.use('/reviws', reviewsRouter);


module.exports = app;