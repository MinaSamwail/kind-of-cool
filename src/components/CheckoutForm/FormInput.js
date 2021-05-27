import React from "react";
import { TextField, Grid } from "@material-ui/core";
import { useFormContext, Controller } from "react-hook-form";

function FormInput(props) {
  const { control } = useFormContext();
  // console.log("props", props);

  return (
    <Grid item xs={12} sm={6}>
      <Controller
        name={props.name}
        label={props.label}
        required={props.required}
        control={control}
        render={({ field }) => (
          <TextField
            control={control}
            name={props.name}
            required={props.required}
            label={props.label}
            {...field}
          />
        )}
      />
    </Grid>
  );
}

export default FormInput;
