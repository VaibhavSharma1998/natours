const fs = require('fs');

const tours = JSON.parse(fs.readFileSync('./dev-data/data/tours-simple.json'));

exports.checkId = (req,res,next,value)=>{
  console.log(`The id is :${value}`)

  if (req.params.id > tours) {
    return res.status(404).json({
      status: 'Fail',
      message: 'Invaild Id',
    });
  }
  next()
}

exports.checkBody = (req,res,next)=>{
  if(!req.body.name || !req.body.price){
    return res.status(400).json({
      status:'Bad request',
      message:'Name or price is not there'
    })
  }
  next()
}

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'Sucess',
    request: req.requestTime,
    result: tours.length,
    data: {
      tours: tours,
    },
  });
};

exports.getTour = (req, res) => {
  console.log(req.params);

  // Used for converting the id which is string to a number
  const id = req.params.id * 1;

  const tour = tours.find((el) => el.id === id);

  // If the id is not inside the tours array then send this 404 status method 1

  // if(!tour){
  //     return res.status(404).json({
  //         status:'Fail',
  //         messagae:'Data not found!'
  //     })
  // }

  // If the id is not inside the tours array then send this 404 status method 2

  if (id > tours.length) {
    return res.status(404).json({
      status: 'Fail',
      messagae: 'Data not found!',
    });
  }
  res.status(200).json({
    status: 'Suceess',
    data: {
      tours: tour,
    },
  });
};

exports.createTour = (req, res) => {
  // console.log(req.body)
  const newId = tours[tours.length - 1].id + 1;
  const newTours = Object.assign({ id: newId }, req.body);
  tours.push(newTours);

  fs.writeFile(
    './dev-data/data/tours-simple.json',
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'Suceees',
        data: {
          tours: newTours,
        },
      });
    }
  );
};

exports.updateTour = (req, res) => {
 
  res.status(204).json({
    status: 'Sucess',
    data: null,
  });
};

exports.deleteTour = (req, res) => {
  
  res.status(204).json({
    status: 'Sucess',
    data: null,
  });
};
