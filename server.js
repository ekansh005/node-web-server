const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());
hbs.registerHelper('screamIt', (text) => text.toUpperCase());

let app = express();
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  let now = new Date().toString();
  const logLine = `${now}: ${req.method} ${req.originalUrl}`;
  console.log(logLine);
  fs.appendFile('server.log', logLine + '\n', (error) => {
    if (error) {
      console.log(error);
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Us',
  });
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my node server app',
  });
});

app.listen(3000, () => {
  console.log('Server is up and running on port 3000');
});
