const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('../../models/tourModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false }).then(() => {
  console.log('DB connected succesfully');
});

//READ JSON FILE

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'));

// IMPORT DATA TO DB

const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Imported');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

//DELETE DATA FROM COLLECTION

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Deleted');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
