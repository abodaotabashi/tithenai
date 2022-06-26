const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors");
const Middleware = require('./middleware')

var indexRouter = require('./routes/index.js');
var userRouter = require('./routes/users.js');
var uniRouter = require('./routes/universities.js');
var thesesRouter = require('./routes/theses.js');
var reportsRouter = require('./routes/reports.js');
var commentsRouter = require('./routes/comments.js');
var ratessRouter = require('./routes/rates.js');
var adminPanel = require('./routes/adminPanel.js');
var publicRouter = require('./routes/public.js');

const app = express();

// ========================== Uses =================================  

app.use(cors());
app.use(logger('dev'));
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/', indexRouter); // this is a public rout
app.use('/api/users', Middleware.isAuthenticated, userRouter);
app.use('/api/universities', Middleware.isAuthenticated, uniRouter);
app.use('/api/theses', Middleware.isAuthenticated, thesesRouter);
app.use('/api/reports', Middleware.isAuthenticated, reportsRouter);
app.use('/api/comments', Middleware.isAuthenticated, commentsRouter);
app.use('/api/rates', Middleware.isAuthenticated, ratessRouter);
app.use('/api/adminPanel', Middleware.isAuthenticated, adminPanel);
app.use('/api/public', publicRouter); // add all pulic routs here 
app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});


module.exports = app;