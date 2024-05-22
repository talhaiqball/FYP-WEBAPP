const mongoose = require("mongoose")

const connStr = `mongodb+srv://hussainamin:TtNgcUlORHGRQDiz@fypgift.2ujp1i2.mongodb.net/?retryWrites=true&w=majority`

const connectDB = async () => {
    try {
        await mongoose.connect(connStr)
    } catch (error) {
        console.error(error)
    }
}

mongoose.connection.on('connected', () => {
    console.log("MongoDB connected...")
})

module.exports = { connectDB }