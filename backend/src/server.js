// import everything
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const routes = require("./routes")

// express is a function that when called, creates a new server
const server = express()
// connect with database
mongoose.connect("mongodb+srv://izabela:izabela@tindev-ihgoe.mongodb.net/tindev?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

server.use(cors())
server.use(express.json)
server.use(routes)

// tell server which port to listen to
server.listen(3333)