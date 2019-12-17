const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const apiRouter = require('./api');
const usersRouter = require('./users');
const path = require('path');
const serveStatic = require('serve-static');

let app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use('/api/v1', apiRouter);
app.use('/users', usersRouter);
app.use(serveStatic(path.join(__dirname, '../build')));

// app.get('/*', (req, res) => {
//   console.log('[path.join(__dirname]', path.join(__dirname, '../build', 'index.html'));
//   res.render('index');
// });

app.listen(9000, function () {
  console.log('server.js start at 9000 port');
});

// nodemon --watch server.js --exec babel-node server.js/server.js

