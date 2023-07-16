// note: All the middleware is assigned in app.js

const express = require('express');
const app = express();

const morgan = require('morgan');


const tourRouter = require('./routes/tourRoutes');

const userRouter = require('./routes/userRoutes');

// 1) middleware

app.use(express.json());

// middlleware-it tells about which http request we hit  and status code in the console
// console.log(process.env.NODE_ENV )

if(process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'));
}


app.use((req, res, next) => {
  console.log('hello from middleware');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toDateString();
  next();
});

// 2) Routes

// tourRouter and userRouter are middleware for the hanlderoutes
app.use('/api/v1/tours', tourRouter);

app.use('/api/v1/users', userRouter);

// stactic middleware helps to server statc files from a folder
app.use(express.static('./public'))
module.exports = app;
