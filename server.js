const express = require("express");
const dontenv = require("dotenv");
// Importing local files
const dbConnect = require("./config/dbConnect");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const userRouter = require("./routes/userRoute")
dontenv.config({path: "./local.env"});
const app = express();
app.use(express.json()); // Middleware for parsing JSON request bodies
app.use(express.urlencoded({ extended: true }));
dbConnect()

const { PORT = 3000 } = process.env;


app.use("/api/user", userRouter);
app.use(notFound);
app.use(errorHandler);

const server = app.listen(PORT, () => {
    console.log(`Server is listening on port http://localhost:${PORT}`);
});
  
server.on('error', (error) => {
    console.error('Error occurred:', error);
});