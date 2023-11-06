const express = require("express");


// rest object
const app = express()

const PORT = 8081



// route
// URL :-> http://localhost:8081/
app.use("/api/v1/", require("./routes/testRoutes") )


// server listening
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})