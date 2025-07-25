const express = require("express");
const app = express();
const db = require("./models/index");
const authRouter = require("./routes/authroutes");
const cookieParser  = require("cookie-parser");
const cors  = require("cors");
require("dotenv").config();

(async function(){
    try {
  await db.sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
})()

let corsOptions = {
  origin:"http://localhost:8080"
}

app.use(cors(corsOptions))

app.use(express.json());

app.use(cookieParser());

app.use(authRouter);


PORT = process.env.PORT || 8081;

app.listen(PORT,()=>{
    console.log(`Server statrted on port ${PORT}`);
    
})