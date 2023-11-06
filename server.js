const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
const cors = require("cors");


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
app.use("/api/v1/", require("./routes/testRoutes") )








// server listening
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT} in ${process.env.DEV_MODE}`)
})