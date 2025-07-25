const express = require("express");
require("dotenv").config();
const proxy = require('express-http-proxy');
const cors  = require("cors");
const app = express();

let corsOptions = {
  origin: 'http://localhost:3000',
}

app.use(cors(corsOptions))

app.use(express.json());

app.use('/auth', proxy(`http://localhost:${process.env.AUTH_SERVICE_PORT}`));

const PORT = process.env.PORT || 8080;

app.listen(PORT,()=>{
    console.log(`Server strted on PORT: ${PORT}`);
    
})