/**
 * imports
 */
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require("mongoose")
const { connectDB } = require("./store/connectDB")

const app = express()
app.use(cors())
app.use(express.json())
app.use(bodyParser.json())
const port = 3001


/**
 * Connecting to Database
 */
connectDB()


app.listen(port, function() {
  console.log(`App listening at http://localhost:${port}`)
})

const Routes = require('./routes/routes')

app.use('/', Routes)

