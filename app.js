const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Product = require('./models/Product');

const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

//setting up the database

const dbURI = 'mongodb://localhost:27017/NodeJS';

mongoose
  .connect(dbURI)
  .then((result) => {
    console.log('connecting to db');
    app.listen(3000, () => {
      console.log('server is listening for port 3000');
    });
    console.log('connected to db');
  })
  .catch((err) => {
    console.log(err);
  });

// setting the view engine

app.set('view engine', 'ejs');

app.post('/products', async (req, res) => {
  try {
    const product = await new Product(req.body);
    console.log(req.body);
    product.save();
    res.redirect('all-product');
  } catch (error) {
    console.log(error);
  }
});

app.get('/product/:id', async (req, res) => {
  const id = req.params.id;
  const data = await Product.findById(id);
  res.render('details', { title: 'Blog Details', blog: data });
});

app.delete('/product/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const res = await Product.findByIdAndDelete(id);
    const data = res.json({ redirect: '/all-product' });
    console.log(data);
  } catch (error) {
    console.log(error);
  }
});

app.get('/products', (req, res) => {
  const product = new Product({
    title: 'Iphone',
    snippet: 'Iphone XR',
    body: 'This is my new phone',
  });

  product
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log('Error', err);
    });
});

//All products

app.get('/all-product', async (req, res) => {
  try {
    const data = await Product.find();
    res.render('index', { title: 'All products', blogs: data });
    res.end();
  } catch (error) {
    console.log(error);
  }
});

app.get(`products`, async (req, res) => {
  try {
    const data = Product.findById(id);
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

// listen for request

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
