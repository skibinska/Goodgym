const express = require('express');
const exphbs = require('express-handlebars');
const routes = require('./routes');
const path = require('path');
const app = express();

const hbs = exphbs.create({
  defaultLayout: path.join(__dirname, '/templates/layout/main.hbs')
});

app.engine('hbs', hbs.engine);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '/templates/views'));

app.use(express.static('public'));
app.use('/', routes);

module.exports = app;
