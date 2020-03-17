const dotenv = require('dotenv');
const mongoose = require('mongoose');
//const Tour = require('./models/tourModel');
dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false }).then(() => {
  console.log('DB connected succesfully');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('App running on port 3000...');
});
