const db = require("../models/index");
const z = require("zod");
const {generateHash, generateToken } = require("../utils");

const User = z.object({
    firstName : z.string(),
    lastName : z.string(),
    email : z.email(),
    password: z.string().min(8, "Password must be at least 8 characters long")
                        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
                        .regex(/[0-9]/, "Password must contain at least one number")
                        .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character"),
    role : z.enum(['admin','seller','customer'])
})

 
const register = async (req,res)=>{
    try {
       const body = req.body;
       const parsedUser  = User.parse(body);
       const email = parsedUser.email;
       const userfound = await db.users.findAll({
            where : {
                email
            }
       });
       if(userfound.length>0){
        return res.status(400).json({
            message :"Email Already Exists"
        })
       }
       const hashedPassword = await generateHash(parsedUser.password);
       parsedUser.password = hashedPassword;
       const response = await db.users.create(parsedUser);
       const  user = {
            firstName : response.firstName,
            lastName  : response.lastName,
            email : response.email,
            role : response.role
       }
       const token = generateToken(user.email);
       res.cookie('token',token,{
        httpOnly:true
       })

       return res.status(201).json(user)

    } catch (error) {
        console.error(error);
        return res.status(500);
        
    }

}

module.exports={
    register
}