const express = require('express');
const app = express()
const fs = require('fs')

app.use(express.json())

const tours = JSON.parse(fs.readFileSync('./dev-data/data/tours-simple.json'));


// Handling get request video-52

app.get('/api/v1/tours',(req,res)=>{
    res.status(200).json({
        status:'Sucess',
        result:tours.length,
        data:{
            tours:tours
        }
    })
})



// Responding to URL paramaters -54


app.get('/api/v1/tours/:id',(req,res)=>{
    console.log(req.params)

    // Used for converting the id which is string to a number
    const id = req.params.id*1;

    const tour = tours.find(el => el.id ===id)


// If the id is not inside the tours array then send this 404 status method 1

    // if(!tour){
    //     return res.status(404).json({
    //         status:'Fail',
    //         messagae:'Data not found!'
    //     })
    // }

   // If the id is not inside the tours array then send this 404 status method 2


    if(id>tours.length){
        return res.status(404).json({
            status:'Fail',
            messagae:'Data not found!'
        })
    }
    res.status(200).json({
        status:'Suceess',
        data:{
            tours:tour
        }
    })
})


// Handling post request video -53


app.post('/api/v1/tours',(req,res)=>{
    // console.log(req.body)
    const newId = tours[tours.length-1].id+1;
    const newTours = Object.assign({id:newId},req.body)
    tours.push(newTours)
   
    fs.writeFile('./dev-data/data/tours-simple.json',JSON.stringify(tours),err=>{
        res.status(201).json({
            status:'Suceees',
            data:{
                tours:newTours
            }
        })
    })
       
    
})

// Handling patch request video -55 note this will not  change anything inside the file

app.patch('/api/v1/tours/:id',(req,res)=>{
    if(req.params.id*1>tours){
        return res.status(404).json({
            status:'Fail',
            message:'Invaild Id'
            
        })
    }
    res.status(200).json({
        status:"Sucess",
        data:{
            tour:"<Updating the tours...>"
        }
    })
})

// Handling patch request video -55 note this will not  change anything inside the file

app.delete('/api/v1/tours/:id',(req,res)=>{
    if(req.params.id>tours){
        return res.status(404).json({
            status:'Fail',
            message:'Invaild Id'
        })
    }
    res.status(204).json({
        status:'Sucess',
        data:null
    })
})

// best practice for this crud operation

// Now all this become very messy and code is repeated all the times so we follow the best parcatice

// put all the route handlers one side 


const getAllTours = (req,res)=>{
    res.status(200).json({
        status:'Sucess',
        result:tours.length,
        data:{
            tours:tours
        }
    })
}


const getTour = (req,res)=>{
    console.log(req.params)

    // Used for converting the id which is string to a number
    const id = req.params.id*1;

    const tour = tours.find(el => el.id ===id)


// If the id is not inside the tours array then send this 404 status method 1

    // if(!tour){
    //     return res.status(404).json({
    //         status:'Fail',
    //         messagae:'Data not found!'
    //     })
    // }

   // If the id is not inside the tours array then send this 404 status method 2


    if(id>tours.length){
        return res.status(404).json({
            status:'Fail',
            messagae:'Data not found!'
        })
    }
    res.status(200).json({
        status:'Suceess',
        data:{
            tours:tour
        }
    })
}

const createTour = (req,res)=>{
    // console.log(req.body)
    const newId = tours[tours.length-1].id+1;
    const newTours = Object.assign({id:newId},req.body)
    tours.push(newTours)
   
    fs.writeFile('./dev-data/data/tours-simple.json',JSON.stringify(tours),err=>{
        res.status(201).json({
            status:'Suceees',
            data:{
                tours:newTours
            }
        })
    })
       
    
}


const updateTour = (req,res)=>{
    if(req.params.id>tours){
        return res.status(404).json({
            status:'Fail',
            message:'Invaild Id'
        })
    }
    res.status(204).json({
        status:'Sucess',
        data:null
    })
}


const deleteTour = (req,res)=>{
    if(req.params.id>tours){
        return res.status(404).json({
            status:'Fail',
            message:'Invaild Id'
        })
    }
    res.status(204).json({
        status:'Sucess',
        data:null
    })
}

// Http route methods

app.route('/api/v1/tours').get(getAllTours).post(createTour)
app.route('/api/v1/tours/:id').get(getTour).patch(updateTour).delete(deleteTour)

app.listen(3000,()=>{
     console.log('Listening at port 3000')
})