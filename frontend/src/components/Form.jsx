import { Box, Button, CircularProgress, FormControl, FormHelperText, Grid, InputLabel, Menu, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

function Form({fields,action,onCancel , title, schema,submitLoading}){
    const dispatch = useDispatch();

    console.log("submitLoading",submitLoading);
    

    const defaultValues = Object.fromEntries(fields.map((field)=>{
        return [field.name,field.defaultValue];
    }))
    console.log("Default Values: ",defaultValues);
    
    const {register, handleSubmit,formState:{errors}} = useForm({
        resolver:zodResolver(schema),
        defaultValues
    })

    const submitHandler = (data)=>{
        dispatch(action(data));
    }

    return(
    <Paper elevation={3} sx={{ p: 4, maxWidth: 800, mx: 'auto', my: 4 }}>
      {title && (
        <Typography variant="h5" gutterBottom>
          {title}
        </Typography>
      )}
      <Box component="form" noValidate onSubmit={submitHandler}>
        <Grid container spacing={3}>
          {fields.map((field) => {
            const isError =  !!errors[field.name];
            switch (field.type) {
                case "select":
                     return (
                        <Grid item xs={12}  key={field.name}>
                        <FormControl fullWidth error={isError}>
                            <InputLabel>{field.label}</InputLabel>
                            <Select
                            sx={{
                              minWidth:"175px"
                            }}
                            label={field.label}
                            {...register(field.name, field.validations)}
                            >
                            {field.options.map((option) => (
                                <MenuItem value={option.value} key={option.value}>
                                {option.name}
                                </MenuItem>
                            ))}
                            </Select>
                            {isError && (
                            <FormHelperText>
                                {errors?.[field.name]?.message}
                            </FormHelperText>
                            )}
                        </FormControl>
                        </Grid>
                    );
            
                default:
                    return(<Grid item xs={12}  key={field.name}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        type={field.type}
                        label={field.label}
                        error={isError}
                        helperText={errors?.[field.name]?.message}
                        {...register(field.name, field.validations)}
                    />
                    </Grid>)
            }
            })}

          <Grid item xs={12}>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              <Button type="button" variant="contained" color="primary" onClick={handleSubmit(submitHandler)} disabled={submitLoading}>
                {submitLoading?<>Submit<CircularProgress sx={{color:"black"}}/></>:<span>Submit</span>}
              </Button>
              <Button type="button" variant="outlined" color="secondary" disabled={submitLoading}>
                Cancel
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Paper>
    );
 }


 export default Form;