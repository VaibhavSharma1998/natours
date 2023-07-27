const Tour = require('../models/tourModel');

// const fs = require('fs');

// const tours = JSON.parse(fs.readFileSync('./dev-data/data/tours-simple.json'));

// exports.checkId = (req,res,next,value)=>{
//   console.log(`The id is :${value}`)

//   if (req.params.id > tours) {
//     return res.status(404).json({
//       status: 'Fail',
//       message: 'Invaild Id',
//     });
//   }
//   next()
// }

// exports.checkBody = (req,res,next)=>{
//   if(!req.body.name || !req.body.price){
//     return res.status(400).json({
//       status:'Bad request',
//       message:'Name or price is not there'
//     })
//   }
//   next()
// }
// div is only used to hide it

exports.getAllTours = async (req, res) => {
  try {
    console.log(req.query);
    // Build a query
    // 1)Filtering
    const queryObj = { ...req.query };
    let exculdedFields = ['page', 'sort', 'limit', 'fields'];
    exculdedFields.map((el) => delete queryObj[el]);
    console.log(req.query, queryObj);

    // 1a)Advanced Filtering
    let queryString = JSON.stringify(queryObj);
    queryString = queryString.replace(
      /\b(gt|gte|lt|lte)\b/,
      (value) => `$${value}`,
    );
    //  console.log(queryString)
    let query = Tour.find(JSON.parse(queryString));

    // 2)Sorting

    if (req.query.sort) {
      query = query.sort(req.query.sort);
    } else{
      query = query.sort('-createdAt')
    }

    // 3) Fields
    
    if(req.query.fields){
      let queryFields = req.query.fields.split(',').join(' ')
      query = query.select(queryFields)
     } else{
      query =  query.select('-__v')
     }

   
    const findTours = await query;

    // send response
    res.status(200).json({
      status: 'Sucess',
      result: findTours.length,
      data: {
        findTours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'Fail',
      message: 'Page not found',
    });
  }
};

exports.getTour = async (req, res) => {
  // console.log(req.params);

  // Used for converting the id which is string to a number
  // const id = req.params.id * 1;

  // const tour = tours.find((el) => el.id === id);

  // If the id is not inside the tours array then send this 404 status method 1

  // if(!tour){
  //     return res.status(404).json({
  //         status:'Fail',
  //         messagae:'Data not found!'
  //     })
  // }

  // If the id is not inside the tours array then send this 404 status method 2

  // if (id > tours.length) {
  //   return res.status(404).json({
  //     status: 'Fail',
  //     messagae: 'Data not found!',
  //   });
  // }
  try {
    const getTourById = await Tour.findById(req.params.id);
    res.status(200).json({
      status: 'Success',
      data: {
        getTourById,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'Failed',
      message: err,
    });
  }
};

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'Success',
      data: {
        value: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: err,
    });
  }
};

// fs.writeFile(
//   './dev-data/data/tours-simple.json',
//   JSON.stringify(tours),
//   (err) => {
//     res.status(201).json({
//       status: 'Suceees',
//       data: {
//         tours: newTours,
//       },
//     });
//   }
// );

exports.updateTour = async (req, res) => {
  try {
    const findTourById = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'Sucess',
      data: {
        tours: findTourById,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'Failed',
      message: err,
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    const deleteById = await Tour.findByIdAndRemove(req.params.id);
    res.status(204).json({
      status: 'Sucess',
      data: {
        deleteById,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'Failed',
      message: err,
    });
  }
};
