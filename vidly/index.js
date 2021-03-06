const config = require('config');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');
const express = require('express');
const app = express();

console.log('configgg = ', config);
if (!config.get('jwtPrivateKey')) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined.');
  process.exit(1);
}

mongoose.connect(config.get('db_url'))
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Connection to database failed with ', err));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
  
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );

    res.header("Access-Control-Expose-Headers", "x-auth-token");
    next();
  });
  
app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);


//subscribeCreateMOvie();

const port = process.env.PORT || 3900;
app.listen(port, () => console.log(`Listening on port ${port}...`));