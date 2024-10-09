require("dotenv").config()

const mongoose = require("mongoose")

const cors = require("cors")

const express = require("express");
const app = express();
app.use(express.json())
app.use(cors())

const studentRoutes = require("./routes/studentRoutes");


let connection = mongoose.connect(process.env.MONGO_URI);

connection.then(()=>{
    console.log("Database Connected")
}).catch((err)=>{
    console.log("Database not Connected")
    console.log(err)
})

app.get("/" , (req , res)=>{
    res.send("Server Ready")
})

app.use("/student" , studentRoutes);


app.listen(4444 , ()=>{
    console.log("Server start at port no 4444")
})
