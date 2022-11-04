require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
// the required information so that my computer can read axios requests and translate that all from the front end -
//to the back end -- then to the database and back 

const {PORT} = process.env
const {getListings} = require('./controller') 
// functions from my controller destructured 
//so that I can reference them in my endpoints



app.use(express.json)
app.use(cors())


app.get('/listings', getListings)


// endpoints go here







//port my server is running on 
app.listen(PORT, () => console.log(`Running on ${PORT}`))