
// import packages
const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
const cors = require("cors");



// import files
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes.js");




// dotenv setup
const dotenv = require("dotenv");
dotenv.config()


// rest object
const app = express()


// middlewares
app.use(express.json());  //to handle json response
app.use(cors());          //handle cross origin port resources
app.use(morgan("dev"))    // dev to get info on console for developer


// port
const PORT = process.env.PORT || 8081



// route
// URL :-> http://localhost:8081/
app.use("/api/v1/", require("./routes/testRoutes"))


app.use("/api/v1/auth", authRoutes)





// mongodb connection
connectDB()
    .then((connected) => {
        try {
            // server listening
            app.listen(PORT, () => {
                console.log(`Server is running on port http://localhost:${PORT} in ${process.env.DEV_MODE}`)
            })
        } catch (error) {
            console.log(`Error occurs while server connection as ${error}`);
        }
    })
    .catch((error) => {
        console.log(`Error occurs while DB connection as ${error}`);
    })