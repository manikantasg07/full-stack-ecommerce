const express = require("express");
require("dotenv").config();
var proxy = require('express-http-proxy');
const app = express();


app.use(express.json());

app.use('/auth', proxy(`http://localhost:${process.env.AUTH_SERVICE_PORT}`));

const PORT = process.env.PORT || 8080;

app.listen(PORT,()=>{
    console.log(`Server strted on PORT: ${PORT}`);
    
})