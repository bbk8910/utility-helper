import { Box, Grid, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import { ServiceButton } from "../component/ServiceButton";
import { useStyles } from "../constant/ThemeProvider";

import { useForm } from "react-hook-form";
import { Calculate, ClearAll } from "@mui/icons-material";
import MySnackBar from "../component/SnackBar";
export function GrowthCalculator(props) {
  const [result, setResult] = React.useState(0);

  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [snackBarController, setSnackBarController] = React.useState({
    message: "",
    severity: "",
  });

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
    console.log("Growth data", data);
    const newVal = data.newVal;
    const prevVal = data.prevVal;
    let result = calculate(newVal, prevVal);
    console.log("Growth result", result);
    setResult(result);
    setSnackBarController({
      open: true,
      message: "Result is ready",
      severity: "success",
    });
  }

  function calculate(newVal, prevVal) {
    return ((newVal - prevVal) / prevVal) * 100;
  }

  return (
    <Box className={classes.root}>
      <Typography variant="h4" component="h1" className={classes.title}>
        Add Data
      </Typography>
      <form onSubmit={handleSubmit(calcualteResult)}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <TextField
              id="formatted-numberformat-input"
              variant="outlined"
              fullWidth
              className={classes.textField}
              label="New Value"
              name={"newVal"}
              inputProps={{
                type: "number",
                step: ".01",
                min: 0,
              }}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleInputChange}
              {...register("newVal", { required: true })}
              error={errors.newVal ? true : false}
              helperText={
                errors.newVal?.type === "required" && "This filed is required"
              }
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <TextField
              id="formatted-numberformat-input"
              variant="outlined"
              fullWidth
              className={classes.textField}
              label="Previous Value"
              name={"prevVal"}
              inputProps={{
                type: "number",
                step: ".01",
                min: 0,
              }}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleInputChange}
              {...register("prevVal", { required: true })}
              error={errors.prevVal ? true : false}
              helperText={
                errors.prevVal?.type === "required" && "This filed is required"
              }
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

      <div className={"emi-summary-info-txt"}>
        <div>
          <span>
            <u>Result</u>
          </span>
          <span className="detail-value"> </span>
        </div>
        <div>
          <span>Growth(in %)</span>
          <span
            className={result < 0 ? "detail-value red-text" : "detail-value"}
          >
            {result} %
          </span>
        </div>
      </div>
    </Box>
  );
}
