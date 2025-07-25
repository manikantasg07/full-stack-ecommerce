const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function generateHash(password){
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
}

async function generateToken(email){ 
   let token = jwt.sign({ email }, 'shhhhh');
    return token;
}

module.exports={
    generateHash,
    generateToken
}