const mongoose = require('mongoose')
const server = require('./app')
require('dotenv').config()

const mongodb_uri = process.env.MONGODB_URI;
const port = process.env.PORT;

mongoose.connect(mongodb_uri).then(() => {
    server.listen(port, () => {
        console.log(`Server is running on ${port}`)
    })
    console.log("MongoDb is connected")
})
.catch((error) => {
    console.log("MongoDB is not connected" ,error)
})