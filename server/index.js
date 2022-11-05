require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
// the required information so that my computer can read axios requests and translate that all from the front end -
//to the back end -- then to the database and back 

const {PORT} = process.env
const {getListings} = require('./controller') 
// functions from my controller destructured 
//so that I can reference them in my endpoints

app.use(express.json())


// endpoints go here
app.get('/listings', getListings)



// files being serverd with endpoints
app.get('/', (req, res) => {
    // console.log(path.join(__dirname, "../client/home.hmtl"))
    res.sendFile(path.join(__dirname, "../client/home.html"))
})
app.get('/styles', (req, res) => {
    res.sendFile(path.join(__dirname, "../client/home.css"))
})
app.get('/js', (req, res) => {
    res.sendFile(path.join(__dirname, "../client/home.js"))
})




//port my server is running on 
app.listen(PORT, () => console.log(`Running on ${PORT}`))