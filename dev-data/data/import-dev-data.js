const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('../../models/tourModel');

dotenv.config({ path: './config.env' });
// console.log(process.env.NODE_ENV)
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

// mongoose.connect(1.with database connection string 2.the objects to deal with depreciation warning)
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    // (con) => console.log(con.connection),
    console.log('Database connected!!😂😁'),
  );

//   Read data from the json file

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'));

// import data into database

const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data sucessfully loaded!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// delete all data from database

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data sucessfully deleted!');
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

// console.log(process.argv)
