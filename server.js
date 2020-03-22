const dotenv = require('dotenv');
const mongoose = require('mongoose');

process.on('uncaughtException', err => {
  console.log('Uncaught Exception');
  console.log(err);
});

//const Tour = require('./models/tourModel');
dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose
  .connect(DB, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false, useUnifiedTopology: true })
  .then(() => {
    console.log('DB connected succesfully...');
  });

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log('App running on port 3000...');
});

process.on('unhandledRejection', err => {
  console.log(err.name, err.message);
  console.log('Unhandled rejection, Shutting down');
  server.close(() => {
    process.exit(1);
  });
});
