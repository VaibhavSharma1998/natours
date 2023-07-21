
const mongoose = require('mongoose');


  // mongoose Schema  and model
  
  const tourSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
      unique: true,
    },
    rating: {
      type: Number,
      default: 4.7,
    },
    price: {
      type: Number,
      required: [true, 'A Tour must have a price'],
    }
  });
  
  // mongoose model
  const Tour = mongoose.model('Tour', tourSchema);
  
  // creating document to connect express with md

// We only create this for testing purpose

//   const testTour = new Tour({
//     name: 'vaibhav',
//     rating: 4.5,
//     price: 5000,
//   });
  
//   testTour
//     .save()
//     .then((doc) => {
//       console.log(doc);
//     })
//     .catch((err) => {
//       console.log('Error:', err);
//     });


module.exports = Tour;