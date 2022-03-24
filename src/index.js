const express = require('express')
const app = express()
const dotenv = require("dotenv")
const cors = require("cors")
const moment = require("moment")
const fs = require("fs")

dotenv.config()

app.use(cors())
app.use(express.json())
app.use((req, res, next) => {
    const httpMethod = req.method
    const path = req.url
    const logs = `${httpMethod} ${path} Time ${moment().format("hh:mm:ss DD/MM/YYYY")}`
    
    fs.appendFileSync(`${__dirname}/../.logs`, logs + "\n")
    
    console.log(logs)

    next()
})

const PORT = process.env.PORT

const { todosRoutes } = require("./routes")

app.use("/todos", todosRoutes)

app.listen(PORT, () => {
    console.log("Listening in port", PORT)
})