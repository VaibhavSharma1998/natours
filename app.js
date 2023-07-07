const express = require('express')
const fs = require('fs')

const app = express()


// Express basic routing starts(video:50)

// app.get('/',(req,res)=>{
//     res.status(200).json({name:'vaibhav',age:24,work:'hussle to get job'})
// })

// app.post('/about',(req,res)=>{
//     res.send('Zingi jhand hai,fir bhi khmand hai😂😁')
// })

// Express basic routing ends (video:50)

// File is read at the top because the top level code is only executed once(video-52)
const tours = JSON.parse(
    fs.readFileSync('./dev-data/data/tours-simple.json')
)

    

app.get('/api/v1/tours',(req,res)=>{
res.status(200).json({
    status:'Suceess',
    result:tours.length,
    data:{
        tours:tours
    }
})
})

app.listen(3000,()=>{
    console.log('Listening on port 3000')
})