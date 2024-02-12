const express = require('express');

const app = express();

// setting the view engine

app.set('view engine', 'ejs');

// listen for request

app.listen(3000, () => {
  console.log('server is listening for port 3000');
});

app.get('/', (req, res) => {
  //   res.send('<h1>Home pages</h1>');
  res.render('index');
});
app.get('/about', (req, res) => {
  //   res.send('<h1>About pages</h1>');
  res.render('about');
});

//redirect

app.get('/blogs/create', (req, res) => {
  res.render('create');
});

app.use((req, res) => {
  res.status(404).render('404');
});
