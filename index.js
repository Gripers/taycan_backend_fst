require('dotenv').config();

const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');

const categoriesRouter = require('./routers/categories');
const productsRouter = require('./routers/products');

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api', categoriesRouter);
app.use('/api', productsRouter);

const start = async () => {
  try {
    await mongoose
      .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
      })
      .then(() => console.log('db: ok'))
      .catch(() => console.log('db: bad'));
    app.listen(8080, () => console.log('server started'));
  } catch (e) {
    console.log(e);
  }
};

start();
