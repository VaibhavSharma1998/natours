const mongoose = require('mongoose');
const app = require('./app');
const dotenv = require('dotenv');

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


app.listen(3000, () => {
  console.log('Listening at port 3000');
});
