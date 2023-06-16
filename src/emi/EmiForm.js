import { Box, Grid, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import { ServiceButton } from "../component/ServiceButton";
import { useStyles } from "../constant/ThemeProvider";
import { calculate } from "./EmiService";

import { useForm } from "react-hook-form";
import { Calculate, ClearAll } from "@mui/icons-material";
import MySnackBar from "../component/SnackBar";
export function EmiForm(props) {
  const { setEmiResult, snackBarController, setSnackBarController } = props;

  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    register(name, { required: true, value });
  };

  function calcualteResult(data) {
    console.log("emi data", data);
    let result = calculate(data);
    console.log("emi result", result);
    setEmiResult(result);
    setSnackBarController({
      open: true,
      message: "Result is ready",
      severity: "success",
    });
  }

  return (
    <Box>
      <form onSubmit={handleSubmit(calcualteResult)}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <TextField
              id="formatted-numberformat-input"
              variant="outlined"
              fullWidth
              className={classes.textField}
              label="Loan Amount"
              name={"loanAmount"}
              inputProps={{
                type: "number",
                step: ".01",
                min: 0,
                max: 1000000000,
              }}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleInputChange}
              {...register("loanAmount", { required: true })}
              error={errors.loanAmount ? true : false}
              helperText={
                errors.loanAmount?.type === "required" &&
                "This filed is required"
              }
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <TextField
              id="formatted-numberformat-input"
              variant="outlined"
              className={classes.textField}
              label="Intrest Rate(%)"
              name={"interestRate"}
              inputProps={{ type: "number", step: ".01" }}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleInputChange}
              {...register("interestRate", { required: true })}
              error={errors.interestRate ? true : false}
              helperText={
                errors.interestRate?.type === "required" &&
                "This field is required"
              }
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              id="formatted-numberformat-input"
              variant="outlined"
              fullWidth
              className={classes.textField}
              label="Year"
              name={"year"}
              inputProps={{ type: "number", step: ".01" }}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleInputChange}
              {...register("year", { required: false })}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              id="formatted-numberformat-input"
              variant="outlined"
              fullWidth
              className={classes.textField}
              label="Month"
              name={"month"}
              inputProps={{ type: "number", step: ".01" }}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleInputChange}
              {...register("month", { required: false })}
            />
          </Grid>

          <Grid item xs={12} sx={{ marginTop: 2, marginBottom: 2 }}>
            <Stack direction="row" spacing={1}>
              <ServiceButton
                className={classes.button}
                onClick={handleSubmit}
                loading={loading}
                color={"primary"}
                name={"Calculate"}
                type={"submit"}
                icon={<Calculate sx={{ mr: 1 }} />}
              />
              <ServiceButton
                variant="outlined"
                type="reset"
                name={"Reset"}
                color={""}
                icon={<ClearAll sx={{ mr: 1 }} />}
              />
            </Stack>
          </Grid>
          <MySnackBar
            snackBarController={snackBarController}
            setSnackBarController={setSnackBarController}
          />
        </Grid>
      </form>
    </Box>
  );
}
