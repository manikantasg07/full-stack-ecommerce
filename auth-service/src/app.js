const express = require("express");
const app = express();
const db = require("./models/index");

require("dotenv").config();

(async function(){
    try {
  await db.sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
})()



PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`Server statrted on port ${PORT}`);
    
})