const db = require("../models/index");
const z = require("zod");
const {generateHash} = require("../utils");

const User = z.object({
    firstName : z.string(),
    lastName : z.string(),
    email : z.email(),
    password: z.string().min(8, "Password must be at least 8 characters long")
                        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
                        .regex(/[0-9]/, "Password must contain at least one number")
                        .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character"),
    role : z.enum('admin','seller','customer')
})


const register = async (req,res)=>{

    try {
       const body = req.body;
       const user  = User.parse(body);
       const hashedPassword = await generateHash(user.password);
       user.password = hashedPassword;
       const response = await db.users.create(user);
       return res.status(201).json({
        message:"Successfully created"
       })

    } catch (error) {
        console.error(error);
        return res.status(500);
        
    }

}

module.exports={
    register
}