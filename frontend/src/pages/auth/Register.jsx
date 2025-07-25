import React from "react";
import Form from "../../components/Form";
import { Grid } from "@mui/material";
import z from "zod";
import { registerUserThunk } from "../../features/auth/authThunks";
import { useSelector } from "react-redux";

function Register(){    

    const authState = useSelector((state)=>state.auth);


    const fields = [
        {
            name:"firstName",
            label:"First Name",
            type:"text",
            validations:{
                required: "First Name is Required",
                
            },
            defaultValue:""
        },
        {
            name:"lastName",
            type:"text",
            label:"Last Name",
            validations:{
                required: "Last Name is Required",
                
            },
            defaultValue:""
        },
        {
            name:"email",
            type:"email",
            label:"Email",
            validations:{
                required: "Email is Required",
                
            },
            defaultValue:""
        },
        {
            name:"password",
            type:"password",
            label:"Password",
            validations:{
                required: "Passowrd is Required",
                
            },
            defaultValue:""
        },
        {
            name:"role",
            type:"select",
            label:"Role",
            defaultValue:"customer",
            options:[{name:"Customer", value:"customer"},{name:"Admin", value:"admin"},{name:"Seller", value:"seller"}]
        }
    ];

    const schema = z.object({
        firstName: z.string().min(1, "First Name is required").regex(/^[A-Za-z\s]+$/, "Only letters and spaces are allowed"),
        lastName : z.string().min(1, "Last Name is required").regex(/^[A-Za-z\s]+$/, "Only letters and spaces are allowed"),
        email : z.email("Invalid email").min(1, "Email is required"),
        password: z.string().min(1, "Password is required").regex(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={}[\]|\\:;"'<>,.?/~`]).+$/,
        "Password must contain at least one uppercase letter, one number, and one special character"
        ),
        role:z.string().min(1,"Role is Required")
    });

    return(
        <Grid container justifyContent="center" alignItems="center">
            <Form
                fields={fields}
                schema = {schema}
                title="Register User Form"
                onSubmithandler={null}
                onCancel={null} 
                action={registerUserThunk}
                submitLoading = {authState.loading}
            />
        </Grid>
    )

}


export default Register;