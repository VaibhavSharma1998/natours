const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config({path:'./config.env'})
const app = require('./app')

// console.log(process.env.NODE_ENV)

const DB = process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD)

mongoose.connect(DB,{
  useNewUrlParser:true,
  useUnifiedTopology: true,
}).then(con=>
console.log(con.connection),
console.log('Database connected!!😂😁'))

app.listen(3000, () => {
    console.log('Listening at port 3000');
  });