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
var commentsRouter = require('./routes/comments.js');
var ratessRouter = require('./routes/rates.js');
var adminPanel = require('./routes/adminPanel.js');

const app = express();

// ========================== Uses =================================  

app.use(cors());
app.use(logger('dev'));
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const root = path.join(__dirname, "public", "index.html")
app.use(express.static(root));

app.use('/api/', indexRouter);
app.use('/api/users', userRouter);
app.use('/api/universities', uniRouter);
app.use('/api/theses', thesesRouter);
app.use('/api/reports', reportsRouter);
app.use('/api/comments', commentsRouter);
app.use('/api/rates', ratessRouter);

app.get("/*", (req, res) => {
    res.sendFile("index.html", {root});
});


module.exports = app;