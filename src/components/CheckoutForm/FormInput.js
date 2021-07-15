import React from "react";
import { TextField, Grid } from "@material-ui/core";
import { useFormContext, Controller } from "react-hook-form";

const FormInput = ({ name, label, required }) => {
  const { control } = useFormContext();
  const isError = false;

  // console.log("control", control);

  return (
    <Grid item xs={12} sm={6}>
      <Controller
        defaultValue=""
        name={name}
        label={label}
        required={required}
        control={control}
        error={isError}
        render={({ field }) => (
          <TextField
            control={control}
            name={name}
            required={required}
            label={label}
            {...field}
            error={isError}
          />
        )}
      />
    </Grid>
  );
};

export default FormInput;
