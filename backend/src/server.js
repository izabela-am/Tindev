// import everything
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const routes = require("./routes")

// express is a function that when called, creates a new server
const app = express()
const server = require("http").Server(app)
const io = require("socket.io")(server)

const connectedUsers = {}

io.on("connection", socket => {
    const {user} = socket.handshake.query
    connectedUsers[user] = socket.id
})

// connect with database
mongoose.connect("mongodb+srv://izabela:izabela@tindev-ihgoe.mongodb.net/tindev?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use((req, res, next) => {
    req.io = io
    req.connectedUsers = connectedUsers

    return next()
})

app.use(cors())
app.use(express.json())
app.use(routes)

// tell app which port to listen to
server.listen(3333)