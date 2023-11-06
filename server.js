const express = require("express");



// rest object
const app = express()

const PORT = 8081



// route
// URL :-> http://localhost:8081/
app.use("/", (req, res) => {
    res.status(200).json({
        message: "RESPONSE FROM SERVER"
    })
})


// server listening
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})