const mongoose = require("mongoose");

const dbConnect = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URL);
        // connection.connections gives information about host, db name and port
        console.log("Database Connected Successfully");
    } catch(error) {
        console.log("Database Connection Error", error.message)
    }
}
module.exports = dbConnect;