const express = require('express');
const colors = require('colors');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require("dotenv");
const connectDb = require('./config/db');
const routes = require('./routes')

dotenv.config();

connectDb();

const app = express();

// globel middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"))

routes(app);

// app.get('/',(req,res)=>{
//     return res.status(200).send("<h1>Welcome to Resturant server APP</h1>");
// })

const port = process.env.PORT || 8000;
app.listen(port,()=>{
    console.log(`Server Running on ${port}`.bgCyan.blue);
})