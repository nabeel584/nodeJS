const express = require('express');
const morgan = require('morgan');

const app = express();

// setting the view engine

app.set('view engine', 'ejs');

// listen for request

app.listen(3000, () => {
  console.log('server is listening for port 3000');
});

app.use(express.static('public'));

app.use(morgan('dev'));

app.get('/', (req, res) => {
  const blogs = [
    {
      title: 'Yoshi finds eggs',
      snippet: 'Lorem ipsum dolor sit amet consectetur',
    },
    {
      title: 'Mario finds stars',
      snippet: 'Lorem ipsum dolor sit amet consectetur',
    },
    {
      title: 'How to defeat bowser',
      snippet: 'Lorem ipsum dolor sit amet consectetur',
    },
  ];
  //   res.send('<h1>Home pages</h1>');
  res.render('index', { title: 'Home', blogs });
});
app.get('/about', (req, res) => {
  //   res.send('<h1>About pages</h1>');
  res.render('about', { title: 'About' });
});

//redirect

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a new blog' });
});

app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
