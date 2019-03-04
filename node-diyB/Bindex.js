const express = require('express')
const app = express()
const cors = require('cors')
const parser = require('body-parser')
const userService = require('./Buser');

app.use(parser.json())

// enable CORS 
app.use(cors())

app.get('/status',(req,res) => {
    res.json('System is up');
}).listen(4100,()=>{
    console.log('Server Started at 4100')
});

// fetch all users
app.get('/Busers',(req,res) => {
    res.setHeader('Content-Type','application/json')
    userService.BfetchAll((data)=>{
        res.end(JSON.stringify(data))
    })
});

//fetch users by name
app.get('/Busers/findByName/:name',(req,res) => {
    res.setHeader('Content-Type','application/json')
    let uname = req.params.name
    userService.BfetchByName(uname,(results) =>{
        res.json(JSON.stringify(results))
    })
});
// add a new user
app.post('/Buser/add',(req,res)=>{
    let userObj = req.body
    res.setHeader('Content-Type','application/json')
    userService.BaddUser(userObj,(err)=>{
        if(err) res.statusCode(400).end('User Couldnt be Added,please try again later')
        else res.json('User Added Successfully')
    })
})
// update an existing user
app.put('/Buser/edit',(req,res)=>{
    let userObj = req.body
    res.setHeader('Content-Type','application/json')
    userService.BeditUser(userObj,(err,result)=>{
        if(err) res.statusCode(400).json('User Couldnt be Added,please try again later')
        else{
                res.json(JSON.stringify({ message:'User Modified' ,response : result }))
                //res.redirect('/users')
        }
    })
})

app.get('/Buser/find/id/max',(rq,rs)=>{
    userService.BgetLastId((id,err)=>{
        if(err){ 
            console.log(err);    
            rs.statusCode(400).json('Unable to process your request,please try again later')
        }
        else{
                rs.json({maxId:id})
        }
    })
})
